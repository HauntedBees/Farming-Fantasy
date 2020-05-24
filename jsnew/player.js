class Player {
    constructor() {
        this.health = 25;
        this.maxhealth = 25;
        this.atk = 3;
        this.def = 2;
        this.luck = 0.7;
        this.hasFalcon = true;
        this.saveVersion = 0.6; 
        this.c2 = 0;
        this.c2Rate = 1;
        this.beeQueensFaced = 0;
        this.nathanSeeds = [
            ["beet", 10],
            ["carrot", 10],
            ["ginger", 5]
        ];
        this.level = 1;
        this.exp = 0;
        this.nextExp = 4;
        this.totalExp = 0;
        this.ethicsAxis = 0; // 1=good -1=bad
        this.techAxis = 0; // 1=tech -1=nature
        this.monies = 1000;
        this.playTime = 0;
        this.visitedMaps = [];
        this.openedChests = [];
        this.miscData = { 
            seasonsPlanted: [0, 0, 0, 0],
            cropsPlanted: {},
            techFixturesUsed: 0,
            typesPlanted: {
                "veg": 0,
                "tree": 0,
                "bee": 0,
                "rice": 0,
                "rod": 0,
                "water": 0,
                "cow": 0,
                "mush": 0, 
                "egg": 0,
                "tech": 0
            }
        };
        /** @type {string[]} */
        this.clearedEntities = [];
        /** @type {string[]} */
        this.achievements = [];
        /** @type {string[]} */
        this.failedEntities = []; 
        /** @type {string[]} */
        this.questsCleared = [];
        this.activeQuests = {};
        this.fixtureTutorialState = 0; 
        this.lastInn = "start";
        this.lastSaveSlot = 0;
        this.dreamBonus = 0;
        this.options = {
            difficulty: 1, 
            music: 20,
            sound: 20,
            controltype: 0,
            canSayFuck: 0,
            deadZone: 0,
            analogDPad: 1,
            stickyMovement: 0,
            ignoreMouse: 0,
            virtualController: 0, 
            font: 0,
            fontSize: 0,
            gfxfilter: 3,
            coverColor: 0,
            coverMode: 1,
            rightBumperWin: false 
        };
        this.noFunDiffMod = 0; // positive=harder negative=easier
        this.equipped = {
            weapon: "!babySickle",
            compost: "!weakCompost",
            gloves: null,
            soil: null
        };
        /** @type {any[]} */
        this.crops = [
            ["carrot", 6],
            ["beet", 4],
            ["garlic", 2],
            ["banana", 3]
        ];
        this.tools = ["!weakCompost", "!babySickle"];
        /** @type {any[]} */
        this.fixtures = [];
        // TODO: tutorial inventory and equipment
        /*this.gridWidth = 3;
        this.gridHeight = 3;
        this.gridLevel = "n";
        this.fixtureGrid = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];*/
        this.gridInfo = new CropFieldInfo(3, 3, "n");
    }
    /* #region Save Data */
    SetMapPosition(worldmap) {
        this.mapName = worldmap.mapName;
        this.mapPos = worldmap.player.pos;
        this.mapDir = worldmap.player.dir;
    }
    GetPlayTimeString(time) {
        time = time || this.playTime;
        const hours = Math.floor(time / 3600);
        time -= hours * 3600;
        const minutes = Math.floor(time / 60);
        time -= minutes * 60;
        return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (time < 10 ? "0" : "") + time;
    }
    GetLastSaveTime(lastSaveTime) {
        if(lastSaveTime === undefined) { return "A while ago."; }
        const now = +(new Date());
        const distTime = Math.floor((now - lastSaveTime) / 60000);
        if(distTime < 1) {
            return GetText("lastSaveJustNow");
        } else if(distTime < 60) {
            return HandlePlurals(GetText("lastSaveMinutes"), distTime).replace("{0}", distTime);
        } else {
            const distInHours = Math.floor(distTime / 60);
            if(distInHours < 24) {
                return HandlePlurals(GetText("lastSaveHours"), distInHours).replace("{0}", distInHours);
            } else {
                const fullDate = new Date(lastSaveTime);
                const months = GetText("lastSaveMonths").split(",");
                const m = fullDate.getMinutes();
                return fullDate.getDate() + months[fullDate.getMonth()] + fullDate.getFullYear() + " " + fullDate.getHours() + ":" + (m < 10 ? "0" + m : m);
            }
        }
    }
    ShiftEthics(d) { // +good -bad
        this.ethicsAxis += d;
        if(this.ethicsAxis > 5) { this.ethicsAxis = 5; }
        else if(this.ethicsAxis < -5) { this.ethicsAxis = -5; }
    }
    ShiftTech(d) { // +tech, -nature
        this.techAxis += d;
        if(this.techAxis > 5) { this.techAxis = 5; }
        else if(this.techAxis < -5) { this.techAxis = -5; }
    }
    /* #endregion */
    /* #region Achievements and Quests */
    HasUsedFish() {
        return (this.miscData.typesPlanted["rod"] + this.miscData.typesPlanted["water"]) > 0;
    }
    HasWon() {
        return (this.HasAchievement("techGood") || this.HasAchievement("natureGood") || this.HasAchievement("natureBad") || this.HasAchievement("techBad"));
    }
    HasAchievement(a) {
        return this.achievements.indexOf(a) >= 0;
    }
    HasQuest(q) {
        return this.activeQuests[q] !== undefined;
    }
    HasQuestState(q, state) {
        return this.activeQuests[q] !== undefined && state === this.activeQuests[q];
    }
    HasCompletedQuest(q) {
        return this.questsCleared.indexOf(q) >= 0;
    }
    HasOrHasHadQuest(q) {
        return this.questsCleared.indexOf(q) >= 0 || this.activeQuests[q] !== undefined;
    }
    /** @returns {string[]} */
    GetQuestItems() {
        const questItems = [];
        if(this.HasCompletedQuest("badEgg")) { questItems.push("bpermit0"); }
        if(this.HasQuestState("quest1", 4) || this.HasQuestState("quest1", 2)) { questItems.push("goldmushroom"); }
        if(this.HasQuestState("kelpBoy", "gotMilk")) { questItems.push("milk"); }
        if(this.HasQuestState("seamonkey", "looking")) { questItems.push("seamonkkey"); }
        if(this.HasQuestState("getHeart", "weirdheart") || this.HasQuestState("getHeart", "heart")) { questItems.push("monsterheart"); }
        else if(this.HasQuestState("helpSeaMonster", "gotEgg")) { questItems.push("monsteregg"); }
        if(this.HasQuest("truckRepair")) { questItems.push("tire"); }
        if(this.HasCompletedQuest("gotPhone")) { questItems.push("smartphone"); }
        if(this.HasQuestState("catmail", 1)) { questItems.push("bpermit1"); }
        if(this.HasCompletedQuest("keycard")) { questItems.push("food2keycard"); }
        return questItems;
    }
    /* #endregion */
    /* #region Inventory */
    /** @param {string} item */
    GetItemType(item) {
        return item[0] === "!" ? "equipment" : (item[0] === "_" ? "fixture" : "crop");
    }
    /** @param {string} item @param {number} amount */
    HasItem(item, amount) {
        amount = amount || 1;
        const type = this.GetItemType(item);
        if(type === "equipment") {
            return this.tools.indexOf(item) >= 0;
        }
        const arr = (type === "fixture") ? this.fixtures : this.crops;
        for(let i = 0; i < arr.length; i++) {
            if(arr[i][0] === item && arr[i][1] >= amount) { return true; }
        }
        return false;
    }
    /** @param {string} item */
    GetItemAmount(item) {
        const type = this.GetItemType(item);
        if(type === "equipment") {
            return this.tools.indexOf(item) >= 0;
        }
        const arr = (type === "fixture") ? this.fixtures : this.crops;
        for(let i = 0; i < arr.length; i++) {
            if(arr[i][0] === item) { return arr[i][1]; }
        }
        return 0;
    }
    /** @param {string} item */
    IsEquipped(item) {
        return this.equipped.weapon === item || this.equipped.compost === item || this.equipped.gloves === item || this.equipped.soil === item || this.equipped.armor === item;
    }   
    /** @param {string} item @param {number} [amount] */
    IncreaseItem(item, amount) {
        if(item === "_beehive" && this.clearedEntities.indexOf("FarmHive") >= 0
                                && this.clearedEntities.indexOf("BelowHive") >= 0
                                && this.clearedEntities.indexOf("ForestHive") >= 0
                                && this.clearedEntities.indexOf("KelpBeehive") >= 0
                                && this.clearedEntities.indexOf("OfficeHive") >= 0) {
            AddAchievementIfMissing("beeKing"); // TODO: chievo
        }
        if(amount === undefined) { amount = 1; }
        if(amount === 0) { return true; }
        const type = this.GetItemType(item);
        if(type === "equipment") {
            if(this.tools.indexOf(item) >= 0) { return false; }
            this.tools.push(item);
            return true;
        } 
        const arr = (type === "fixture") ? this.fixtures : this.crops;
        let numberOfItems = 0;
        for(var i = 0; i < arr.length; i++) {
            if(arr[i][0] === item) {
                arr[i][1] += amount;
                return true;
            }
            numberOfItems++;
        }
        if(numberOfItems === 36) { return false; }
        arr.push([item, amount]);
    }
    /** @param {string} item @param {number} amount */
    DecreaseItem(item, amount) {
        const type = this.GetItemType(item);
        if(type === "equipment") {
            const idx = this.tools.indexOf(item);
            if(idx < 0) { return false; }
            this.tools.splice(idx, 1);
            return true;
        }
        const arr = (type === "fixture") ? this.fixtures : this.crops;
        let idx = -1;
        for(let i = 0; i < arr.length; i++) {
            if(arr[i][0] === item) {
                arr[i][1] -= (amount || 1);
                idx = i;
                break;
            }
        }
        if(idx < 0) { return false; }
        if(arr[idx][1] <= 0) {
            arr.splice(idx, 1);
            return false;
        }
        return true;
    }
    /** @param {string} item  */
    ClearCropIfEmpty(item) {
        for(let i = this.crops.length - 1; i >= 0; i--) {
            if(this.crops[i][0] !== item) { continue; }
            if(this.crops[i][1] <= 0) {
                this.crops.splice(i, 1);
                return true;
            }
            return false;
        }
        return false;
    }
    /** @param {number} m */
    AddMonies(m) {
        this.monies = Math.min(9999, this.monies + m);
    }
    /* #endregion */
    /* #region Levelling */
    AddEXP(n) {
        this.totalExp += n;
        if(this.level < 20) {
            this.exp += n;
        }
    }
    LevelUp() {
        if(this.level >= 20) { return; }
        this.level++;
        this.exp -= this.nextExp;
        this.maxhealth = levelStats.hp[this.level - 1]; // TODO: LevelStats
        this.health = this.maxhealth;
        this.atk = levelStats.atk[this.level - 1];
        this.def = levelStats.def[this.level - 1];
        this.luck = 0.7 + (this.level / 100);
        this.nextExp = Math.floor(this.level * this.level * 3.25 * Math.pow(1.02, this.level - 2));
        this.GetLevelUpItemBonuses();
    }
    GetLevelUpItemBonuses() {
        /** @type {any[]} */
        let items = [];
        if(this.level % 2 === 0) { items.push(["carrot", this.level - 1]); items.push(["beet", this.level - 1]); }
        if(this.level % 3 === 0) { items.push(["ginger", Math.ceil(this.level / 2)]); }
        if(this.level % 4 === 0) { items.push(["corn", Math.ceil(this.level / 3)]); }
        if(this.level % 5 === 0) { items.push(["bellpepper", Math.ceil(this.level / 4)]); }
        if(this.level % 6 === 0) { items.push(["asparagus", Math.ceil(this.level / 2)]); }
        if(this.level % 7 === 0) { items.push(["spinach", 2]); items.push(["tomato", 2]); items.push(["beet", 2]); items.push(["radish", 2]); }
        if(this.level % 8 === 0) { items.push(["pineapple", Math.ceil(this.level / 3)]); }
        if(this.level % 9 === 0) { items.push(["leek", Math.ceil(this.level / 2)]); }
        if(this.level % 10 === 0) { items.push(["garlic", this.level]); }

        if(this.level < 10) { items.push(["banana"]); items.push(["apple"]); }
        else if(this.level < 12) { items.push(["grapes", 2]); items.push(["blackberry", 2]); }
        else if(this.level < 14) { items.push(["avocado"]); items.push(["blackberry", 3]); items.push(["banana", 2]); }
        else if(this.level < 16) { items.push(["avocado", 2]); items.push(["apricot"]); items.push(["blackberry", 2]); }
        else { items.push(["kiwi", 2]); items.push(["avocado", 2]); items.push(["apricot", 2]); }
        
        const isHard = (this.options.difficulty === 2);
        items.forEach(e => this.IncreaseItem(e[0], isHard ? 1 : e[1]));
    }
    /* #endregion */
    /* #region Difficulty */
    GetPriceMultiplier() {
        switch(this.options.difficulty) {
            case 0: return 0.5;
            case 1: return 1;
            case 2: return 1.5;
        }
        return 1;
    }
    /* #endregion */
    /* #region Combat Details */
    CanMelee(numEnemyCrops) {
        if(this.equipped.weapon === null) { return false; }
        const weapon = GetEquipment(this.equipped.weapon); // TODO: GetEquipment
        if(numEnemyCrops === 0) {
            return !weapon.noEnemies;
        } else {
            return weapon.targetCrops || !weapon.noEnemies;
        }
    }
    CanAttackAfterPlanting() {
        if(this.equipped.gloves === null) { return 0; }
        const equipInfo = GetEquipment(this.equipped.gloves);
        return equipInfo.canAttack;
    }
    GetCompostMax() {
        if(this.equipped.compost === null) { return 0; }
        const equipInfo = GetEquipment(this.equipped.compost);
        return equipInfo.amount;
    }
    GetCropSpeedMultiplier() {
        if(this.equipped.soil === null) { return 1; }
        const equipInfo = GetEquipment(this.equipped.soil);
        return (equipInfo.speed + 1);
    }
    GetPlantingTurns() {
        if(this.equipped.gloves === null) { return 1; }
        const equipInfo = GetEquipment(this.equipped.gloves);
        return equipInfo.amount;
    }
    CanAttackWithCompost() {
        if(this.equipped.compost === null) { return false; }
        const equipInfo = GetEquipment(this.equipped.compost);
        return equipInfo.canAttack;
    }
    CanSickleCrops() {
        if(this.equipped.weapon === null) { return false; }
        const equipInfo = GetEquipment(this.equipped.weapon);
        return equipInfo.targetCrops;
    }
    CanAttackPeople() {
        if(this.equipped.weapon === null) { return true; }
        const equipInfo = GetEquipment(this.equipped.weapon);
        return !equipInfo.noEnemies;
    }
    GetSickleAttackBonus(season) {
        if(this.equipped.weapon === null) { return 0; }
        const equipInfo = GetEquipment(this.equipped.weapon);
        let bonus = equipInfo.power;
        if(season === 0 && equipInfo.sp) { bonus += equipInfo.sp; }
        else if(season === 1 && equipInfo.su) { bonus += equipInfo.su; }
        else if(season === 2 && equipInfo.au) { bonus += equipInfo.au; }
        else if(season === 3 && equipInfo.wi) { bonus += equipInfo.wi; }
        return bonus;
    }
    HasSeeds() { 
        const hasAnySeeds = this.crops.some(e => e[0][0] != "_" && e[0][0] != "!" && e[1] > 0);
        if(!hasAnySeeds) { return false; }
        const availableTypes = [];
        for(let x = 0; x < this.gridInfo.gridWidth; x++) {
            for(let y = 0; y < this.gridInfo.gridHeight; y++) {
                const item = this.gridInfo[x][y];
                switch(item) {
                    case "_log": availableTypes.push("mush"); break;
                    case "_coop": availableTypes.push("egg"); break;
                    case "_modulator": availableTypes.push("veg"); break;
                    case "_shooter": availableTypes.push("veg", "mush", "rice"); break;
                    case "_lake": availableTypes.push("water", "rod", "spear"); break;
                    case "_paddy": availableTypes.push("rice"); break;
                    case "_cow": availableTypes.push("food", "veg", "rice", "mush", "tree"); break;
                    case "_strongsoil": availableTypes.push("veg", "tree"); break;
                    case "_hotspot": availableTypes.push("tech"); break;
                    case "_beehive": availableTypes.push("bee"); break;
                    case "_charger": availableTypes.push("sickle2"); break;
                    default: if(item === null) { availableTypes.push("veg", "tree"); } break;
                }
            }
        }
        return this.crops.some(e => e[0][0] != "_" && e[0][0] != "!" && e[1] > 0 && availableTypes.indexOf(GetCrop(e[0]).type) >= 0); // TODO: getcrop
    }
    PlantCrop(crop) {
        if(this. miscData.cropsPlanted[crop] === undefined) {
            this. miscData.cropsPlanted[crop] = 1;
        } else {
            this. miscData.cropsPlanted[crop]++;
        }
        const hasAll = !debug.AllCrops.some(c => this. miscData.cropsPlanted[c] === undefined); // TODO: debug allcrops
        if(hasAll) { AddAchievementIfMissing("allCrop"); }
    }
    /* #endregion */
}