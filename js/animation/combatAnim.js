function CombatAnimHelper(enemies) {
    let playerPos = { x: 3, y: 9.25 };
    let playerAnimInfo = new CombatAnimPlayer(playerPos.x, playerPos.y);
    let birdAnimInfo = (player.hasFalcon ? new CombatAnimFalcon(playerPos.x - 1.5, playerPos.y) : null);
    let enemyAnimInfos = [];
    let currentx = 11 - enemies.length, anims = [];
    this.ResetEnemyAnimHelper = function(enemies) {
        enemyAnimInfos = [];
        let currentx = 11 - enemies.length;
        for(let i = 0; i < enemies.length; i++) {
            const e = enemies[i];
            if(e.size === "xl") { currentx -= 1; } // TODO: this shit
            enemyAnimInfos.push(GetEnemyCombatAnim(currentx, playerPos.y, e.spriteidx, e.size));
            switch(e.size) {
                case "sm": currentx += 1; break;
                case "md": currentx += 1.5; break;
                case "lg": currentx += 2; break;
                case "xl": currentx += 4; break;
            }
        }
    }
    this.ResetEnemyAnimHelper(enemies);
    this.GetCursorInfo = function(x) {
        let currentx = 11 - combat.enemies.length;
        for(let i = 0; i < combat.enemies.length; i++) {
            if(x === i) {
                const info = combat.enemies[i].cursorinfo;
                const size = combat.enemies[i].size;
                const y = playerPos.y;
                const rawy = y - GetEnemyCombatDims(combat.enemies[i].size).h;
                if(combat.enemies[i].size === "xl") { currentx -= 1; }
                return { x: currentx + info.dx, rawX: currentx, y: y + info.dy, rawY: rawy, w: info.w, h: info.h };
            }
            switch(combat.enemies[i].size) {
                case "sm": currentx += 1; break;
                case "md": currentx += 1.5; break;
                case "lg": currentx += 2; break;
                case "xl": currentx += 4; break;
            }
        }
    };

    this.GetPlayerTopPos = () => ({ x: playerPos.x, y: playerPos.y - 1 });
    this.GetPlayerBottomPos = () => ({ x: playerPos.x + 0.5, y: playerPos.y });
    this.AddPlayerAttackAnim = caa => playerAnimInfo.animQueue.push(caa);
    this.StartPlayerAnimSequence = () => playerAnimInfo.StartAnimQueue();
    this.SetPlayerAnimArg = (key, val) => playerAnimInfo.PushArg(key, val);
    this.SetPlayerAnimPos = function(x, y) { playerAnimInfo.dims.x = x; playerAnimInfo.dims.y = y; };
    this.SetPlayerAnimState = function(name, resetPos) { playerAnimInfo.SetAnim(name); if(resetPos) { this.ResetPlayerAnimPos(); } };
    this.SetPlayerAnimLayer = (layer) => playerAnimInfo.layer = layer;
    this.ResetPlayerAnimPos = () => this.SetPlayerAnimPos(playerPos.x, playerPos.y);
    this.ResetPlayerAnimState = function() {
        if(player.health < (player.maxhealth / 4)) { playerAnimInfo.SetAnim("STAND_WEAK"); }
        else { playerAnimInfo.SetAnim("STAND"); }
        playerAnimInfo.layer = "characters";
        playerAnimInfo.ClearAnimQueue();
        this.ResetPlayerAnimPos();
    };
    this.PushPlayerOverlay = name => playerAnimInfo.PushOverlayAnim(weaponAnims[name]);
    this.GivePlayerAHit = function(isCrop) {
        if(isCrop) { this.SetPlayerAnimState("HURT_CROP"); }
        else if(player.health <= 0) { this.SetPlayerAnimState("FATALBLOW"); }
        else { this.SetPlayerAnimState("HURT"); }
    };

    this.SetBirdAnimArg = (key, val) => { if(birdAnimInfo !== null) { birdAnimInfo.PushArg(key, val); }};
    this.SetBirdAnimPos = (x, y) => { if(birdAnimInfo !== null) { birdAnimInfo.dims.x = x; birdAnimInfo.dims.y = y; }};
    this.SetBirdAnimState = function(name, resetPos) { if(birdAnimInfo !== null) { birdAnimInfo.SetAnim(name); if(resetPos) { this.ResetBirdAnimPos(); } }};
    this.SetBirdAnimLayer = layer => { if(birdAnimInfo !== null) { birdAnimInfo.layer = layer; }} 
    this.ResetBirdAnimPos = () => { if(birdAnimInfo !== null) {this.SetBirdAnimPos(playerPos.x - 1.5, playerPos.y); }}
    this.ResetBirdAnimState = function() {
        if(birdAnimInfo === null) { return; }
        birdAnimInfo.SetAnim("STAND");
        birdAnimInfo.layer = "characters";
        birdAnimInfo.ClearAnimQueue();
        this.ResetBirdAnimPos();
    };

    this.GetEnemyTopPos = idx => { const edims = enemyAnimInfos[idx].dims; return { x: edims.x + (edims.w / 16) / 2, y: edims.y - (edims.h / 16) }; };
    this.GetEnemyPos = idx => ({ x: enemyAnimInfos[idx].x, y: enemyAnimInfos[idx].y });
    this.GetEnemyBottomPos = idx => ({ x: enemyAnimInfos[idx].dims.x, y: enemyAnimInfos[idx].dims.y });
    this.AddEnemyAttackAnim = (idx, caa) => enemyAnimInfos[idx].animQueue.push(caa);
    this.StartEnemyAnimSequence = idx => enemyAnimInfos[idx].StartAnimQueue();
    this.SetEnemyAnimArg = (idx, key, val) => enemyAnimInfos[idx].PushArg(key, val);
    this.SetEnemyAnimState = (idx, name) => enemyAnimInfos[idx].SetAnim(name);
    this.MakeEnemyACorpse = (idx) => { const e = enemyAnimInfos[idx]; e.dead = true; e.deadFrame = 0; };
    this.RemoveEnemy = idx => enemyAnimInfos.splice(idx, 1);
    this.DEBUG_DrawEnemy = (idx) => enemyAnimInfos[idx].Animate(idx);

    this.Animate = function() {
        gfx.clearSome(["characters", "menucursorC"]);
        AnimateEntities();
        AnimateParticles();
    };
    const AnimateEntities = function() {
        if(birdAnimInfo !== null) { birdAnimInfo.Animate(); }
        playerAnimInfo.Animate();
        for(let i = 0; i < enemyAnimInfos.length; i++) {
            if(enemyAnimInfos[i].dead) { enemyAnimInfos[i].CorpseItUp(enemyAnimInfos[i].deadFrame++, combat.enemies[i].size); }
            else { enemyAnimInfos[i].Animate(i); }
        }
        for(let i = 0; i < combat.enemies.length; i++) { // TODO: probably shouldn't be this
            if(combat.enemies[i].stickTurns > 0 && !combat.enemies[i].justStuck) {
                if(combat.enemies[i].size === "lg" || combat.enemies[i].size === "xl") {
                    gfx.drawTileToGrid("hgoop", enemyAnimInfos[i].x + 0.5, enemyAnimInfos[i].y + 1, "characters");
                } else {
                    gfx.drawTileToGrid("hgoop", enemyAnimInfos[i].x + combat.enemies[i].cursorinfo.dx, enemyAnimInfos[i].y, "characters");
                }
            }
        }
    };
    this.CleanEntities = function() {
        this.ResetPlayerAnimState();
        this.ResetBirdAnimState();
        for(let i = 0; i < enemyAnimInfos.length; i++) { enemyAnimInfos[i].SetAnim("STAND"); }
    };
    const AnimateParticles = function() {
        for(let i = anims.length - 1; i >= 0; i--) {
            const t = anims[i];
            if(t.current >= t.time) {
                t.finish();
                anims.splice(i, 1);
            } else { t.getFrame(timers.CHARANIM); }
        }
    };
    this.AddAnim = function(a) { anims.push(a); };
    this.CleanAnims = function() { anims = []; };

    const DrawCropGrid = function(grid, dx, dy, drawWeed) {
        for(let x = 0; x < grid.length; x++) {
            const xdx = x + dx;
            for(let y = 0; y < grid[0].length; y++) {
                if(grid[x][y] === null || grid[x][y].name === undefined || grid[x][y].hidden) { continue; }
                const crop = grid[x][y];
                const ydy = y + dy;
                let newFrame = Math.floor((crop.frames - 1) * ((crop.time - crop.activeTime) / crop.time));
                if(crop.size == 2) {
                    let drawItemNum = true;
                    if(crop.name === "bignet") {
                        if(crop.rotten) {
                            gfx.drawTileToGrid(crop.name + "0", xdx, ydy, "foreground");
                        } else {
                            gfx.drawTileToGrid(crop.name + "1", xdx, ydy, "foreground");
                            gfx.drawItemNumber(0, xdx + 1, ydy, "foreground", true);
                        }
                        drawItemNum = false;
                    } else if(crop.type !== "tree") {
                        gfx.drawTileToGrid(crop.name + newFrame, xdx, ydy, "foreground");
                    } else if(newFrame < 3) {
                        gfx.drawTileToGrid((crop.treeSprite || "tree") + newFrame, xdx, ydy, "foreground");
                    } else {
                        gfx.drawTileToGrid((crop.treeSprite || "tree") + "2", xdx, ydy, "foreground");
                        newFrame -= 3;
                        gfx.drawTileToGrid(crop.name + newFrame, xdx, ydy, "foreground");
                    }
                    if(drawItemNum) { gfx.drawItemNumber(crop.rotten ? "x" : Math.ceil(crop.activeTime), xdx + 1, ydy, "foreground", true); }
                } else if(crop.type === "water") {
                    if(crop.name === "net") {
                        if(crop.rotten) {
                            gfx.drawTileToGrid(crop.name + "0", xdx, ydy, "foreground");
                        } else {
                            gfx.drawTileToGrid(crop.name + "1", xdx, ydy, "foreground");
                            gfx.drawItemNumber(0, xdx, ydy, "foreground", true);
                        }
                    }
                } else if(crop.type === "card") {
                    gfx.drawTileToGrid((crop.inDefensePosition ? "def" : "") + crop.name, xdx, ydy, "foreground");
                } else if(crop.type === "bee") {
                    gfx.drawTileToGrid(crop.name + newFrame, xdx, ydy, "foreground");
                } else if(crop.type === "rod") {
                    gfx.drawTileToGrid(crop.fishNum === undefined ? (crop.name + "0") : ("fish" + crop.fishNum), xdx, ydy, "foreground");
                    gfx.drawItemNumber(crop.rotten ? "x" : Math.ceil(crop.activeTime), xdx, ydy, "foreground", true);
                } else {
                    gfx.drawTileToGrid((crop.rotten && drawWeed) ? "weed" : (crop.name + newFrame), xdx, ydy, "foreground");
                    gfx.drawItemNumber(crop.rotten ? "x" : Math.ceil(crop.activeTime), xdx, ydy, "foreground", true);
                }
                if(crop.rotResistActive) { gfx.drawTileToGrid("rotSparkle", xdx, ydy, "foreground"); }
            }
        }
    };
    this.DrawCrops = function() {
        gfx.clearLayer("foreground");
        DrawCropGrid(combat.grid, combat.dx, combat.dy, true);
        DrawCropGrid(combat.enemyGrid, combat.enemydx, combat.enemydy);
    };
    this.DrawWrapper = function(x, y, w, h, name) { // TODO: make private if not used elsewhere
        name = name || "edge";
        gfx.drawTileToGrid(name + "WA", x - 1, y - 1, "background");
        gfx.drawTileToGrid(name + "WD", x + w, y - 1, "background");
        gfx.drawTileToGrid(name + "SA", x - 1, y + h, "background");
        gfx.drawTileToGrid(name + "SD", x + w, y + h, "background");
        for(let yy = 0; yy < h; yy++) {
            gfx.drawTileToGrid(name + "A", x - 1, y + yy, "background");
            gfx.drawTileToGrid(name + "D", x + w, y + yy, "background");
        }
        for(let xx = 0; xx < w; xx++) {
            gfx.drawTileToGrid(name + "W", x + xx, y - 1, "background");
            gfx.drawTileToGrid(name + "S", x + xx, y + h, "background");
        }
    };

    this.DrawBackground = function() {
        gfx.clearLayer("background");
        gfx.drawFullImage(mapBattleXref[worldmap.mapName] || "bgs/outside");
        const tileType = mapBattleTileXref[worldmap.mapName] || "grass";
        const top = Math.min(combat.enemydy, combat.dy);
        const bottom = Math.max(combat.enemydy + combat.enemyheight, combat.dy + player.gridHeight);
        for(let x = 0; x < game.tilew; x++) {
            gfx.drawTileToGrid(tileType + "Top", x, top - 1, "background");
            gfx.drawTileToGrid(tileType + "Bottom", x, bottom, "background");
            for(let y = top; y < bottom; y++) {
                gfx.drawTileToGrid(tileType, x, y, "background");
            }
        }
        if(combat.enemyTile === "dirt" || combat.enemyTile === "nathan") { this.DrawWrapper(combat.enemydx, combat.enemydy, combat.enemywidth, combat.enemyheight); }
        else if(combat.enemyTile === "watertile") { this.DrawWrapper(combat.enemydx, combat.enemydy, combat.enemywidth, combat.enemyheight, "wedge"); }
        for(let x = 0; x < combat.enemywidth; x++) { // enemy field
            for(let y = 0; y < combat.enemyheight; y++) {
                if(combat.enemyTile === "nathan") { gfx.drawTileToGrid("dirt", combat.enemydx + x, y + combat.enemydy, "background"); }
                gfx.drawTileToGrid(GetActualTile(combat.enemyTile, x, y), combat.enemydx + x, y + combat.enemydy, "background");
            }
        }
        let toDrawAfterwards = [];
        this.DrawWrapper(combat.dx, combat.dy, player.gridWidth, player.gridHeight);
        for(let x = 0; x < player.gridWidth; x++) { // player field
            for(let y = 0; y < player.gridHeight; y++) {
                gfx.drawTileToGrid("dirt", x + combat.dx, y + combat.dy, "background");
                const item = player.itemGrid[x][y];
                let effect = combat.effectGrid[x][y];
                if(item !== null && !item.coord) { 
                    const iteminfo = GetFarmInfo(item);
                    if(item === "_cow") {
                        if(combat.getCowIndex(x, y) >= 0) {
                            toDrawAfterwards.push({ sprite: "cowready", x: (x + combat.dx), y: (y + combat.dy) });
                        } else {
                            toDrawAfterwards.push({ sprite: "cow", x: (x + combat.dx), y: (y + combat.dy) });
                        }
                    } else if(item === "_charger") {
                        toDrawAfterwards.push({ sprite: "chargerplaced", x: (x + combat.dx), y: (y + combat.dy) });
                    } else if(item === "_modulator") {
                        toDrawAfterwards.push({ sprite: "mod" + combat.season, x: (x + combat.dx), y: (y + combat.dy) });
                    } else if(iteminfo.displaySprite !== undefined) {
                        toDrawAfterwards.push({ sprite: iteminfo.displaySprite, x: (x + combat.dx), y: (y + combat.dy) });
                    } else if(item === "_lake") {
                        gfx.drawTileToGrid(pausemenu.farmmod.getWaterFrame(x, y), x + combat.dx, y + combat.dy, "background");
                    } else if(item === "_shooter") {
                        if(combat.getUsedShooterIndex(x, y) >= 0) {
                            gfx.drawTileToGrid("_shooterClosed", x + combat.dx, y + combat.dy, "background");
                        } else {
                            gfx.drawTileToGrid(item, x + combat.dx, y + combat.dy, "background");
                        }
                    } else {
                        if(["_log", "_coop", "_beehive"].indexOf(item) >= 0 && (effect !== null && effect.type === "burned")) {
                            effect = null;
                            gfx.drawTileToGrid(item + "Burned", x + combat.dx, y + combat.dy, "background");
                        } else {
                            gfx.drawTileToGrid(item, x + combat.dx, y + combat.dy, "background");
                        }
                    }
                }
                if(effect !== null) { toDrawAfterwards.push({ sprite: effect.type, x: (x + combat.dx), y: (y + combat.dy) }); }
            }
        }
        for(let i = 0; i < toDrawAfterwards.length; i++) {
            const item = toDrawAfterwards[i];
            gfx.drawTileToGrid(item.sprite, item.x, item.y, "background");
        }
    };
    const GetActualTile = function(tile, x, y) {
        const rightmost = combat.enemywidth - 1, bottommost = combat.enemyheight - 1;
        switch(tile) {
            case "nathan":
                if(y === 0) {
                    if(x < 3) { return "_coop"; }
                    else { return "_log"; }
                } else if(y === 1) {
                    switch(x) {
                        case 0: return "lakeD";
                        case 1: return "lakeAD";
                        case 2: return "lakeA";
                        default: return "_log";
                    }
                } else if(y >= 2 && y <= 4 && x === 4) {
                    return "_beehive";
                } else if(y === 6) { return "_paddy"; }
                return "dirt";
            case "beckett":
                if(y < 3) {
                    if(x === 0) { return "conveyorL"; }
                    else if(x === rightmost) { return "conveyorR"; }
                    else { return "conveyorM"; }    
                } else {
                    const rightCorner = (x === rightmost), bottomCorner = (y === bottommost);
                    if(rightCorner && bottomCorner) { return "chargingBayLR"; }
                    else if(rightCorner && y === (bottommost - 1)) { return "chargingBayUR"; }
                    else if(bottomCorner && x === (rightmost - 1)) { return "chargingBayLL"; }
                    else if(x === (rightmost - 1) && y === (bottommost - 1)) { return "chargingBayUL"; }
                    else { return "tech"; }
                }
            case "conveyor":
                if(y === 0) { return "tech"; }
                if(x === 0) { return "conveyorL"; }
                else if(x === rightmost) { return "conveyorR"; }
                else { return "conveyorM"; }    
        }
        return tile;
    };
    this.DrawBottom = function() {
        const y = game.tileh - 0.75;
        const texty = y + 0.65;
        for(let x = 0; x < gfx.tileWidth; x++) { gfx.drawSprite("sheet", 15, 11, x * 16, y * 16, "menuA"); }
        gfx.drawText("HP:" + player.health + "/" + player.maxhealth, 4, texty * 16);
        gfx.drawTileToGrid("seasonbar0", 8.5, y, "menuA");
        gfx.drawTileToGrid("seasonbar1", 9.5, y, "menuA");
        gfx.drawTileToGrid("seasonbar2", 10.5, y, "menuA");
        gfx.drawTileToGrid("seasonbar3", 11.5, y, "menuA");
        const diff = Math.round(combat.seasonTime / me.TURNSINSEASON * gfx.tileWidth) / gfx.tileWidth;
        gfx.drawTileToGrid("seasonico", 8.25 + combat.season + diff, y, "menuA");
        const season = GetText("season" + combat.season);
        gfx.drawSprite("sheet", 12 + combat.season, 10, 13 * 16 - 3, (y - 0.25) * 16 + 1, "menuA");
        gfx.drawText(season, 14 * 16 - 1, texty * 16);
    };
}