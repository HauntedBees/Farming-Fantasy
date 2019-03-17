pausemenu.noFun = {
    cursor: { x: 0, y: 0 }, state: 0, maxY: 0,
    backStartX: 0, backButtonW: 0, 
    layersToClear: ["menuA", "menutext", "tutorial", "menuOverBlack", "menutextOverBlack"],
    setup: function() {
        this.cursor = { x: 0, y: 0 };
        this.state = 0; this.maxY = 3;
        this.cursors = new CursorAnimSet([
            { key: "main", x: this.cursor.x, y: this.cursor.y, w: 0, h: 0, type: "cursor", layer: "menucursorA" }
        ]);
        this.backStartX = 0.125;
        this.backButtonW = gfx.drawInfoText(GetText("menu.Back"), this.backStartX, -0.0625, false, "menuA", "menutext");
        gfx.TileBackground("invTile");
        this.DrawAll();
        this.cursors.Start();
    },
    DrawAll: function() {
        gfx.clearSome(this.layersToClear);
        pausemenu.DrawInnerHeading("noFun.Heading");
        gfx.drawInfoText(GetText("menu.Back"), this.backStartX, -0.0625, this.cursor.y === -1 && this.cursor.x === 0, "menuA", "menutext");
        if(this.cursor.y === -1) {
            this.cursors.RedimCursor("main", this.backStartX, 0, this.backButtonW, -0.25);
            gfx.drawWrappedText(GetText("inv.BackInfo"), 4, this.textStartY, 235);
        } else {
            this.cursors.RedimCursor("main", this.achStartX + this.cursor.x * this.achDX, this.achStartY + this.cursor.y * this.achDX, 0, 0);
        }
        gfx.DrawMapCharacter(3, 10, { x: 7.75, y: 3 }, { x: 0, y: 0 }, "mapChar", false, "menuA");
        this.DrawTextAndOptions(this.state);
    },
    DrawTextAndOptions: function(state) {
        switch(state) {
            case 0: // Main
                gfx.drawMinibox(0.5, 4.5, 14, 5, "menuA");
                gfx.drawWrappedText(GetText("noFunStart"), 20, 85, 220);
                gfx.drawInfoText(GetText("noFunBattle"), 4.5, 6.25, this.cursor.y === 0, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunPuzzle"), 4.5, 7.25, this.cursor.y === 1, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunSomething"), 4, 8.25, this.cursor.y === 2, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunNevermind"), 6, 9.25, this.cursor.y === 3, "menuA", "menutext");
                break;
            case 1: // No Battles!
                gfx.drawMinibox(0.5, 4.5, 14, 6, "menuA");
                gfx.drawWrappedText(GetText("noFunBattleSel"), 20, 85, 220);
                gfx.drawInfoText(GetText("noFunBattle0"), 4.5, 5.5, this.cursor.y === 0, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunBattle1"), 4.5, 6.5, this.cursor.y === 1, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunBattle2"), 4.75, 7.5, this.cursor.y === 2, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunBattle3"), 4, 8.5, this.cursor.y === 3, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunBattle4"), 3, 9.5, this.cursor.y === 4, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunNevermind"), 6, 10.5, this.cursor.y === 5, "menuA", "menutext");
                break;
            case 11: // Weaken Foes!
                gfx.drawMinibox(0.5, 4.5, 14, 3, "menuA");
                gfx.drawWrappedText(GetText("noFunHardBattle"), 20, 85, 220);
                gfx.drawInfoText(GetText("sYes"), 7, 6.25, this.cursor.y === 0, "menuA", "menutext");
                gfx.drawInfoText(GetText("sNo"), 7, 7.25, this.cursor.y === 1, "menuA", "menutext");
                break;
            case 12: // Strengthen Foes!
                gfx.drawMinibox(0.5, 4.5, 14, 3, "menuA");
                gfx.drawWrappedText(GetText("noFunEasyBattle"), 20, 85, 220);
                gfx.drawInfoText(GetText("sYes"), 7, 6.25, this.cursor.y === 0, "menuA", "menutext");
                gfx.drawInfoText(GetText("sNo"), 7, 7.25, this.cursor.y === 1, "menuA", "menutext");
                break;
            case 13: // Item Me Up!
                gfx.drawMinibox(0.5, 4.5, 14, 3, "menuA");
                gfx.drawWrappedText(GetText("noFunItemsSuck"), 20, 85, 220);
                gfx.drawInfoText(GetText("sYes"), 7, 6.25, this.cursor.y === 0, "menuA", "menutext");
                gfx.drawInfoText(GetText("sNo"), 7, 7.25, this.cursor.y === 1, "menuA", "menutext");
                break;
            case 14: // Stat Me Up!
                gfx.drawMinibox(0.5, 4.5, 14, 3, "menuA");
                gfx.drawWrappedText(GetText("noFunStatsSuck"), 20, 85, 220);
                gfx.drawInfoText(GetText("sYes"), 7, 6.25, this.cursor.y === 0, "menuA", "menutext");
                gfx.drawInfoText(GetText("sNo"), 7, 7.25, this.cursor.y === 1, "menuA", "menutext");
                break;
            case 15: // Tutorial Me Up!
                gfx.drawMinibox(0.5, 4.5, 14, 3, "menuA");
                gfx.drawWrappedText(GetText("noFunDontGetBattles"), 20, 85, 220);
                gfx.drawInfoText(GetText("sYes"), 7, 6.25, this.cursor.y === 0, "menuA", "menutext");
                gfx.drawInfoText(GetText("sNo"), 7, 7.25, this.cursor.y === 1, "menuA", "menutext");
                break;
            case 2: // No Puzzles!
                // TODO: puzzle check
                break;
            case 3: // Something Else!
                gfx.drawMinibox(0.5, 4.5, 14, 5, "menuA");
                gfx.drawWrappedText(GetText("noFunSomethingSel"), 20, 85, 220);
                gfx.drawInfoText(GetText("noFunSomething0"), 3.75, 5.5, this.cursor.y === 0, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunSomething1"), 4.5, 6.5, this.cursor.y === 1, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunSomething2"), 4.5, 7.5, this.cursor.y === 2, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunSomething3"), 4, 8.5, this.cursor.y === 3, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunNevermind"), 6, 9.5, this.cursor.y === 4, "menuA", "menutext");
                break;
            case 31: // I Don't Get It!
                gfx.drawMinibox(0.5, 4.5, 14, 3, "menuA");
                gfx.drawWrappedText(GetText("noFunDontGetIt"), 20, 85, 220);
                gfx.drawInfoText(GetText("noFunTut0"), 5, 5.5, this.cursor.y === 0, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunTut1"), 4.5, 6.5, this.cursor.y === 1, "menuA", "menutext");
                gfx.drawInfoText(GetText("noFunNevermind"), 6, 7.5, this.cursor.y === 2, "menuA", "menutext");
                break;
            case 32: // I Want Some Le Fucking Bees!
                gfx.drawMinibox(0.5, 4.5, 14, 3, "menuA");
                gfx.drawWrappedText(GetText("noFunBees"), 20, 85, 220);
                gfx.drawInfoText(GetText("sYes"), 7, 6.25, this.cursor.y === 0, "menuA", "menutext");
                gfx.drawInfoText(GetText("sNo"), 7, 7.25, this.cursor.y === 1, "menuA", "menutext");
                break;
            case 33: // It's No Fun!
                gfx.drawMinibox(0.5, 4.5, 14, 3, "menuA");
                gfx.drawWrappedText(GetText("noFunNoFun"), 20, 85, 220);
                gfx.drawInfoText(GetText("sYes"), 7, 6.5, true, "menuA", "menutext");
                break;
            case 34: // The Story Thus Far
                if(!player.completedQuest("openingCutscene")) {
                    gfx.drawMinibox(0.5, 4.5, 14, 3, "menuA");
                    gfx.drawWrappedText(GetText("plotSummary0"), 20, 85, 220);
                    gfx.drawInfoText(GetText("noFunDone"), 6.5, 7.25, true, "menuA", "menutext");
                } else if(!player.completedQuest("bigBot")) {
                    gfx.drawMinibox(0.5, 4.5, 14, 3, "menuA");
                    gfx.drawWrappedText(GetText("plotSummary1"), 20, 85, 220);
                    gfx.drawInfoText(GetText("noFunDone"), 6.5, 7.25, true, "menuA", "menutext");
                } else if(!player.completedQuest("nathanned")) {
                    gfx.drawMinibox(0.5, 4.5, 14, 3, "menuA");
                    gfx.drawWrappedText(GetText("plotSummary2"), 20, 85, 220);
                    gfx.drawInfoText(GetText("noFunDone"), 6.5, 7.25, true, "menuA", "menutext");
                } else if(!player.completedQuest("researchLab")) {
                    gfx.drawMinibox(0.5, 4.5, 14, 4, "menuA");
                    gfx.drawWrappedText(GetText("plotSummary3"), 20, 85, 220);
                    gfx.drawInfoText(GetText("noFunDone"), 6.5, 8.25, true, "menuA", "menutext");
                } else if(!player.completedQuest("findFakeFarm")) {
                    gfx.drawMinibox(0.5, 4.5, 14, 5, "menuA");
                    gfx.drawWrappedText(GetText("plotSummary4"), 20, 85, 220);
                    gfx.drawInfoText(GetText("noFunDone"), 6.5, 9.5, true, "menuA", "menutext");
                } else if(!player.completedQuest("truckRepair")) {
                    gfx.drawMinibox(0.5, 4.5, 14, 4, "menuA");
                    gfx.drawWrappedText(GetText("plotSummary5"), 20, 85, 220);
                    gfx.drawInfoText(GetText("noFunDone"), 6.5, 8.5, true, "menuA", "menutext");
                } else if(player.clearedEntities.indexOf("IntroSkumpyCutscene") < 0) {
                    gfx.drawMinibox(0.5, 4.5, 14, 5, "menuA");
                    gfx.drawWrappedText(GetText("plotSummary6"), 20, 85, 220);
                    gfx.drawInfoText(GetText("noFunDone"), 6.5, 9.5, true, "menuA", "menutext");
                } else if(!player.completedQuest("gotPhone")) {
                    gfx.drawMinibox(0.5, 4.5, 14, 5, "menuA");
                    gfx.drawWrappedText(GetText("plotSummary7"), 20, 85, 220);
                    gfx.drawInfoText(GetText("noFunDone"), 6.5, 9.5, true, "menuA", "menutext");
                } else if(!player.completedQuest("keycard")) {
                    gfx.drawMinibox(0.5, 4.5, 14, 5, "menuA");
                    gfx.drawWrappedText(GetText("plotSummary8"), 20, 85, 220);
                    gfx.drawInfoText(GetText("noFunDone"), 6.5, 9.5, true, "menuA", "menutext");
                } else if(player.clearedEntities.indexOf("BeckettsReturn") < 0) {
                    gfx.drawMinibox(0.5, 4.5, 14, 5, "menuA");
                    gfx.drawWrappedText(GetText("plotSummary9"), 20, 85, 220);
                    gfx.drawInfoText(GetText("noFunDone"), 6.5, 9.5, true, "menuA", "menutext");
                } else if(!player.completedQuest("theGame")) {
                    gfx.drawMinibox(0.5, 4.5, 14, 5, "menuA");
                    gfx.drawWrappedText(GetText("plotSummary10"), 20, 85, 220);
                    gfx.drawInfoText(GetText("noFunDone"), 6.5, 9.5, true, "menuA", "menutext");
                } else {
                    if(player.completedQuest("NG")) {
                        gfx.drawMinibox(0.5, 4.5, 14, 5, "menuA");
                        gfx.drawWrappedText(GetText("plotSummaryNG"), 20, 85, 220);
                        gfx.drawInfoText(GetText("noFunDone"), 6.5, 9.5, true, "menuA", "menutext");
                    } else if(player.completedQuest("NV")) {
                        gfx.drawMinibox(0.5, 4.5, 14, 5, "menuA");
                        gfx.drawWrappedText(GetText("plotSummaryNV"), 20, 85, 220);
                        gfx.drawInfoText(GetText("noFunDone"), 6.5, 9.5, true, "menuA", "menutext");
                    } else if(player.completedQuest("IG")) {
                        gfx.drawMinibox(0.5, 4.5, 14, 5, "menuA");
                        gfx.drawWrappedText(GetText("plotSummaryIG"), 20, 85, 220);
                        gfx.drawInfoText(GetText("noFunDone"), 6.5, 9.5, true, "menuA", "menutext");
                    } else if(player.completedQuest("IV")) {
                        gfx.drawMinibox(0.5, 4.5, 14, 5, "menuA");
                        gfx.drawWrappedText(GetText("plotSummaryIV"), 20, 85, 220);
                        gfx.drawInfoText(GetText("noFunDone"), 6.5, 9.5, true, "menuA", "menutext");
                    } else {
                        gfx.drawMinibox(0.5, 4.5, 14, 4, "menuA");
                        gfx.drawWrappedText(GetText("plotSummaryUhh"), 20, 85, 220);
                        gfx.drawInfoText(GetText("noFunDone"), 6.5, 8.25, true, "menuA", "menutext");
                    }
                }
                break;
            case 50: // It has been done!
                gfx.drawMinibox(0.5, 4.5, 14, 3, "menuA");
                gfx.drawWrappedText(GetText("noFunComplete"), 20, 85, 220);
                gfx.drawInfoText(GetText("noFunDone"), 7, 6.5, true, "menuA", "menutext");
                break;
        }
    },
    clean: function() {
        this.cursors.Perish();
        gfx.clearAll(true);
    },
    cancel: function(force) { 
        if(force || this.state === 0) {
            this.clean();
            game.innerTransition(this, pausemenu, 0);
        } else {
            this.cursor.y = this.maxY;
            this.click();
        }
    },
    keyPress: function(key) {
        const pos = { x: this.cursor.x, y: this.cursor.y };
        let isEnter = false;
        switch(key) {
            case player.controls.up: pos.y--; break;
            case player.controls.down: pos.y++; break;
            case player.controls.confirm:
            case player.controls.pause: isEnter = true; break;
            case player.controls.cancel: return this.cancel();
        }
        if(isEnter) { return this.click(); }
        else if(this.state !== 33) { return this.CursorMove(pos); }
    },
    mouseMove: function(pos) {
        const dpos = { x: pos.x - this.cropDX, y: pos.y - this.cropDY };
        //
        this.CursorMove(dpos);
    },
    CursorMove: function(pos) {
        if(this.state === 33) { return false; } 
        if(pos.y > this.maxY || pos.y < -1) { return false; }
        this.cursor = { x: 0, y: pos.y };
        this.DrawAll();
        return true;
    },
    click: function() {
        if(this.cursor.y === -1) { return this.cancel(); }
        switch(this.state) {
            case 0:
                if(this.cursor.y === 0) { this.state = 1; this.maxY = 5; } // Battles
                else if(this.cursor.y === 1) { this.state = 2; } // Puzzles
                else if(this.cursor.y === 2) { this.state = 3; this.maxY = 4; } // Other
                else if(this.cursor.y === 3) { return this.cancel(); } // Nevermind
                break;
            case 1:
                if(this.cursor.y === 0) { this.state = 11; this.maxY = 2; } // Too Hard
                else if(this.cursor.y === 1) { this.state = 12; this.maxY = 2; } // Too Easy
                else if(this.cursor.y === 2) { this.state = 13; this.maxY = 2; } // Items Suck
                else if(this.cursor.y === 3) { this.state = 14; this.maxY = 2; } // Low Stats
                else if(this.cursor.y === 4) { this.state = 15; this.maxY = 2; } // I Don't Get It
                else if(this.cursor.y === 5) { this.state = 0; this.maxY = 3; } // Nevermind
                break;
            case 11: 
                if(this.cursor.y === 0) { player.noFunDiffMod--; this.state = 50; this.maxY = 0; } // Go Easy On Me!
                else if(this.cursor.y === 1) { this.state = 1; this.maxY = 5; } // No Thanks
                break;
            case 12: 
                if(this.cursor.y === 0) { player.noFunDiffMod++; this.state = 50; this.maxY = 0; } // Give Me A Hard-On!
                else if(this.cursor.y === 1) { this.state = 1; this.maxY = 5; } // No Thanks
                break;
            case 13: 
                if(this.cursor.y === 0) { // Give Me Good Shit!
                    debug.ThrustSomeCropsUntoMineLoins();
                    debug.AllWeapons();
                    debug.AllFixtures();
                    this.state = 50;
                    this.maxY = 0;
                } else if(this.cursor.y === 1) { this.state = 1; this.maxY = 5; } // No Thanks
                break;
            case 14: 
                if(this.cursor.y === 0) { // Flavor-Boost Me!
                    player.levelUp();
                    player.levelUp();
                    player.levelUp();
                    this.state = 50;
                    this.maxY = 0;
                } else if(this.cursor.y === 1) { this.state = 1; this.maxY = 5; } // No Thanks
                break;
            case 15: 
                if(this.cursor.y === 0) { // Toot-oriole Me!
                    this.clean();
                    game.target = { name: "Bort" };
                    tutorial.startBattle();
                    return;
                } else if(this.cursor.y === 1) { this.state = 1; this.maxY = 5; } // No Thanks
                break;
            case 2:
                // TODO puzzles
                break;
            case 3:
                if(this.cursor.y === 0) { this.state = 31; this.maxY = 2; } // How Play?
                else if(this.cursor.y === 1) { this.state = 32; this.maxY = 1; } // Bees!
                else if(this.cursor.y === 2) { this.state = 33; this.maxY = 0; } // No Fun
                else if(this.cursor.y === 3) { this.state = 34; this.maxY = 0; } // Story
                else if(this.cursor.y === 4) { this.state = 0; this.maxY = 3; } // Nevermind
                break;
            case 31: 
                if(this.cursor.y === 0) {  // Battle Tutorial!
                    this.clean();
                    game.target = { name: "Bort" };
                    tutorial.startBattle();
                    return;
                } else if(this.cursor.y === 1) { // Fixture Tutorial!
                    player.increaseItem("_coop", 1);
                    this.clean();
                    game.innerTransition(this, pausemenu, 0);
                    fixTut.start(true);
                    return;
                } else if(this.cursor.y === 2) { this.state = 3; this.maxY = 4; } // No Thanks
                break;
            case 32: 
                if(this.cursor.y === 0) { // Bee Me Up, Scotty!
                    player.increaseItem("beeR", 5);
                    player.increaseItem("beeG", 5);
                    player.increaseItem("beeB", 5);
                    if(Math.random() < 0.1) { player.increaseItem("hbee"); }
                    player.increaseItem("_beehive");
                    this.state = 50;
                    this.maxY = 0;
                } else if(this.cursor.y === 1) { this.state = 3; this.maxY = 4; } // No Thanks
                break;
            case 33: 
                // TODO: Slappy Farts
                break;
            case 34:
                this.state = 0; this.maxY = 3;
                break;
            case 50:
                this.state = 0; this.maxY = 3;
                break;
        }
        this.cursor.y = 0;
        this.DrawAll();
        return true;
    }
};