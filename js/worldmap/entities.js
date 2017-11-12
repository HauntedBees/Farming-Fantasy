var beeQueen = { interact: [
    function() {
        worldmap.writeText("BeeGuard0");
        worldmap.playerDir = 2;
        worldmap.refreshMap();
    },
    function() {
        worldmap.writeText("BeeGuard1");
        worldmap.playerDir = 1;
        worldmap.refreshMap();
    },
    function() {
        worldmap.writeText("BeeGuard2");
        worldmap.playerDir = 0;
        worldmap.refreshMap();
    },
    function() {
        worldmap.writeText("BeeGuard3");
        worldmap.playerDir = 3;
        worldmap.refreshMap();
    },
    function() {
        worldmap.writeText("BeeGuard4");
        worldmap.playerDir = 2;
        worldmap.refreshMap();
    },
    function() {
        game.target = null;
        player.beeQueensFaced++;
        worldmap.angryBees = false;
        var enemy = player.beeQueensFaced < 2 ? "beeQueenA" : (player.beeQueensFaced < 5 ? "beeQueenB" : "beeQueenC");
        combat.startBattle([enemy]);
    }
]};
var mapentities = {
    "farm_init": [
        GetCommonEntity("Eagle", 16, 9, 4, 0, undefined, undefined, { sheet: "assistant", sheetlen: 2, storageKey: "eagle" }),
        GetCommonEntity("Nathan", 24, 11, 0, 1, undefined, undefined, { sheet: "assistant", sheetlen: 2, storageKey: "nathanIntro" }),
        {
            name: "CutscenePrompt", pos: { x: 0, y: 0 }, solid: false, autoplay: true,
            interact: [
                function() {
                    worldmap.waitForAnimation = true;
                    worldmap.forceMove = true;
                    worldmap.animIdx = setInterval(function() {
                        worldmap.pos.y += 0.025;
                        worldmap.refreshMap();
                        if(worldmap.pos.y >= 10) { 
                            worldmap.animData.width = 32;
                            worldmap.animData.other.forceWide = true;
                            FinishAnim();
                        }
                    }, 10);
                },
                GetSleep(500),
                GetBasicPlayerFrame(2, 0, 1000),
                GetBasicPlayerFrame(2, 1, 500),
                GetBasicPlayerFrame(2, 2, 1500),
                GetBasicPlayerFrame(2, 1, 250),
                function() {
                    worldmap.animData.width = 16;
                    worldmap.animData.other.forceWide = false;
                    worldmap.waitForAnimation = true;
                    worldmap.forceMove = true;
                    worldmap.animIdx = setInterval(function() {
                        worldmap.pos.y += 0.025;
                        worldmap.refreshMap();
                        if(worldmap.pos.y >= 11) { FinishAnim(); }
                    }, 10);
                },
                GetSleep(500),
                function() {
                    worldmap.playerDir = 3;
                    worldmap.waitForAnimation = true;
                    worldmap.forcedPlayerInfo = worldmap.animData.forceFrame(worldmap.pos, 4, 0);
                    worldmap.refreshMap();
                    worldmap.animIdx = setTimeout(FinishAnim, 1500);
                },
                GetSpeak("intro1"),
                function() {
                    worldmap.waitForAnimation = true;
                    worldmap.importantEntities["nathanIntro"].moving = true;
                    worldmap.animIdx = setInterval(function() {
                        worldmap.importantEntities["nathanIntro"].pos.x -= 0.025;
                        worldmap.refreshMap();
                        if(worldmap.importantEntities["nathanIntro"].pos.x <= 21) {
                            worldmap.importantEntities["nathanIntro"].moving = false;
                            worldmap.finishAnimation();
                        }
                    }, 10);
                },
                function() {
                    worldmap.writeText("intro2");
                    worldmap.importantEntities["nathanIntro"].moving = true;
                    worldmap.importantEntities["nathanIntro"].anim.shiftY(2).shiftX(3, 2).setFPS(8);
                },
                GetSpeak("intro3"),
                function() {
                    gfx.clearSome(["menuA", "menutext"]);
                    worldmap.importantEntities["nathanIntro"].moving = false;
                    worldmap.importantEntities["nathanIntro"].anim.shiftY(2).shiftX(3, 1).setFPS(0);
                    worldmap.waitForAnimation = true;
                    worldmap.animIdx = setTimeout(FinishAnim, 1000);
                },
                function() {
                    worldmap.playerDir = 2;
                    worldmap.waitForAnimation = true;
                    worldmap.forceMove = true;
                    worldmap.animIdx = setInterval(function() {
                        worldmap.pos.y += 0.025;
                        worldmap.refreshMap();
                        if(worldmap.pos.y >= 12) { FinishAnim(); }
                    }, 10);
                },
                GetBasicPlayerFrame(4, 0, 1000),
                function() {
                    worldmap.playerDir = 3;
                    worldmap.writeText("intro4");
                    worldmap.importantEntities["nathanIntro"].moving = true;
                    worldmap.importantEntities["nathanIntro"].anim.shiftY(2).shiftX(4, 2).setFPS(8);
                },
                GetSpeak("intro5"),
                GetSpeak("intro6"),
                function() {
                    worldmap.importantEntities["nathanIntro"].moving = false;
                    worldmap.importantEntities["nathanIntro"].anim.shiftY(2).shiftX(4, 1).setFPS(8);
                    gfx.clearSome(["menuA", "menutext"]);
                    worldmap.waitForAnimation = true;
                    worldmap.forcedPlayerInfo = worldmap.animData.forceFrame(worldmap.pos, 4, 3);
                    worldmap.refreshMap();
                    worldmap.animIdx = setTimeout(FinishAnim, 1500);
                },
                function() {
                    worldmap.playerDir = 3;
                    worldmap.writeText("intro7");
                    worldmap.importantEntities["nathanIntro"].moving = true;
                    worldmap.importantEntities["nathanIntro"].anim.shiftY(2).shiftX(4, 2).setFPS(8);
                },
                GetSpeak("intro8"),
                function() {
                    gfx.clearSome(["menuA", "menutext"]);
                    worldmap.waitForAnimation = true;
                    worldmap.importantEntities["nathanIntro"].anim.shiftX(2, 4).shiftY(0).setFPS(8);
                    worldmap.importantEntities["nathanIntro"].moving = true;
                    worldmap.animIdx = setInterval(function() {
                        worldmap.importantEntities["nathanIntro"].pos.x += 0.025;
                        worldmap.refreshMap();
                        if(worldmap.importantEntities["nathanIntro"].pos.x >= 24) {
                            worldmap.importantEntities["nathanIntro"].moving = false;
                            worldmap.finishAnimation();
                        }
                    }, 10);
                },
                // do a fade to black!
                function() { game.transition(game.currentInputHandler, worldmap, { init: { x: 10,  y: 5 }, map: "producestand" }); }
            ]
        }
    ],
    "producestand": [
        GetCommonEntity("HipsterBike", 6, 4, 0, 0, undefined, undefined, { sheet: "hipster", storageKey: "bike", visible: false, solid: false }),
        GetCommonEntity("ConvinceATron", 10, 4, 0, 0, undefined, [
            function() { worldmap.writeText("wantTut", ["sYes", "sNo"]); },
            function(idx) {
                switch(idx) {
                    case 0:
                        worldmap.writeText("noTut");
                        break;
                    default:
                        worldmap.writeText("noTut");
                        worldmap.forceEndDialog = true;
                        break;
                }
            }, function() { tutorial.startBattle(); }
        ], { sheet: "hipster", storageKey: "convince", visible: false, solid: false, postBattle: "PostStandaloneTutorial" }),
        GetCommonEntity("Hipster", 0, 4, 0, 0, undefined, undefined, { sheet: "hipster", sheetlen: 2, storageKey: "hipster", postBattle: "PostInitialBattle" }),
        GetInvisibleEntity("PostStandaloneTutorial", [
            function() {
                player.inventory = InventoryCopy(player.tempInventory);
                player.tempInventory = undefined;
                if(tutorial.completed) {
                    game.target = worldmap.importantEntities["convince"];
                    worldmap.clearTarget();
                    worldmap.writeText("finTut");
                } else {
                    worldmap.writeText("quitTut");
                }
            }
        ], { storageKey: "PostStandaloneTutorial" }),
        GetInvisibleEntity("PostInitialBattle", [
            function() {
                player.inventory = InventoryCopy(player.tempInventory);
                player.tempInventory = undefined;
                worldmap.clearTarget();
                game.target = worldmap.importantEntities["testCutscene"];
                worldmap.clearTarget();
                if(tutorial.completed) {
                    game.target = worldmap.importantEntities["convince"];
                    worldmap.clearTarget();
                }
                worldmap.writeText("Pb0_0");
            },
            GetSpeak("Pb0_1")
        ], { storageKey: "PostInitialBattle" }),
        /*{
            name: "DemoCutscene", pos: {x: 10, y: 0}, solid: false, autoplay: true, postBattle: "PostInitialBattle", storageKey: "testCutscene",
            interact: [ 
                GetSpeak("intro13"),
                function() {
                    worldmap.importantEntities["convince"].anim.shiftY(3);
                    worldmap.importantEntities["convince"].visible = true;
                    worldmap.importantEntities["convince"].solid = true;
                    tutorial.startBattle();
                }
            ]
        },
        {
            name: "eggFairy", pos: {x: 24, y: 19}, visible: false, storageKey: "eggFairy",
            anim: new MapAnim("mapchar", 13, 0, 16, 20, 1, 1), 
            interact: [
                function() {
                    if(player.completedQuest("badEgg")) {
                        worldmap.writeText("badEggTry");
                        worldmap.forceEndDialog = true;
                    } else if(player.completedQuest("goodEgg")) {
                        worldmap.writeText("goodEggTry");
                        worldmap.forceEndDialog = true;
                    } else if(player.hasItem("egg")) {
                        worldmap.writeText("lakeegg", ["sYes", "sNo"]);
                    } else {
                        worldmap.writeText("lakenoegg");
                        worldmap.forceEndDialog = true;
                    }
                },
                function(idx) {
                    switch(idx) {
                        case 0:
                            worldmap.writeText("lakeegg_okay");
                            player.decreaseItem("egg");
                            break;
                        default:
                            worldmap.writeText("lakeegg_reject");
                            worldmap.forceEndDialog = true;
                            break;
                    }
                },
                GetSpeak("dotdotdot"),
                function() {
                    worldmap.importantEntities["eggFairy"].visible = true;
                    worldmap.refreshMap();
                    worldmap.writeText("lakeegg1");
                },
                GetSpeak("lakeegg2"),
                GetSpeak("lakeegg3", ["sYes", "sNo"]),
                function(idx) {
                    switch(idx) {
                        case 0:
                            worldmap.writeText("lakeeggLie");
                            game.target.anim.shiftY(2);
                            worldmap.refreshMap();
                            player.decreaseItem("egg", 999);
                            player.decreaseItem("quail", 999);
                            player.decreaseItem("goose", 999);
                            player.decreaseItem("turkey", 999);
                            player.decreaseItem("platypus", 999);
                            player.questsCleared.push("badEgg");
                            break;
                        default:
                            worldmap.writeText("lakeeggTruth");
                            game.target.anim.shiftY(1);
                            worldmap.refreshMap();
                            player.increaseItem("egg");
                            player.increaseItem("goldegg");
                            player.questsCleared.push("goodEgg");
                            break;
                    }
                },
                function() {
                    worldmap.writeText("lakeFinish");
                    worldmap.importantEntities["eggFairy"].visible = false;
                    worldmap.refreshMap();
                }
            ]
        },
        {
            name: "CutscenePrompt",
            pos: {x: 0, y: 5},
            solid: false,
            autoplay: true, 
            interact: [
                function() {
                    worldmap.playerDir = 1;
                    worldmap.waitForAnimation = true;
                    worldmap.importantEntities["hipster"].moving = true;
                    worldmap.animIdx = setInterval(function() {
                        worldmap.importantEntities["hipster"].pos.x += 0.025;//0.2;//0.025;
                        worldmap.refreshMap();
                        if(worldmap.importantEntities["hipster"].pos.x >= 6) {
                            worldmap.finishAnimation();
                        }
                    }, 10);
                },
                function() {
                    worldmap.waitForAnimation = true;
                    worldmap.importantEntities["hipster"].moving = false;
                    worldmap.animIdx = setTimeout(function() {
                        worldmap.finishAnimation();
                    }, 500);
                },
                function() {
                    worldmap.writeText("intro9");
                    worldmap.importantEntities["hipster"].moving = true;
                    worldmap.importantEntities["hipster"].anim.shiftY(2).shiftX(3, 2).setFPS(8);
                },
                function() {
                    worldmap.waitForAnimation = true;
                    worldmap.importantEntities["hipster"].moving = true;
                    worldmap.importantEntities["hipster"].anim.shiftX(1, 4).shiftY(0).setFPS();
                    worldmap.importantEntities["bike"].anim.shiftY(2);
                    worldmap.importantEntities["bike"].visible = true;
                    worldmap.animIdx = setInterval(function() {
                        worldmap.importantEntities["hipster"].pos.y += 0.025;
                        worldmap.importantEntities["hipster"].pos.x += 0.05;
                        worldmap.refreshMap();
                        if(worldmap.importantEntities["hipster"].pos.x >= 8) {
                            worldmap.finishAnimation();
                        }
                    }, 10);
                },
                function() {
                    worldmap.importantEntities["hipster"].anim.shiftX(3, 2).setFPS(8);
                    worldmap.writeText("intro10");
                },
                function() {
                    worldmap.importantEntities["hipster"].moving = false;
                    worldmap.importantEntities["hipster"].anim.shiftX(2, 4);
                    worldmap.writeText("intro11");
                },
                function() {
                    worldmap.importantEntities["hipster"].moving = true;
                    worldmap.writeText("intro12");
                },
                GetSpeak("intro13"),
                function() {
                    worldmap.importantEntities["hipster"].moving = false;
                    worldmap.writeText("intro14");
                },
                function() {
                    worldmap.importantEntities["hipster"].moving = true;
                    worldmap.importantEntities["hipster"].anim.shiftX(3, 2).setFPS(8);
                    worldmap.writeText("intro15");
                },
                GetSpeak("intro16"),
                GetSpeak("intro17"),
                GetSpeak("intro18"),
                GetSpeak("intro19"),
                function() {
                    worldmap.importantEntities["hipster"].moving = false;
                    worldmap.writeText("intro20");
                },
                function() {
                    worldmap.importantEntities["hipster"].moving = true;
                    worldmap.writeText("intro21");
                },
                GetSpeak("intro22"),
                function() {
                    gfx.clearSome(["menuA", "menutext"]);
                    worldmap.waitForAnimation = true;
                    worldmap.importantEntities["hipster"].moving = true;
                    worldmap.importantEntities["hipster"].anim.shiftX(4, 4).shiftY(0).setFPS();
                    worldmap.animIdx = setInterval(function() {
                        worldmap.importantEntities["hipster"].pos.y -= 0.025;
                        worldmap.importantEntities["hipster"].pos.x -= 0.05;
                        worldmap.refreshMap();
                        if(worldmap.importantEntities["hipster"].pos.x <= 6) {
                            worldmap.finishAnimation();
                        }
                    }, 10);
                },
                function() {
                    worldmap.importantEntities["hipster"].anim.shiftY(0).shiftX(0, 2).setFPS();
                    worldmap.importantEntities["bike"].visible = false;
                    worldmap.animIdx = setInterval(function() {
                        worldmap.importantEntities["hipster"].pos.x += 0.025;
                        worldmap.refreshMap();
                        if(worldmap.importantEntities["hipster"].pos.x >= 10) {
                            worldmap.finishAnimation();
                        }
                    }, 10);
                },
                function() {
                    worldmap.playerDir = 0;
                    worldmap.importantEntities["convince"].anim.shiftY(3);
                    worldmap.importantEntities["convince"].visible = true;
                    worldmap.importantEntities["convince"].solid = true;
                    worldmap.animIdx = setInterval(function() {
                        worldmap.importantEntities["hipster"].pos.x += 0.025;
                        worldmap.refreshMap();
                        if(worldmap.importantEntities["hipster"].pos.x >= 12) {
                            worldmap.finishAnimation();
                        }
                    }, 10);
                },
                function() {
                    worldmap.playerDir = 3;
                    worldmap.animIdx = setInterval(function() {
                        worldmap.importantEntities["hipster"].pos.x += 0.025;
                        worldmap.refreshMap();
                        if(worldmap.importantEntities["hipster"].pos.x >= 20) {
                            worldmap.finishAnimation();
                        }
                    }, 10);
                },
                function() {
                    worldmap.playerDir = 0;
                    worldmap.writeText("intro23");
                },
                function() {
                    worldmap.clearTarget();
                    game.target = worldmap.importantEntities["hipster"];
                    tutorial.startBattle();
                }
            ]
        },
        SwitchMap("ExitAreaWest", 0, 0, false, true, 22, 12, "farm"),
        SwitchMap("ExitAreaSouth", 0, 23, true, false, 21.5, 1, "firstvillage")
    ],
    "farm": [
        SwitchMap("ExitAreaWest", 23, 0, false, true, 1, 20, "producestand"),
        GetCommonEntity("Robo1", 20, 8, 4, 2, commonMovementDatas.robo(20), commonInteractArrays.robo), 
        GetCommonEntity("Robo2", 17, 10, 4, 2, commonMovementDatas.robo(17), commonInteractArrays.robo), 
        GetCommonEntity("Robo3", 16, 12, 4, 2, commonMovementDatas.robo(16), commonInteractArrays.robo), 
        GetCommonEntity("Robo4", 13, 14, 4, 2, commonMovementDatas.robo(13), commonInteractArrays.robo), 
        GetCommonEntity("Robo5", 12, 11, 4, 2, commonMovementDatas.robo(12, 1), commonInteractArrays.robo), 
        GetCommonEntity("Robo6", 9, 15, 4, 2, commonMovementDatas.robo(9, 1), commonInteractArrays.robo),
        GetCommonInvisibleSpeakingEntity("MushroomLog", 4, 6, "farmMush"),
        GetCommonInvisibleSpeakingEntity("TreeLL", 6, 8, "farmTree"),
        GetCommonInvisibleSpeakingEntity("TreeLR", 7, 8, "farmTree"),
        GetCommonInvisibleSpeakingEntity("TreeUL", 6, 7, "farmTree"),
        GetCommonInvisibleSpeakingEntity("TreeUR", 7, 7, "farmTree"),
        GetCommonInvisibleSpeakingEntity("Hay", 21, 4, "farmHay"),
        GetCommonInvisibleSpeakingEntity("Bin", 17, 3, "farmBin"),
        GetCommonInvisibleSpeakingEntity("WaterL", 13, 2, "farmWater"),
        GetCommonInvisibleSpeakingEntity("WaterM", 14, 2, "farmWater"),
        GetCommonInvisibleSpeakingEntity("WaterR", 15, 2, "farmWater"),
        GetCommonInvisibleSpeakingEntity("Crop", 10, 8, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 11, 8, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 14, 8, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 15, 8, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 18, 8, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 19, 8, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 10, 9, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("SprinklerPop", 11, 9, "farmSprinkler"),
        GetCommonInvisibleSpeakingEntity("SprinklerPop", 14, 9, "farmSprinkler"),
        GetCommonInvisibleSpeakingEntity("Crop", 15, 9, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 18, 9, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("SprinklerPop", 19, 9, "farmSprinkler"),
        GetCommonInvisibleSpeakingEntity("Crop", 10, 10, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 11, 10, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 14, 10, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 15, 10, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 18, 10, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 19, 10, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 10, 11, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 11, 11, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 14, 11, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 15, 11, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 18, 11, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 19, 11, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("SprinklerPop", 10, 12, "farmSprinkler"),
        GetCommonInvisibleSpeakingEntity("Crop", 11, 12, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 14, 12, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("SprinklerPop", 15, 12, "farmSprinkler"),
        GetCommonInvisibleSpeakingEntity("SprinklerPop", 18, 12, "farmSprinkler"),
        GetCommonInvisibleSpeakingEntity("Crop", 19, 12, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 10, 13, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 11, 13, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 14, 13, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 15, 13, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 18, 13, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 19, 13, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 10, 14, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 11, 14, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 14, 14, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 15, 14, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 18, 14, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 19, 14, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 10, 15, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("SprinklerPop", 11, 15, "farmSprinkler"),
        GetCommonInvisibleSpeakingEntity("SprinklerPop", 14, 15, "farmSprinkler"),
        GetCommonInvisibleSpeakingEntity("Crop", 15, 15, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 18, 15, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("SprinklerPop", 19, 15, "farmSprinkler"),
        GetCommonInvisibleSpeakingEntity("Crop", 10, 16, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 11, 16, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 14, 16, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 15, 16, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 18, 16, "farmVeggie"),
        GetCommonInvisibleSpeakingEntity("Crop", 19, 16, "farmVeggie"),
        GetBeehive("FarmHive", 3, 1),
        EnterShop("ChickenCoop", 18, 3, "coop"),
        EnterShop("Inn", 10, 2, "inn0"),
        GetCommonEntity("Fucker", 10, 3, 0, 2, undefined, [
            GetSpeak("B1_1"),
            GetSpeak("B1_2"),
            GetSpeak("B1_3"),
            GetSpeak("B1_4"),
            GetSpeak("B1_5"),
            GetFight(["bigBot"])
        ], { big: true, postBattle: "PostBoss", failedInteract: [
            GetSpeak("B1_6"),
            GetFight(["bigBot"])
        ] }),
        {
            name: "PostBoss",
            pos: {x: -1, y: -1},
            solid: false,
            storageKey: "PostBoss",
            interact: [
                GetSpeak("Pb1_0"),
                GetSpeak("Pb1_1"),
                GetSpeak("Pb1_2")
            ]
        }
    ],
    "firstvillage": [
        SwitchMap("ExitAreaNorth", 0, 0, true, false, 16, 22, "producestand"),
        SwitchMap("ExitAreaWest", 0, 0, false, true, 44, 49, "forest"),
        SwitchMap("ExitAreaSouth", 0, 30, true, false, 21.5, 1, "belowvillage"),
        EnterShop("EquipmentShop", 17, 12, "equip1"),
        GetSign(18, 13, "SignWeapon0"),
        EnterShop("UpgradeShop", 18, 20, "upgrade1"),
        GetSign(17, 21, "SignExpand0"),
        EnterShop("FixtureShop", 3, 6, "fixture1"),
        GetSign(4, 7, "SignFixture0"),
        EnterShop("SeedShopL", 5, 17, "seed1"),
        EnterShop("SeedShopR", 6, 17, "seed1"),
        GetSign(7, 18, "SignSeeds0"),
        EnterShop("Inn", 16, 4, "inn1"),
        GetSign(15, 5, "SignInn0"),
        GetSign(1, 24, "SignForest")
    ],
    "forest": [
        SwitchMap("ExitAreaEast", 46, 49, false, false, 1, 22.5, "firstvillage"),
        SwitchMapSeamless("JoinBlue", 32, 35, 0, 70, 31),
        SwitchMapSeamless("JoinAqua", 74, 36, 2, 111, 58),
        SwitchMapSeamless("JoinMaroon", 111, 57, 0, 36, 31),
        SwitchMapSeamless("JoinLightBlue", 54, 35, 2, 36, 42),
        SwitchMapSeamless("JoinYellow", 17, 24, 1, 83, 33),
        SwitchMapSeamless("JoinYellow2", 17, 25, 1, 83, 34),
        SwitchMapSeamless("JoinGreen", 92, 33, 3, 23, 40), 
        SwitchMapSeamless("JoinGreen2", 92, 34, 3, 23, 41), 
        SwitchMapSeamless("JoinDarkBlue", 31, 59, 2, 74, 17),
        SwitchMapSeamless("JoinDarkBlue2", 32, 59, 2, 75, 17),
        SwitchMapSeamless("JoinGrey", 100, 53, 0, 9, 46),
        SwitchMapSeamless("JoinGrey2", 101, 53, 0, 10, 46),
        GetCommonEntity("Rat1", 32, 46, 0, 2, commonMovementDatas.rectangle(32, 46, 4, 3), commonInteractArrays.mouse, { sy: 5, sheetlen: 2 }),
        GetCommonEntity("Rat2", 23, 47, 0, 2, commonMovementDatas.rectangle(23, 47, 4, 2), commonInteractArrays.mouse, { sy: 5, sheetlen: 2 }),
        GetCommonEntity("Rat3", 100, 71, 0, 2, commonMovementDatas.rectangle(100, 71, 6, 2), commonInteractArrays.mouse, { sy: 5, sheetlen: 2 }),
        GetCommonEntity("Rat4", 106, 71, 0, 2, commonMovementDatas.rectangle(100, 71, 6, 2, 1), commonInteractArrays.mouse, { sy: 5, sheetlen: 2 }),
        GetCommonEntity("Rat5", 106, 73, 0, 2, commonMovementDatas.rectangle(100, 71, 6, 2, 2), commonInteractArrays.mouse, { sy: 5, sheetlen: 2 }),
        GetCommonEntity("Rat6", 100, 73, 0, 2, commonMovementDatas.rectangle(100, 71, 6, 2, 3), commonInteractArrays.mouse, { sy: 5, sheetlen: 2 }),
        GetCommonEntity("Sqorl1", 2, 40, 8, 2, commonMovementDatas.rectangle(2, 40, 10, 1), commonInteractArrays.sqorl, { sy: 5, sheetlen: 2 }),
        GetCommonEntity("Sqorl2", 110, 65, 8, 2, commonMovementDatas.rectangle(110, 65, 3, 6), commonInteractArrays.sqorl, { sy: 5, sheetlen: 2 }),
        GetCommonEntity("Sqorl3", 113, 71, 8, 2, commonMovementDatas.rectangle(110, 65, 3, 6, 2), commonInteractArrays.sqorl, { sy: 5, sheetlen: 2 }),
        GetCommonEntity("Turkey1", 2, 56, 0, 0, undefined, commonInteractArrays.turky, { sy: 7 }),
        GetCommonEntity("Turkey2", 7, 57, 0, 0, undefined, commonInteractArrays.turky, { sy: 7 }),
        GetCommonEntity("Turkey3", 10, 62, 0, 0, undefined, commonInteractArrays.turky, { sy: 7 }),
        GetCommonEntity("Turkey4", 12, 60, 0, 0, undefined, [ 
            GetSpeak("bossturky0"),
            GetSpeak("bossturky1"),
            GetFight(["bossturky", "turky", "turky"])], { sy: 7 }),
        GetBeehive("ForestHive", 54, 24),
        GetCommonEntity("GoldenShroom", 36, 24, 8, 0, undefined, [
            function() {
                if(player.hasQuest("quest1")) {
                    worldmap.writeText("foundShroomQ");
                    player.activeQuests["quest1"] = 2;
                } else {
                    worldmap.writeText("foundShroom");
                    player.activeQuests["quest1"] = 4;
                }
                worldmap.clearTarget();
            }
        ], { noChange: true, sy: 7 }),
        GetCommonEntity("TurkeyEggs", 12, 59, 9, 0, undefined, [
            function() {
                worldmap.writeText("foundTurkey");
                player.increaseItem("turkey", 5);
                worldmap.clearTarget();
            }
        ], { noChange: true, sy: 7 }),
        GetCommonEntity("CarrotSeeds", 83, 25, 3, 0, undefined, [
            function() {
                if(player.hasQuest("freeCarrotSeeds") && player.activeQuests["freeCarrotSeeds"] > 4) {
                    worldmap.writeText("carrotseeds1");
                } else {
                    worldmap.writeText("carrotseeds0");
                    player.increaseItem("carrot", 3);
                    if(player.hasQuest("freeCarrotSeeds")) {
                        player.activeQuests["freeCarrotSeeds"] += 1;
                    } else {
                        player.activeQuests["freeCarrotSeeds"] = 1;
                    }
                }
            },
        ], { noChange: true, sy: 4 }),
        GetCommonEntity("BadInfluenceRabbit", 83, 26, 12, 0, undefined, [
            function() {
                if(player.completedQuest("rabbitShit")) {
                    worldmap.writeText("rabbitOut");
                    worldmap.forceEndDialog = true;
                } else {
                    worldmap.writeText("rabbit0");
                }
            },
            GetSpeak("rabbit1", ["buyfertilizer", "sNo"]),
            function(idx) {
                if(idx === 1) {
                    worldmap.writeText("rabbit2");
                    worldmap.forceEndDialog = true;
                } else if(player.monies < 500) {
                    worldmap.writeText("rabbit3");
                    worldmap.forceEndDialog = true;
                } else {
                    worldmap.writeText("rabbit4");
                    player.monies -= 500;
                    player.increaseItem("_strongsoil");
                    player.questsCleared.push("rabbitShit");
                }
            }, 
            GetSpeak("rabbit5"), 
            GetSpeak("rabbit6"), 
            GetSpeak("rabbit7")
        ], { noChange: true, sy: 4, moving: true, sheetlen: 2 }),
        GetCommonEntity("FishyLeft", 72, 24, 12, 0, undefined, [
            function(i, me) { me.visible = true; worldmap.refreshMap(); worldmap.writeText(player.completedQuest("fishyTalk") ? "fishyFriendX" : "fishyFriend0"); },
            function(i, me) {
                if(player.completedQuest("fishyTalk")) {
                    me.visible = false;
                    worldmap.refreshMap();
                    worldmap.finishDialog();
                } else { worldmap.writeText("fishyFriend1"); }
            },
            function(i, me) { worldmap.writeText("fishyFriend2"); player.questsCleared.push("fishyTalk"); me.visible = false; worldmap.refreshMap(); }
        ], { noChange: true, sy: 6, visible: false }),
        GetCommonEntity("FishyRight", 73, 24, 12, 0, undefined, [
            function(i, me) { me.visible = true; worldmap.refreshMap(); worldmap.writeText(player.completedQuest("fishyTalk") ? "fishyFriendX" : "fishyFriend0"); },
            function(i, me) {
                if(player.completedQuest("fishyTalk")) {
                    me.visible = false;
                    worldmap.refreshMap();
                    worldmap.finishDialog();
                } else { worldmap.writeText("fishyFriend1"); }
            },
            function(i, me) { worldmap.writeText("fishyFriend2"); player.questsCleared.push("fishyTalk"); me.visible = false; worldmap.refreshMap(); }
        ], { noChange: true, sy: 6, visible: false }),
        GetCommonEntity("FishyTop", 73, 23, 12, 0, undefined, [
            function(i, me) { me.visible = true; worldmap.refreshMap(); worldmap.writeText(player.completedQuest("fishyTalk") ? "fishyFriendX" : "fishyFriend0"); },
            function(i, me) {
                if(player.completedQuest("fishyTalk")) {
                    me.visible = false;
                    worldmap.refreshMap();
                    worldmap.finishDialog();
                } else { worldmap.writeText("fishyFriend1"); }
            },
            function(i, me) { worldmap.writeText("fishyFriend2"); player.questsCleared.push("fishyTalk"); me.visible = false; worldmap.refreshMap(); }
        ], { noChange: true, sy: 6, visible: false }),
        GetCommonEntity("Lime", 103, 66, 10, 0, undefined, [
            function() {
                if(player.completedQuest("limeAndTheCoconut")) {
                    worldmap.writeText("lime_complete");
                    worldmap.forceEndDialog = true;
                } else if(player.hasQuest("limeAndTheCoconut")) {
                    var items = specialtyHelpers.getLimeItems();
                    if(items.length === 0) {
                        worldmap.writeText("lime3");
                        worldmap.forceEndDialog = true;
                    } else {
                        worldmap.writeText("lime4", items);
                    }
                } else {
                    worldmap.writeText("lime0");
                }
            }, 
            function(i) {
                if(player.hasQuest("limeAndTheCoconut")) {
                    specialtyHelpers.storedLimeChoice = specialtyHelpers.getLimeItems()[i];
                    switch(specialtyHelpers.storedLimeChoice) {
                        case "lime_lemon": worldmap.writeText("lime_lemon1"); break;
                        case "lime_banana": worldmap.writeText("lime_banana1"); break;
                        case "lime_corn": worldmap.writeText("lime_corn1"); break;
                        case "lime_goldegg": worldmap.writeText("lime_egg1"); break;
                        case "lime_nope":
                            worldmap.writeText("lime_denied");
                            worldmap.forceEndDialog = true;
                            break;
                    }
                } else {
                    specialtyHelpers.storedLimeChoice = "";
                    worldmap.writeText("lime1");
                }
            }, 
            function() {
                switch(specialtyHelpers.storedLimeChoice) {
                    case "lime_lemon": worldmap.writeText("lime_lemon2"); break;
                    case "lime_banana": worldmap.writeText("lime_banana2"); break;
                    case "lime_corn": worldmap.writeText("lime_corn2"); break;
                    case "lime_goldegg": worldmap.writeText("lime_egg2"); break;
                    default: worldmap.writeText("lime2"); break;
                }
            }, 
            function() {
                switch(specialtyHelpers.storedLimeChoice) {
                    case "lime_lemon": worldmap.writeText("lime_lemon3"); break;
                    case "lime_banana":
                        worldmap.writeText("lime_banana3");
                        quests.completeQuest("limeAndTheCoconut");
                        player.decreaseItem("banana");
                        player.increaseItem("corn", 10);
                        break;
                    case "lime_corn":
                        worldmap.writeText("lime_corn3");
                        quests.completeQuest("limeAndTheCoconut");
                        player.decreaseItem("corn");
                        player.increaseItem("banana", 10);
                        break;
                    case "lime_goldegg":
                        worldmap.writeText("lime_egg3");
                        quests.completeQuest("limeAndTheCoconut");
                        player.decreaseItem("goldegg");
                        player.increaseItem("coconut", 2);
                        break;
                    default:
                        worldmap.writeText("lime3");
                        player.activeQuests["limeAndTheCoconut"] = 1;
                        break;
                }
            }
        ], { noChange: true, sy: 7 })
    ],
    "belowvillage": [
        SwitchMap("ExitAreaNorth", 0, 0, true, false, 21.5, 28, "firstvillage"),
        SwitchMap("EnterFacilitySide", 13, 16, false, false, 30, 3, "researchfacility"),
        SwitchMap("EnterFacilityL", 7, 18, false, false, 15.5, 26, "researchfacility"),
        SwitchMap("EnterFacilityR", 8, 18, false, false, 15.5, 26, "researchfacility"),
        GetCommonEntity("Robo1", 20, 20, 4, 2, GetStdMovement([ [20, 20, 3], [27, 20, 3], [27, 24, 2], [20, 24, 1], [20, 20, 0] ]), commonInteractArrays.researchRobo, {sy: 4})
    ],
    "researchfacility": [
        SwitchMap("ExitAreaSouth", 0, 27, true, false, 7.5, 19, "belowvillage"),
        SwitchMap("ExitAreaEast", 31, 3, false, false, 13, 15, "belowvillage"),
        GetCommonEntity("Fucker", 17, 1, 0, 0, undefined, [
            GetSpeak("B2_0"),
            GetFight(["ScienceMan"])
        ], { sy: 4, postBattle: "PostBoss2", failedInteract: [
            GetSpeak("B2_1"),
            GetFight(["ScienceMan"])
        ] }),
        {
            name: "PostBoss2",
            pos: {x: -1, y: -1},
            solid: false,
            storageKey: "PostBoss2",
            interact: [
                GetSpeak("Pb2_0"),
                GetSpeak("Pb2_1")
            ]
        }
    ],
    "bridge": [
        SwitchMap("GoUnderwater", 10, 17, false, false, 41, 20, "underwater"),
        GetSign(15, 16, "SignMermaid"),
        EnterShop("Mermaid Shoppe", 16, 16, "mermaid"),
        GetCommonEntity("Worker1", 28, 8, 0, 3, undefined, [
            function() {
                if(player.hasQuest("helpSeaMonster")) {
                    worldmap.writeText("constr1_foe");
                } else {
                    worldmap.writeText("constr1_fr1");
                }
            }, function() {
                if(player.hasQuest("helpSeaMonster")) {
                    combat.startBattle(["Worker"]);
                } else {
                    worldmap.writeText("constr1_fr2");
                }
            }
        ]),
        GetCommonEntity("Worker2", 20, 10, 0, 3, GetStdMovement([ [20, 10, 1], [10, 10, 1], [10, 8, 0], [20, 8, 3], [20, 10, 2] ]), [
            function(activePress) {
                if(player.hasQuest("helpSeaMonster")) {
                    worldmap.writeText("w21");
                } else if(activePress) {
                    worldmap.writeText("w22");
                    worldmap.forceEndDialog = true;
                } else {
                    return true;
                }
            },
            function() {
                combat.startBattle(["Worker"]);
            }
        ])
    ],
    "underwater": [
        SwitchMap("GoAboveGround", 42, 20, false, false, 11, 17, "bridge"),
        GetCommonEntity("ShipLeft", 15, 3, 1, 0, undefined, undefined, { big: true, sy: 1 }),
        GetCommonEntity("ShipMiddle", 17, 3, 1, 1, undefined, undefined, { big: true, sy: 1 }),
        GetCommonEntity("ShipRight", 19, 3, 1, 2, undefined, undefined, { big: true, sy: 1 }),
        GetCommonEntity("SeaLeft", 15, 3, 1, 0, undefined, undefined, { big: true, sy: 2 }),
        GetCommonEntity("SeaMiddle", 17, 3, 1, 1, undefined, [
            function() {
                if(player.hasQuest("helpSeaMonster")) {
                    worldmap.writeText("sm4");
                    worldmap.forceEndDialog = true;
                } else {
                    worldmap.writeText("sm1", ["sm1c1", "sm1c2", "sm1c3"]);
                }
            },
            function(idx) {
                switch(idx) {
                    case 0:
                        worldmap.writeText("sm2");
                        player.activeQuests["helpSeaMonster"] = 0;
                        worldmap.forceEndDialog = true;
                        break;
                    case 1:
                        worldmap.writeText("sm3");
                        break;
                    default:
                        worldmap.writeText("sm5");
                        worldmap.forceEndDialog = true;
                        break;
                }
            }, function() {
                combat.startBattle(["seaHandR", "seaMan", "seaHandL"]);
            }
        ], { big: true, sy: 2, noChange: true }),
        GetCommonEntity("SeaRight", 19, 3, 1, 2, undefined, undefined, { big: true, sy: 2 })
    ]
};