const sprites = {
    "tree0": [0, 0, true],
    "tree1": [1, 0, true],
    "tree2": [2, 0, true],
    "apple0": [3, 0, true],
    "banana0": [4, 0, true],
    "grapes0": [5, 0, true],
    "specialgrapes0": [5, 0, true],
    "avocado0": [6, 0, true],
    "mango0": [7, 0, true],
    "animalBear0": [8, 0, true],
    "tropictree0": [0, 1, true],
    "tropictree1": [1, 1, true],
    "tropictree2": [2, 1, true],
    "apple1": [3, 1, true],
    "banana1": [4, 1, true],
    "grapes1": [5, 1, true],
    "specialgrapes1": [5, 1, true],
    "avocado1": [6, 1, true],
    "mango1": [7, 1, true],
    "animalBear1": [8, 1, true],
    "lemon0": [0, 2, true],
    "blackberry0": [1, 2, true],
    "apricot0": [2, 2, true],
    "kiwi0": [3, 2, true],
    "coconut0": [4, 2, true],
    "cacao0": [5, 2, true],
    "acorn0": [6, 2, true],
    "acorn1": [6, 2, true],
    "cow": [7, 2, true],
    "ctran0": [8, 2, true],
    "lemon1": [0, 3, true],
    "blackberry1": [1, 3, true],
    "apricot1": [2, 3, true],
    "kiwi1": [3, 3, true],
    "coconut1": [4, 3, true],
    "cacao1": [5, 3, true],
    "titlecloud": [6, 3, true],
    "cloud0": [6, 3, true],
    "cowready": [7, 3, true],
    "ctran1": [8, 3, true],
    "frogbot0": [0, 4, true],
    "frogbot1": [1, 4, true],
    "frogbot2": [2, 4, true],
    "frogbot3": [3, 4, true],
    "mod0": [4, 4, true],
    "mod1": [5, 4, true],
    "mod2": [6, 4, true],
    "mod3": [7, 4, true],
    "ctran2": [8, 4, true],
    "coffee0": [0, 5, true],
    "coffee1": [1, 5, true],
    "coffee2": [2, 5, true],
    "coffee3": [3, 5, true],
    "coffee4": [4, 5, true],
    "bignet0": [5, 5, true],
    "bignet1": [6, 5, true],
    "chargerplaced": [7, 5, true],
    "bamham": [8, 5, true],
    "bigFish": [0, 6, true],
    "alignment": [1, 6, true],
    "hotspot": [2, 6, true],
    "house0": [3, 6, true],
    "house1": [4, 6, true],
    "house2": [5, 6, true],
    "house3": [6, 6, true],
    "house4": [7, 6, true],
    "hotspotsquat": [8, 6, true],
    "bigpuff0": [0, 7, true],
    "bigpuff1": [1, 7, true],
    "bigpuff2": [2, 7, true],
    "bigpuff3": [3, 7, true],
    "bigpuff4": [4, 7, true],
    "phoneico": [5, 7, true],
    "hulkFist0": [6, 7, true],
    "hulkFist1": [7, 7, true],
    "goopBig": [8, 7, true],
    "ginger0": [0, 0],
    "ginger1": [1, 0],
    "ginger2": [2, 0],
    "ginger3": [3, 0],
    "ginger": [4, 0],
    "spinach0": [5, 0],
    "spinach1": [6, 0],
    "spinach": [7, 0],
    "tomato0": [8, 0],
    "tomato1": [9, 0],
    "tomato": [10, 0],
    "garlic0": [11, 0],
    "garlic1": [12, 0],
    "garlic2": [13, 0],
    "garlic": [14, 0],
    "carrot0": [15, 0],
    "carrot1": [16, 0],
    "carrot": [17, 0],
    "bellpepper0": [18, 0],
    "bellpepper1": [19, 0],
    "bellpepper2": [20, 0],
    "bellpepper": [21, 0],
    "corn0": [22, 0],
    "corn1": [23, 0],
    "corn2": [24, 0],
    "corn": [25, 0],
    "leek0": [26, 0],
    "leek1": [27, 0],
    "leek2": [28, 0],
    "leek": [29, 0],
    "treeWA": [30, 0],
    "asparagus0": [0, 1],
    "asparagus1": [1, 1],
    "asparagus2": [2, 1],
    "asparagus3": [3, 1],
    "asparagus": [4, 1],
    "beet0": [5, 1],
    "beet1": [6, 1],
    "beet": [7, 1],
    "pineapple0": [8, 1],
    "pineapple1": [9, 1],
    "pineapple2": [10, 1],
    "pineapple3": [11, 1],
    "pineapple": [12, 1],
    "radish0": [13, 1],
    "radish1": [14, 1],
    "radish": [15, 1],
    "rhubarb0": [16, 1],
    "rhubarb1": [17, 1],
    "rhubarb2": [18, 1],
    "rhubarb3": [19, 1],
    "rhubarb": [20, 1],
    "apple": [21, 1],
    "trapple": [21, 1],
    "trapple2": [21, 1],
    "banana": [22, 1],
    "trbanana": [22, 1],
    "trbanana2": [22, 1],
    "grapes": [23, 1],
    "specialgrapes": [23, 1],
    "trgrapes": [23, 1],
    "trgrapes2": [23, 1],
    "avocado": [24, 1],
    "travocado": [24, 1],
    "travocado2": [24, 1],
    "mango": [25, 1],
    "trmango": [25, 1],
    "trmango2": [25, 1],
    "lemon": [26, 1],
    "trlemon": [26, 1],
    "trlemon2": [26, 1],
    "blackberry": [27, 1],
    "apricot": [28, 1],
    "trapricot": [28, 1],
    "trapricot2": [28, 1],
    "kiwi": [29, 1],
    "trkiwi": [29, 1],
    "trkiwi2": [29, 1],
    "treeW": [30, 1],
    "shiitake0": [0, 2],
    "shiitake1": [1, 2],
    "shiitake2": [2, 2],
    "shiitake": [3, 2],
    "milkcap0": [4, 2],
    "milkcap1": [5, 2],
    "milkcap2": [6, 2],
    "milkcap": [7, 2],
    "portobello0": [8, 2],
    "portobello1": [9, 2],
    "portobello2": [10, 2],
    "portobello": [11, 2],
    "greenshroom0": [12, 2],
    "greenshroom1": [13, 2],
    "greenshroom2": [14, 2],
    "greenshroom": [15, 2],
    "blackshroom0": [16, 2],
    "blackshroom1": [17, 2],
    "blackshroom2": [18, 2],
    "blackshroom": [19, 2],
    "poisnshroom0": [20, 2],
    "poisnshroom1": [21, 2],
    "poisnshroom2": [22, 2],
    "poisnshroom": [23, 2],
    "notdrugs0": [24, 2],
    "notdrugs1": [25, 2],
    "notdrugs2": [26, 2],
    "notdrugs": [27, 2],
    "coconut": [28, 2],
    "trcoconut": [28, 2],
    "trcoconut2": [28, 2],
    "acorn": [29, 2],
    "treeWD": [30, 2],
    "egg0": [0, 3],
    "egg": [0, 3],
    "egg1": [1, 3],
    "egg2": [2, 3],
    "egg3": [3, 3],
    "eggFly0": [4, 3],
    "eggFly1": [5, 3],
    "quail0": [6, 3],
    "quail": [6, 3],
    "quail1": [7, 3],
    "quail2": [8, 3],
    "quail3": [9, 3],
    "quailFly0": [10, 3],
    "quailFly1": [11, 3],
    "quailFlyR0": [12, 3],
    "quailFlyR1": [13, 3],
    "goose0": [14, 3],
    "goose": [14, 3],
    "goose1": [15, 3],
    "goose2": [16, 3],
    "goose3": [17, 3],
    "gooseFly0": [18, 3],
    "gooseFly1": [19, 3],
    "gooseFlyR0": [20, 3],
    "gooseFlyR1": [21, 3],
    "turkey0": [22, 3],
    "turkey": [22, 3],
    "turkey1": [23, 3],
    "turkey2": [24, 3],
    "turkey3": [25, 3],
    "turkeyFly0": [26, 3],
    "turkeyFly1": [27, 3],
    "turkeyFlyR0": [28, 3],
    "turkeyFlyR1": [29, 3],
    "treeA": [30, 3],
    "platypus0": [0, 4],
    "platypus": [0, 4],
    "platypus1": [1, 4],
    "platypus2": [2, 4],
    "platypus3": [3, 4],
    "platypusFly0": [4, 4],
    "platypusFly1": [5, 4],
    "platypusFlyR0": [6, 4],
    "platypusFlyR1": [7, 4],
    "goldegg0": [8, 4],
    "goldegg": [8, 4],
    "goldegg1": [9, 4],
    "goldegg2": [10, 4],
    "goldegg3": [11, 4],
    "goldeggFly0": [12, 4],
    "goldeggFly1": [13, 4],
    "net": [14, 4],
    "bignet": [15, 4],
    "net0": [16, 4],
    "net1": [17, 4],
    "rod": [18, 4],
    "goodrod": [19, 4],
    "metalrod": [20, 4],
    "ultrarod": [21, 4],
    "rod0": [22, 4],
    "goodrod0": [23, 4],
    "metalrod0": [24, 4],
    "ultrarod0": [25, 4],
    "fish0": [26, 4],
    "fish1": [27, 4],
    "fish2": [28, 4],
    "fish4": [29, 4],
    "tree": [30, 4],
    "arborio0": [0, 5],
    "arborio1": [1, 5],
    "arborio2": [2, 5],
    "arborio3": [3, 5],
    "arborio": [4, 5],
    "arborioB": [4, 5],
    "blackrice0": [5, 5],
    "blackrice1": [6, 5],
    "blackrice2": [7, 5],
    "blackrice3": [8, 5],
    "blackrice": [9, 5],
    "rice0": [10, 5],
    "rice1": [11, 5],
    "rice2": [12, 5],
    "rice3": [13, 5],
    "rice": [14, 5],
    "shortgrain0": [15, 5],
    "shortgrain1": [16, 5],
    "shortgrain2": [17, 5],
    "shortgrain3": [18, 5],
    "shortgrain": [19, 5],
    "chestnut0": [20, 5],
    "chestnut1": [21, 5],
    "chestnut2": [22, 5],
    "chestnut3": [23, 5],
    "chestnut": [24, 5],
    "gmocorn0": [25, 5],
    "gmocorn1": [26, 5],
    "gmocorn2": [27, 5],
    "gmocorn": [28, 5],
    "food2empty": [29, 5],
    "food2orig0": [29, 5],
    "food2kelp0": [29, 5],
    "food2coffee0": [29, 5],
    "food2salsa0": [29, 5],
    "food2gamer0": [29, 5],
    "food2cookie0": [29, 5],
    "food2black0": [29, 5],
    "food2purple0": [29, 5],
    "food2crystal0": [29, 5],
    "food2classic0": [29, 5],
    "treeD": [30, 5],
    "lotus0": [0, 6],
    "lotus1": [1, 6],
    "lotus2": [2, 6],
    "lotus3": [3, 6],
    "lotus4": [4, 6],
    "lotus": [5, 6],
    "beeBseed": [6, 6],
    "beeB0": [7, 6],
    "beeB1": [8, 6],
    "beeB": [9, 6],
    "beeRseed": [10, 6],
    "beeR0": [11, 6],
    "beeR1": [12, 6],
    "beeR": [13, 6],
    "beeGseed": [14, 6],
    "beeG0": [15, 6],
    "beeG1": [16, 6],
    "beeG": [17, 6],
    "hbeeseed": [18, 6],
    "hbee0": [19, 6],
    "hbee1": [20, 6],
    "hbee": [21, 6],
    "app0": [22, 6],
    "app1": [23, 6],
    "app2": [24, 6],
    "app3": [25, 6],
    "app": [26, 6],
    "frogbot": [27, 6],
    "frogbotFly0": [28, 6],
    "frogbotFly1": [29, 6],
    "treeSA": [30, 6],
    "drone0": [0, 7],
    "drone1": [1, 7],
    "drone2": [2, 7],
    "drone": [3, 7],
    "printer0": [4, 7],
    "printerseed": [4, 7],
    "printer": [4, 7],
    "printer1": [5, 7],
    "printer2": [6, 7],
    "printer3": [7, 7],
    "printer4": [8, 7],
    "printer5": [9, 7],
    "printerB6": [10, 7],
    "headphones0": [11, 7],
    "headphones1": [12, 7],
    "headphones2": [13, 7],
    "headphones": [14, 7],
    "battery0": [15, 7],
    "battery1": [16, 7],
    "battery2": [17, 7],
    "battery3": [18, 7],
    "battery4": [19, 7],
    "battery": [19, 7],
    "sicklebattery0": [20, 7],
    "sicklebattery": [20, 7],
    "sicklebattery1": [21, 7],
    "sicklebattery2": [22, 7],
    "sicklebattery3": [23, 7],
    "sicklebattery4": [24, 7],
    "coffeeseed": [25, 7],
    "coffee": [26, 7],
    "fodder": [27, 7],
    "goodfood": [28, 7],
    "milk": [29, 7],
    "treeS": [30, 7],
    "food2orig1": [0, 8],
    "food2classic1": [0, 8],
    "food2kelp1": [1, 8],
    "food2coffee1": [2, 8],
    "food2salsa1": [3, 8],
    "food2gamer1": [4, 8],
    "food2cookie1": [5, 8],
    "food2black1": [6, 8],
    "food2purple1": [7, 8],
    "food2crystal1": [8, 8],
    "food2barChoc0": [9, 8],
    "food2barChoc1": [10, 8],
    "food2bar1": [10, 8],
    "food2barChoc2": [11, 8],
    "food2barChoc": [12, 8],
    "food2bar0": [13, 8],
    "food2bar2": [14, 8],
    "food2bar": [15, 8],
    "food2powder0": [16, 8],
    "food2powder": [17, 8],
    "conveyorL": [18, 8],
    "conveyorM": [19, 8],
    "conveyorEnd": [20, 8],
    "conveyorR": [21, 8],
    "soybean0": [22, 8],
    "soybean1": [23, 8],
    "soybean2": [24, 8],
    "soybean3": [25, 8],
    "soybean4": [26, 8],
    "soybean": [27, 8],
    "food2full": [28, 8],
    "cacao": [29, 8],
    "treeSD": [30, 8],
    "food2orig2": [0, 9],
    "food2classic2": [0, 9],
    "food2kelp2": [1, 9],
    "food2coffee2": [2, 9],
    "food2salsa2": [3, 9],
    "food2gamer2": [4, 9],
    "food2cookie2": [5, 9],
    "food2black2": [6, 9],
    "food2purple2": [7, 9],
    "food2crystal2": [8, 9],
    "soybaby0": [9, 9],
    "soybaby1": [10, 9],
    "soybaby2": [11, 9],
    "soybaby3": [12, 9],
    "soybaby4": [13, 9],
    "soybaby": [14, 9],
    "timebomb0": [15, 9],
    "timebomb1": [16, 9],
    "timebomb2": [17, 9],
    "timebomb3": [18, 9],
    "timebomb": [18, 9],
    "shotgun0": [19, 9],
    "shotgun1": [20, 9],
    "shotgun2": [21, 9],
    "shotgun3": [22, 9],
    "shotgun": [23, 9],
    "download0": [24, 9],
    "download1": [25, 9],
    "download2": [26, 9],
    "download3": [27, 9],
    "download4": [28, 9],
    "download": [29, 9],
    "caveTTop": [30, 9],
    "food2orig3": [0, 10],
    "food2classic3": [0, 10],
    "food2kelp3": [1, 10],
    "food2coffee3": [2, 10],
    "food2salsa3": [3, 10],
    "food2gamer3": [4, 10],
    "food2cookie3": [5, 10],
    "food2black3": [6, 10],
    "food2purple3": [7, 10],
    "food2crystal3": [8, 10],
    "airfilter0": [9, 10],
    "airfilter1": [10, 10],
    "airfilter2": [11, 10],
    "airfilter3": [12, 10],
    "airfilter4": [13, 10],
    "airfilter": [13, 10],
    "gastank0": [14, 10],
    "gastank1": [15, 10],
    "gastank2": [16, 10],
    "gastank3": [17, 10],
    "gastank": [17, 10],
    "dipstick0": [18, 10],
    "dipstick1": [19, 10],
    "dipstick2": [20, 10],
    "dipstick": [21, 10],
    "bananaPill0": [22, 10],
    "bananaPill1": [23, 10],
    "bananaPill2": [24, 10],
    "bananaPill3": [25, 10],
    "bananaPill": [26, 10],
    "batterysalt0": [27, 10],
    "batterysalt": [27, 10],
    "batterysalt1": [28, 10],
    "batterysalt2": [29, 10],
    "caveT": [30, 10],
    "food2orig4": [0, 11],
    "food2orig": [0, 11],
    "food2classic4": [0, 11],
    "food2classic": [0, 11],
    "food2kelp4": [1, 11],
    "food2kelp": [1, 11],
    "food2coffee4": [2, 11],
    "food2coffee": [2, 11],
    "food2salsa4": [3, 11],
    "food2salsa": [3, 11],
    "food2gamer4": [4, 11],
    "food2gamer": [4, 11],
    "food2cookie4": [5, 11],
    "food2cookie": [5, 11],
    "food2black4": [6, 11],
    "food2black": [6, 11],
    "food2purple4": [7, 11],
    "food2purple": [7, 11],
    "food2crystal4": [8, 11],
    "food2crystal": [8, 11],
    "bpermit0": [9, 11],
    "bpermit1": [10, 11],
    "bpermit2": [11, 11],
    "bpermit3": [12, 11],
    "bpermit": [12, 11],
    "lightbulb0": [13, 11],
    "lightbulb1": [14, 11],
    "lightbulb": [14, 11],
    "burrito0": [15, 11],
    "burrito": [15, 11],
    "dango0": [16, 11],
    "dango": [16, 11],
    "taco0": [17, 11],
    "taco": [17, 11],
    "kombucha0": [18, 11],
    "kombucha": [18, 11],
    "porcini0": [19, 11],
    "porcini1": [20, 11],
    "porcini2": [21, 11],
    "porcini": [22, 11],
    "tire0": [23, 11],
    "tire1": [23, 11],
    "tire": [23, 11],
    "engine0": [24, 11],
    "house": [25, 11],
    "arborioB0": [26, 11],
    "arborioB1": [27, 11],
    "arborioB2": [28, 11],
    "arborioB3": [29, 11],
    "caveTBottom": [30, 11],
    "char0": [0, 12],
    "defchar0": [1, 12],
    "char1": [2, 12],
    "defchar1": [3, 12],
    "char2": [4, 12],
    "defchar2": [5, 12],
    "char3": [6, 12],
    "defchar3": [7, 12],
    "char4": [8, 12],
    "defchar4": [9, 12],
    "elem0": [10, 12],
    "elem1": [11, 12],
    "elem2": [12, 12],
    "elem3": [13, 12],
    "fx0": [14, 12],
    "fx1": [15, 12],
    "fx2": [16, 12],
    "fx3": [17, 12],
    "fx4": [18, 12],
    "kelp0": [19, 12],
    "kelp1": [20, 12],
    "kelp2": [21, 12],
    "kelp3": [22, 12],
    "kelp4": [23, 12],
    "kelp": [23, 12],
    "algae0": [24, 12],
    "algae1": [25, 12],
    "algae": [25, 12],
    "mushNerf": [26, 12],
    "riceNerf": [27, 12],
    "treeNerf": [28, 12],
    "vegNerf": [29, 12],
    "trapple0": [30, 12],
    "inv_power": [0, 13],
    "inv_time": [1, 13],
    "inv_regrow": [2, 13],
    "spring0": [3, 13],
    "summer0": [4, 13],
    "autumn0": [5, 13],
    "winter0": [6, 13],
    "spring1": [7, 13],
    "summer1": [8, 13],
    "autumn1": [9, 13],
    "winter1": [10, 13],
    "spring2": [11, 13],
    "season0": [11, 13],
    "summer2": [12, 13],
    "season1": [12, 13],
    "autumn2": [13, 13],
    "season2": [13, 13],
    "winter2": [14, 13],
    "season3": [14, 13],
    "curseason2": [15, 13],
    "curseason1": [16, 13],
    "curseason0": [17, 13],
    "starNone": [18, 13],
    "starHalf": [19, 13],
    "starFull": [20, 13],
    "starMax": [21, 13],
    "animCoin0": [22, 13],
    "animCoin1": [23, 13],
    "animCoin2": [24, 13],
    "animCoin3": [25, 13],
    "fishNerf": [26, 13],
    "beeNerf": [27, 13],
    "eggNerf": [28, 13],
    "reNerf": [29, 13],
    "trapple1": [30, 13],
    "waterIco1": [0, 14],
    "waterIco2": [1, 14],
    "fireIco1": [2, 14],
    "fireIco2": [3, 14],
    "saltIco1": [4, 14],
    "saltIco2": [5, 14],
    "saltIcoX": [6, 14],
    "stunIco1": [7, 14],
    "stunIco2": [8, 14],
    "stunIco3": [9, 14],
    "bigNum1": [10, 14],
    "bigNum2": [10.5, 14],
    "bigNum3": [11, 14],
    "bigNum4": [11.5, 14],
    "bigNum5": [12, 14],
    "bigNum6": [12.5, 14],
    "bigNum7": [13, 14],
    "bigNum8": [13.5, 14],
    "bigNum9": [14, 14],
    "bigNum0": [14.5, 14],
    "bigNum?": [15, 14],
    "bigNumW1": [16, 14],
    "bigNumW2": [16.5, 14],
    "bigNumW3": [17, 14],
    "bigNumW4": [17.5, 14],
    "bigNumW5": [18, 14],
    "bigNumW6": [18.5, 14],
    "bigNumW7": [19, 14],
    "bigNumW8": [19.5, 14],
    "bigNumW9": [20, 14],
    "bigNumW0": [20.5, 14],
    "bigNumW?": [21, 14],
    "alignmentcursor": [22, 14],
    "goldmushroom": [23, 14],
    "monsterheart": [24, 14],
    "monsteregg": [25, 14],
    "seamonkkey": [26, 14],
    "smartphone": [28, 14],
    "food2keycard": [29, 14],
    "trbanana0": [30, 14],
    "!babySickle": [0, 15],
    "!baseSickle": [1, 15],
    "!goodSickle": [2, 15],
    "!dblSickle": [3, 15],
    "!hvySickle": [4, 15],
    "!hoe": [5, 15],
    "!salthoe": [6, 15],
    "!sicklerang": [7, 15],
    "!sunSickle": [8, 15],
    "!pltSickle": [9, 15],
    "!sickle2": [10, 15],
    "!weakCompost": [11, 15],
    "!baseCompost": [12, 15],
    "!strongCompost": [13, 15],
    "!sturdyCompost": [14, 15],
    "!jumboCompost": [15, 15],
    "!vitaminCompost": [16, 15],
    "!compost2": [17, 15],
    "!weakGloves": [18, 15],
    "!pairGloves": [19, 15],
    "!gardenGloves": [20, 15],
    "!sbGloves": [21, 15],
    "!gloves2": [22, 15],
    "!weakSoil": [23, 15],
    "!speedSoil": [24, 15],
    "!sturdSoil": [25, 15],
    "!minSoil": [26, 15],
    "!waterfall": [27, 15],
    "!immunity": [28, 15],
    "!seasonal": [29, 15],
    "trbanana1": [30, 15],
    "!pesticide2": [0, 16],
    "_log": [1, 16],
    "fixtures": [1, 16],
    "_logBurned": [2, 16],
    "_coop": [3, 16],
    "_coopBurned": [4, 16],
    "_beehive": [5, 16],
    "_beehiveBurned": [6, 16],
    "_strongsoil": [7, 16],
    "_shooter": [8, 16],
    "_shooterClosed": [9, 16],
    "_modulator": [10, 16],
    "_sprinkler": [11, 16],
    "rock": [12, 16],
    "rock0": [12, 16],
    "rock1": [12, 16],
    "salt": [13, 16],
    "salt0": [13, 16],
    "salt1": [13, 16],
    "burned": [14, 16],
    "_charger": [15, 16],
    "_cow": [16, 16],
    "_paddy": [17, 16],
    "splashed": [18, 16],
    "shocked": [19, 16],
    "puff0": [20, 16],
    "puff1": [21, 16],
    "puff2": [22, 16],
    "puff3": [23, 16],
    "puff4": [24, 16],
    "fireBall0": [25, 16],
    "fireBall1": [26, 16],
    "fireDiag0": [27, 16],
    "fireBurn0": [28, 16],
    "fireBurn1": [29, 16],
    "trgrapes0": [30, 16],
    "waterDrop0": [0, 17],
    "waterDrop1": [1, 17],
    "waterDiag0": [2, 17],
    "splashed0": [3, 17],
    "splashed1": [4, 17],
    "saltShaker0": [5, 17],
    "saltShaker1": [6, 17],
    "saltDiag0": [7, 17],
    "vein": [8, 17],
    "rotSparkle": [9, 17],
    "alms": [10, 17],
    "holywater": [11, 17],
    "holyjug": [12, 17],
    "inv_HP": [13, 17],
    "sleep": [14, 17],
    "exit": [15, 17],
    "talk": [16, 17],
    "sell": [17, 17],
    "tools": [18, 17],
    "arrowL": [19, 17],
    "arrowR": [20, 17],
    "farmupgradeI-n": [21, 17],
    "farmupgrade_-I": [22, 17],
    "farmupgradeO-I": [23, 17],
    "farmupgrade__-_": [24, 17],
    "farmupgradeOO-O": [25, 17],
    "farmupgrade__-O": [26, 17],
    "farmupgradeOO-_": [27, 17],
    "weed": [28, 17],
    "compostpile": [29, 17],
    "trgrapes1": [30, 17],
    "book0": [0, 18],
    "book1": [1, 18],
    "book2": [2, 18],
    "book3": [3, 18],
    "book4": [4, 18],
    "book5": [5, 18],
    "bookOpenL": [6, 18],
    "bookOpenR": [7, 18],
    "animBin0": [8, 18],
    "animBin1": [9, 18],
    "animBin2": [10, 18],
    "animBin3": [11, 18],
    "animBin4": [12, 18],
    "animBin5": [13, 18],
    "recycleArrow": [14, 18],
    "recSelL": [15, 18],
    "recSelM": [16, 18],
    "recSelR": [17, 18],
    "selL": [18, 18],
    "selM": [19, 18],
    "selR": [20, 18],
    "SselM": [21, 18],
    "SselR": [22, 18],
    "infoUL": [23, 18],
    "infoU": [24, 18],
    "infoUR": [25, 18],
    "lakeD": [26, 18],
    "lakeAD": [27, 18],
    "lakeA": [28, 18],
    "_lake": [29, 18],
    "travocado0": [30, 18],
    "grassTop": [0, 19],
    "seaGrassTop": [1, 19],
    "techGrassTop": [2, 19],
    "roadGrassTop": [3, 19],
    "hqGrassTop": [4, 19],
    "cybertile": [5, 19],
    "grilltile": [6, 19],
    "x": [7, 19],
    "pointer0": [8, 19],
    "pointer1": [9, 19],
    "pointer5": [9, 19],
    "pointer2": [10, 19],
    "pointer3": [11, 19],
    "pointer4": [12, 19],
    "carrotSel": [13, 19],
    "titleSel0": [14, 19],
    "titleSel1": [15, 19],
    "titleSel2": [16, 19],
    "titleSelActive0": [17, 19],
    "titleSelActive1": [18, 19],
    "titleSelActive2": [19, 19],
    "spear": [20, 19],
    "cheese0": [21, 19],
    "cheese": [21, 19],
    "seeds": [22, 19],
    "infoL": [23, 19],
    "helpBox": [24, 19],
    "infoR": [25, 19],
    "lakeS": [26, 19],
    "lakeDS": [27, 19],
    "lakeASD": [28, 19],
    "lakeAS": [29, 19],
    "travocado1": [30, 19],
    "grass": [0, 20],
    "seaGrass": [1, 20],
    "techGrass": [2, 20],
    "roadGrass": [3, 20],
    "hqGrass": [4, 20],
    "roadtile": [5, 20],
    "cursor0.0": [6, 20],
    "cursor0.1": [7, 20],
    "cursor1.0": [8, 20],
    "cursor1.1": [9, 20],
    "bcursor0.0": [10, 20],
    "bcursor0.1": [11, 20],
    "bcursor1.0": [12, 20],
    "bcursor1.1": [13, 20],
    "xcursor0.0": [14, 20],
    "xcursor0.1": [15, 20],
    "opL": [16, 20],
    "opR": [17, 20],
    "forestTransition0": [18, 20],
    "forestTransition1": [19, 20],
    "forestTransition2": [20, 20],
    "forestTransition3": [21, 20],
    "forestTransition4": [22, 20],
    "infoDL": [23, 20],
    "infoD": [24, 20],
    "infoDR": [25, 20],
    "lakeWS": [26, 20],
    "lakeWSD": [27, 20],
    "lakeWASD": [28, 20],
    "lakeWAS": [29, 20],
    "trmango0": [30, 20],
    "grassBottom": [0, 21],
    "seaGrassBottom": [1, 21],
    "techGrassBottom": [2, 21],
    "roadGrassBottom": [3, 21],
    "hqGrassBottom": [4, 21],
    "_hotspot": [5, 21],
    "tech": [5, 21],
    "cursor0.2": [6, 21],
    "cursor0.3": [7, 21],
    "cursor1.2": [8, 21],
    "cursor1.3": [9, 21],
    "bcursor0.2": [10, 21],
    "bcursor0.3": [11, 21],
    "bcursor1.2": [12, 21],
    "bcursor1.3": [13, 21],
    "xcursor0.2": [14, 21],
    "xcursor0.3": [15, 21],
    "nopL": [16, 21],
    "nopR": [17, 21],
    "robobabby0": [18, 21],
    "robobabby1": [19, 21],
    "robobabby2": [20, 21],
    "robobabby3": [21, 21],
    "robobabby": [21, 21],
    "seasonbar0": [22, 21],
    "seasonbar1": [23, 21],
    "seasonbar2": [24, 21],
    "seasonbar3": [25, 21],
    "lakeW": [26, 21],
    "lakeWD": [27, 21],
    "lakeWAD": [28, 21],
    "lakeWA": [29, 21],
    "trmango1": [30, 21],
    "GP0": [0, 22],
    "GP1": [1, 22],
    "GP2": [2, 22],
    "GP3": [3, 22],
    "GP4": [4, 22],
    "GP5": [5, 22],
    "GP6": [6, 22],
    "GP7": [7, 22],
    "GP8": [8, 22],
    "GP9": [9, 22],
    "GP10": [10, 22],
    "GP11": [11, 22],
    "GP12": [12, 22],
    "GP13": [13, 22],
    "GP14": [14, 22],
    "GP15": [15, 22],
    "GamepadA0": [16, 22],
    "GamepadA1": [17, 22],
    "GamepadA4": [18, 22],
    "GamepadA5": [19, 22],
    "GamepadA2": [20, 22],
    "GamepadA3": [21, 22],
    "GamepadA6": [22, 22],
    "GamepadA7": [23, 22],
    "seasonico": [24, 22],
    "animalDuck0": [25, 22],
    "animalDuck1": [26, 22],
    "edgeWA": [27, 22],
    "edgeW": [28, 22],
    "edgeWD": [29, 22],
    "trlemon0": [30, 22],
    "a.boss1": [0, 23],
    "a.lakeFairy": [1, 23],
    "a.goldshroom": [2, 23],
    "a.badrabbit": [3, 23],
    "a.limeTime": [4, 23],
    "a.RAPBATTLE": [5, 23],
    "a.boss2": [6, 23],
    "a.dowel": [7, 23],
    "a.kelpBuddy": [8, 23],
    "a.boss3hurt": [9, 23],
    "a.boss3help": [10, 23],
    "a.crouton": [11, 23],
    "a.unplugged": [12, 23],
    "a.boss4": [13, 23],
    "a.skumpy": [14, 23],
    "a.abuelita": [15, 23],
    "a.bossMob": [16, 23],
    "a.stonehenge": [17, 23],
    "a.laila": [18, 23],
    "a.bankStop": [19, 23],
    "a.boss5": [20, 23],
    "a.helpNerd": [21, 23],
    "a.abee": [22, 23],
    "a.techGood": [23, 23],
    "a.techBad": [24, 23],
    "a.natureGood": [25, 23],
    "a.natureBad": [26, 23],
    "edgeA": [27, 23],
    "dirt": [28, 23],
    "edgeD": [29, 23],
    "trlemon1": [30, 23],
    "a.donthave": [0, 24],
    "a.vegan": [1, 24],
    "a.beeKing": [2, 24],
    "a.luddite": [3, 24],
    "a.springKing": [4, 24],
    "a.summerHummer": [5, 24],
    "a.autumnBottom": [6, 24],
    "a.winterHinter": [7, 24],
    "a.vegbuddy": [8, 24],
    "a.treebuddy": [9, 24],
    "a.mushbuddy": [10, 24],
    "a.eggbuddy": [11, 24],
    "a.ricebuddy": [12, 24],
    "a.beebuddy": [13, 24],
    "a.seabuddy": [14, 24],
    "a.cowbuddy": [15, 24],
    "a.techbuddy": [16, 24],
    "a.biglaunch": [17, 24],
    "a.soybeat": [18, 24],
    "a.fullUpgrade": [19, 24],
    "a.allCrop": [20, 24],
    "a.overkill": [21, 24],
    "a.madeForMe": [22, 24],
    "a.murderedToDeath": [23, 24],
    "BearIco": [24, 24],
    "vineAnimT.0": [25, 24],
    "vineAnimT.1": [26, 24],
    "edgeSA": [27, 24],
    "edgeS": [28, 24],
    "edgeSD": [29, 24],
    "trapricot0": [30, 24],
    "hp14": [0, 25],
    "hp13": [1, 25],
    "hp12": [2, 25],
    "hp11": [3, 25],
    "hp10": [4, 25],
    "hp9": [5, 25],
    "hp8": [6, 25],
    "hp7": [7, 25],
    "hp6": [8, 25],
    "hp5": [9, 25],
    "hp4": [10, 25],
    "hp3": [11, 25],
    "hp2": [12, 25],
    "hp1": [13, 25],
    "hp0": [13, 25],
    "hgoop": [14, 25],
    "goopdrop": [15, 25],
    "animalRabbit0": [16, 25],
    "animalRabbit1": [17, 25],
    "phone1": [18, 25],
    "phone2": [19, 25],
    "phone3": [20, 25],
    "phone4": [21, 25],
    "animalWorm0": [22, 25],
    "chargingBayUL": [23, 25],
    "chargingBayUR": [24, 25],
    "vineAnim0.0": [25, 25],
    "vineAnim0.1": [26, 25],
    "wedgeWA": [27, 25],
    "wedgeW": [28, 25],
    "wedgeWD": [29, 25],
    "trapricot1": [30, 25],
    "appleseed": [0, 26],
    "bananaseed": [1, 26],
    "gingerseed": [2, 26],
    "grapesseed": [3, 26],
    "spinachseed": [4, 26],
    "soybeanseed": [4, 26],
    "tomatoseed": [5, 26],
    "garlicseed": [6, 26],
    "carrotseed": [7, 26],
    "bellpepperseed": [8, 26],
    "cornseed": [9, 26],
    "avocadoseed": [10, 26],
    "mangoseed": [11, 26],
    "lemonseed": [12, 26],
    "blackberryseed": [13, 26],
    "pineappleseed": [14, 26],
    "apricotseed": [15, 26],
    "radishseed": [16, 26],
    "kiwiseed": [17, 26],
    "rhubarbseed": [18, 26],
    "asparagusseed": [19, 26],
    "beetseed": [20, 26],
    "leekseed": [21, 26],
    "animalWorm1": [22, 26],
    "chargingBayLL": [23, 26],
    "chargingBayLR": [24, 26],
    "vineAnim1.0": [25, 26],
    "vineAnim1.1": [26, 26],
    "wedgeA": [27, 26],
    "watertile": [28, 26],
    "wedgeD": [29, 26],
    "trkiwi0": [30, 26],
    "shiitakeseed": [0, 27],
    "milkcapseed": [1, 27],
    "portobelloseed": [2, 27],
    "greenshroomseed": [3, 27],
    "blackshroomseed": [4, 27],
    "poisnshroomseed": [5, 27],
    "arborioseed": [6, 27],
    "blackriceseed": [7, 27],
    "riceseed": [8, 27],
    "shortgrainseed": [9, 27],
    "chestnutseed": [10, 27],
    "coconutseed": [11, 27],
    "cacaoseed": [11, 27],
    "gmocornseed": [12, 27],
    "notdrugsseed": [13, 27],
    "lotusseed": [14, 27],
    "saffronseed": [14, 27],
    "invBox": [15, 27],
    "invTile": [16, 27],
    "toolRack": [17, 27],
    "animalMonkey0": [18, 27],
    "animalMonkey1": [19, 27],
    "animalFrog0": [20, 27],
    "animalFrog1": [21, 27],
    "animalSlug0": [22, 27],
    "animalSlug1": [23, 27],
    "slugTrail": [24, 27],
    "vineAnim2.0": [25, 27],
    "vineAnim2.1": [26, 27],
    "wedgeSA": [27, 27],
    "wedgeS": [28, 27],
    "wedgeSD": [29, 27],
    "trkiwi1": [30, 27],
    "trans0": [0, 28],
    "trans1": [1, 28],
    "trans2": [2, 28],
    "trans3": [3, 28],
    "trans4": [4, 28],
    "trans5": [5, 28],
    "trans6": [6, 28],
    "trans7": [7, 28],
    "trans8": [8, 28],
    "trans9": [9, 28],
    "trans10": [10, 28],
    "trans11": [11, 28],
    "trans12": [12, 28],
    "trans13": [13, 28],
    "trans14": [14, 28],
    "trans15": [15, 28],
    "trans16": [16, 28],
    "trans17": [17, 28],
    "trans18": [18, 28],
    "trans19": [19, 28],
    "transZzz": [20, 28],
    "transWake": [21, 28],
    "printerB0": [22, 28],
    "printerB1": [23, 28],
    "printerB2": [24, 28],
    "vineAnim3.0": [25, 28],
    "vineAnim3.1": [26, 28],
    "numStart": [27, 28],
    "numEnd": [28, 28],
    "optTile": [29, 28],
    "trcoconut0": [30, 28],
    "clakeWA": [0, 29],
    "clakeWD": [1, 29],
    "clakeSA": [2, 29],
    "clakeSD": [3, 29],
    "boom4": [4, 29],
    "boom3": [5, 29],
    "boom2": [6, 29],
    "boom1": [7, 29],
    "boom0": [8, 29],
    "saffron0": [9, 29],
    "saffron1": [10, 29],
    "saffron2": [11, 29],
    "butterflyL0": [12, 29],
    "butterflyL1": [13, 29],
    "butterflyRR0": [14, 29],
    "butterflyRR1": [15, 29],
    "beeL0": [16, 29],
    "beeL1": [17, 29],
    "beeRR0": [18, 29],
    "beeRR1": [19, 29],
    "saffron": [20, 29],
    "printerB3": [21, 29],
    "printerB4": [22, 29],
    "printerB5": [23, 29],
    "printerB6": [24, 29],
    "vineBottom0": [25, 29],
    "vineBottom1": [26, 29],
    "tutArrow": [27, 29],
    "opArrDown": [28, 29],
    "opArrUp": [29, 29],
    "trcoconut1": [30, 29],
    "dodo0": [0, 30],
    "dodo1": [1, 30],
    "dodo2": [2, 30],
    "dodo3": [3, 30],
    "dodoFlyR0": [4, 30],
    "dodoFlyR1": [5, 30],
    "dt4": [6, 30],
    "dt3": [7, 30],
    "dt2": [8, 30],
    "dt1": [9, 30],
    "dt0": [10, 30],
    "dpadMain": [11, 30],
    "analogMain": [12, 30],
    "battleUIL": [13, 30],
    "battleUIR": [14, 30],
    "battleUISelL": [15, 30],
    "battleUISelR": [16, 30],
    "FarmInfoUL": [17, 30],
    "FarmInfoU": [18, 30],
    "FarmInfoUR": [19, 30],
    "MetalInfoUL": [20, 30],
    "MetalInfoU": [21, 30],
    "MetalInfoUR": [22, 30],
    "paddyA": [23, 30],
    "paddyD": [24, 30],
    "FarmInfoL": [17, 31],
    "FarmInfoR": [19, 31],
    "MetalInfoL": [20, 31],
    "MetalInfoR": [22, 31],
    "FarmInfoDL": [17, 32],
    "FarmInfoD": [18, 32],
    "FarmInfoDR": [19, 32],
    "MetalInfoDL": [20, 32],
    "MetalInfoD": [21, 32],
    "MetalInfoDR": [22, 32],
    "tooLazyToWriteCodeToTrimTheLastCommaRightNow": []
};