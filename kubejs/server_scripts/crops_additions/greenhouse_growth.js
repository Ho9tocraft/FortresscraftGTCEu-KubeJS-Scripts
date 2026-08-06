/**
 * Appending GTCA's Green House Recipes
 */

ServerEvents.recipes(event => {
    // Green House recipes
    const { green_house: GTFarm } = event.recipes.gtceu;
    console.log(Object.keys(event.recipes.gtceu).find(item => /green_?house/i.test(item)));

    /**
     * 
     * @param {Array} source 
     * @param {Array} target 
     */
    const arrayIncludes = (source, target) => {
        let result = false;
        source.forEach(srcCmp => {
            if (result) return;
            target.forEach(tgtCmp => {
                if (result) return;
                if (srcCmp === tgtCmp) {
                    result = true;
                    return;
                }
            });
        });
        return result;
    };

    // Appending Mystical Agriculture Series Crops Queue
    const MystAgriCrops = {
        Tier1: [
            'air', 'earth', 'water', 'fire', 'inferium', 'stone',
            'dirt', 'wood', 'ice', 'deepslate'
        ],
        Tier2: [
            'nature', 'dye', 'nether', 'coal', 'coral', 'honey',
            'amethyst', 'pig', 'chicken', 'cow', 'sheep', 'squid',
            'fish', 'slime', 'turtle', 'silicon', 'sulfur', 'aluminum',
            'saltpeter', 'apatite', 'mystical_flower', 'limestone', 'basalt'
        ],
        Tier3: [
            'iron', 'copper', 'nether_quartz', 'glowstone', 'redstone', 'obsidian',
            'prismarine', 'zombie', 'skeleton', 'creeper', 'spider', 'rabbit',
            'tin', 'bronze', 'zinc', 'brass', 'silver', 'lead',
            'blizz', 'blitz', 'basalz', 'manasteel', 'steeleaf', 'ironwood',
            'sky_stone', 'certus_quartz', 'proudsoul'
        ],
        Tier4: [
            'gold', 'lapis_lazuli', 'end', 'experience', 'blaze', 'ghast',
            'enderman', 'steel', 'nickel', 'constantan', 'electrum', 'invar',
            'mithril', 'tungsten', 'titanium', 'uranium', 'ruby', 'sapphire',
            'peridot', 'soulium', 'signalum', 'lumium', 'elementium', 'osmium',
            'fluorite', 'refined_glowstone', 'refined_obsidian', 'knightmetal', 'fiery_ingot', 'fluix'
        ],
        Tier5: [
            'diamond', 'emerald', 'netherite', 'wither_skeleton', 'platinum', 'iridium',
            'enderium', 'terrasteel'
        ],
        Tier6: [
            'nether_star', 'dragon_egg', 'gaia_spirit', 'neutronium'
        ]
    };
    const outCountByTiers = {
        Tier1: 32,
        Tier2: 16,
        Tier3: 8,
        Tier4: 4,
        Tier5: 2,
        Tier6: 1
    };
    if (!(typeof GTFarm === 'function')) return;

    // Execute Mystical Agriculture Series Crops Recipe Appends
    Object.keys(MystAgriCrops).forEach(tier => {
        const tgtArray = MystAgriCrops[tier];
        tgtArray.forEach(crop => {
            GTFarm(crop)
                .notConsumable(`mysticalagriculture:${crop}_seeds`)
                .circuit(1)
                .inputFluids('minecraft:water 1000')
                .itemOutputs(`${outCountByTiers[tier]}x mysticalagriculture:${crop}_essence`)
                .chancedOutput('mysticalagriculture:fertilized_essence', 500, 100)
                .EUt(GTValues.VHA[GTValues.MV])
                .duration(1200);
            GTFarm(`${crop}_fertilizer`)
                .itemInputs('4x gtceu:fertilizer')
                .notConsumable(`mysticalagriculture:${crop}_seeds`)
                .circuit(2)
                .inputFluids('minecraft:water 1000')
                .itemOutputs(`${outCountByTiers[tier] * 2}x mysticalagriculture:${crop}_essence`)
                .chancedOutput('2x mysticalagriculture:fertilized_essence', 1000, 100)
                .EUt(GTValues.VHA[GTValues.MV])
                .duration(900);
        });
    });

    // Appending Pam's Harvestcraft 2 Crops Queue
    const PamHC2Crops = [
        'agave', 'amaranth', 'arrowroot', 'artichoke', 'asparagus', 'barley', 'bean', 'bellpepper',
        'blackberry', 'blueberry', 'broccoli', 'brusselsprout', 'cabbage', 'cactusfruit', 'candleberry',
        'cantaloupe', 'cassava', 'cauliflower', 'celery', 'chickpea', 'chilipepper', 'coffeebean',
        'corn', 'cotton', 'cranberry', 'cucumber', 'eggplant', 'elderberry', 'flax', 'garlic', 'ginger',
        'grape', 'greengrape', 'huckleberry', 'jicama', 'juniperberry', 'jute', 'kale', 'kenaf', 'kiwi',
        'kohlrabi', 'leek', 'lentil', 'lettuce', 'millet', 'mulberry', 'mustardseeds', 'oats', 'okra',
        'onion', 'parsnip', 'peanut', 'peas', 'pineapple', 'quinoa', 'radish', 'raspberry', 'rhubarb',
        'rice', 'rutabaga', 'rye', 'scallion', 'sesameseeds', 'sisal', 'soybean', 'spiceleaf', 'spinach',
        'strawberry', 'sweetpotato', 'taro', 'tealeaf', 'tomatillo', 'tomato', 'turnip', 'waterchestnut',
        'whitemushroom', 'wintersquash', 'zucchini', 'alfalfa', 'aloe', 'barrelcactus', 'canola',
        'cattail', 'chia', 'cloudberry', 'lotus', 'nettles', 'nopales', 'sorghum', 'truffle',
        'wolfberry', 'yucca', 'bokchoy', 'calabash', 'guarana', 'papyrus', 'sunchoke'
    ];
    // Appending Pam's Harvestcraft 2 Trees Queue
    const PamHC2Trees = [
        'apple', 'avocado', 'candlenut', 'cherry', 'chestnut', 'gooseberry', 'lemon', 'nutmeg', 'orange',
        'peach', 'pear', 'plum', 'walnut', 'spiderweb', 'hazelnut', 'pawpaw', 'soursop', 'acorn',
        'almond', 'apricot', 'banana', 'cashew', 'cinnamon', 'coconut', 'date', 'dragonfruit', 'durian',
        'fig', 'grapefruit', 'lime', 'mango', 'olive', 'papaya', 'paperbark', 'pecan', 'peppercorn',
        'persimmon', 'pistachio', 'pomegranate', 'starfruit', 'vanillabean', 'breadfruit', 'guava',
        'jackfruit', 'lychee', 'passionfruit', 'rambutan', 'tamarind', 'maple', 'pinenut'
    ];
    const detectPamTreeWoods = [
        'almond', 'apricot', 'banana', 'cashew', 'date', 'dragonfruit', 'hazelnut', 'jackfruit',
        'maple', 'nutmeg', 'olive', 'passionfruit', 'pecan', 'peppercorn', 'pistachio', 'cherry',
        'tamarind', 'vanillabean', 'walnut'
    ];

    /**
     * Detect if Tree-type outputs Jungle Log
     * @param {string} tree 
     * @returns 
     */
    const outLogJungle = (tree) => {
        return (
            tree === 'avocado' || tree === 'coconut' || tree === 'durian' || tree === 'fig' ||
            tree === 'grapefruit' || tree === 'lime' || tree === 'mango' || tree === 'papaya' ||
            tree === 'persimmon' || tree === 'pomegranate' || tree === 'starfruit' ||
            tree === 'breadfruit' || tree === 'guava' || tree === 'lychee' || tree === 'rambutan' ||
            tree === 'tamarind'
        );
    };

    // Execute Pam's Harvestcraft 2 Crops Recipe Appends
    PamHC2Crops.forEach(crop => {
        GTFarm(crop)
            .notConsumable(`pamhc2crops:${crop}seeditem`)
            .circuit(1)
            .inputFluids('minecraft:water 1000')
            .itemOutputs(`16x pamhc2crops:${crop}item`)
            .EUt(GTValues.VHA[GTValues.MV])
            .duration(1200);
        GTFarm(`${crop}_fertilizer`)
            .itemInputs('4x gtceu:fertilizer')
            .notConsumable(`pamhc2crops:${crop}seeditem`)
            .circuit(2)
            .inputFluids('minecraft:water 1000')
            .itemOutputs(`32x pamhc2crops:${crop}item`)
            .EUt(GTValues.VHA[GTValues.MV])
            .duration(900);
    });
    // Execute Pam's Harvestcraft 2 Trees Recipe Appends
    PamHC2Trees.forEach(tree => {
        // Crop and log construct
        const resultCrop = tree === 'apple' ? 'minecraft:apple'
            : tree === 'spiderweb' ? 'minecraft:string'
                : tree === 'paperbark' ? 'minecraft:paper'
                    : tree === 'maple' ? 'pamhc2trees:maplesyrupitem'
                        : `pamhc2trees:${tree}item`;
        const resultLog = detectPamTreeWoods.indexOf(tree) !== -1 ?
            (tree === 'cherry' ? `pamtreewood:red_cherry_log` :
                `pamtreewood:${tree}_log`)
            : tree === 'cinnamon' ? 'pamhc2trees:pamcinnamon'
                : tree === 'paperbark' ? 'pamhc2trees:pampaperbark'
                    : tree === 'pinenut' ? 'minecraft:spruce_log'
                        : outLogJungle(tree) ? 'minecraft:jungle_log'
                            : 'minecraft:oak_log';
        console.log(`${tree}: ${resultCrop} ${resultLog}`);
        // Execute
        GTFarm(tree)
            .notConsumable(`pamhc2trees:${tree}_sapling`)
            .circuit(1)
            .inputFluids('minecraft:water 1000')
            .itemOutputs(`32x ${resultLog}`, `6x ${resultCrop}`)
            .EUt(GTValues.VHA[GTValues.MV])
            .duration(1200);
        GTFarm(`${tree}_fertilizer`)
            .itemInputs('4x gtceu:fertilizer')
            .notConsumable(`pamhc2trees:${tree}_sapling`)
            .circuit(2)
            .inputFluids('minecraft:water 1000')
            .itemOutputs(`64x ${resultLog}`, `12x ${resultCrop}`)
            .EUt(GTValues.VHA[GTValues.MV])
            .duration(900);
    });
});
