// Industrial Foregoing
ServerEvents.recipes(event => {
    const GT = event.recipes.gtceu;
    const IFMachineFrame = {
        PITY: 'industrialforegoing:machine_frame_pity',
        SIMPLE: 'industrialforegoing:machine_frame_simple',
        ADVANCED: 'industrialforegoing:machine_frame_advanced',
        SUPREME: 'industrialforegoing:machine_frame_supreme'
    };
    const plasticType = ['industrialforegoing:plastic', '#forge:plates/polyethylene', '#forge:plates/polytetrafluoroethylene'];
    // Core
    // - Pity Machine Frame (Replace)
    event.remove({ output: IFMachineFrame.PITY });
    event.shaped(IFMachineFrame.PITY, [
        'ABA',
        'BCB',
        'ABA'
    ], {
        A: '#minecraft:logs',
        B: '#forge:ingots/iron',
        C: '#forge:storage_blocks/brick'
    });
    // - Simple Machine Frame (Replace)
    event.remove({ output: IFMachineFrame.SIMPLE });
    GT.assembler('replace_industrial_foregoing_machine_frame_simple')
        .itemInputs('2x #forge:plates/polyethylene', IFMachineFrame.PITY, '2x #forge:ingots/nether_brick', '2x #forge:ingots/iron',
            'gtceu:lv_machine_hull')
        .inputFluids('#forge:latex 250')
        .itemOutputs(IFMachineFrame.SIMPLE)
        .duration(800)
        .EUt(GTValues.VA[GTValues.LV]);
    // - Advanced Machine Frame (Replace)
    event.remove({ output: IFMachineFrame.ADVANCED });
    GT.assembler('replace_industrial_foregoing_machine_frame_advanced')
        .itemInputs(IFMachineFrame.SIMPLE, 'gtceu:mv_machine_hull', '2x #forge:plates/polyethylene', '2x minecraft:netherite_scrap',
            '2x #forge:ingots/gold', '2x #forge:ingots/aluminium')
        .inputFluids('#forge:pink_slime 500')
        .itemOutputs(IFMachineFrame.ADVANCED)
        .duration(800)
        .EUt(GTValues.VA[GTValues.MV]);
    // - Supreme Machine Frame (Replace)
    event.remove({ output: IFMachineFrame.SUPREME });
    GT.assembler('replace_industrial_foregoing_machine_frame_supreme')
        .itemInputs(IFMachineFrame.ADVANCED, 'gtceu:hv_machine_hull', '2x #forge:plates/polytetrafluoroethylene', '2x #forge:gears/stainless_steel',
            '2x #forge:exquisite_gems/diamond', '2x #forge:ingots/stainless_steel', '2x #forge:ingots/netherite')
        .inputFluids('industrialforegoing:ether_gas 100')
        .itemOutputs(IFMachineFrame.SUPREME)
        .duration(800)
        .EUt(GTValues.VA[GTValues.HV]);
    // - Dissolution_Chamber (Append)
    event.shaped('industrialforegoing:dissolution_chamber', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#forge:plates/polyethylene',
        B: '#forge:chests',
        C: 'minecraft:bucket',
        D: IFMachineFrame.PITY,
        E: '#forge:ingots/gold',
        F: '#forge:gears/diamond'
    });
    // - Machine Settings Copier (Append)
    event.shaped('industrialforegoing:machine_settings_copier', [
        'ABA',
        'BCB',
        'ACA'
    ], {
        A: '#forge:plates/paper',
        B: '#forge:plates/polyethylene',
        C: '#forge:dusts/redstone'
    });
    // Agriculture & Husbandry
    // - Plant Gatherer (Append)
    event.shaped('industrialforegoing:plant_gatherer', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'minecraft:iron_hoe',
        C: 'minecraft:iron_axe',
        D: IFMachineFrame.PITY,
        E: '#forge:gears/gold',
        F: '#forge:dusts/redstone'
    });
    // - Sewer (Append)
    event.shaped('industrialforegoing:sewer', [
        'ABA',
        'CDC',
        'CEC'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'minecraft:bucket',
        C: '#forge:ingots/brick',
        D: IFMachineFrame.PITY,
        E: '#forge:gears/iron'
    });
    // - Sewege Composter (Replace & Alternative)
    event.remove({ output: 'industrialforegoing:sewage_composter' });
    plasticType.forEach((value) => {
        if (value == '#forge:plates/polytetrafluoroethylene') return;
        event.shaped('industrialforegoing:sewage_composter', [
            'ABA',
            'CDC',
            'EFE'
        ], {
            A: value,
            B: 'mysticalagriculture:inferium_furnace',
            C: 'minecraft:piston',
            D: IFMachineFrame.PITY,
            E: '#forge:ingots/brick',
            F: '#forge:gears/iron'
        });
    });
    // - Plant Fertilizer (Append)
    event.shaped('industrialforegoing:plant_fertilizer', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'minecraft:glass_bottle',
        C: 'minecraft:leather',
        D: IFMachineFrame.SIMPLE,
        E: '#forge:gears/iron',
        F: '#forge:dusts/redstone'
    });
    // - Plant Sower
    event.shaped('industrialforegoing:plant_sower', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'minecraft:flower_pot',
        C: 'minecraft:piston',
        D: IFMachineFrame.PITY,
        E: '#forge:gears/iron',
        F: '#forge:dusts/redstone'
    });
    // - Mob Slaughter Factory (Append)
    event.shaped('industrialforegoing:mob_slaughter_factory', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#forge:plates/polyethylene',
        B: '#forge:gears/gold',
        C: 'minecraft:iron_sword',
        D: IFMachineFrame.PITY,
        E: 'minecraft:iron_axe',
        F: 'minecraft:redstone'
    });
    // - Animal Rancher (Append)
    event.shaped('industrialforegoing:animal_rancher', [
        'AAA',
        'BCB',
        'DED'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'mysticalagriculture:inferium_shears',
        C: 'minecraft:bucket',
        D: '#forge:gears/gold',
        E: IFMachineFrame.PITY
    });
    // - Animal Feeder (Replace & Alternative)
    event.remove({ output: 'industrialforegoing:animal_feeder' });
    plasticType.forEach((value) => {
        if (value == 'industrialforegoing:plastic') return;
        event.shaped('industrialforegoing:animal_feeder', [
            'ABA',
            'CDC',
            'EFE'
        ], {
            A: value,
            B: 'minecraft:enchanted_golden_apple',
            C: 'minecraft:golden_carrot',
            D: IFMachineFrame.PITY,
            E: '#forge:dyes/purple',
            F: '#forge:gears/iron'
        });
    });
    // - Animal Baby Separator (Replace & Alternative)
    event.remove({ output: 'industrialforegoing:animal_baby_separator' });
    plasticType.forEach((value) => {
        if (value == 'industrialforegoing:plastic') return;
        event.shaped('industrialforegoing:animal_baby_separator', [
            'ABA',
            'CDC',
            'EFE'
        ], {
            A: value,
            B: 'minecraft:golden_carrot',
            C: 'minecraft:wheat',
            D: IFMachineFrame.PITY,
            E: '#forge:dyes/purple',
            F: '#forge:gears/gold'
        });
    });
    // - Mob Crusher (Append)
    event.shaped('industrialforegoing:mob_crusher', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'minecraft:netherite_sword',
        C: 'minecraft:book',
        D: IFMachineFrame.ADVANCED,
        E: '#forge:gears/gold',
        F: '#forge:dusts/redstone'
    });
    // - Mob Dupricator (Replace)
    event.remove({ output: 'industrialforegoing:mob_duplicator' });
    GT.assembler('replace_industrial_foregoing_mob_dupricator')
        .itemInputs('2x #forge:plates/polyethylene', 'minecraft:nether_wart', 'minecraft:magma_cream',
            '#forge:gems/emerald', '#forge:dusts/red_alloy')
        .inputFluids('#forge:latex 4000')
        .itemOutputs('industrialforegoing:mob_duplicator')
        .duration(1600)
        .EUt(GTValues.VA[GTValues.LV]);
    // Generators
    // - Bioreactor (Append)
    plasticType.forEach((value) => {
        if (value == '#forge:plates/polytetrafluoroethylene') return;
        event.shaped('industrialforegoing:bioreactor', [
            'ABA',
            'CDC',
            'EFE'
        ], {
            A: value,
            B: '#forge:gears/diamond',
            C: '#forge:slimeballs',
            D: IFMachineFrame.PITY,
            E: '#forge:ingots/brick',
            F: 'minecraft:carrot'
        });
        if (value != 'industrialforegoing:plastic') {
            event.shaped('industrialforegoing:bioreactor', [
                'ABA',
                'CDC',
                'EFE'
            ], {
                A: value,
                B: '#forge:gears/diamond',
                C: '#forge:slimeballs',
                D: IFMachineFrame.PITY,
                E: '#forge:ingots/brick',
                F: '#forge:dusts/sugar'
            });
        }
    });
    // Misc
    // - Mob Detector (Append)
    event.shaped('industrialforegoing:mob_detector', [
        'AAA',
        'BCB',
        'DED'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'minecraft:repeater',
        C: 'minecraft:comparator',
        D: 'minecraft:observer',
        E: IFMachineFrame.SIMPLE
    });
    // - Enchantment Sorter (Append)
    event.shaped('industrialforegoing:enchantment_sorter', [
        'ABA',
        'CDE',
        'AFA'
    ], {
        A: '#forge:plates/polyethylene',
        B: '#forge:gems/ender_pearl',
        C: 'minecraft:book',
        D: IFMachineFrame.ADVANCED,
        E: 'minecraft:enchanted_book',
        F: '#forge:gears/diamond'
    });
    // - Enchantment Applicator (Append)
    event.shaped('industrialforegoing:enchantment_applicator', [
        'AAA',
        'BCB',
        'DBD'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'minecraft:anvil',
        C: IFMachineFrame.ADVANCED,
        D: '#forge:gears/gold'
    });
    // - Enchantment Extractor (Append)
    event.shaped('industrialforegoing:enchantment_extractor', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'minecraft:nether_brick',
        C: 'minecraft:book',
        D: IFMachineFrame.ADVANCED,
        E: '#forge:gems/diamond',
        F: '#forge:gears/gold'
    });
    // - Enchantment Factory (Append)
    event.shaped('industrialforegoing:enchantment_factory', [
        'ABA',
        'CDC',
        'EEE'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'minecraft:book',
        C: '#forge:gems/diamond',
        D: IFMachineFrame.ADVANCED,
        E: 'minecraft:obsidian'
    });
    // Resource Production
    // - Sludge Refiner (Replace & Alternative)
    event.remove({ output: 'industrialforegoing:sludge_refiner' });
    plasticType.forEach((value) => {
        event.shaped('industrialforegoing:sludge_refiner', [
            'ABA',
            'CDC',
            'EFE'
        ], {
            A: value,
            B: 'minecraft:bucket',
            C: 'mysticalagriculture:inferium_furnace',
            D: IFMachineFrame.PITY,
            E: '#forge:gears/iron',
            F: '#forge:gears/gold'
        });
    });
    // - Water Condensator (Replace & Alternative)
    event.remove({ output: 'industrialforegoing:water_condensator' });
    plasticType.forEach((value) => {
        event.shaped('industrialforegoing:water_condensator', [
            'ABA',
            'CDC',
            'EFE'
        ], {
            A: value,
            B: 'mysticalagriculture:water_essence',
            C: 'minecraft:piston',
            D: IFMachineFrame.PITY,
            E: '#forge:gears/iron',
            F: '#forge:dusts/redstone'
        });
    });
    // - Material StoneWork Factory (Replace & Alternative)
    event.remove({ output: 'industrialforegoing:material_stonework_factory' });
    plasticType.forEach((value) => {
        event.shaped('industrialforegoing:material_stonework_factory', [
            'ABA',
            'CDE',
            'FGF'
        ], {
            A: value,
            B: 'minecraft:crafting_table',
            C: 'minecraft:diamond_pickaxe',
            D: IFMachineFrame.ADVANCED,
            E: 'mysticalagriculture:inferium_furnace',
            F: '#forge:gears/gold',
            G: 'industrialforegoing:pink_slime'
        });
    });
    // - Marine Fisher (Append)
    plasticType.forEach((value) => {
        if (value == 'industrialforegoing:plastic') return;
        event.shaped('industrialforegoing:marine_fisher', [
            'ABA',
            'CDC',
            'EFE'
        ], {
            A: value,
            B: 'minecraft:fishing_rod',
            C: 'minecraft:bucket',
            D: IFMachineFrame.SIMPLE,
            E: '#forge:gears/iron',
            F: '#forge:dusts/redstone'
        });
    });
    // - Potion Brewer (Append)
    event.shaped('industrialforegoing:potion_brewer', [
        'ABA',
        'CDC',
        'ECE'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'minecraft:brewing_stand',
        C: '#forge:gears/gold',
        D: IFMachineFrame.ADVANCED,
        E: 'minecraft:repeater'
    });
    // - Ore Laser Base (Append)
    event.shaped('industrialforegoing:ore_laser_base', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'minecraft:diamond_pickaxe',
        C: '#forge:ores/iron',
        D: IFMachineFrame.ADVANCED,
        E: '#forge:gears/diamond',
        F: '#forge:dusts/redstone'
    });
    // - Laser Drill (Replace)
    event.remove({ output: 'industrialforegoing:laser_drill' });
    GT.assembler('replace_industrial_foregoing_laser_drill')
        .itemInputs('2x #forge:plates/polytetrafluoroethylene', '#forge:gears/titanium', '2x gtceu:ev_electric_piston', IFMachineFrame.SIMPLE,
            '#forge:gears/diamond', '2x #forge:gears/gold', '#forge:dusts/red_alloy')
        .circuit(14)
        .itemOutputs('industrialforegoing:laser_drill')
        .duration(800)
        .EUt(GTValues.VA[GTValues.EV]);
    // - Fluid Laser Base (Append)
    event.shaped('industrialforegoing:fluid_laser_base', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#forge:plates/polyethylene',
        B: 'minecraft:diamond_pickaxe',
        C: 'minecraft:bucket',
        D: IFMachineFrame.ADVANCED,
        E: '#forge:gears/diamond',
        F: '#forge:dusts/redstone'
    });
    // Tools
    // - Meat Feeder (Append)
    event.shaped('industrialforegoing:meat_feeder', [
        'ABA',
        'CBC',
        ' B '
    ], {
        A: '#forge:plates/polyethylene',
        B: '#forge:ingots/iron',
        C: 'minecraft:glass_bottle'
    });
    // - Mob Imprison Tool (Append)
    plasticType.forEach((value) => {
        event.shaped('industrialforegoing:mob_imprisonment_tool', [
            ' A ',
            'ABA',
            ' A '
        ], {
            A: value,
            B: 'mysticalagriculture:experience_droplet'
        });
        if (value != 'industrialforegoing:plastic') {
            event.shaped('industrialforegoing:mob_imprisonment_tool', [
                ' A ',
                'ABA',
                ' A '
            ], {
                A: value,
                B: 'minecraft:ghast_tear'
            });
        }
    });
    // Remove
    // - Pitiful Generator (Remove)
    // - Hydroponic Bed (Remove)
    // - Wither Builder (Remove)
    // - Mycelial Reactor & Mycelical Generators (Remove)
    // - Infinity Charger (Remove)
    // - Resourceful Furnace (Remove)
    // - Mechanical Dirt (Remove)
    // - Block Placer, Block Breaker (Remove)
    // - Fluid Collector, Fluid Placer (Remove)
    // - Dye Mixer (Remove)
    // - Spores Recreator (Remove)
    // - IF Ore Washing System (Remove)
    // - Transport & Storage Module (Remove)
    const removeContents = [
        'industrialforegoing:pitiful_generator', 'industrialforegoing:hydroponic_bed', 'industrialforegoing:wither_builder',
        [
            'industrialforegoing:mycelial_reactor', 'industrialforegoing:mycelial_furnace', 'industrialforegoing:mycelial_slimey',
            'industrialforegoing:mycelial_culinary', 'industrialforegoing:mycelial_potion', 'industrialforegoing:mycelial_disenchantment',
            'industrialforegoing:mycelial_ender', 'industrialforegoing:mycelial_explosive', 'industrialforegoing:mycelial_frosty',
            'industrialforegoing:mycelial_halitosis', 'industrialforegoing:mycelial_magma', 'industrialforegoing:mycelial_pink',
            'industrialforegoing:mycelial_netherstar', 'industrialforegoing:mycelial_death', 'industrialforegoing:mycelial_rocket',
            'industrialforegoing:mycelial_crimed', 'industrialforegoing:mycelial_meatallurgic'
        ], 'industrialforegoing:infinity_charger', 'industrialforegoing:resourceful_furnace', 'industrialforegoing:mechanical_dirt',
        ['industrialforegoing:block_placer', 'industrialforegoing:block_breaker'],
        ['industrialforegoing:fluid_collector', 'industrialforegoing:fluid_placer'],
        'industrialforegoing:dye_mixer', 'industrialforegoing:spores_recreator',
        ['industrialforegoing:washing_factory', 'industrialforegoing:fermentation_station', 'industrialforegoing:fluid_sieving_machine'],
        [
            'industrialforegoing:conveyor', 'industrialforegoing:pity_black_hole_unit','industrialforegoing:common_black_hole_unit',
            'industrialforegoing:simple_black_hole_unit', 'industrialforegoing:advanced_black_hole_unit',
            'industrialforegoing:supreme_black_hole_unit', 'industrialforegoing:pity_black_hole_tank', 'industrialforegoing:common_black_hole_tank',
            'industrialforegoing:simple_black_hole_tank', 'industrialforegoing:advanced_black_hole_tank',
            'industrialforegoing:supreme_black_hole_tank', 'industrialforegoing:black_hole_controller',
            'industrialforegoing:conveyor_extraction_upgrade', 'industrialforegoing:conveyor_insertion_upgrade',
            'industrialforegoing:conveyor_detection_upgrade', 'industrialforegoing:conveyor_bouncing_upgrade',
            'industrialforegoing:conveyor_dropping_upgrade', 'industrialforegoing:conveyor_blinking_upgrade',
            'industrialforegoing:conveyor_splitting_upgrade', 'industrialforegoing:item_transporter_type',
            'industrialforegoing:fluid_transporter_type', 'industrialforegoing:world_transporter_type'
        ], [
            'industrialforegoing:infinity_backpack', 'industrialforegoing:infinity_drill', 'industrialforegoing:infinity_hammer',
            'industrialforegoing:infinity_launcher', 'industrialforegoing:infinity_nuke', 'industrialforegoing:infinity_saw',
            'industrialforegoing:infinity_trident'
        ]
    ];
    const removeRecipeTypes = {
        MYCELIAL: [
            'industrialforegoing:mycelial_reactor', 'industrialforegoing:mycelial_furnace', 'industrialforegoing:mycelial_slimey',
            'industrialforegoing:mycelial_culinary', 'industrialforegoing:mycelial_potion', 'industrialforegoing:mycelial_disenchantment',
            'industrialforegoing:mycelial_ender', 'industrialforegoing:mycelial_explosive', 'industrialforegoing:mycelial_frosty',
            'industrialforegoing:mycelial_halitosis', 'industrialforegoing:mycelial_magma', 'industrialforegoing:mycelial_pink',
            'industrialforegoing:mycelial_netherstar', 'industrialforegoing:mycelial_death', 'industrialforegoing:mycelial_rocket',
            'industrialforegoing:mycelial_crimed', 'industrialforegoing:mycelial_meatallurgic'
        ],
        ORE_WASHER: ['industrialforegoing:ore_washer', 'industrialforegoing:fermenter', 'industrialforegoing:ore_sieve']
    };
    removeContents.forEach((value) => {
        if (typeof value == 'string') event.remove({ output: value });
        else if (typeof value == 'object' && Array.isArray(value)) {
            value.forEach((val2) => {
                event.remove({ output: val2 });
            });
        }
    });
    removeRecipeTypes.MYCELIAL.forEach((value) => {
        event.remove({ type: value });
    });
    removeRecipeTypes.ORE_WASHER.forEach((value) => {
        event.remove({ type: value });
    });
});
