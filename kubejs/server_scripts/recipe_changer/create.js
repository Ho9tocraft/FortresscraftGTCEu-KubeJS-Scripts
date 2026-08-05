/**
 * Create レシピ削除
 * 置き換え対象(入力基準):
 * - 電子管
 * - 精密機構
 * 完全削除対象(出力基準):
 * - 液体パイプ系
 * - 自動農業関係
 * - 概略図系 (自分で組め)
 * - メカニカルクラフター (およびそれを利用したレシピ)
 * - メカニカルプレス (を利用したレシピ)
 * - ファクトリーゲージ (AE2を使え！)
 * - ストックマネージャー (だからAE2を使え！)
 * 追加救済対象(出力基準):
 * - 真鍮の手
 */
ServerEvents.recipes(event => {
    const rubbers = ['rubber', 'silicone_rubber', 'styrene_butadiene_rubber'];
    const createEncasedCasingType = ['brass', 'copper', 'railway', 'creative', 'industrial_iron', 'weathered_iron',
        'refined_radiance', 'shadow_steel'];
    const GT = event.recipes.gtceu;
    const CreateNerfComponent = {
        electron_tube: 'create:electron_tube',
        precision_mechanism: 'create:precision_mechanism',
        fluid_pipe: 'create:fluid_pipe',
        copper_spool: 'createaddition:copper_spool',
        gold_spool: 'createaddition:gold_spool',
        electrum_spool: 'createaddition:electrum_spool'
    };
    const CreateAppendComponent = {
        Casings: ['create:andesite_casing', 'create:brass_casing', 'create:railway_casing', 'create:shadow_steel_casing', 'create:copper_casing',
            'create:refined_radiance_casing', 'createcasing:creative_casing'],
        MysteryConversion: ['create:blaze_burner', 'create:haunted_bell', 'create:shadow_steel', 'create:refined_radiance',
            'create_power_loader:andesite_chunk_loader', 'create_power_loader:brass_chunk_loader', 'createqol:shadow_steel_block',
            'createqol:refined_radiance_block']
    };
    const ReplaceComponent = {
        gtceu_ulv_circuit: '#gtceu:circuits/ulv',
        gtceu_lv_circuit: '#gtceu:circuits/lv',
        gtceu_mv_circuit: '#gtceu:circuits/mv',
        gtceu_fluid_pipe: 'gtceu:copper_normal_fluid_pipe',
        gtceu_hv_coil: 'gtceu:hv_voltage_coil',
        gtceu_lv_sensor: 'gtceu:lv_sensor',
    };
    const createFarmingContent = ['create:mechanical_harvester', 'create:mechanical_plough'];
    const createBetterMotorsUpgrades = [
        'create_better_motors:basic_tier_upgrade',
        'create_better_motors:nitro_tier_upgrade',
        'create_better_motors:niotic_tier_upgrade',
        'create_better_motors:blazing_tier_upgrade',
        'create_better_motors:starter_tier_upgrade',
        'create_better_motors:hardened_tier_upgrade',
        'create_better_motors:spirited_tier_upgrade',
        'create_better_motors:brass_alternator_tier_upgrade',
        'create_better_motors:copper_alternator_tier_upgrade',
        'create_better_motors:andesite_alternator_tier_upgrade'
    ];
    /**
     * Nerf Recipe
     * @param {String} pNerf 弱体化対象
     * @param {Function} pReplaceRecipes 置換後のレシピ群 (Callback Function)
     */
    const nerfRecipes = (pNerf, pReplaceRecipes) => {
        event.remove({ input: pNerf });
        event.remove({ output: pNerf });
        // callback function
        pReplaceRecipes();
    }
    // NUKE Sections
    {
        // - バルブハンドル
        event.remove({ input: '#create:valve_handles' });
        event.remove({ output: 'create:copper_valve_handle' });
        // - メカニカルプレス (本体を除く)
        event.remove({ type: 'create:pressing' });
        // - メカニカルクラフター
        event.remove({ output: 'create:crafter_slot_cover' });
        event.remove({ output: 'create:mechanical_crafter' });
        event.remove({ type: 'create:mechanical_crafting' });
        // - メカニカルミキサー
        event.remove({ output: 'create:whisk' });
        event.remove({ output: 'create:mechanical_mixer' });
        createEncasedCasingType.forEach((value) => {
            event.remove({ output: `createcasing:${value}_mixer` });
        });
        event.remove({ type: 'create:mixing' });
        // - 農業系
        createFarmingContent.forEach((value) => {
            event.remove({ output: value });
        });
        // - ファクトリーゲージ
        event.remove({ output: 'create:factory_gauge' });
        // - 概略図系
        event.remove({ output: 'create:schematic_and_quill' });
        event.remove({ output: 'create:empty_schematic' });
        event.remove({ output: 'create:empty_schematic' });
        event.remove({ output: 'create:schematic_table' });
        event.remove({ output: 'create:schematicannon' });
        // - アップグレーダー (Create Better Motors)
        createBetterMotorsUpgrades.forEach((value) => {
            event.remove({ input: value });
        });
        // スプール
        event.remove({ output: 'createaddition:spool' });
        // コンデンサ (Create Crafts & Additions)
        event.remove({ output: 'createaddition:capacitor' });
        // Lava Quartz
        event.remove({ output: 'create_better_motors:lava_quartz' });
        event.remove({ input: 'create_better_motors:lava_quartz' });
        // Lava Tube
        event.remove({ output: 'create_better_motors:lava_tube' });
    }
    // - Reggarfonite Plate
    {
        event.shaped('create_better_motors:reggarfonite_sheet', [
            'A',
            'B',
            'B'
        ], {
            A: '#gtceu:tools/crafting_hammers',
            B: '#forge:ingots/reggarfonite'
        });
        GT.bender('reggarfonite_plate_bender')
            .itemInputs('#forge:ingots/reggarfonite')
            .circuit(1)
            .itemOutputs('create_better_motors:reggarfonite_sheet')
            .duration(60)
            .EUt(GTValues.VA[GTValues.LV]);
        GT.cutter('reggarfonite_plate_cutter_water')
            .itemInputs('#forge:storage_blocks/reggarfonite')
            .inputFluids('minecraft:water 1000')
            .itemOutputs('9x create_better_motors:reggarfonite_sheet')
            .duration(1080)
            .EUt(GTValues.VA[GTValues.LV]);
        GT.cutter('reggarfonite_plate_cutter_distwater')
            .itemInputs('#forge:storage_blocks/reggarfonite')
            .inputFluids('gtceu:distilled_water 500')
            .itemOutputs('9x create_better_motors:reggarfonite_sheet')
            .duration(810)
            .EUt(GTValues.VA[GTValues.LV]);
        GT.cutter('reggarfonite_plate_cutter_lubricant')
            .itemInputs('#forge:storage_blocks/reggarfonite')
            .inputFluids('#forge:lubricant 250')
            .itemOutputs('9x create_better_motors:reggarfonite_sheet')
            .duration(540)
            .EUt(GTValues.VA[GTValues.LV]);
        GT.extruder('reggarfonite_plate_extruder')
            .itemInputs('#forge:ingots/reggarfonite')
            .notConsumable('gtceu:plate_extruder_mold')
            .itemOutputs('create_better_motors:reggarfonite_sheet')
            .duration(60)
            .EUt(GTValues.VHA[GTValues.MV]);
        GT.forge_hammer('reggarfonite_plate_forge_hammer')
            .itemInputs('3x #forge:ingots/reggarfonite')
            .itemOutputs('2x create_better_motors:reggarfonite_sheet')
            .duration(60)
            .EUt(GTValues.VA[GTValues.LV]);
    }
    // Create Steam 'n' Rails Boiler
    const cbcLocometalBoilerType = ['locometal', 'brass_wrapped_locometal', 'copper_wrapped_locometal', 'iron_wrapped_locometal'];
    cbcLocometalBoilerType.forEach((value) => {
        const tLocometal = value == 'locometal' ? `slashed_${value}` : value;
        GT.assembler(`replace_${value}_boiler`)
            .itemInputs('minecraft:bucket', '3x minecraft:blaze_rod', `8x railways:${tLocometal}`)
            .circuit(22)
            .itemOutputs(`railways:${value}_boiler`)
            .duration(1200)
            .EUt(GTValues.VA[GTValues.HV]);
    });
    // Create Big Cannons
    const cbcExtraIngots = ['cast_iron', 'nethersteel', 'bronze', 'steel'];
    cbcExtraIngots.forEach((value) => {
        switch (value) {
            case 'cast_iron':
                GT.alloy_smelter(`replace_${value}_ingot_alloy_smelter`)
                    .itemInputs('#forge:ingots/wrought_iron', '#forge:dusts/coal')
                    .itemOutputs(`createbigcannons:${value}_ingot`)
                    .duration(600)
                    .EUt(GTValues.VHA[GTValues.MV]);
                GT.alloy_smelter(`replace_${value}_block_alloy_smelter`)
                    .itemInputs('#forge:storage_blocks/wrought_iron', '9x #forge:dusts/coal')
                    .itemOutputs(`createbigcannons:${value}_block`)
                    .duration(5400)
                    .EUt(GTValues.VHA[GTValues.MV]);
                break;
            case 'nethersteel':
                GT.electric_blast_furnace(`replace_${value}_ingot_ebf`)
                    .itemInputs('#forge:ingots/steel', '#forge:ingots/netherite')
                    .inputFluids('#forge:oxygen 4000')
                    .itemOutputs(`createbigcannons:${value}_ingot`)
                    .duration(5400)
                    .EUt(GTValues.VA[GTValues.MV])
                    .blastFurnaceTemp(1500);
                break;
        }
        if (value == 'steel' || value == 'bronze') {
            GT.fluid_solidifier(`replace_${value}_ingot_solidifier`)
                .notConsumable('gtceu:ingot_casting_mold')
                .inputFluids(`createbigcannons:molten_${value} 90`)
                .itemOutputs(`gtceu:${value}_ingot`)
                .duration(60)
                .EUt(GTValues.VA[GTValues.LV]);
        } else {
            GT.fluid_solidifier(`replace_${value}_ingot_solidifier`)
                .notConsumable('gtceu:ingot_casting_mold')
                .inputFluids(`createbigcannons:molten_${value} 90`)
                .itemOutputs(`createbigcannons:${value}_ingot`)
                .duration(60)
                .EUt(GTValues.VA[GTValues.LV]);
        }
    });
    // 単純難化
    const simplyIncreaseDifficults = [
        'create:hose_pulley', 'create:spout', 'create:elevator_pulley', 'create:belt_connector',
        'create:crushing_wheel', 'create:packager', 'create:cardboard', 'create:andesite_alloy', 'create:metal_girder', 'create:chromatic_compound',
        'createaddition:modular_accumulator'
    ];
    simplyIncreaseDifficults.forEach((results) => {
        event.remove({ output: results });
        switch (results) {
            case 'create:crushing_wheel':
                GT.assembler('replace_create_crushing_wheel')
                    .itemInputs('16x create:andesite_alloy', '4x #minecraft:planks', 'create:shaft')
                    .circuit(22)
                    .itemOutputs(results)
                    .duration(2400)
                    .EUt(GTValues.V[GTValues.ULV]);
                break;
            case 'create:packager':
                GT.assembler('replace_create_packager')
                    .itemInputs('4x #forge:rods/iron', '2x #forge:dusts/red_alloy', 'create:cardboard_block')
                    .circuit(22)
                    .itemOutputs(results)
                    .duration(2400)
                    .EUt(GTValues.V[GTValues.ULV]);
                break;
            case 'create:cardboard':
                event.remove({ output: `${results}_block` });
                GT.compressor('replace_create_cardboard')
                    .itemInputs('9x #forge:paper')
                    .itemOutputs(results)
                    .duration(2400)
                    .EUt(GTValues.VA[GTValues.LV]);
                GT.compressor('replace_create_cardboard_block')
                    .itemInputs(`4x ${results}`)
                    .itemOutputs(`${results}_block`)
                    .duration(2400)
                    .EUt(GTValues.VA[GTValues.LV]);
                break;
            case 'create:andesite_alloy':
                event.shaped(results, [
                    'AB ',
                    'BA ',
                    '   '
                ], {
                    A: 'minecraft:andesite',
                    B: '#forge:nuggets/zinc'
                });
                GT.alloy_smelter('replace_create_andesite_alloy_alternative_recipes')
                    .itemInputs('9x minecraft:andesite', '#forge:ingots/iron')
                    .itemOutputs(`9x ${results}`)
                    .duration(1200)
                    .EUt(GTValues.VA[GTValues.LV]);
                break;
            case 'create:metal_girder':
                event.shaped(results, [
                    'AAA',
                    'BBB',
                    '   '
                ], {
                    A: '#forge:plates/steel',
                    B: '#forge:ingots/steel'
                });
                break;
            case 'create:chromatic_compound':
                GT.electric_blast_furnace('replace_create_chromatic_compound')
                    .itemInputs('3x minecraft:glowstone_dust', '3x #forge:dusts/obsidian', 'create:rose_quartz')
                    .inputFluids('#forge:radon')
                    .itemOutputs(results)
                    .duration(72000)
                    .EUt(GTValues.VHA[GTValues.LuV])
                    .blastFurnaceTemp(7000);
                break;
            case 'createaddition:modular_accumulator':
                GT.assembler('replace_create_ca_modular_accumulator')
                    .itemInputs('4x #gtceu:batteries/lv', '2x gtceu:tin_single_cable', 'gtceu:industrial_steam_casing')
                    .inputFluids('gtceu:soldering_alloy 144')
                    .itemOutputs(results)
                    .EUt(GTValues.VHA[GTValues.LV]);
                break;
        }
        rubbers.forEach((value) => {
            switch (results) {
                case 'create:hose_pulley':
                    event.shaped(results, [
                        ' A ',
                        ' B ',
                        ' C '
                    ], {
                        A: 'create:copper_casing',
                        B: `#forge:storage_blocks/${value}`,
                        C: '#forge:plates/copper'
                    });
                    break;
                case 'create:spout':
                    event.shaped(results, [
                        'A',
                        'B'
                    ], {
                        A: 'create:copper_casing',
                        B: `#forge:plates/${value}`
                    });
                    break;
                case 'create:elevator_pulley':
                    if (value != 'rubber') {
                        event.shaped(results, [
                            ' A ',
                            ' B ',
                            ' C '
                        ], {
                            A: 'create:brass_casing',
                            B: `#forge:storage_blocks/${value}`,
                            C: '#forge:plates/iron'
                        });
                    }
                    break;
                case 'create:belt_connector':
                    event.shaped(results, [
                        'AAA',
                        'AAA',
                        '   '
                    ], {
                        A: `#forge:plates/${value}`
                    });
                    break;
            }
        });
    });
    // 電子管弱体化、というか削除
    nerfRecipes(CreateNerfComponent.electron_tube, () => {
        // Shaped
        {
            // - 腕木式信号機 (Create Steam 'n' Rails)
            event.shaped('railways:semaphore', [
                ' A ',
                'BCD',
                ' A '
            ], {
                A: '#forge:plates/iron',
                B: '#minecraft:fences',
                C: 'create:andesite_casing',
                D: ReplaceComponent.gtceu_ulv_circuit
            });
            // - Radar Receiver Block (Create Radars)
            event.shaped('create_radar:radar_receiver_block', [
                ' A ',
                ' B ',
                'DCD'
            ], {
                A: 'gtceu:long_potin_rod',
                B: ReplaceComponent.gtceu_lv_sensor,
                C: ReplaceComponent.gtceu_ulv_circuit,
                D: 'create:industrial_iron_block'
            });
            // - Monitor (Create Radars)
            event.shaped('create_radar:monitor', [
                ' A ',
                ' B ',
                ' C '
            ], {
                A: ReplaceComponent.gtceu_ulv_circuit,
                B: 'create:brass_casing',
                C: ReplaceComponent.gtceu_lv_circuit
            });
            // - スマートシュート
            event.shaped('create:smart_chute', [
                ' A ',
                ' B ',
                ' C '
            ], {
                A: '#forge:plates/brass',
                B: 'create:chute',
                C: ReplaceComponent.gtceu_ulv_circuit
            });
            // - コントローラーレール
            event.shaped('6x create:controller_rail', [
                'A A',
                'ABA',
                'ACA'
            ], {
                A: '#forge:ingots/gold',
                B: '#forge:rods/wooden',
                C: ReplaceComponent.gtceu_ulv_circuit
            });
            // - からくり操作盤
            event.shaped('create:contraption_controls', [
                ' A ',
                ' B ',
                ' C '
            ], {
                A: '#minecraft:buttons',
                B: 'create:andesite_casing',
                C: ReplaceComponent.gtceu_ulv_circuit
            });
            // - デプロイヤー
            event.shaped('create:deployer', [
                ' A ',
                ' B ',
                ' C '
            ], {
                A: ReplaceComponent.gtceu_ulv_circuit,
                B: 'create:andesite_casing',
                C: 'create:brass_hand'
            });
            // - メカニカルローラー
            event.shaped('create:mechanical_roller', [
                ' A ',
                ' B ',
                ' C '
            ], {
                A: ReplaceComponent.gtceu_ulv_circuit,
                B: 'create:andesite_casing',
                C: 'create:crushing_wheel'
            });
            // - 真鍮ファンネル・トンネル
            rubbers.forEach((value) => {
                event.shaped('create:brass_funnel', [
                    ' A ',
                    ' B ',
                    ' C '
                ], {
                    A: ReplaceComponent.gtceu_ulv_circuit,
                    B: 'gtceu:industrial_steam_casing',
                    C: `#forge:plates/${value}`
                });
                event.shaped('create:brass_tunnel', [
                    'A  ',
                    'BB ',
                    'CC '
                ], {
                    A: ReplaceComponent.gtceu_ulv_circuit,
                    B: 'gtceu:industrial_steam_casing',
                    C: `#forge:plates/${value}`
                });
            });
            // - スマートオブザーバー
            event.shaped('create:content_observer', [
                ' A ',
                ' B ',
                ' C '
            ], {
                A: ReplaceComponent.gtceu_ulv_circuit,
                B: 'create:brass_casing',
                C: 'minecraft:observer'
            });
            // - レッドストーンリレー (Create Crafts & Additions)
            event.shaped('createaddition:redstone_relay', [
                ' A ',
                'BCB',
                'DDD'
            ], {
                A: 'projectred_transmission:red_alloy_wire',
                B: 'createaddition:connector',
                C: ReplaceComponent.gtceu_ulv_circuit,
                D: 'minecraft:smooth_stone'
            });
        }
        // Shapeless
        {
            // - 可変チェーンギアシフト
            event.shapeless('create:adjustable_chain_gearshift', [
                'create:encased_chain_drive',
                ReplaceComponent.gtceu_ulv_circuit
            ]);
            // - シーケンスギアシフト
            event.shapeless('create:sequenced_gearshift', [
                'create:adjustable_chain_gearshift',
                'create:brass_casing',
                ReplaceComponent.gtceu_ulv_circuit
            ]);
            // - 鉄道信号機
            event.shapeless('create:track_signal', [
                'create:railway_casing',
                ReplaceComponent.gtceu_ulv_circuit
            ]);
            // - ニキシー管
            event.shapeless('4x create:nixie_tube', [
                `2x ${ReplaceComponent.gtceu_ulv_circuit}`
            ]);
            // - 可変チェーンギアシフト (Create Encased)
            createEncasedCasingType.forEach((encased) => {
                event.shapeless(`createcasing:${encased}_adjustable_chain_gearshift`, [
                    `createcasing:${encased}_encased_chain_drive`,
                    ReplaceComponent.gtceu_ulv_circuit
                ]);
            });
        }
        // GT: 組み立て機
        {
            // - Monitor (Create Radars)
            GT.assembler('addition_create_radar_monitor')
                .itemInputs(ReplaceComponent.gtceu_ulv_circuit, ReplaceComponent.gtceu_lv_circuit,
                    'create:brass_casing', '3x gtceu:computer_monitor_cover')
                .circuit(22)
                .itemOutputs('3x create_radar:monitor')
                .duration(600)
                .EUt(GTValues.VA[GTValues.MV]);
            // - Radar Bearing (Create Radars)
            GT.assembler('create_radar_bearing_from_tin')
                .itemInputs('create:mechanical_bearing', '48x #forge:plates/tin', ReplaceComponent.gtceu_ulv_circuit)
                .circuit(22)
                .itemOutputs('create_radar:radar_bearing')
                .duration(600)
                .EUt(GTValues.VHA[GTValues.ULV]);
            // - Network Controller (Create Radars)
            GT.assembler('create_radar_network_controller')
                .itemInputs(ReplaceComponent.gtceu_lv_circuit, 'create_radar:data_link', '#forge:ingots/electrum', ReplaceComponent.gtceu_lv_sensor)
                .circuit(22)
                .itemOutputs('create_radar:network_filterer')
                .duration(600)
                .EUt(GTValues.VA[GTValues.ULV]);
            // - 時計仕掛けのベアリング
            GT.assembler('replace_create_clockwork_bearing')
                .itemInputs('#minecraft:wooden_slabs', 'create:brass_casing', '2x create:mechanical_bearing', ReplaceComponent.gtceu_ulv_circuit)
                .circuit(22)
                .itemOutputs('create:clockwork_bearing')
                .duration(600)
                .EUt(GTValues.VHA[GTValues.LV]);
            // - 閾値スイッチ
            GT.assembler('replace_create_stockpile_switch')
                .itemInputs(ReplaceComponent.gtceu_ulv_circuit, 'gtceu:industrial_steam_casing', 'minecraft:comparator')
                .circuit(22)
                .itemOutputs('create:stockpile_switch')
                .duration(600)
                .EUt(GTValues.VA[GTValues.LV]);
            // - ディスプレイボード
            GT.assembler('replace_create_display_board')
                .itemInputs(ReplaceComponent.gtceu_ulv_circuit, 'gtceu:computer_monitor_cover', '2x create:cogwheel')
                .circuit(22)
                .itemOutputs('2x create:display_board')
                .duration(600)
                .EUt(GTValues.VHA[GTValues.LV]);
        }
    });
    // 精密機構も消えます
    nerfRecipes(CreateNerfComponent.precision_mechanism, () => {
        // Shaped
        {
            // - 駅の時計 (Create Railway Navigator)
            event.shaped('createrailwaysnavigator:train_station_clock', [
                ' A ',
                'ABA',
                'CDC'
            ], {
                A: '#forge:plates/polyethylene',
                B: 'minecraft:clock',
                C: '#gtceu:batteries/lv',
                D: ReplaceComponent.gtceu_lv_circuit
            });
            // - 真鍮の転轍機
            event.shaped('railways:track_switch_brass', [
                ' A ',
                ' B ',
                ' C '
            ], {
                A: 'minecraft:lever',
                B: 'create:brass_casing',
                C: ReplaceComponent.gtceu_lv_circuit
            });
            // - メカニカルアーム
            event.shaped('create:mechanical_arm', [
                'AAB',
                'A  ',
                'CD '
            ], {
                A: '#forge:rods/brass',
                B: 'create:andesite_alloy',
                C: ReplaceComponent.gtceu_lv_circuit,
                D: 'create:brass_casing'
            });
        }
        // Shapeless
        {
            // - 遠隔レンズ (Create Steam 'n' Rails)
            event.shapeless('railways:remote_lens', [
                ReplaceComponent.gtceu_lv_circuit,
                'minecraft:ender_eye',
                '#forge:plates/brass'
            ]);
            // - 回転速度コントローラー
            event.shapeless('create:rotation_speed_controller', [
                ReplaceComponent.gtceu_lv_circuit,
                'create:brass_casing',
                'create:shaft'
            ]);
        }
        // Create: 組み立てライン(削除操作)
        event.remove({ output: '#railways:conductor_caps', type: 'create:sequenced_assembly' });
        // GT: 組み立て機
        {
            // - Auto Yaw Controller (Create Radars)
            GT.assembler('replace_create_radars_auto_yaw_controller')
                .itemInputs('create:vertical_gearbox', ReplaceComponent.gtceu_lv_circuit)
                .circuit(22)
                .itemOutputs('create_radar:auto_yaw_controller')
                .duration(600)
                .EUt(GTValues.VHA[GTValues.MV]);
            // - Auto Pitch Controller (Create Radars)
            GT.assembler('replace_create_radars_auto_pitch_controller')
                .itemInputs('create:gearbox', ReplaceComponent.gtceu_lv_circuit)
                .circuit(22)
                .itemOutputs('create_radar:auto_pitch_controller')
                .duration(600)
                .EUt(GTValues.VHA[GTValues.MV]);
            // - Radar Receiver Block (Create Radars)
            GT.assembler('append_create_radars_radar_receiver')
                .itemInputs('gtceu:long_potin_rod', ReplaceComponent.gtceu_lv_sensor, ReplaceComponent.gtceu_lv_circuit, 'create:industrial_iron_block')
                .circuit(22)
                .itemOutputs('create_radar:radar_receiver_block')
                .duration(600)
                .EUt(GTValues.VHA[GTValues.MV]);
            // - 列車運転台
            GT.assembler('replace_create_train_controller')
                .itemInputs('create:contraption_controls', 'minecraft:lever', 'create:railway_casing', ReplaceComponent.gtceu_lv_circuit)
                .circuit(22)
                .itemOutputs('create:controls')
                .duration(600)
                .EUt(GTValues.VHA[GTValues.LV]);
            // - 白色の車掌帽
            GT.assembler('replace_create_steam_n_rails_white_conductor_cap')
                .itemInputs('minecraft:white_carpet', ReplaceComponent.gtceu_lv_circuit, 'minecraft:string')
                .circuit(22)
                .itemOutputs('railways:white_conductor_cap')
                .duration(300)
                .EUt(GTValues.VA[GTValues.LV]);
        }
    });
    // 他Modの液体パイプを使え！
    // ついでにポテトキャノンを難化
    nerfRecipes(CreateNerfComponent.fluid_pipe, () => {
        // Shaped
        {
            // - 大砲用ドリル (Create Big Cannons)
            event.shaped('createbigcannons:cannon_drill', [
                ' A ',
                'BCB',
                ' D '
            ], {
                A: 'gtceu:iron_drill_head',
                B: ReplaceComponent.gtceu_fluid_pipe,
                C: 'create:andesite_casing',
                D: 'create:piston_extension_pole'
            });
        }
        // GT: 組み立て機
        {
            // - ポテトキャノン
            GT.assembler('replace_create_potato_cannons')
                .itemInputs('1x create:andesite_alloy', ReplaceComponent.gtceu_mv_circuit,
                    '2x #forge:ingots/copper', `3x ${ReplaceComponent.gtceu_fluid_pipe}`)
                .circuit(22)
                .itemOutputs('create:potato_cannon')
                .duration(6000)
                .EUt(GTValues.VA[GTValues.HV]);
            // - 液体弾
            GT.assembler('replace_create_big_cannons_fluid_shell')
                .itemInputs('5x #forge:ingots/iron', '2x gtceu:universal_fluid_cell', '#minecraft:wooden_slabs')
                .circuit(22)
                .itemOutputs('createbigcannons:fluid_shell')
                .duration(600)
                .EUt(GTValues.VHA[GTValues.MV]);
        }
    });
    // 銅のスプール巻きも消えます。
    nerfRecipes(CreateNerfComponent.copper_spool, () => {
        // GT: 組み立て機
        // - ポータブルエネルギーインターフェース
        GT.assembler('replace_create_ca_portable_energy_interface')
            .itemInputs('create:brass_casing', 'gtceu:hv_machine_hull', ReplaceComponent.gtceu_hv_coil)
            .circuit(22)
            .inputFluids('gtceu:soldering_alloy 144')
            .itemOutputs('createaddition:portable_energy_interface')
            .duration(1200)
            .EUt(GTValues.VA[GTValues.EV]);
        // - 真鍮オルタネーター
        GT.assembler('replace_create_ca_kinetic_generator_tier_4')
            .itemInputs('#forge:ingots/brass', '4x #forge:plates/brass', '2x #forge:plates/reggarfonite',
                '3x gtceu:ev_voltage_coil', '#gtceu:circuits/ev', 'create_better_motors:copper_alternator')
            .circuit(22)
            .itemOutputs('create_better_motors:brass_alternator')
            .duration(6000)
            .EUt(GTValues.VA[GTValues.EV]);
        // - 銅オルタネーター
        GT.assembler('replace_create_ca_kinetic_generator_tier_3')
            .itemInputs('#forge:ingots/copper', '4x #forge:plates/copper', '2x #forge:plates/reggarfonite',
                `3x ${ReplaceComponent.gtceu_hv_coil}`, '#gtceu:circuits/hv', 'create_better_motors:andesite_alternator')
            .circuit(22)
            .itemOutputs('create_better_motors:copper_alternator')
            .duration(6000)
            .EUt(GTValues.VA[GTValues.HV]);
        // - 安山岩オルタネーター
        GT.assembler('replace_create_ca_kinetic_generator_tier_2')
            .itemInputs('create:andesite_alloy', '4x #forge:plates/steel', '2x #forge:plates/reggarfonite',
                `3x ${ReplaceComponent.gtceu_hv_coil}`, '#gtceu:circuits/hv', 'createaddition:alternator')
            .circuit(22)
            .itemOutputs('create_better_motors:andesite_alternator')
            .duration(6000)
            .EUt(GTValues.VA[GTValues.MV]);
        // - オルタネーター
        GT.assembler('replace_create_ca_kinetic_generator_tier_1')
            .itemInputs('create:andesite_alloy', '6x #forge:plates/steel', 'gtceu:mv_voltage_coil',
                'gtceu:mv_electric_motor', '#gtceu:batteries/mv')
            .circuit(22)
            .itemOutputs('createaddition:alternator')
            .duration(6000)
            .EUt(GTValues.VA[GTValues.LV]);
        // - 電動モーター
        GT.assembler('replace_create_ca_kinetic_motor_tier_1')
            .itemInputs('create:andesite_alloy', '6x #forge:plates/brass', '3x gtceu:mv_voltage_coil',
                'gtceu:mv_electric_motor', '#gtceu:batteries/mv')
            .circuit(22)
            .itemOutputs('createaddition:electric_motor')
            .duration(6000)
            .EUt(GTValues.VA[GTValues.MV]);
        // - 電動モーターMk2
        GT.assembler('replace_create_kinetic_motor_tier_2')
            .itemInputs('create:andesite_alloy', '4x #forge:plates/brass', `3x ${ReplaceComponent.gtceu_hv_coil}`,
                'createaddition:electric_motor', '#gtceu:circuits/hv', '#gtceu:batteries/hv')
            .circuit(22)
            .itemOutputs('create_better_motors:starter_motor')
            .duration(6000)
            .EUt(GTValues.VA[GTValues.HV]);
    });
    // もちろん金のスプールも。
    nerfRecipes(CreateNerfComponent.gold_spool, () => {
        // - 電動モーターMk3
        GT.assembler('replace_create_ca_kinetic_motor_tier_3')
            .itemInputs('#forge:storage_blocks/iron', '4x #forge:plates/brass', `3x ${ReplaceComponent.gtceu_hv_coil}`,
                '2x #forge:plates/reggarfonite', '#gtceu:circuits/hv', 'create_better_motors:starter_motor', '#gtceu:batteries/hv')
            .circuit(22)
            .itemOutputs('create_better_motors:basic_motor')
            .duration(6000)
            .EUt(GTValues.VA[GTValues.HV]);
        // - 電動モーターMk4
        GT.assembler('replace_create_ca_kinetic_motor_tier_4')
            .itemInputs('#forge:storage_blocks/reggarfonite', '4x #forge:plates/brass', '2x #forge:plates/reggarfonite',
                '#gtceu:circuits/hv', `3x ${ReplaceComponent.gtceu_hv_coil}`, 'create_better_motors:basic_motor', '#gtceu:batteries/hv')
            .circuit(22)
            .itemOutputs('create_better_motors:hardened_motor')
            .duration(6000)
            .EUt(GTValues.VA[GTValues.HV]);
        // - 電動モーターMk5
        GT.assembler('replace_create_ca_kinetic_motor_tier_5')
            .itemInputs('#forge:storage_blocks/gold', '4x #forge:plates/brass', '2x #forge:plates/reggarfonite',
                '3x gtceu:ev_voltage_coil', 'create_better_motors:hardened_motor', '#gtceu:circuits/ev', '#gtceu:batteries/ev')
            .circuit(22)
            .itemOutputs('create_better_motors:blazing_motor')
            .duration(6000)
            .EUt(GTValues.VA[GTValues.EV]);
    });
    // エレクトラムのスプールも。
    nerfRecipes(CreateNerfComponent.electrum_spool, () => {
        // - 電動モーターMk6
        GT.assembler('replace_create_ca_kinetic_motor_tier_6')
            .itemInputs('4x #forge:plates/brass', '2x #forge:plates/reggarfonite', '#forge:ingots/netherite',
                '3x gtceu:iv_voltage_coil', 'create_better_motors:blazing_motor', '#gtceu:circuits/iv', '#gtceu:batteries/iv')
            .circuit(22)
            .itemOutputs('create_better_motors:niotic_motor')
            .duration(6000)
            .EUt(GTValues.VA[GTValues.IV]);
        // - 電動モーターMk7
        GT.assembly_line('replace_create_ca_kinetic_motor_tier_7')
            .itemInputs('4x #forge:plates/hsss', '2x #forge:plates/reggarfonite', 'createcasing:chorium_ingot',
                '3x gtceu:luv_voltage_coil', 'create_better_motors:niotic_motor', '2x gtceu:niobium_titanium_single_cable',
                '#gtceu:circuits/luv', '#gtceu:batteries/luv')
            .inputFluids('gtceu:soldering_alloy 720', 'gtceu:sodium_potassium 2000')
            .itemOutputs('create_better_motors:spirited_motor')
            .duration(6000)
            .EUt(GTValues.VA[GTValues.LuV])
        ["scannerResearch(java.util.function.UnaryOperator)"](research => research.researchStack('create_better_motors:niotic_motor')
            .EUt(GTValues.VA[GTValues.IV]).duration(12000));
        // - 電動モーターMk8
        GT.assembly_line('replace_create_ca_kinetic_motor_tier_8')
            .itemInputs('4x #forge:plates/hsss', '2x #forge:plates/reggarfonite', '#forge:ingots/indium_tin_barium_titanium_cuprate',
                '3x gtceu:luv_voltage_coil', 'create_better_motors:spirited_motor', '2x gtceu:indium_tin_barium_titanium_cuprate_double_wire',
                '#gtceu:batteries/luv', '#gtceu:circuits/luv')
            .inputFluids('gtceu:soldering_alloy 720', 'gtceu:sodium_potassium 6000')
            .itemOutputs('create_better_motors:nitro_motor')
            .duration(6000)
            .EUt(GTValues.VA[GTValues.LuV])
            .stationResearch(research => research.researchStack('create_better_motors:spirited_motor')
                .EUt(GTValues.VA[GTValues.LuV]).CWUt(16));
    });
    // 一方こっちは強化される。
    // - 強化：ケーシング
    CreateAppendComponent.Casings.forEach((value) => {
        let casingMaterial = 'create:andesite_alloy';
        let resourceMaterial = '#forge:stripped_logs';
        switch (value) {
            case 'create:copper_casing':
                casingMaterial = '#forge:ingots/copper';
                break;
            case 'create:brass_casing':
                casingMaterial = '#forge:ingots/brass';
                break;
            case 'create:railway_casing':
                casingMaterial = '#forge:plates/obsidian';
                resourceMaterial = 'create:brass_casing';
                break;
            case 'create:shadow_steel_casing':
                casingMaterial = 'create:shadow_steel';
                break;
            case 'create:refined_radiance_casing':
                casingMaterial = 'create:refined_radiance';
                break;
            case 'createcasing:creative_casing':
                casingMaterial = 'createcasing:chorium_ingot';
                resourceMaterial = 'create:industrial_iron_block';
                break;
        }
        GT.assembler(`append_${value}_casing`)
            .itemInputs(casingMaterial, resourceMaterial)
            .circuit(22)
            .itemOutputs(value)
            .duration(60)
            .EUt(GTValues.VA[GTValues.ULV]);
    });
    // - 強化：不思議な変転
    CreateAppendComponent.MysteryConversion.forEach((value) => {
        const mysteryConvMaterials = {
            blazeBurner: { base: 'create:empty_blaze_burner', essence: 'mysticalagriculture:blaze_essence', bound: '#forge:blaze' },
            hauntedBell: { base: 'create:peculiar_bell', essence: 'mysticalagriculture:zombie_essence', bound: '#forge:experience' },
            shadowSteel: { base: 'create:chromatic_compound', essence: 'kubejs:eternal_darkness_crystal', bound: '#forge:sludge' },
            refRadiance: { base: 'create:chromatic_compound', essence: 'kubejs:divine_light_crystal', bound: '#forge:glowstone' },
            andChunkLdr: { base: 'create_power_loader:empty_andesite_chunk_loader',
                essence: 'mysticalagriculture:ghast_essence', bound: '#forge:experience' },
            brsChunkLdr: { base: 'create_power_loader:empty_brass_chunk_loader',
                essence: 'mysticalagriculture:ghast_essence', bound: '#forge:experience' }
        };
        let configureConvMaterial = { base: '', essence: '', bound: '' };
        let circuitId = 22;
        let boundAmount = 144;
        const recipeIdSampleCase = value.split(':')[1];
        switch (value) {
            case 'create:blaze_burner':
                configureConvMaterial.base = mysteryConvMaterials.blazeBurner.base;
                configureConvMaterial.bound = mysteryConvMaterials.blazeBurner.bound;
                configureConvMaterial.essence = mysteryConvMaterials.blazeBurner.essence;
                break;
            case 'create:haunted_bell':
                configureConvMaterial.base = mysteryConvMaterials.hauntedBell.base;
                configureConvMaterial.bound = mysteryConvMaterials.hauntedBell.bound;
                configureConvMaterial.essence = mysteryConvMaterials.hauntedBell.essence;
                boundAmount = 1000;
                break;
            case 'create:shadow_steel':
                configureConvMaterial.base = mysteryConvMaterials.shadowSteel.base;
                configureConvMaterial.bound = mysteryConvMaterials.shadowSteel.bound;
                configureConvMaterial.essence = mysteryConvMaterials.shadowSteel.essence;
                boundAmount = 1000;
                break;
            case 'create:refined_radiance':
                configureConvMaterial.base = mysteryConvMaterials.refRadiance.base;
                configureConvMaterial.bound = mysteryConvMaterials.refRadiance.bound;
                configureConvMaterial.essence = mysteryConvMaterials.refRadiance.essence;
                boundAmount = 1000;
                circuitId = 23;
                break;
            case 'create_power_loader:andesite_chunk_loader':
                configureConvMaterial.base = mysteryConvMaterials.andChunkLdr.base;
                configureConvMaterial.bound = mysteryConvMaterials.andChunkLdr.bound;
                configureConvMaterial.essence = mysteryConvMaterials.andChunkLdr.essence;
                boundAmount = 1000;
                break;
            case 'create_power_loader:brass_chunk_loader':
                configureConvMaterial.base = mysteryConvMaterials.brsChunkLdr.base;
                configureConvMaterial.bound = mysteryConvMaterials.brsChunkLdr.bound;
                configureConvMaterial.essence = mysteryConvMaterials.brsChunkLdr.essence;
                boundAmount = 1000;
                break;
            case 'createqol:shadow_steel_block':
                configureConvMaterial.base = 'createqol:chromatic_compound_block';
                configureConvMaterial.bound = mysteryConvMaterials.shadowSteel.bound;
                configureConvMaterial.essence = mysteryConvMaterials.shadowSteel.essence;
                boundAmount = 9000;
                break;
            case 'createqol:refined_radiance_block':
                configureConvMaterial.base = 'createqol:chromatic_compound_block';
                configureConvMaterial.bound = mysteryConvMaterials.refRadiance.bound;
                configureConvMaterial.essence = mysteryConvMaterials.refRadiance.essence;
                circuitId = 23;
                boundAmount = 9000;
                break;
        }
        GT.mixer(`append_mysteryconv_${recipeIdSampleCase}`)
            .itemInputs(configureConvMaterial.base, `16x ${configureConvMaterial.essence}`)
            .circuit(circuitId)
            .inputFluids('#forge:mana 16000', `${configureConvMaterial.bound} ${boundAmount}`)
            .itemOutputs(value)
            .duration(72000)
            .EUt(GTValues.VA[GTValues.ZPM]);
    });
});
