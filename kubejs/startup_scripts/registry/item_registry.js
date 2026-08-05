/**
 * CustomTier Registry
 */
ItemEvents.armorTierRegistry(event => {
    event.add('abysslinker', tier => {
        tier.durabilityMultiplier = 4096;
        tier.slotProtections = [6, 12, 16, 6];
        tier.enchantmentValue = 1;
        tier.equipSound = 'minecraft:item.armor.equip_leather';
        tier.repairIngredient = '#forge:ingots/awakened_abysslinker_mithril';
        tier.toughness = 5;
        tier.knockbackResistance = 0;
    });
});
ItemEvents.toolTierRegistry(event => {
    event.add('bluefeather', tier => {
        tier.uses = 1024;
        tier.speed = 4.5;
        tier.attackDamageBonus = 32768;
        tier.level = 5;
        tier.enchantmentValue = 512;
        tier.repairIngredient = '#forge:ingots/lunar_adamantium';
    });
});

/**
 * Item Registry
 */
StartupEvents.registry('item', event => {
    const voltage_tier = ['ulv', 'lv', 'mv', 'hv', 'ev', 'iv', 'luv', 'zpm', 'uv', 'uhv', 'uev', 'uiv', 'uxv', 'opv', 'max'];
    const voltage_macro = {
        ULV: 0,
        LV: 1,
        MV: 2,
        HV: 3,
        EV: 4,
        IV: 5,
        LuV: 6,
        ZPM: 7,
        UV: 8,
        UHV: 9,
        UEV: 10,
        UIV: 11,
        UXV: 12,
        OpV: 13,
        MAX: 14
    };
    const circuit_tier = ['bio', 'optical', 'pico', 'quantum', 'transcended'];
    const circuit_type = ['processor', 'processor_assembly', 'processor_computer', 'processor_mainframe'];
    const macro_circuit = {
        tier: {
            bio: 0,
            optical: 1,
            pico: 2,
            quantum: 3,
            transcended: 4,
        },
        type: {
            processor: 0,
            assembly: 1,
            computer: 2,
            mainframe: 3,
        },
    };

    /**
     * Define Circuit
     * @param {String} theme 
     * @param {String} type 
     * @param {String} volt 
     */
    let Circuit = (theme, type, volt) => {
        event.create(`${theme}_${type}`)
            .textureJson({ layer0: `kubejs:item/circuits/${theme}_${type}` })
            .tag(`gtceu:circuits/${volt}`);
    };
    /**
     * Define Unit
     * @param {String} theme 
     */
    let Unit = (theme) => {
        event.create(`${theme}_processing_unit`)
            .textureJson({ layer0: `kubejs:item/circuits/${theme}_processing_unit` });
        event.create(`${theme}_circuit_board`)
            .textureJson({ layer0: `kubejs:item/circuits/${theme}_circuit_board` });
    };
    /**
     * Define All Circuits
     * @param {String} theme 
     * @param {Number} volt 
     */
    let DefinationCircuit = (theme, volt) => {
        Unit(theme);
        Circuit(theme, circuit_type[macro_circuit.type.processor], voltage_tier[volt]);
        if ((volt + 1) < voltage_tier.length) Circuit(theme, circuit_type[macro_circuit.type.assembly], voltage_tier[volt + 1]);
        if ((volt + 2) < voltage_tier.length) Circuit(theme, circuit_type[macro_circuit.type.computer], voltage_tier[volt + 2]);
        if ((volt + 3) < voltage_tier.length) Circuit(theme, circuit_type[macro_circuit.type.mainframe], voltage_tier[volt + 3]);
    };
    DefinationCircuit(circuit_tier[macro_circuit.tier.bio], voltage_macro.ZPM);
    DefinationCircuit(circuit_tier[macro_circuit.tier.optical], voltage_macro.UV);
    DefinationCircuit(circuit_tier[macro_circuit.tier.pico], voltage_macro.UHV);
    DefinationCircuit(circuit_tier[macro_circuit.tier.quantum], voltage_macro.UEV);
    DefinationCircuit(circuit_tier[macro_circuit.tier.transcended], voltage_macro.UIV);

    /**
     * Define All Fuel Rods
     * @param {String} fuelType 
     */
    let DefinationFuelRod = (fuelType) => {
        event.create(`${fuelType}_fuel_rod_single`)
            .textureJson({ layer0: `kubejs:item/fuel_rods/${fuelType}_1x` });
        event.create(`${fuelType}_fuel_rod_double`)
            .textureJson({ layer0: `kubejs:item/fuel_rods/${fuelType}_2x` });
        event.create(`${fuelType}_fuel_rod_quad`)
            .textureJson({ layer0: `kubejs:item/fuel_rods/${fuelType}_4x` });
        event.create(`depleted_${fuelType}_fuel_rod_single`)
            .textureJson({ layer0: `kubejs:item/fuel_rods/${fuelType}_1x_depleted` });
        event.create(`depleted_${fuelType}_fuel_rod_double`)
            .textureJson({ layer0: `kubejs:item/fuel_rods/${fuelType}_2x_depleted` });
        event.create(`depleted_${fuelType}_fuel_rod_quad`)
            .textureJson({ layer0: `kubejs:item/fuel_rods/${fuelType}_4x_depleted` });
    };

    // 燃料棒
    const defReactorFuel = ['thorium', 'uranium', 'plutonium', 'naquadah'];
    event.create('empty_fuel_rod')
        .textureJson({ layer0: 'kubejs:item/fuel_rods/empty_fuel_rod' });
    defReactorFuel.forEach((value) => {
        DefinationFuelRod(value);
    });
    // 極蛮神素材
    const eikonMaterials = [
        'ifrit_horn', 'garuda_feather', 'titan_heart', 'leviathan_barb', 'moggle_mog_whisker', 'levin_orb', 'ice_tear', // 新生編
        'ravana_forewing', 'bismarck_beleen', 'nidhogg_scale', 'sephirot_sap', 'sophic_bead_fragment', 'zurvanite_carapace_fragment', // 蒼天編
        'blade_of_revelry', 'blissful_shroud', 'shinryu_scale', 'celestial_kimono_remnant', // 紅蓮編
        'dancing_wing', 'immaculate_wingblade', 'hades_auracite', 'ruby_plating', 'plate_of_light', 'emerald_plating', 'diamond_plating', // 漆黒編
        'divine_light_crystal', 'eternal_darkness_crystal', 'blue_feather' // 暁月編
    ];
    eikonMaterials.forEach((value) => {
        if (value.match(/(crystal|auracite)$/)) {
            event.create(value)
                .tag('fgtceu:materials/eikonic')
                .textureJson({
                    layer0: `kubejs:item/eikons/${value}`,
                    layer1: 'kubejs:item/gem_exquisite_overlay'
                });
        } else if (value.match(/(plating$|^plate)/)) {
            event.create(value)
                .tag('fgtceu:materials/eikonic')
                .textureJson({
                    layer0: `kubejs:item/eikons/${value}`,
                    layer1: 'kubejs:item/plate_dense_overlay'
                });
        } else if (value.match(/(bead|carapace)_fragment$/)) {
            event.create(value)
                .tag('fgtceu:materials/eikonic')
                .textureJson({
                    layer0: `kubejs:item/eikons/${value}`,
                    layer1: `kubejs:item/lens_overlay`
                });
        } else if (value == 'sephirot_sap') {
            event.create(value)
                .tag('fgtceu:materials/eikonic')
                .textureJson({
                    layer0: `kubejs:item/eikons/${value}`,
                    layer1: 'kubejs:item/gem_overlay'
                });
        } else {
            event.create(value)
                .tag('fgtceu:materials/eikonic')
                .textureJson({ layer0: `kubejs:item/eikons/${value}` });
        }
    });
    const sugarProgress = ['sugarcane_dust', 'muscovado', 'raw_sugar'];
    sugarProgress.forEach((value) => {
        event.create(value)
            .textureJson({ layer0: `kubejs:item/${value}` });
    });
    // --- 武器防具 ---
    // * 武器 *
    event.create('bluefeather_greatsword', 'sword')
        .parentModel('kubejs:item/based/big_weapon_greatsword')
        .textureJson({
            layer0: 'kubejs:item/tools/bluefeather_faussar'
        })
        .maxStackSize(1)
        .fireResistant(true)
        .speed(1.0)
        .tier('bluefeather');
    // * 防具 *
    // アビスリンカー装備
    event.create('abysslinker_magic_circle')
        .textureJson({ layer0: 'kubejs:item/armor/abysslinker_magic_circle' })
        .maxStackSize(1)
        .fireResistant(true)
        .tag('curios:charm');
    event.create('abysslinker_head', 'helmet')
        .textureJson({ layer0: 'kubejs:item/armor/abysslinker_armor_head' })
        .maxStackSize(1)
        .fireResistant(true)
        .tier('abysslinker');
    event.create('abysslinker_tunic', 'chestplate')
        .textureJson({ layer0: 'kubejs:item/armor/abysslinker_armor_tunic' })
        .maxStackSize(1)
        .fireResistant(true)
        .tier('abysslinker');
    event.create('abysslinker_pants', 'leggings')
        .textureJson({ layer0: 'kubejs:item/armor/abysslinker_armor_leggings' })
        .maxStackSize(1)
        .fireResistant(true)
        .tier('abysslinker');
    event.create('abysslinker_boots', 'boots')
        .textureJson({ layer0: 'kubejs:item/armor/abysslinker_armor_boots' })
        .maxStackSize(1)
        .fireResistant(true)
        .tier('abysslinker');
    // 熾聖の燃え殻
    event.create('scorched_sacred_ash')
        .textureJson({ layer0: 'kubejs:item/burnout_waste' })
        .fireResistant(true);
});

ItemEvents.modification(event => {
    const ResLc = Java.loadClass('net.minecraft.resources.ResourceLocation');
    const BIReg = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
    const AttrM = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier');
    const UUIDs = Java.loadClass('java.util.UUID');
    const ArLis = Java.loadClass('java.util.ArrayList');
    const Oprte = AttrM.Operation;
    const ISSBAtrMap = new Map([
        ['head', {
            item_id: 'kubejs:abysslinker_head',
            uidInfo: {
                SPELL_POWER: '0ca54588-36dc-46db-8b10-31e885e2bd0f',
                MAX_MANA: 'd435ef10-03dc-44a9-a58b-53796d4df60c',
                CDREDUCT: '76768112-c356-4294-8eb1-e19615167f9f'
            }
        }],
        ['chest', {
            item_id: 'kubejs:abysslinker_tunic',
            uidInfo: {
                SPELL_POWER: 'cf615ddd-4e5c-4eb7-8b5b-e392f649de08',
                MAX_MANA: '935a402c-ba98-4592-9716-f1ea4fa2ee22',
                CDREDUCT: '0e8efa3f-e1b8-4649-bb98-251b7c2cc579'
            }
        }],
        ['legs', {
            item_id: 'kubejs:abysslinker_pants',
            uidInfo: {
                SPELL_POWER: 'b062ecb4-ff5f-4ec0-bf54-1a099f546e40',
                MAX_MANA: 'f1003fac-1856-4358-9459-dfc1eb02b282',
                CDREDUCT: 'ce93d97a-1fc2-4023-858d-8c03b296401f'
            }
        }],
        ['feet', {
            item_id: 'kubejs:abysslinker_boots',
            uidInfo: {
                SPELL_POWER: '9305267b-c96a-49f7-bb03-9e60153ced60',
                MAX_MANA: '30cdb1ee-90df-4b75-ac9f-37b6ded761c2',
                CDREDUCT: '42ab73c7-749b-44b6-82be-8807318162c6'
            }
        }]
    ]);
    const ISSBAttr = {
        SPELL_POWER: 0.1, // 魔力+2
        MAX_MANA: 15, // MP+15
        CDREDUCT: 0.05
    };
    ISSBAtrMap.forEach((value) => {
        event.modify(value.item_id, item => {
            const getAttr = (id) => { return BIReg.ATTRIBUTE.get(new ResLc(id)); }
            const addModifier = (attribute, uuid, name, amount, op) => {
                if (!attribute) return;
                const atrM = item.kjs$getMutableAttributeMap();
                let list = atrM.get(attribute);
                if (list == null) {
                    list = new ArLis();
                    atrM.put(attribute, list);
                }
                const uid = UUIDs.fromString(uuid);
                for (let i = list.size() - 1; i >= 0; i--) {
                    const tAtr = list.get(i);
                    if (tAtr.getId() && String(tAtr.getId()) === String(uid)) list.remove(i);
                }
                list.add(new AttrM(uid, name, amount, op));
            };
            addModifier(getAttr('irons_spellbooks:spell_power'),value.uidInfo.SPELL_POWER,
                'al_issb_attr_spell_power', ISSBAttr.SPELL_POWER, Oprte.MULTIPLY_TOTAL);
            addModifier(getAttr('irons_spellbooks:max_mana'), value.uidInfo.MAX_MANA,
                'al_issb_attr_max_mana', ISSBAttr.MAX_MANA, Oprte.ADDITION);
            addModifier(getAttr('irons_spellbooks:cooldown_reduction'), value.uidInfo.CDREDUCT,
                'al_issb_attr_cdr', ISSBAttr.CDREDUCT, Oprte.MULTIPLY_TOTAL);
        });
    });
});

