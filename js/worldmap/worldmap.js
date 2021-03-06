const worldmap = {
    freeMovement: true, savedImage: "", angryBees: false,
    smartphone: null, horRor: null, caveInfo: null, 
    pos: { x: 0, y: 0 }, playerDir: 2, playerMoveDir: 2, forceMove: false, 
    animData: plAnims.walk, runState: 0, runPressStart: -1, freshWall: false,
    mapName: "", fullAnimIdx: 0, forcedY: -1, 
    entities: [], importantEntities: {},
    inDialogue: false, dialogState: 0, dialogData: null, forceEndDialog: false,
    waitForAnimation: false, animIdx: 0, inWaterfall: false,
    setup: function(args) {
        this.forceMove = false;
        this.forcedY = -1;
        this.runState = 0;
        this.runPressStart = -1;
        this.savedImage = "";
        this.inDialogue = false;
        this.waitForAnimation = false;
        this.dialogState = 0;
        this.mapName = args.map;
        if(args.map !== "cave") { gfx.FragmentMap(args.map); }
        this.cursors = new CursorAnimSet([ { key: "main", x: -1, y: -1, w: 15, h: -0.25, type: "cursor", layer: "menucursorA" } ], true);
        this.freeMovement = true;

        let justStateLoad = false;
        if(player.visitedMaps.indexOf(args.map) < 0) { player.visitedMaps.push(args.map); }
        else { justStateLoad = !args.fromLoad; }

        this.pos = args.init;
        this.playerDir = (args.playerDir === undefined ? (this.playerDir === undefined ? 2 : this.playerDir) : args.playerDir);
        if(this.playerMoveDir === 0 || args.playerDir !== undefined) {
            switch(this.playerDir) {
                case 0: this.playerMoveDir = 1; break;
                case 1: this.playerMoveDir = 2; break;
                case 2: this.playerMoveDir = 4; break;
                case 3: this.playerMoveDir = 8; break;
            }
        } 
        this.dialogData = null;
        this.forceEndDialog = false;
        this.inWaterfall = false;
        this.importantEntities = {};
        this.allowLateStart = true;

        if(this.mapName === "cave") {
            if(!args.noEntityUpdate) {
                this.customMap = new CaveMap(args.floor, args.lastFloorTile, args.lastWallTile);
                this.pos = this.customMap.startPos;
                this.entities = this.customMap.entities;
                this.caveInfo = new CaveInfo(this.customMap.floor + 1);
            }
        } else {
            this.caveInfo = null;
            this.customMap = null;
            if(!args.noEntityUpdate) { this.entities = GetEntities(this.mapName, args.fromLoad); }
            else { justStateLoad = false; args.fromLoad = false; }
        }

        let targetToAutoplay = null;
        for(let i = 0; i < this.entities.length; i++) {
            const e = this.entities[i];
            if(e.storageKey !== undefined) { this.importantEntities[e.storageKey] = e; }
            if(e.autoplay && targetToAutoplay === null) { targetToAutoplay = e; } // always autoplay first one
            if(e.anim === null || e.anim === undefined || typeof e.anim === "string") { InitFellow(e); }
        }
        if(worldmap.ignoreAutoplay) { targetToAutoplay = false; }
        if(args.fromLoad || justStateLoad) { mapRefreshes.resetData(this.mapName, args.fromLoad, justStateLoad); }
        this.refreshMap();
        if(args.postCombat !== undefined) { targetToAutoplay = this.importantEntities[args.postCombat]; }
        if(targetToAutoplay !== null) {
            if(args.inside) { JumboToggle(true); }
            game.target = targetToAutoplay;
            if(game.target !== null && game.target.interact !== undefined) {
                let keepGoing = true;
                if(player.failedEntities.indexOf(game.target.name) >= 0 && game.target.failedInteract !== undefined) {
                    keepGoing = game.target.failedInteract[0](0, game.target);
                } else {
                    keepGoing = game.target.interact[0](0, game.target);
                }
                if(!keepGoing) {
                    worldmap.allowLateStart = false;
                    worldmap.toggleMovement(false);
                    return;
                }
            }
        } else if(player.fixtureTutorialState === 1) {
            this.dialogState = 0;
            this.inDialogue = true;
            game.target = fixTutEntity;
            fixTutEntity.interact[0](0, fixTutEntity);
        }
        
        if(args.challenger) {
            this.dialogState = 0;
            this.inDialogue = true;
            player.chingredients = args.chingredients;
            iHandler.Start(args.challenger + "_done");
        } else if(worldmap.angryBees) {
            this.dialogState = 0;
            this.inDialogue = true;
            game.target = beeQueen;
            beeQueen.interact[0](0, beeQueen);
        }
        if(args.isInn) {
            JumboToggle(worldmap.mapName === "fakefarm");
            if(worldmap.entities[0].innCheck) { worldmap.entities[0].action(); }
        }
        if(args.inside) { JumboToggle(true); }
    },
    latestart: function() {
        if(worldmap.allowLateStart) { worldmap.toggleMovement(true); }
    },
    toggleMovement: function(moving) {
        clearInterval(worldmap.fullAnimIdx);
        worldmap.fullAnimIdx = setInterval((moving ? worldmap.moveEntities : function() { worldmap.refreshMap(); }), timers.FULLANIM);
    },
    moveEntities: function() {
        if(worldmap.horRor !== null) { worldmap.horRor.Pursue(); }
        if(worldmap.smartphone !== null) { worldmap.smartphone.Update(); }
        for(let i = 0; i < worldmap.entities.length; i++) {
            const e = worldmap.entities[i];
            if(e.fov) { worldmap.fovCheck(e); }
            if(e.movement === undefined) { continue; }
            e.moving = true;
            const em = e.movement;
            const pointinfo = em.points[em.state];
            const speed = ((typeof em.speed) === "function" ? em.speed(e) : em.speed);
            const newPos = {
                x: e.pos.x + pointinfo.dx * speed,
                y: e.pos.y + pointinfo.dy * speed
            }
            if(pointinfo.dy > 0) {
                worldmap.entities[i].dir = directions.DOWN;
            } else if(pointinfo.dy < 0) {
                worldmap.entities[i].dir = directions.UP;
            } else if(pointinfo.dx < 0) {
                worldmap.entities[i].dir = directions.LEFT;
            } else if(pointinfo.dx > 0) {
                worldmap.entities[i].dir = directions.RIGHT;
            }
            let isBlocked = false;
            if(worldmap.isTheirCollision(newPos, e.big) && e.interact !== undefined) {
                isBlocked = true;
                if(!e.onlyActiveInteracts) {
                    worldmap.inDialogue = true;
                    worldmap.toggleMovement(false);
                    worldmap.dialogState = 0;
                    game.target = e;
                    if(e.interact[0](0, e)) { worldmap.finishDialog(); }
                }
            }
            if(isBlocked) { continue; }
            worldmap.entities[i].pos = newPos;
            if(NearRound(newPos.x) == pointinfo.x && NearRound(newPos.y) == pointinfo.y) {
                newPos.x = pointinfo.x;
                newPos.y = pointinfo.y;
                worldmap.entities[i].movement.state = (em.state + 1) % em.points.length;
            }
        }
        worldmap.refreshMap();
    },
    ToggleRun: function(doRun) {
        if(this.runState === 2 && doRun || this.runState === 0 && !doRun) { return; }
        if(doRun) {
            if(!player.hasNerd) { this.animData = plAnims.run; }
            this.runState = 1;
        } else {
            if(!player.hasNerd) { this.animData = plAnims.walk; }
            this.runState = 0;
        }
    },
    refreshMap: function() {
        gfx.clearSome(["background", "background2", "characters", "foreground"]);
        const offset = this.customMap !== null ? this.customMap.Draw(this.pos.x, this.pos.y) : gfx.drawMap(this.mapName, this.hijackedX || this.pos.x, this.hijackedY || this.pos.y);
        const layers = [];
        const fov = [];
        const ymax = collisions[this.mapName].length;
        for(let y = 0; y < ymax; y++) { layers.push([]); }

        let animDir = this.playerDir, moving = true;
        const disallowPlayerMove = (this.inWaterfall || this.fullAnimIdx <= 0 || game.transitioning);
        if(!worldmap.inDialogue && !disallowPlayerMove) {
            if(input.mainKey !== undefined) { animDir = input.mainKey; }
            else if(input.keys[player.controls.up] !== undefined) { animDir = directions.UP; }
            else if(input.keys[player.controls.left] !== undefined) { animDir = directions.LEFT; }
            else if(input.keys[player.controls.down] !== undefined) { animDir = directions.DOWN; }
            else if(input.keys[player.controls.right] !== undefined) { animDir = directions.RIGHT; }
            else { moving = this.forceMove; }

            let newPlayerMoveDir = 0;
            if(input.justPressed[player.controls.up] >= 0) { newPlayerMoveDir += 1; this.playerDir = 0; }
            if(input.justPressed[player.controls.left] >= 0) { newPlayerMoveDir += 2; this.playerDir = 1; }
            if(input.justPressed[player.controls.down] >= 0) { newPlayerMoveDir += 4; this.playerDir = 2; }
            if(input.justPressed[player.controls.right] >= 0) { newPlayerMoveDir += 8; this.playerDir = 3; }
            if(newPlayerMoveDir != 0) { this.playerMoveDir = newPlayerMoveDir; }

            const dx = (this.playerMoveDir & 2) === 2 ? -me.PLAYERMOVESPEED : ((this.playerMoveDir & 8) === 8 ? me.PLAYERMOVESPEED : 0);
            const dy = (this.playerMoveDir & 1) === 1 ? -me.PLAYERMOVESPEED : ((this.playerMoveDir & 4) === 4 ? me.PLAYERMOVESPEED : 0);
            if(this.runState === 2) {
                moving = true;
                this.TryMovePlayer(dx * me.RUNSPEEDMULT, dy * me.RUNSPEEDMULT);
            } else if(newPlayerMoveDir > 0) {
                moving = true;
                this.TryMovePlayer(dx, dy);
            }
            if(input.justPressed[player.controls.cancel] >= 0) {
                if(this.runState === 2) {
                    this.ToggleRun(false);
                } else if(++this.runPressStart >= 20) {
                    this.ToggleRun(true);
                }
            } else {
                this.runPressStart = -1;
                if(this.runState === 1) {
                    this.runState = 2;
                }
            }
        } else { moving = this.forceMove; }
        const playery = this.forcedY < 0 ? Math.round(this.pos.y) : this.forcedY;
        for(let i = 0; i < this.entities.length; i++) {
            const e = this.entities[i];
            if(!e.visible || e.pos.y < 0 || (!e.chungus && e.pos.y >= ymax)) { continue; }
            if(e.jumbo) {
                gfx.drawJumbo(e.filename, (offset.x - e.pos.x), (offset.y - e.pos.y), e.w, e.h, e.offset.x, e.offset.y);
                continue;
            }
            if(e.chungus) {
                gfx.DrawChungus(e.pos.x, e.pos.y, e.width, e.height, offset);
                continue;
            }
            if(e.isForeground) {
                const fgy = playery + 1;
                if(fgy >= ymax) { continue; }
                layers[fgy].push({ foreground: true, img: e.img, dy: e.yoff, w: e.width });
                continue;
            }
            if(e.fov) { fov.push({ x: e.pos.x - offset.x, y: e.pos.y - offset.y, dir: e.dir }); }
            let roundedY = e.forcedY ? e.forcedY : Math.round(e.pos.y);
            if(roundedY < 0 || roundedY >= ymax) { continue; }
            if(e.big) { roundedY++; }
            if(layers[roundedY] !== undefined) { // NOTE: address new screen size (I don't know what I meant by this...?)
                if(e === undefined || e.anim === undefined || e.anim.getFrame === undefined) { console.log("error with this entity:"); console.log(e); }
                const animFrame = e.anim.getFrame(e.pos, e.dir, e.moving);
                if(e.drawLayer) { animFrame.layer = e.drawLayer; }
                layers[roundedY].push(animFrame);
            }
        }
        if(this.mapName !== "gameover") {
            layers[playery].push(this.animData.getFrame(this.pos, animDir, moving));
        }
        for(let y = 0; y < ymax; y++) {
            const funcs = layers[y];
            for(let i = 0; i < funcs.length; i++) {
                const e = funcs[i];
                if(e.foreground) {
                    if(worldmap.mapName.indexOf("northcity") < 0 || mapStates[worldmap.mapName].inside) {
                        gfx.drawFGCover(e.img, y, e.dy, e.w, offset);
                    }
                } else {
                    gfx.DrawMapCharacter(e.sx, e.sy, e.pos, offset, e.sheet, e.big, e.layer, e.other);
                }
            }
        }
        for(let i = 0; i < fov.length; i++) { gfx.drawFOV(fov[i].x, fov[i].y, fov[i].dir, fov[i].ox, fov[i].oy); }
        if(worldmap.smartphone !== null) { worldmap.smartphone.Draw(); }
        if(worldmap.caveInfo !== null) { worldmap.caveInfo.Draw(); }
        if(worldmap.horRor !== null) { worldmap.horRor.Draw(); }
    },
    earlyclean: function() {
        clearInterval(worldmap.fullAnimIdx);
        clearInterval(worldmap.animIdx);
    },
    clean: function() {
        this.cursors.Perish();
        worldmap.earlyclean();
        gfx.clearAll();
    },
    clearTarget: function() {
        if(game.target) {
            if(game.target.name[0] !== "~" && !game.target.neverClear) { player.clearedEntities.push(game.target.name); }
            const idx = this.entities.indexOf(game.target);
            if(idx >= 0) { this.entities.splice(idx, 1); }
        }
        game.target = null;
    },
    fovCheck: function(e) {
        if(worldmap.inDialogue) { return false; }
        const dpos = { x: e.pos.x - worldmap.pos.x, y: e.pos.y - worldmap.pos.y };
        let spotted = false;
        switch(e.dir) {
            case 0: spotted = Math.abs(dpos.x) <= 1 && dpos.y >= 0 && dpos.y <= 4; break;
            case 1: spotted = Math.abs(dpos.y) <= 1 && dpos.x >= 0 && dpos.x <= 4; break;
            case 2: spotted = Math.abs(dpos.x) <= 1 && dpos.y <= 0 && dpos.y >= -4; break;
            case 3: spotted = Math.abs(dpos.y) <= 1 && dpos.x <= 0 && dpos.x >= -4; break;
        }
        if(spotted) { e.moving = false; e.movement = undefined; game.target = e; e.interact[0](); }
    },
    writeText: function(t, choices, isRefresh, formatting, overBlack, justWhiteText, isEndingCutscene) {
        this.cursors.MoveCursor("main", -1, -1);
        worldmap.currentFormatting = formatting;
        gfx.clearSome(["menuA", "menutext", "menuOverBlack", "menutextOverBlack"]);
        const drawY = isEndingCutscene ? 11 : 10;
        let actualText = GetText(t);
        if(actualText === "") { return; }
        const speaker = GetSpeaker(t);
        if(speaker !== null) { gfx.drawFullImage(`profiles/${speaker}`, "menuA"); }
        if(!justWhiteText) { gfx.drawTextBox(drawY, overBlack); }
        let formatArray = false;
        if(formatting) {
            if((typeof formatting) === "string") {
                actualText = actualText.replace("{0}", formatting);
            } else {
                formatArray = true;
                for(let i = 0; i < formatting.length; i++) {
                    actualText = actualText.replace("{" + i + "}", formatting[i]);
                }
            }
        } else if(actualText.indexOf("{seeds}") >= 0) {
            let actualSeedCounts = {};
            for(let i = 0; i < player.nathanSeeds.length; i++) {
                const seedInfo = player.nathanSeeds[i];
                if(actualSeedCounts[seedInfo[0]] === undefined) { actualSeedCounts[seedInfo[0]] = 0; }
                actualSeedCounts[seedInfo[0]] += seedInfo[1];
            }
            let seedStrArr = [];
            for(const crop in actualSeedCounts) {
                seedStrArr.push(HandleGifts(crop, actualSeedCounts[crop]));
            }
            actualText = HandleLists(actualText, "{seeds}", seedStrArr, "falconNoGifts", true, true);
        }
        actualText = actualText.replace(/\{g\}/g, player.monies);
        if(!justWhiteText && actualText.indexOf(":") > 0) {
            const speaker = actualText.split(":")[0];
            if(speaker.split(" ").length < 5) { // probably just a colon in text and not a speaker separator
                gfx.DrawSpeakerBG(speaker, 6, 13 + drawY * 16 - (justWhiteText ? 20 : 0));
            }
        }
        gfx.drawFullText(actualText, drawY * 16 - (justWhiteText ? 20 : 0), justWhiteText ? gfx.GetWhite() : undefined, overBlack);
        document.getElementById("screenRead").innerText = actualText;
        document.getElementById("screenRead").focus();
        console.log(actualText);
        if(choices === undefined || choices.length === 0) {
            screenReaderHelper.SayThing(actualText, "dialog");
            worldmap.dialogData = null;
            return;
        }
        const choiceTopY = (drawY === 10) ? (10.5 - choices.length) : 4.5;
        if(!isRefresh) {
            screenReaderHelper.SayThing(actualText, "dialog", GetText(choices[0]));
            worldmap.dialogData = { choices: choices, text: t, idx: 0 };
        } else {
            screenReaderHelper.SayThing(GetText(choices[worldmap.dialogData.idx]), "option");
        }
        for(let i = 0; i < choices.length; i++) {
            let txt = GetText(choices[i]);
            if(formatArray) {
                for(let j = 0; j < formatting.length; j++) {
                    txt = txt.replace("{" + j + "}", formatting[j]);
                }
            }
            const selected = worldmap.dialogData.idx === i;
            gfx.drawChoice(choiceTopY + i, txt, selected);
            if(selected) { this.cursors.MoveCursor("main", 0, choiceTopY + i - 0.5); }
        }
    },
    mouseMove: function(pos) {
        if(!this.inDialogue) { return true; }
        if(worldmap.dialogData === null || worldmap.dialogData.choices === undefined) { return true; }
        const drawY = (worldmap.pos.y <= 4 || worldmap.mapName === "hq_6") ? 11 : 0;
        const choiceTopY = (drawY === 11) ? (11.5 - worldmap.dialogData.choices.length) : 3.5;
        if(pos.y < choiceTopY) { return false; }
        const i = Math.round(pos.y - choiceTopY);
        if(i >= worldmap.dialogData.choices.length) { return false; }
        worldmap.dialogData.idx = i;
        worldmap.writeText(worldmap.dialogData.text, worldmap.dialogData.choices, true, worldmap.currentFormatting);
    },
    finishAnimation: function() {
        clearInterval(this.animIdx);
        this.waitForAnimation = false;
        this.click(null, true);
    },
    click: function(pos, isFresh) {
        if(pos !== null && pos.rawX !== undefined) {
            if(player.options.ignoreMouse === 1) { return; }
            const key = player.controls.confirm;
            input.justPressed[key] = 0;
            return input.keyPress({ key: key });
        }
        if(!this.inDialogue) { if(worldmap.smartphone !== null) { return worldmap.smartphone.Read(); } return false; }
        if(this.waitForAnimation) { iHandler.SpeedUpAnimation(); }
        else {
            if(!isFresh) {
                if(iHandler.isFirst) { return false; }
                if(worldmap.dialogData && worldmap.dialogData.choices !== undefined && worldmap.dialogData.choices.length > 0) { return false; }
            }
            iHandler.Advance();
        }
    },
    finishDialog: function(dontCancelRun) {
        gfx.clearSome(["menuA", "menutext", "menucursorA"]);
        if(!dontCancelRun) { this.ToggleRun(false); }
        this.cursors.MoveCursor("main", -1, -1);
        screenReaderHelper.lastSpeaker = null;
        this.forceEndDialog = false;
        this.inDialogue = false;
        this.freeMovement = true;
        worldmap.toggleMovement(true);
        if(player.fixtureTutorialState === 1) {
            this.dialogState = 0;
            this.inDialogue = true;
            game.target = fixTutEntity;
            fixTutEntity.interact[0](0, fixTutEntity);
        }
    },
    handleMenuChoices: function(key, isFresh) {
        let dy = 0;
        switch(key) {
            case player.controls.up: dy--; break;
            case player.controls.down: dy++; break;
            case player.controls.confirm:
            case player.controls.pause: return this.click(null, isFresh);
        }
        if(worldmap.dialogData.choices === undefined || worldmap.dialogData.choices.length === 0) { return; }
        let newchoice = worldmap.dialogData.idx + dy;
        if(newchoice < 0) { newchoice = 0; }
        else if(newchoice >= worldmap.dialogData.choices.length) { newchoice = worldmap.dialogData.choices.length - 1; }
        else { Sounds.PlaySound("menuMove"); }
        worldmap.dialogData.idx = newchoice;
        worldmap.writeText(worldmap.dialogData.text, worldmap.dialogData.choices, true, worldmap.currentFormatting);
    },
    keyPress: function(key) {
        const isFresh = input.IsFreshPauseOrConfirmPress();
        if(this.inWaterfall || this.fullAnimIdx <= 0 || game.transitioning)  { this.ToggleRun(false); return false; }
        if(this.inDialogue) {
            this.freeMovement = false;
            this.ToggleRun(false);
            input.clearAllKeys();
            if(this.dialogData === null) { 
                return (key === player.controls.confirm || key === player.controls.pause) ? this.click(null, isFresh) : false;
            }
            return this.handleMenuChoices(key, isFresh);
        }
        this.freeMovement = true;
        switch(key) {
            case player.controls.confirm:
                this.ToggleRun(false);
                this.TryMovePlayer(0, 0, true);
                break;
            case player.controls.pause: 
                if(this.inDialogue) { return; }
                this.ToggleRun(false);
                worldmap.savedImage = gfx.getSaveFileImage();
                Sounds.PlaySound("pauseI", true);
                game.transition(this, pausemenu);
                return;
            case player.controls.cancel: 
                if(this.inDialogue) { return; }
                if(this.smartphone !== null && this.smartphone.Dismiss() > 0) { return; }
        }
        return true;
    },
    InvertDir: function(dir) {
        switch(dir) {
            case directions.UP: return directions.DOWN;
            case directions.LEFT: return directions.RIGHT;
            case directions.DOWN: return directions.UP;
            case directions.RIGHT: return directions.LEFT;
        }
    },
    TryMovePlayer: function(dx, dy, isEnter) {
        const pos = { x: this.pos.x, y: this.pos.y };
        if(dx !== 0 && dy !== 0) { dx *= 0.85; dy *= 0.85; } 
        pos.x += dx; pos.y += dy;


        const stickSides = [directions.LEFT, directions.RIGHT].indexOf(this.playerDir) >= 0;
        const newPos = {
            x: Math.round(pos.x), //checkBoth ? pos.x : (this.playerDir === directions.LEFT ? Math.floor(pos.x) : Math.ceil(pos.x)),
            y: Math.round(pos.y)
        }
        if(this.IsValidPlayerPos(newPos, pos, stickSides)) {
            this.pos = pos;
            this.freshWall = false;
        } else if(this.runState === 2 && !this.freshWall) {
            this.freshWall = true;
            Sounds.PlaySound("biff");
        }
        newPos.x = Math.round(newPos.x);
        
        if(isEnter && input.IsFreshPauseOrConfirmPress()) {
            switch(this.playerDir) {
                case directions.UP: newPos.y--; break;
                case directions.LEFT: newPos.x--; break;
                case directions.DOWN: newPos.y++; break;
                case directions.RIGHT: newPos.x++; break;
            }
            let didInteract = false;
            for(let i = 0; i < this.entities.length; i++) {
                const e = this.entities[i];
                if(worldmap.isCollision(e, newPos) && e.interact !== undefined) {
                    didInteract = true;
                    if(!e.noChange) { e.dir = this.InvertDir(this.playerDir); }
                    this.inDialogue = true;
                    this.forceEndDialog = false;
                    worldmap.toggleMovement(false);
                    this.dialogState = 0;
                    game.target = e;
                    if(player.failedEntities.indexOf(game.target.name) >= 0 && e.failedInteract !== undefined) {
                        if(e.failedInteract[0](true, e)) { return; }
                    } else {
                        if(e.interact[0](true, e)) { return; }
                    }
                    break;
                }
            }
            if(!didInteract && worldmap.smartphone !== null) { return worldmap.smartphone.Read(); }
        } else {
            for(let i = 0; i < this.entities.length; i++) {
                const e = this.entities[i];
                if(!e.solid && (e.pos.x === newPos.x || e.isRow) && (e.pos.y === newPos.y || e.isColumn) && e.interact !== undefined) {
                    if(e.isColumn && e.topy != undefined) {
                        if(newPos.y < e.topy || newPos.y > e.bottomy) { continue; }
                    } else if(e.isRow && e.leftx != undefined) {
                        if(newPos.x < e.leftx || newPos.x > e.rightx) { continue; }
                    }
                    if(e.seamlessMap) {
                        e.interact[0](0, e);
                    } else if(e.interact !== undefined) {
                        this.inDialogue = true;
                        this.forceEndDialog = false;
                        this.dialogState = 0;
                        game.target = e;
                        worldmap.toggleMovement(false);
                        if(e.failed && e.failedInteract !== undefined) {
                            if(e.failedInteract[0]()) { return; }
                        } else {
                            if(e.interact[0](0, e)) { return; }
                        }
                    }
                    break;
                }
            }
        }
    },
    IsValidPlayerPos: function(newPos, pos, stickSides) {
        if(newPos.x < 0 || newPos.y < 0 || newPos.x >= collisions[this.mapName][0].length || newPos.y >= collisions[this.mapName].length) { return false; }
        if(pos.x <= 0.25 || pos.x >= (collisions[this.mapName][0].length - 0.75)) { return false; }
        if(worldmap.noClip) {
            return true;
        } else {
            let hasCollisions = false;
            if(stickSides) {
                const specialX = this.playerDir === directions.LEFT ? Math.floor(pos.x + 0.125) : Math.ceil(pos.x - 0.125);
                hasCollisions = collisions[this.mapName][newPos.y][specialX] || collisions[this.mapName][newPos.y][newPos.x];
            } else {
                newPos.x = Math.round(newPos.x);
                hasCollisions = collisions[this.mapName][newPos.y][newPos.x];
            }
            if(!hasCollisions) {
                hasCollisions = this.entities.some(e => worldmap.isCollision(e, newPos));
            }
            return !hasCollisions;
        }
    },
    isCollision: function(e, newPos) {
        if(e.seamlessMap || !e.solid) { return false; }
        if(e.big) {
            return (Math.round(e.pos.x) === newPos.x && Math.round(e.pos.y + 1) === newPos.y)
                || (Math.round(e.pos.x + 1) === newPos.x && Math.round(e.pos.y + 1) === newPos.y)
                || (Math.round(e.pos.x + 1) === newPos.x && Math.round(e.pos.y) === newPos.y)
                || (Math.round(e.pos.x) === newPos.x && Math.round(e.pos.y) === newPos.y);
        } else {
            return Math.round(e.pos.x) === newPos.x && Math.round(e.pos.y) === newPos.y;
        }
    },
    isTheirCollision: function(newPos, big) {
        const wpx = Math.round(worldmap.pos.x), wpy = Math.round(worldmap.pos.y);
        const npx = Math.round(newPos.x), npy = Math.round(newPos.y);
        if(big) {
            return (npx === wpx && (npy + 1) === wpy) || ((npx + 1) === wpx && (npy + 1) === wpy);
        } else {
            return (npx === wpx && npy === wpy);
        }
    }
};