function InventoryCopy(arr) {
    let copy = [];
    for (let i = 0; i < arr.length; i++) { copy[i] = (typeof arr[i] === "object") ? InventoryCopy(arr[i]) : arr[i]; }
    return copy;
}
const Mobile = {
    IsLandscape: function() { return screen.orientation.type.indexOf("landscape") >= 0; },
    OrientationChange: function() {
        if(Mobile.IsLandscape()) {
            document.body.className = "landscape";
            const height = screen.availHeight;
            const width = Math.floor((1024/896) * height);
            const toResize = [...game.canvasLayers, "previews", "colorCover"];
            toResize.forEach(l => {
                document.getElementById(l).style["height"] = height + "px";
                document.getElementById(l).style["width"] = width + "px";
            });
            vi.SwitchMode(true);
        } else {
            document.body.className = "";
            const width = screen.availWidth;
            const height = Math.floor((896/1024) * width);
            const toResize = [...game.canvasLayers, "previews", "colorCover"];
            toResize.forEach(l => {
                document.getElementById(l).style["height"] = height + "px";
                document.getElementById(l).style["width"] = width + "px";
            });
            vi.SwitchMode(false);
        }
    }
};

const Desktop = {
    ResMultipliers: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    MaxSize: function() {
        const maxW = screen.availWidth, maxH = screen.availHeight;
        for(let i = 0; i < Desktop.ResMultipliers.length; i++) {
            const m = Desktop.ResMultipliers[i];
            const w = m * game.w, h = m * game.h;
            if(w > maxW || h > maxH) { return i; }
        }
        return Desktop.ResMultipliers.length - 1;
    },
    AdjustScreenSettings: function() {
        if(typeof require === "undefined") { return; }
        const { ipcRenderer } = require("electron");
        const maxIdx = Desktop.MaxSize();
        const fitToScreen = universalSettings.resolution >= maxIdx;
        let m = Desktop.ResMultipliers[universalSettings.resolution];
        let w = game.w * m, h = game.h * m;
        if(fitToScreen) {
            const maxW = screen.availWidth, maxH = screen.availHeight;
            if(maxW > maxH) {
                m = maxH / game.h;
            } else {
                m = maxW / game.w;
            }
            w = game.w * m;
            h = game.h * m;
            universalSettings.fullscreen = 1;
        }
        ipcRenderer.send("resize-window", {
            width: Math.floor(w),
            height: Math.floor(h),
            fullscreen: universalSettings.fullscreen === 1,
            zoom: m
        });
    },
    Quit: function() {
        if(typeof require === "undefined") { location.reload(); return; }
        const { ipcRenderer } = require("electron");
        ipcRenderer.send("quit-game");
    }
};

const game = {
    type: 0, // 0 = browser, 1 = electron, 2 = cordova
    numSaveSlots: 10, w: 1024, h: 896, tilew: 16, tileh: 14,
    currentInputHandler: null, target: null, language: "en-us",
    sheetsToLoad: [
        "mapChar", "mapCharBig", "mapPlayer", "mapPlayerHelp", // Map Stuff
        "fov", "horRorTop", "horRorBottom", "ayudame", // Specific Map Stuff
        "sheet", "sheetBig", "combatSheet", "combatSheetBig", "combatSheetHuge", "combatPlayer", "combatEquipment", // Combat Stuff
        //* Opening *//
        "title/logo", "title/lcover0", "title/lcover1", "title/lcover2", "title/lcover3",
        "title", "titleGround", "titleTop",
        //* Maps *//
        "maps/farm", "maps/producestand", "maps/firstvillage",
        "maps/belowvillage", "maps/researchfacility", "maps/bridge", "maps/underwater", "maps/fakefarm",
        "maps/southcity", "maps/northcity", "maps/hq_1", "maps/hq_2", "maps/hq_3", "maps/hq_4", "maps/hq_5",
        "maps/hq_6", "maps/gameover", "cavesheet",
        "maps/northcity_NG", "maps/northcity_IG", "maps/hq_IG", "maps/northcity_NB", "maps/hq_NB", "maps/hq_NB_side",
        "maps/northcity_IB", "maps/hq_IB", "maps/forest", "maps/molehome",
        //* Profiles *//
        "profiles/amy", "profiles/torbo", "profiles/beth", "profiles/belf", "profiles/jing", "profiles/farha", "profiles/jorge",
        "profiles/painter", "profiles/carlos", "profiles/robo3", "profiles/hungy", "profiles/trent", "profiles/recept", "profiles/ed",
        "profiles/thirdjeff", "profiles/skyler", "profiles/cop", "profiles/mailman", "profiles/fishsell", "profiles/citymonk",
        "profiles/robber", "profiles/barnt", "profiles/eggman", "profiles/nerndette", "profiles/pizza", "profiles/nernd", "profiles/rival",
        "profiles/skump3", "profiles/skump2", "profiles/skump1", "profiles/vagante", "profiles/oldlady", "profiles/cooldog",
        "profiles/hkeep", "profiles/fjeff", "profiles/kelp", "profiles/cc", "profiles/smon", "profiles/conboss", "profiles/conwrk",
        "profiles/dowel", "profiles/cow", "profiles/robo", "profiles/beckettworry", "profiles/beckettshock", "profiles/beckettsad",
        "profiles/beckettmad", "profiles/fairymad", "profiles/fairy", "profiles/colel", "profiles/drjeff", "profiles/rapb", "profiles/lime",
        "profiles/fish", "profiles/rabbit", "profiles/tanner", "profiles/aiko", "profiles/june", "profiles/dean", "profiles/beckett",
        "profiles/conv", "profiles/nathupset", "profiles/nath", "profiles/nathconf", "profiles/nathmad", "profiles/mole", "profiles/capo",
        //* Map Covers *//
        "covers/barn", "covers/mob", "covers/skumpy", "covers/northcity1", "covers/northcity2",
        "covers/northcity2_post", "covers/northcity3",
        //* Map Foregrounds *//
        "fg/farm", "fg/producestand", "fg/firstvillage",
        "fg/belowvillage", "fg/researchfacility", "fg/underwater", "fg/fakefarm",
        "fg/southcity", "fg/northcity", "fg/hq_1", "fg/hq_2", "fg/hq_3", "fg/hq_4", "fg/hq_5",
        "fg/hq_IG", "fg/hq_NB", "fg/molehome",
        //* Shops *//
        "shops/home", "shops/cluckfuck",
        "shops/seedypete", "shops/daveshoes",  "shops/inn1", "shops/fixt1", "shops/expand1",
        "shops/constr", "shops/merm1", "shops/merm2",
        "shops/realactualhuman", "shops/piggy", "shops/cheebo",
        "shops/pawn", "shops/tinker", "shops/church", "shops/catalina", "shops/skumpy", "shops/seedshack",
        "shops/tech", "shops/hotel", "shops/cityfixture", "shops/epickyle", "shops/gordon",
        "shops/vendo", "shops/finalInn", "shops/gordon2", "shops/coop", "shops/epickyle_empty",
        "shops/tech_empty", "shops/hotel_empty", "shops/cityfixture_empty",
        //* Shop Blinks *//
        "shopblinks/home", "shopblinks/cluckfuck",
        "shopblinks/seedypete", "shopblinks/daveshoes", "shopblinks/inn1", "shopblinks/fixt1", "shopblinks/expand1",
        "shopblinks/constr", "shopblinks/merm1", "shopblinks/merm2",
        "shopblinks/realactualhuman", "shopblinks/piggy", "shopblinks/cheebo",
        "shopblinks/pawn", "shopblinks/tinker", "shopblinks/none", "shopblinks/catalina", "shopblinks/skumpy", "shopblinks/seedshack",
        "shopblinks/tech", "shopblinks/hotel", "shopblinks/epickyle", "shopblinks/gordon", "shopblinks/gordon2", "shopblinks/coop",
        //* Combat Backgrounds *//
        "bgs/outside", "bgs/underwater", "bgs/researchlab", "bgs/fakefarm", "bgs/scity", "bgs/ncity", "bgs/hq", "bgs/cave",
        //* Onion *//
        "onionbg", "calsotte",
        //* Endings *//
        "end/end1", "end/end2p", "end/end2v", "end/end3np", "end/end4np", "end/end5np", "end/end6np", "end/end7np",
        "end/end3ip", "end/end4ip", "end/end5ip", "end/end6ip", "end/end7ip", "end/end3nv", "end/end4nv", "end/end5nv",
        "end/end6nv", "end/end7nv", "end/end3iv", "end/end4iv", "end/end5iv", "end/end6iv", "end/end7iv",
        //* Other Random Shit and Credits *///
        "challengeBG", "tobytern", "endcredits", "endcreditscover", "endcreditsmouth", "upnext"
    ],
    canvasLayers: ["background", "background2", "crops", "characters", "foreground", "smartphone", "smartphoneText", "menuA", "menuB", "menucursorA", 
                    "menucursorB", "menucursorC", "menutext", "tutorial", "menuOverBlack", "menutextOverBlack", "savegen"], 
    fullInit: function() {
        Desktop.AdjustScreenSettings();
        const univSettings = localStorage.getItem("universalSettings");
        if(univSettings !== null) { universalSettings = game.str2obj(univSettings); }
        if(typeof cordova !== "undefined" || location.href.indexOf("indexmobile") >= 0) {
            game.type = 2; // mobile
            window.addEventListener("orientationchange", Mobile.OrientationChange);
            Mobile.OrientationChange();
        } else if(typeof require === "function") {
            game.type = 1; // desktop
        } else {
            game.type = 0; // browser
        }
        const loadingText = GetText("nowLoading");
        document.getElementById("screenRead").innerText = loadingText;
        document.getElementById("loading").innerText = loadingText;
        document.getElementById("canvasContainer").focus();
        const lastSave = localStorage.getItem("lastSaved");
        if(lastSave !== null) {
            const loadedPlayer = game.str2obj(localStorage.getItem("player" + lastSave));
            player.options = Object.assign(player.options, loadedPlayer.options);
            player.keyboardcontrols = Object.assign(player.keyboardcontrols, loadedPlayer.keyboardcontrols);
            player.gamepadcontrols = Object.assign(player.gamepadcontrols, loadedPlayer.gamepadcontrols);
            game.PatchSaveFile();
        }
        let canvasObj = {};
        for(let i = 0; i < game.canvasLayers.length; i++) {
            const name = game.canvasLayers[i];
            canvasObj[name] = document.getElementById(name);
        }
        let contextObj = {};
        for(const key in canvasObj) {
            contextObj[key] = canvasObj[key].getContext("2d");
        }
        
        game.init(canvasObj, contextObj, game.w, game.h, 16, 14);
    },
    init: function(canvasObj, ctxObj, width, height, tilewidth, tileheight) {
        gfx.canvas = canvasObj;
        gfx.ctx = ctxObj;
        gfx.canvasWidth = width;
        gfx.canvasHeight = height;
        gfx.tileWidth = tilewidth;
        gfx.tileHeight = tileheight;
        game.ApplyBlendFilter();
        gfx.loadSpriteSheets(player.getSheetPath(), this.sheetsToLoad, this.sheetsLoaded);
        collisions["northcity_NG"] = collisions["northcity"];
        collisions["northcity_NB"] = collisions["northcity"];
        collisions["northcity_IG"] = collisions["northcity"];
        collisions["northcity_IB"] = collisions["northcity"];
        collisions["hq_IB"] = collisions["hq_IG"];
    },
    transitioning: false,
    CleanHandler: function(from) {
        Sounds.EndAll();
        if(from.clean === undefined) {
            if(from.cursors !== undefined) { from.cursors.Perish(); }
            if(from.animHelper !== undefined) { from.animHelper = null; }
            gfx.clearAll();
        } else {
            from.clean();
        }
    },
    transition: function(from, to, arg) {
        //game.innerTransition(from, to, arg);
        //if(game.currentInputHandler.latestart !== undefined) { game.currentInputHandler.latestart(); }
        if(game.transitioning) { return false; }
        worldmap.ToggleRun(false);
        game.transitioning = true;
        if(from.earlyclean !== undefined) { from.earlyclean(); }
        if(arg !== undefined && arg.quickTransition === true) {
            game.startQuickTransitionAnim(1, from, to, arg);
        } else {
            game.startTransitionAnim(1, from, to, arg);
        }
        return true;
    },
    innerTransition: function(from, to, arg, clearAll) {
        if(this.currentInputHandler.isTutorial) { return tutorial.transition(from, to, arg); }
        game.currentInputHandler = to;
        this.CleanHandler(from);
        if(clearAll === true) { gfx.clearAll(); }
        if(!from.freeMovement || !to.freeMovement) { input.clearAllKeys(); }
        to.setup(arg);
    },
    transitionInfo: { crop: "trans0", size: 0.5, time: 0 },
    startTransitionAnim: function(dir, from, to, arg) {
        clearInterval(game.transitionInfo.animIdx);
        game.transitionInfo = {
            crop: "trans" + Range(0, 20), 
            size: (dir > 0 ? 0.5 : 5),
            from: from, to: to, arg: arg, dir: dir,
            animIdx: setInterval(game.drawTransitionAnim, 10)
        };
    },
    midTransitionPoint: function() {
        clearInterval(game.transitionInfo.animIdx);
        input.clearAllKeys();
        if(game.transitionInfo.arg === "justAnim") { return; }
        game.innerTransition(game.transitionInfo.from, game.transitionInfo.to, game.transitionInfo.arg, true);
        if(game.transitionInfo.arg !== undefined && game.transitionInfo.arg.stayBlack) { return; }
        game.startTransitionAnim(-1);
    },
    finishTransition: function() {
        clearInterval(game.transitionInfo.animIdx);
        game.transitioning = false;
        if(game.currentInputHandler.latestart !== undefined) { game.currentInputHandler.latestart(); }
        gfx.clearLayer("tutorial");
    },
    drawTransitionAnim: function() {
        gfx.clearLayer("tutorial");
        if(game.transitionInfo.size > 0) {
            for(let y = 0; y < game.tileh + 2; y += 2) {
                for(let x = 0; x < game.tilew + 2; x += 2) {
                    gfx.DrawTransitionImage(game.transitionInfo.crop, x - (y % 4 ? 1 : 0), y + 0.5, game.transitionInfo.size);
                }
            }
        }
        if(game.transitionInfo.dir === 1) {
            if(game.transitionInfo.size >= 5) {
                game.midTransitionPoint();
            } else {
                game.transitionInfo.size += 0.25;
            }
        } else {
            if(game.transitionInfo.size <= 0) {
                game.finishTransition();
            } else {
                game.transitionInfo.size -= 0.25;
            }
        }
    },

    StartConstructionTransition: function() {
        worldmap.waitForAnimation = true;
        const workers = [];
        for(let y = -1; y <= game.tileh; y++) {
            for(let x = 0; x < 5; x++) {
                if(x < 4 && Math.random() > 0.2) {
                    if(Math.random() > 0.2) { continue; }
                    const newX = RoundNear(game.tilew + x - 2 + 2 * Math.random(), 8);
                    const newY = RoundNear(y - 1 + 2 * Math.random(), 8);
                    workers.push({ x: newX, y: newY, frame: Range(0, 3) });
                    workers.push({ x: game.tilew + newX + 5, y: newY, frame: Range(0, 3) });
                }
                workers.push({ x: game.tilew + x, y: y, frame: Range(0, 3) });
                if(x === 4) {
                    workers.push({ x: game.tilew + game.tilew + 4, y: y, frame: Range(0, 3) });
                } else {
                    workers.push({ x: game.tilew + game.tilew + x + 5, y: y, frame: Range(0, 3) });
                }
            }
        }
        Sounds.PlaySound("stompins");
        game.transitionInfo = { count: 0, startBlack: -82, workers: workers };
        iHandler.state.animHandler = this.DrawConstructionTransition;
        worldmap.animIdx = setInterval(iHandler.state.animHandler, 10);
    },
    DrawConstructionTransition: function(spedUp) {
        if(spedUp) {
            ClearEntitiesUnderCondition(e => e.name.indexOf("H_") === 0 || e.name.indexOf("Worker") >= 0, true);
            delete game.transitionInfo.workers;
            gfx.clearSome(["tutorial", "menuOverBlack", "menutextOverBlack"]);
            iHandler.Finish();
            return true;
        }
        gfx.clearLayer("tutorial");
        const idx = game.transitionInfo.count++;
        let hasWorkersOnscreen = false;
        game.transitionInfo.workers.forEach(worker => {
            worker.x -= 0.0625;
            if(worker.x > -3) { hasWorkersOnscreen = true; }
            let frame = worker.frame % 4;
            if(frame === 3) { frame = 1; }
            if(idx % 10 === 0) { worker.frame++; }
            gfx.drawTileToGrid("ctran" + frame, worker.x, worker.y, "tutorial");
        });
        let blackx = game.tilew * 16 - game.transitionInfo.startBlack;
        gfx.DrawBlack(game.tilew * 16 - game.transitionInfo.startBlack, game.tilew * 16);
        if(blackx === 0) { 
            ClearEntitiesUnderCondition(e => e.name.indexOf("H_") === 0 || e.name.indexOf("Worker") >= 0, true);
        }
        game.transitionInfo.startBlack += 1;
        if(!hasWorkersOnscreen) {
            delete game.transitionInfo.workers;
            gfx.clearSome(["tutorial", "menuOverBlack", "menutextOverBlack"]);
            iHandler.Finish();
            return true;
        }
        return false;
    },

    startQuickTransitionAnim: function(dir, from, to, arg) {
        clearInterval(game.transitionInfo.animIdx);
        game.transitionInfo = {
            dir: dir, count: 0, from: from, to: to, arg: arg, 
            animIdx: setInterval(game.drawQuickTransitionAnim, 10)
        };
    },
    midQuickTransitionPoint: function() {
        clearInterval(game.transitionInfo.animIdx);
        worldmap.pos = { x: game.transitionInfo.arg.newx, y: game.transitionInfo.arg.newy };
        game.startQuickTransitionAnim(-1);
    },
    drawQuickTransitionAnim: function() {
        gfx.clearLayer("tutorial");
        const i = Math.floor(game.transitionInfo.count / 3);
        const key = "forestTransition" + i;
        for(let x = 0; x < game.tilew; x++) {
            for(let y = 0; y < game.tileh; y++) {
                gfx.drawTileToGrid(key, x, y, "tutorial");
            }
        }
        if(game.transitionInfo.dir === 1) {
            if(game.transitionInfo.count >= 14) {
                game.midQuickTransitionPoint();
            } else {
                game.transitionInfo.count++;
            }
        } else {
            if(game.transitionInfo.count <= 0) {
                game.finishTransition();
            } else {
                game.transitionInfo.count--;
            }
        }
    },
    initListeners: function() {
        if(game.type !== 2) {
            gfx.canvas["menutextOverBlack"].addEventListener("mousemove", input.moveMouse);
            gfx.canvas["menutextOverBlack"].addEventListener("click", input.click);
            document.addEventListener("keypress", input.keyPress);
            document.addEventListener("keydown", input.keyDown);
            document.addEventListener("keyup", input.keyUp);
            document.addEventListener("wheel", input.onWheel);
            window.addEventListener("gamepadconnected", input.gamepadConnected);
            window.addEventListener("gamepaddisconnected", input.gamepadDisconnected);
        }
        setInterval(game.incrementTime, 1000);
    },
    incrementTime: () => player.playTime++,
    sheetsLoaded: function() {
        const debug = true;
        const fromQuit = localStorage.getItem("quit");
        game.initListeners();
        if(debug || fromQuit === "true") {
            localStorage.removeItem("quit");
            game.currentInputHandler = worldmap.title;
            worldmap.title.setup();
        } else {
            game.currentInputHandler = opening;
            opening.setup();
        }
    },
    obj2str: obj => LZString.compress(JSON.stringify(obj)),
    str2obj: str => JSON.parse(LZString.decompress(str)),
    SetNonstandardGameOverFlag: function() {
        for(let i = 0; i < game.numSaveSlots; i++) {
            if(localStorage.getItem("gameover" + i) === null) {
                localStorage.setItem("gameover" + i, player.SaveID);
                return;
            }
        }
    },
    GetNonstandardGameOverFlag: function(savenum) {
        for(let i = 0; i < game.numSaveSlots; i++) {
            const goId = localStorage.getItem("gameover" + i);
            if(goId === player.SaveID) {
                AddAchievementIfMissing("murderedToDeath");
                localStorage.removeItem("gameover" + i);
                game.save(savenum, true);
                return;
            }
        }
    },
    DebugSave: function() {
        if(worldmap.mapName === "cave") {
            player.mapName = GetPostGameMapName("northcity");
            player.mapPos = { x: 17, y: 7.5 };
            player.mapDir = 2;
        } else {
            player.setMapPosition();
            stateBinders.storePositions(worldmap.mapName);
        }
        const savePlayer = JSON.stringify(player);

        for(let i = 0; i < player.visitedMaps.length; i++) {
            const map = player.visitedMaps[i];
            if(stateBinders[map] !== undefined) { stateBinders[map](); }
        }
        if(worldmap.smartphone !== null) { mapStates["northcity"].phoneData = worldmap.smartphone.GetPhoneData(); }
        const saveMap = JSON.stringify(mapStates);

        const ele = document.createElement("a");
        const file = new Blob([`${savePlayer}\n${saveMap}`], { type: "text/plain; charset=utf-8" });
        ele.href = URL.createObjectURL(file);
        ele.download = `savefile_${(new Date()).toISOString()}.txt`;
        ele.click();
    },
    DebugLoad: function(text) {
        const data = text.split("\n");
        localStorage.setItem("playerX", game.obj2str(JSON.parse(data[0])));
        localStorage.setItem("mapentX", game.obj2str(JSON.parse(data[1])));
        game.load("X");
    },
    save: function(savenum, justPlayer) {
        if(justPlayer) { 
            localStorage.setItem("player" + savenum, game.obj2str(player));
            return;
        }
        player.SaveID = (Math.random() * Number.MAX_SAFE_INTEGER).toString();
        player.saveTime = +(new Date());
        localStorage.setItem("fileImg" + savenum, worldmap.savedImage);
        if(worldmap.mapName === "cave") {
            player.mapName = GetPostGameMapName("northcity");
            player.mapPos = { x: 17, y: 7.5 };
            player.mapDir = 2;
        } else {
            player.setMapPosition();
            stateBinders.storePositions(worldmap.mapName);
        }
        localStorage.setItem("player" + savenum, game.obj2str(player));
        localStorage.setItem("lastSaved", savenum);
        for(let i = 0; i < player.visitedMaps.length; i++) {
            const map = player.visitedMaps[i];
            if(stateBinders[map] !== undefined) { stateBinders[map](); }
        }
        if(worldmap.smartphone !== null) { mapStates["northcity"].phoneData = worldmap.smartphone.GetPhoneData(); }
        localStorage.setItem("mapent" + savenum, game.obj2str(mapStates));
        player.justSaved = true;
    },
    load: function(savenum) {
        const oldFilter = player.options.gfxfilter;
        const oldFilterMode = player.options.coverMode;

        const loadedPlayer = game.str2obj(localStorage.getItem("player" + savenum));
        player = Object.assign(player, loadedPlayer);
        
        const newFilter = player.options.gfxfilter;
        const newFilterMode = player.options.coverMode;
        game.ApplyBlendFilter();

        if(oldFilter != newFilter || oldFilterMode != newFilterMode) {
            gfx.loadSpriteSheets(player.getSheetPath(), game.sheetsToLoad, () => { game.load2(savenum); });
        } else {
            game.load2(savenum);
        }
    },
    load2: function(savenum) {
        game.GetNonstandardGameOverFlag(savenum);
        mapStates = game.str2obj(localStorage.getItem("mapent" + savenum));
        stores["skumpys"].wares[0].price = (player.achievements.indexOf("skumpy") < 0 ? 20 : 0);
        if(mapStates["northcity"].phoneData !== undefined) {
            worldmap.smartphone = new Smartphone();
            worldmap.smartphone.SetPhoneData(mapStates["northcity"].phoneData);
        }
        localStorage.setItem("lastSaved", savenum);
        if(!game.PatchSaveFile()) { return; }
        game.ApplyBlendFilter();
        if(player.mapName === "hq_3") {
            player.mapPos = { x: 25, y: 5 };
        }

        const now = +(new Date());
        const distDays = Math.floor((now - player.saveTime) / 86400000);
        if(distDays > 30) {
            game.transition(game.currentInputHandler, pausemenu.recap);
        } else {
            game.transition(game.currentInputHandler, worldmap, { 
                init: player.mapPos,
                map: player.mapName,
                playerDir: player.mapDir,
                fromLoad: true
            });
        }
    },
    PatchSaveFile: function() {
        // v0.3- save files are incompatible with v0.4+
        if(player.saveVersion === undefined) { return false; }
        // prior to v0.3
        if(player.fixtureTutorialState === undefined) { console.log("fts"); player.fixtureTutorialState = 0; }
        if(player.keyboardcontrols === undefined) { console.log("kbc"); player.keyboardcontrols = { up: "w", left: "a", down: "s", right: "d", confirm: " ", cancel: "q",  pause: "Enter" }; }
        if(player.gamepadcontrols === undefined) { console.log("gpc"); player.gamepadcontrols = { up: "Gamepad12", left: "Gamepad14", down: "Gamepad13", right: "Gamepad15", confirm: "Gamepad0", cancel: "Gamepad1",  pause: "Gamepad9" }; }
        if(player.options.controltype === undefined) { console.log("oct"); player.options.controltype = 0; }
        // prior to v0.5
        if(player.options.gfxfilter === undefined) { console.log("gfx"); player.options.gfxfilter = 0; }
        if(player.options.stickyMovement === undefined) { console.log("stk"); player.options.stickyMovement = 0; }
        if(player.options.ignoreMouse === undefined) { console.log("ign"); player.options.ignoreMouse = 0; }
        if(player.options.virtualController === undefined) { console.log("vrt"); player.options.virtualController = 0; }
        if(player.options.canSayFuck === undefined) { console.log("ass"); player.options.canSayFuck = 1; }
        if(mapStates["northcity_NG"] === undefined) { mapStates["northcity_NG"] = { inside: false }; }
        if(mapStates["northcity_NB"] === undefined) { mapStates["northcity_NB"] = { inside: false }; }
        if(mapStates["northcity_IG"] === undefined) { mapStates["northcity_IG"] = { inside: false }; }
        if(mapStates["northcity_IB"] === undefined) { mapStates["northcity_IB"] = { inside: false }; }
        if(mapStates["hq_IG"] === undefined) { mapStates["hq_IG"] = {}; }
        if(mapStates["hq_NB"] === undefined) { mapStates["hq_NB"] = {}; }
        if(mapStates["hq_NB_side"] === undefined) { mapStates["hq_NB_side"] = {}; }
        if(mapStates["hq_IB"] === undefined) { mapStates["hq_IB"] = {}; }
        if(player.noFunDiffMod === undefined) { console.log("nof"); player.noFunDiffMod = 0; }
        if(player.questsCleared.indexOf("truckRepair") >= 0 && player.questsCleared.indexOf("findFakeFarm") < 0) { console.log("fkf"); player.questsCleared.push("findFakeFarm"); }
        // prior to v0.55
        if(player.options.coverColor === undefined) { player.options.coverColor = 0; }
        if(player.options.coverMode === undefined) { player.options.coverMode = 0; }
        if(player.options.fontSize === undefined) { player.options.fontSize = 0; }
        // prior to v0.6
        if(player.options.deadZone === undefined) { player.options.deadZone = 0; }
        if(player.options.analogDPad === undefined) { player.options.analogDPad = 1; }
        if(player.lastSaveSlot === undefined) { player.lastSaveSlot = 0; }
        if(player.dreamBonus === undefined) { player.dreamBonus = 0; }
        // prior to v0.7
        if(player.usedOnionPerks == undefined) { player.usedOnionPerks = []; }
        if(player.newAchievements == undefined) { player.newAchievements = []; }
        if(player.fedPeople === undefined) { player.fedPeople = 0; }
        return true;
    },
    ApplyBlendFilter: function() {
        const style = document.getElementById("colorCover").style;
        const opts = player.options;
        if(opts.gfxfilter === 3) { // Color Shift
            style["display"] = "block";
            switch(opts.coverMode) {
                case 0: // monochrome
                    console.log("W");
                    style["mix-blend-mode"] = "hue";
                    switch(opts.coverColor) {
                        case 0: // retro
                            style["background-color"] = "";
                            break;
                        case 1: // gray
                            style["background-color"] = "#FFFFFF";
                            break;
                        case 2: // amber
                            style["background-color"] = "#FFBF00";
                            break;
                        case 3: // blue
                            style["background-color"] = "#0000FF";
                            break;
                        case 4: // pink
                            style["background-color"] = "#FFCCCC";
                            break;
                    }
                    break;
                case 1: // pastel
                    console.log("G");
                    style["mix-blend-mode"] = "soft-light";
                    style["background-color"] = "#FFE5E5";
                    break;
                case 2: // faded
                    style["mix-blend-mode"] = "saturation";
                    style["background-color"] = "#FFCCCC";
                    break;
                case 3: // dark
                    style["mix-blend-mode"] = "hard-light";
                    style["background-color"] = "#666666";
                    break;
                case 4: // bright
                    style["mix-blend-mode"] = "soft-light";
                    style["background-color"] = "#FFFFFF";
                    break;
            }
        } else {
            style["display"] = "none";
        }
    }
};