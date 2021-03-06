const combat = {
    enemies: [], state: 0, season: 0, numPlantTurns: 0, isFalcon: false,
    doingFinalKill: false, playerInDanger: false, saveChance: 1, seasonTime: 0,
    lastTarget: 0, lastSelectedSeed: { x: 0, y: 0 }, lastPlantedPos: { x: 0, y: 0 },
    expEarned: 0, moniesEarned: 0, itemsEarned: [], happyCows: [], usedShooters: [],
    grid: [], effectGrid: [], enemyGrid: [], enemywidth: 0, enemyheight: 0, enemyTile: "tech", 
    isBossBattle: false, dx: 0, dy: 0, enemydx: 0, enemydy: 0,
    didHarvest: false, harvestChain: 0, 
    animHelper: null, isChallenge: false, challenger: "", isSkunk: false,
    startBattle: function(enemies, skipTransition, isChallenge) {
        player.initGridDimensions();
        this.didHarvest = false;
        this.isChallenge = isChallenge || false;
        this.isSkunk = ["kida", "kidb", "kidc", "kidd"].indexOf(enemies[0]) >= 0;
        if(this.isChallenge) {
            Sounds.PlaySound("naptime");
        } else {
            Sounds.PlaySound("enterbattle");
        }
        if(player.onion) {
            const perks = player.onion.perks;
            if(perks.indexOf("stinky") >= 0) { player.health *= 0.95; }
            if(perks.indexOf("loved") >= 0) { player.health *= 1.1; }
            if(perks.indexOf("toxic") >= 0) { player.health *= 0.5; }
            player.health = Math.round(player.health);
        }
        this.challenger = enemies[0];
        this.harvestChain = 0;
        this.grid = this.getGrid(player.gridWidth, player.gridHeight);
        this.effectGrid = this.getGrid(player.gridWidth, player.gridHeight);
        game.currentInputHandler = this.menu;
        this.cursors = new CursorAnimSet([
            { key: "main", x: this.cursorX, y: this.cursorY, w: 0, h: 0, type: "cursor", layer: "menucursorA" }
        ], true);
        this.lastTarget = 0;
        this.lastSelectedSeed = { x: 0, y: 0 };
        this.lastPlantedPos = { x: 0, y: 0 };
        this.playerInDanger = false;
        this.saveChance = 1;
        this.seasonTime = 0;
        this.setSeason(enemies);
        this.expEarned = 0;
        this.moniesEarned = 0;
        this.itemsEarned = [];
        this.happyCows = [];
        this.usedShooters = [];
        this.doingFinalKill = false;
        combat.enemyTurn.lastIdx = -1;
        if(player.equipment.weapon !== null && GetEquipment(player.equipment.weapon).tech) {
            const hasCharger = GetFirstWithMatch(0, player.gridWidth, 0, player.gridHeight, (x, y) => combat.grid[x][y] !== null && combat.grid[x][y].type === "sickle2");
            if(!hasCharger) { player.equipment.weapon = "!sickle2_weak"; }
        }
        let startX = 5;
        if(isChallenge) {
            startX = 6;
            this.dx = 6.5;
            this.dy = 6;
            this.enemydx = 6.5;
            this.enemydy = 5;
        } else {
            switch(player.gridWidth) {  // 3, 4, 6, 8, 10
                case 4: this.dx = 2; startX = 6; break;
                case 6: this.dx = 1; startX = 7; break;
                case 7: this.dx = 0.5; startX = 8.5; break;
                case 8: this.dx = 0.5; startX = 8.5; break;
                case 10: this.dx = 0.25; startX = 10.25; break;
                default: this.dx = 2; break;
            }
            switch(player.gridHeight) {  // 3, 4, 5, 6
                case 4: this.dy = 0.5; break;
                case 5: this.dy = 0.5; break;
                default: this.dy = 1.5; break;
            }
            this.dy += 4.5;
        }
        this.enemywidth = 0;
        this.enemyheight = 0;
        this.isBossBattle = worldmap.mapName === "cave";
        this.enemies = [];
        if(!isChallenge) {
            for(let i = 0; i < Math.min(4, enemies.length); i++) {
                const enemy = GetEnemy(enemies[i]);
                if(worldmap.customMap !== null) {
                    const tier = 1 + 0.15 * Math.floor(worldmap.customMap.floor / 5);
                    enemy.maxhealth = Math.ceil(enemy.maxhealth * tier);
                    enemy.health = enemy.maxhealth;
                    enemy.atk = Math.ceil(enemy.atk * tier);
                    enemy.baseatk = enemy.atk;
                    enemy.def = Math.ceil(enemy.def * tier);
                    enemy.basedef = enemy.def;
                    enemy.exp = Math.ceil(enemy.exp * tier);
                }
                console.log(enemy);
                this.isBossBattle = this.isBossBattle || enemy.boss;
                this.enemywidth += enemy.fieldwidth;
                this.enemyheight = Math.max(this.enemyheight, enemy.fieldheight);
                if(enemy.tile) { this.enemyTile = enemy.tile; } else { this.enemyTile = "tech"; }
                this.enemies.push(enemy);
            }
            this.enemywidth = Math.min(this.enemywidth, 5);
            this.enemydx = startX + 1 + (gfx.tileWidth - startX - this.enemywidth) / 2;
            if((this.enemydx + this.enemywidth) >= gfx.tileWidth) { this.enemydx = gfx.tileWidth - this.enemywidth - 0.25; }
            this.enemydy = this.dy + (player.gridHeight - this.enemyheight) / 2;
            while(this.enemydy <= 0) {
                this.enemydy += 0.25;
                this.dy += 0.25;
            }
        }

        this.adjustEnemyStatsWeather();
        this.animHelper = new CombatAnimHelper(this.enemies, this.isSkunk);
        this.enemyGrid = this.getGrid(this.enemywidth, this.enemyheight);
        for(let i = 0; i < this.enemies.length; i++) {
            if(this.enemies[i].initFunc === undefined) { continue; }
            combatInitFuncs[this.enemies[i].initFunc]();
        }

        if(skipTransition) {
            this.innerStartBattle();
        } else {
           this.transition.Start();
        }
    }, 
    innerStartBattle: function() {
        worldmap.clean();
        gfx.clearAll();
        combat.animHelper.DrawBackground();
        combat.animHelper.DrawCrops();
        combat.charAnimIdx = setInterval(function() { combat.animHelper.Animate() }, timers.CHARANIM);
        this.startRound();
        this.menu.setup();
    },
    getGrid: function(w, h) {
        const g = [];
        for(let x = 0; x < w; x++) {
            const row = [];
            for(let y = 0; y < h; y++) { row.push(null); }
            g.push(row);
        }
        return g;
    },
    setSeason: function(enemies) {
        const dist = [0, 0, 0, 0];
        for(let i = 0; i < enemies.length; i++) {
            const sd = GetEnemy(enemies[i]).seasonDistribution;
            for(let j = 0; j < 4; j++) { dist[j] += sd[j]; }
        }
        let season = Math.random();
        for(let j = 0; j < 4; j++) {
            dist[j] /= enemies.length;
            if(season <= dist[j]) {
                this.season = j;
                break;
            }
            season -= dist[j];
        }
    },
    startRound: function() {
        this.cleanUpEffects();
        this.isFalcon = false;
        combat.enemyTurn.lastIdx = -1;
        this.numPlantTurns = player.getPlantingTurns();
        combat.playerInDanger = false;
        for(let i = 0; i < combat.enemies.length; i++) {
            combat.enemies[i].stickTurns = Math.max(0, combat.enemies[i].stickTurns - 1);
        }
        if(this.usedShooters.length > 0) {
            this.usedShooters = [];
            combat.animHelper.DrawBackground();
        }
        this.ageCrops();
        this.state = 0;
        this.seasonTime += 1;
        if(this.seasonTime >= me.TURNSINSEASON) {
            this.season = (this.season + 1) % 4;
            this.seasonTime = 0;
        }
    },
    damagePlayer: function(damage) {
        if(player.equipment.gloves !== null) {
            const g = GetEquipment(player.equipment.gloves);
            const mult = (g.def === undefined) ? 1 : (1 - g.def);
            damage = Math.max(1, Math.floor(damage * mult));
        }
        if(combat.playerInDanger) {
            damage = 0;
        } else if(damage >= (player.maxhealth / 1.5) && damage >= player.health && Math.random() < combat.saveChance && player.options.difficulty < 2) {
            combat.playerInDanger = true;
            combat.saveChance -= 0.33;
            damage = player.health - 1;
            player.health = 1;
        } else {
            const prevHealth = player.health;
            player.health = player.health - damage;
            if(player.health < 0) { player.health = 0; damage = prevHealth; }
        }
        if(player.health === 0 && player.options.difficulty === 0) {
            player.health = 1;
            damage -= 1;
        }
        return damage;
    },
    damageEnemy: function(enemyidx, damage) {
        this.enemies[enemyidx].health -= damage;
        let isFinalKill = false;
        if(this.enemies[enemyidx].health <= 0 && !this.enemies[enemyidx].alreadyDead) {
            this.enemies[enemyidx].alreadyDead = true;
            const e = this.enemies[enemyidx];
            this.expEarned += e.exp;
            if(e.soleKill && !this.doingFinalKill) { isFinalKill = true; this.doingFinalKill = true; }
            for(let i = 0; i < e.drops.length; i++) {
                const dropInfo = e.drops[i];
                if(dropInfo.money) {
                    this.moniesEarned += InclusiveRange(dropInfo.min, dropInfo.max);
                } else {
                    this.addDroppedSeedToItemsEarned(dropInfo.seed, Math.max(0, InclusiveRange(dropInfo.min, dropInfo.max)));
                }
            }
        }
        if(isFinalKill) {
            switch(this.enemies[enemyidx].id) {
                case "outlet": AddAchievementIfMissing("unplugged"); break;
                case "theMonster": AddAchievementIfMissing("soybeat"); break;
            }
            for(let i = 0; i < this.enemies.length; i++) {
                if(i === enemyidx) { continue; }
                this.damageEnemy(i, this.enemies[i].health + 1);
            }
        }
    },
    adjustEnemyStatsWeather: function() {
        this.seasonTime = 0;
        for(let i = 0; i < this.enemies.length; i++) {
            if(this.enemies[i].weakSeason !== undefined && this.season === this.enemies[i].weakSeason) {
                this.enemies[i].atk = 0.5;
                this.enemies[i].def = 0.1;
            } else {
                this.enemies[i].atk = this.enemies[i].baseatk;
                this.enemies[i].def = this.enemies[i].basedef;
            }
        }
    },
    stickEnemy: function(enemyidx, turns) {
        if(this.enemies[enemyidx].stickTurns === 0) { this.enemies[enemyidx].justStuck = true; }
        this.enemies[enemyidx].stickTurns = Math.min(this.enemies[enemyidx].stickTurns + turns, 8);
    },
    addDroppedSeedToItemsEarned: function(seed, amount) {
        if(amount === 0) { return; }
        for(let i = 0; i < this.itemsEarned; i++) {
            if(this.itemsEarned[i][0] == seed) {
                this.itemsEarned[i][1] += amount;
                return;
            }
        }
        this.itemsEarned.push([seed, amount]);
    },
    endTurn: function(caller) {
        this.clearAnimsAndRemoveCorpses();
        combat.animHelper.DrawBackground();
        combat.animHelper.DrawCrops();
        if(player.health <= 0 && !game.currentInputHandler.isTutorial) {
            combat.animHelper.SetBirdAnimState("MOURN", true);
            combat.animHelper.SetPlayerAnimState("CORPSE", true);
            combat.animHelper.SetOnionAnimState("MOURN");
            game.innerTransition(game.currentInputHandler, combat.inbetween, { next: combat.fuckingDead, text: GetText("diedInCombat") });
            return;
        } else if(this.enemies.length == 0) {
            player.addExp(this.expEarned);
            combat.animHelper.SetBirdAnimState("WON", true);
            combat.animHelper.SetPlayerAnimState("WON", true);
            combat.animHelper.SetOnionAnimState("WON");
            let text = GetText("youDidATheWin");
            let resulties = [this.expEarned + "EXP"];

            player.AddMonies(this.moniesEarned);
            for(let i = 0; i < this.itemsEarned.length; i++) {
                player.increaseItem(this.itemsEarned[i][0], this.itemsEarned[i][1]);
            }
            if(this.moniesEarned > 0) { resulties.push(this.moniesEarned + "G"); }
            if(this.itemsEarned.length > 2) {
                let count = 0;
                for(let i = 0; i < this.itemsEarned.length; i++) { count += this.itemsEarned[i][1]; }
                resulties.push(count + HandlePlurals(GetText("gift.itemseed") + "{s}", count));
            } else {
                for(let i = 0; i < this.itemsEarned.length; i++) {
                    resulties.push(HandleGifts(this.itemsEarned[i][0], this.itemsEarned[i][1]));
                }
            }
            text = HandleLists(text, "{res}", resulties, "", true, false);
            game.innerTransition(game.currentInputHandler, combat.inbetween, { next: combat.checkForLevelUp, text: text });
            return;
        }
        if(this.state === 0 && !this.isFalcon) {
            if(combat.didHarvest) {
                combat.harvestChain++;
            } else {
                combat.harvestChain = 0;
            }
        }
        combat.didHarvest = false;
        this.state++;
        if(this.state === 1 && player.hasFalcon && !this.isFalcon) {
            this.state = 0;
            this.isFalcon = true;
            this.numPlantTurns = 1;
            game.innerTransition(caller, combat.menu);
        } else if(this.state > combat.enemies.length) {
            let anotherTurn = false;
            for(let i = 0; i < this.enemies.length; i++) {
                if(this.enemies[i].turnFunc === undefined) { continue; }
                anotherTurn |= this.enemies[i].stickTurns === 0 && combatEndTurnFuncs[this.enemies[i].turnFunc](this.enemies[i]);
            }
            if(anotherTurn) {
                this.state--;
                const idx = this.state - 1;
                game.innerTransition(caller, combat.enemyTurn, { enemy: this.enemies[idx], idx: idx });
            } else {
                this.startRound();
                game.innerTransition(caller, combat.menu);
            }
        } else {
            const idx = this.state - 1;
            game.innerTransition(caller, combat.enemyTurn, { enemy: this.enemies[idx], idx: idx });
        }
    },
    cleanUpEffects: function() {
        let redraw = false;
        for(let x = 0; x < player.gridWidth; x++) {
            for(let y = 0; y < player.gridHeight; y++) {
                const obj = combat.effectGrid[x][y];
                if(obj === null) { continue; }
                if(--obj.duration <= 0) { redraw = true; combat.effectGrid[x][y] = null; }
            }
        }
        if(redraw) { combat.animHelper.DrawBackground(); }
    },
    clearAnimsAndRemoveCorpses: function() {
        combat.animHelper.CleanAnims();
        combat.animHelper.CleanEntities();
        combat.RemoveFlaggedCrops();
        for(let i = combat.enemies.length - 1; i >= 0; i--) {
            combat.enemies[i].justStuck = false;
            if(combat.enemies[i].health <= 0) {
                combat.animHelper.RemoveEnemy(i);
                combat.enemies.splice(i, 1);
            }
        }
        combat.animHelper.ResetEnemyAnimHelper(combat.enemies);
        for(let i = 0; i < combat.enemies.length; i++) {
            combat.animHelper.SetEnemyAnimState(i, "STAND");
        }
    },
    wrapUpCombat: function() {
        if(player.equipment.weapon === "!sickle2_weak") { player.equipment.weapon = "!sickle2"; }
        if(worldmap.mapName !== "cave") {
            player.health = player.maxhealth;
        }
        this.cursors.Perish();
        gfx.clearSome(["menucursorC", "crops"]);
        CombatChievoCheck();
        OnionFuncs.Digest();
    },
    fuckingDead: function() {
        const inn = inns[player.lastInn];
        let loss;
        if(game.target !== null) {
            loss = game.target.postBattleLoss;
            if(game.target.nonStandardGameOver !== undefined) {
                combat.wrapUpCombat();
                const postCombat = game.target.nonStandardGameOver;
                worldmap.clearTarget();
                clearInterval(combat.charAnimIdx);
                game.SetNonstandardGameOverFlag();
                game.transition(combat.inbetween, worldmap, {
                    init: { x: 8.5, y: 9 },
                    map: "gameover",
                    noEntityUpdate: false,
                    postCombat: postCombat
                });
                return;
            }
            if(!loss) {
                player.failedEntities.push(game.target.name);
                game.target = null;
            }
        }
        player.health = player.maxhealth;
        clearInterval(combat.charAnimIdx);
        combat.wrapUpCombat();
        if(loss) {
            worldmap.clearTarget();
            game.target = null;
            game.transition(game.currentInputHandler, worldmap, {
                init: worldmap.pos,
                map: worldmap.mapName,
                noEntityUpdate: true,
                postCombat: loss
            });
        } else {
            game.transition(game.currentInputHandler, worldmap, { init: { x: inn.x,  y: inn.y }, map: GetPostGameMapName(inn.map), isInn: true, playerDir: 2 });
        }
    },
    checkForLevelUp: function() {
        if(player.exp >= player.nextExp && player.level < 20) {
            Sounds.PlaySound("levelup", true);
            player.levelUp();
            combat.animHelper.SetPlayerAnimState("LEVELUP", true);
            game.innerTransition(game.currentInputHandler, combat.inbetween, {
                next: combat.checkForLevelUp,
                text: GetText("levelUp").replace(/\{0\}/g, player.level)
            });
        } else {
            combat.wrapUpCombat();
            const postCombat = (game.target !== null ? game.target.postBattle : undefined);
            if(game.target !== null && !game.target.dontClearTarget) { worldmap.clearTarget(); }
            clearInterval(combat.charAnimIdx);
            game.transition(combat.inbetween, worldmap, {
                init: worldmap.pos,
                map: worldmap.mapName,
                noEntityUpdate: true,
                postCombat: postCombat
            });
        }
    }
};