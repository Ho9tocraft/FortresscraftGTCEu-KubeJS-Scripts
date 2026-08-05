// FF14 Contents
ServerEvents.recipes(event => {
    const GT = event.recipes.gtceu;
    const elementGems = [
        { from: ['ruby'], to: 'fire_gem' },
        { from: ['emerald', 'green_sapphire'], to: 'wind_gem' },
        { from: ['amethyst'], to: 'lightning_gem' },
        { from: ['diamond', 'certus_quartz'], to: 'ice_gem' },
        { from: ['sapphire', 'lapis'], to: 'water_gem' },
        { from: ['topaz', 'yellow_garnet'], to: 'earth_gem' }
    ];
    const eikonMaterials = {
        ARR: {
            IFRIT: 'kubejs:ifrit_horn',
            GARUDA: 'kubejs:garuda_feather',
            TITAN: 'kubejs:titan_heart',
            LEVIATHAN: 'kubejs:leviathan_barb',
            RAMUH: 'kubejs:levin_orb',
            SHIVA: 'kubejs:ice_tear',
            MOGGLE_MOG: 'kubejs:moggle_mog_whisker'
        },
        HW: {
            RAVANA: 'kubejs:ravana_forewing',
            BISMARCK: 'kubejs:bismarck_beleen',
            NIDHOGG: 'kubejs:nidhogg_scale',
            SEPHIROT: 'kubejs:sephirot_sap',
            SOPHIA: 'kubejs:sophic_bead_fragment',
            ZURVAN: 'kubejs:zurvanite_carapace_fragment'
        },
        SB: {
            SUSANO: 'kubejs:blade_of_revelry',
            LAKSHMI: 'kubejs:blissful_shroud',
            SHINRYU: 'kubejs:shinryu_scale',
            TSUKUYOMI: 'kubejs:celestial_kimono_remnant'
        },
        ShBr: {
            TITANIA: 'kubejs:dancing_wing',
            INNOCENCE: 'kubejs:immaculate_wingblade',
            HADES: 'kubejs:hades_auracite',
            WOL: 'kubejs:plate_of_light',
            RUBYW: 'kubejs:ruby_plating',
            EMERALDW: 'kubejs:emerald_plating',
            DIAMONDW: 'kubejs:diamond_plating'
        },
        EW: {
            HYDAELYN: 'kubejs:divine_light_crystal',
            ZODIARK: 'kubejs:eternal_darkness_crystal',
            ENDSINGER: 'kubejs:blue_feather'
        }
    }
    // ジェム
    elementGems.forEach((value) => {
        value.from.forEach((ingredient) => {
            GT.autoclave(`${value.to}_from_${ingredient}`)
                .itemInputs(`16x #forge:exquisite_gems/${ingredient}`, '8x minecraft:blaze_rod')
                .inputFluids('#forge:mana 1000')
                .itemOutputs(`gtceu:${value.to}_dust`)
                .duration(6000)
                .EUt(GTValues.VA[GTValues.LV]);
        });
        GT.autoclave(`forming_${value.to}_gem_with_water`)
            .itemInputs(`2x #forge:dusts/${value.to}`)
            .inputFluids('#forge:water 1000')
            .chancedOutput(`gtceu:${value.to}_gem`, 5000, 0)
            .duration(800)
            .EUt(GTValues.VA[GTValues.LV]);
        GT.autoclave(`forming_${value.to}_gem_with_distilled_water`)
            .itemInputs(`2x #forge:dusts/${value.to}`)
            .inputFluids('#forge:distilled_water 200')
            .chancedOutput(`gtceu:${value.to}_gem`, 5000, 500)
            .duration(400)
            .EUt(GTValues.VA[GTValues.LV]);
    });
    // 極蛮神素材
    // - 新生編 (MV / 組み立て機)
    {
        // - イフリートの角
        GT.assembler('ifrit_horn')
            .itemInputs('2x #forge:gems/fire_gem', '#forge:dusts/redstone', 'minecraft:magma_block')
            .inputFluids('#forge:lava 250')
            .itemOutputs(eikonMaterials.ARR.IFRIT)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.MV]);
        // - ガルーダの羽根
        GT.assembler('garuda_feather')
            .itemInputs('2x #forge:gems/wind_gem', '#forge:dusts/redstone', 'minecraft:feather')
            .inputFluids('#forge:lava 250')
            .itemOutputs(eikonMaterials.ARR.GARUDA)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.MV]);
        // - タイタンの岩塊
        GT.assembler('titan_heart')
            .itemInputs('2x #forge:gems/earth_gem', '#forge:dusts/redstone', '#minecraft:dirt')
            .inputFluids('#forge:water 250')
            .itemOutputs(eikonMaterials.ARR.TITAN)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.MV]);
        // - リヴァイアサンの棘
        GT.assembler('leviathan_barb')
            .itemInputs('2x #forge:gems/water_gem', '#forge:dusts/redstone', 'minecraft:cactus')
            .inputFluids('#forge:water 250')
            .itemOutputs(eikonMaterials.ARR.LEVIATHAN)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.MV]);
        // - ラムウのオーブ
        GT.assembler('levin_orb')
            .itemInputs('2x #forge:gems/lightning_gem', '#forge:dusts/redstone', 'minecraft:ender_pearl')
            .inputFluids('#forge:lava 250')
            .itemOutputs(eikonMaterials.ARR.RAMUH)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.MV]);
        // - シヴァの涙
        GT.assembler('ice_tear')
            .itemInputs('2x #forge:gems/ice_gem', '#forge:dusts/redstone', 'minecraft:blue_ice')
            .inputFluids('#forge:water 250')
            .itemOutputs(eikonMaterials.ARR.SHIVA)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.MV]);
        // - モグル・モグのヒゲ
        GT.assembler('moggle_mog_whisker')
            .itemInputs('2x #forge:gems/fire_gem', '2x #forge:gems/wind_gem', '2x #forge:gems/water_gem', '4x #minecraft:wool')
            .inputFluids('#forge:milk 500')
            .itemOutputs(eikonMaterials.ARR.MOGGLE_MOG)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.MV]);
    }
    // - 蒼天編 (HV / 組み立て機)
    {
        // - ラーヴァナの翅
        GT.assembler('ravana_forewing')
            .itemInputs(`64x ${eikonMaterials.ARR.IFRIT}`, `64x ${eikonMaterials.ARR.TITAN}`,
                '2x #forge:gems/fire_gem', '2x #forge:gems/earth_gem', '4x slashblade:proudsoul')
            .inputFluids('#forge:experience 500')
            .itemOutputs(eikonMaterials.HW.RAVANA)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.HV]);
        // - ビスマルクの角
        GT.assembler('bismarck_beleen')
            .itemInputs(`64x ${eikonMaterials.ARR.GARUDA}`, `64x ${eikonMaterials.ARR.LEVIATHAN}`,
                '2x #forge:gems/wind_gem', '2x #forge:gems/water_gem', '4x #minecraft:fishes')
            .inputFluids('#forge:experience 500')
            .itemOutputs(eikonMaterials.HW.BISMARCK)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.HV]);
        // - 邪竜の鱗
        GT.assembler('nidhogg_scale')
            .itemInputs(`64x ${eikonMaterials.ARR.SHIVA}`, `64x ${eikonMaterials.ARR.RAMUH}`,
                '2x #forge:gems/ice_gem', '2x #forge:gems/lightning_gem', 'minecraft:dragon_egg')
            .inputFluids('#forge:experience 500')
            .itemOutputs(eikonMaterials.HW.NIDHOGG)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.HV]);
        // - セフィロトの樹液塊
        GT.assembler('sephirot_sap')
            .itemInputs(`64x ${eikonMaterials.ARR.TITAN}`, `64x ${eikonMaterials.ARR.GARUDA}`,
                '4x #forge:gems/earth_gem', '4x #forge:gems/wind_gem', '4x #minecraft:saplings')
            .inputFluids('#forge:experience 500')
            .itemOutputs(eikonMaterials.HW.SEPHIROT)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.HV]);
        // - 女神の宝珠片
        GT.assembler('sophic_bead_fragment')
            .itemInputs(`64x ${eikonMaterials.ARR.LEVIATHAN}`, `64x ${eikonMaterials.ARR.RAMUH}`,
                '4x #forge:gems/water_gem', '4x #forge:gems/lightning_gem', '#forge:exquisite_gems/glass')
            .inputFluids('#forge:experience 500')
            .itemOutputs(eikonMaterials.HW.SOPHIA)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.HV]);
        // - 鬼神の甲殻片
        GT.assembler('zurvanite_carapace_fragment')
            .itemInputs(`64x ${eikonMaterials.ARR.IFRIT}`, `64x ${eikonMaterials.ARR.SHIVA}`,
                '4x #forge:gems/fire_gem', '4x #forge:gems/ice_gem', '4x #forge:foods/meat/raw')
            .inputFluids('#forge:experience 500')
            .itemOutputs(eikonMaterials.HW.ZURVAN)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.HV]);
    }
    // - 紅蓮編 (EV / 組み立て機)
    {
        // - 豪神スサノオの刃
        GT.assembler('blade_of_revelry')
            .itemInputs(`32x ${eikonMaterials.HW.RAVANA}`, `64x ${eikonMaterials.ARR.LEVIATHAN}`, '16x slashblade:proudsoul_ingot')
            .inputFluids('#forge:mana 500')
            .itemOutputs(eikonMaterials.SB.SUSANO)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.EV]);
        // - 美神ラクシュミの羽衣
        GT.assembler('blissful_shroud')
            .itemInputs(`32x ${eikonMaterials.HW.BISMARCK}`, `64x ${eikonMaterials.ARR.IFRIT}`, '16x botania:manaweave_cloth')
            .inputFluids('#forge:mana 500')
            .itemOutputs(eikonMaterials.SB.LAKSHMI)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.EV]);
        // - 神龍の鱗
        GT.assembler('shinryu_scale')
            .itemInputs(`4x ${eikonMaterials.HW.NIDHOGG}`, '8x #forge:flawless_gems/fire_gem', '8x #forge:flawless_gems/wind_gem',
                '8x #forge:flawless_gems/lightning_gem', '8x #forge:flawless_gems/water_gem', '8x #forge:flawless_gems/earth_gem',
                '8x #forge:flawless_gems/ice_gem')
            .inputFluids('#forge:mana 500')
            .itemOutputs(eikonMaterials.SB.SHINRYU)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.EV]);
        // - 夜神ツクヨミの反物
        GT.assembler('celestial_kimono_remnant')
            .itemInputs(`32x ${eikonMaterials.HW.SOPHIA}`, `64x ${eikonMaterials.ARR.SHIVA}`, '16x botania:manaweave_cloth')
            .inputFluids('#forge:mana 500')
            .itemOutputs(eikonMaterials.SB.TSUKUYOMI)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.EV]);
    }
    // - 漆黒編 (IV / アセンブリライン(スキャナーリサーチ))
    {
        // - ティターニアの羽根
        GT.assembly_line('dancing_wing')
            .itemInputs(`32x ${eikonMaterials.SB.SUSANO}`, `32x ${eikonMaterials.SB.LAKSHMI}`, `64x ${eikonMaterials.ARR.MOGGLE_MOG}`,
                '4x #forge:exquisite_gems/fire_gem', 'botania:rune_mana', '4x #forge:rosin', '64x projectexpansion:orange_matter')
            .inputFluids('#forge:mana 640000', '#forge:distilled_water 360000', '#forge:uu_matter 1000', 'thermal:syrup')
            .itemOutputs(eikonMaterials.ShBr.TITANIA)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.IV])
            ['scannerResearch(java.util.function.UnaryOperator)'](b => b.researchStack(eikonMaterials.SB.TSUKUYOMI)
                .EUt(GTValues.VA[GTValues.IV]).duration(6000));
        // - イノセンスの翼片
        GT.assembly_line('immaculate_wingblade')
            .itemInputs(`32x ${eikonMaterials.SB.SUSANO}`, `32x ${eikonMaterials.SB.SHINRYU}`, `64x ${eikonMaterials.ARR.MOGGLE_MOG}`,
                '4x #forge:exquisite_gems/lightning_gem', 'urushi:long_chochin', '4x #forge:rosin', '64x projectexpansion:orange_matter')
            .inputFluids('#forge:mana 640000', '#forge:distilled_water 360000', '#forge:uu_matter 1000', 'thermal:syrup')
            .itemOutputs(eikonMaterials.ShBr.INNOCENCE)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.IV])
            ['scannerResearch(java.util.function.UnaryOperator)'](b => b.researchStack(eikonMaterials.ShBr.TITANIA)
                .EUt(GTValues.VA[GTValues.IV]).duration(6000));
        // - ハーデスの結晶片
        GT.assembly_line('hades_auracite')
            .itemInputs(`32x ${eikonMaterials.SB.SHINRYU}`, `32x ${eikonMaterials.SB.TSUKUYOMI}`, '16x #forge:exquisite_gems/amethyst',
                '16x #forge:exquisite_gems/amethyst', '16x #forge:exquisite_gems/amethyst', '16x #forge:exquisite_gems/amethyst',
                '64x #forge:crops/grape', '4x #forge:rosin', '64x projectexpansion:orange_matter')
            .inputFluids('#forge:mana 640000', '#forge:distilled_water 360000', '#forge:uu_matter 1000', 'thermal:syrup')
            .itemOutputs(eikonMaterials.ShBr.HADES)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.IV])
            ['scannerResearch(java.util.function.UnaryOperator)'](b => b.researchStack(eikonMaterials.ShBr.INNOCENCE)
                .EUt(GTValues.VA[GTValues.IV]).duration(6000));
        // - プレート・オブ・ライト
        GT.assembly_line('plate_of_light')
            .itemInputs(`32x ${eikonMaterials.SB.SHINRYU}`, `32x ${eikonMaterials.SB.TSUKUYOMI}`, `64x ${eikonMaterials.ARR.MOGGLE_MOG}`,
                '4x #forge:exquisite_gems/certus_quartz', 'botania:terra_sword', '4x #forge:rosin', '64x projectexpansion:orange_matter')
            .inputFluids('#forge:mana 640000', '#forge:distilled_water 360000', '#forge:uu_matter 1000', 'thermal:syrup')
            .itemOutputs(eikonMaterials.ShBr.WOL)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.IV])
            ['scannerResearch(java.util.function.UnaryOperator)'](b => b.researchStack(eikonMaterials.ShBr.HADES)
                .EUt(GTValues.VA[GTValues.IV]).duration(6000));
        // - ルビーウェポン装甲片
        GT.assembly_line('ruby_plating')
            .itemInputs(`32x ${eikonMaterials.SB.TSUKUYOMI}`, eikonMaterials.ShBr.HADES, '16x #forge:exquisite_gems/ruby',
                '16x #forge:exquisite_gems/ruby', '16x #forge:exquisite_gems/ruby', '16x #forge:exquisite_gems/ruby',
                '#forge:double_plates/tungsten_steel')
            .inputFluids('#forge:mana 640000', '#forge:soldering_alloy 9216', '#forge:uu_matter 1000', 'thermal:syrup')
            .itemOutputs(eikonMaterials.ShBr.RUBYW)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.IV])
            ['scannerResearch(java.util.function.UnaryOperator)'](b => b.researchStack(eikonMaterials.ShBr.WOL)
                .EUt(GTValues.VA[GTValues.IV]).duration(6000));
        // - エメラルドウェポン装甲片
        GT.assembly_line('emerald_plating')
            .itemInputs(`32x ${eikonMaterials.SB.SHINRYU}`, eikonMaterials.ShBr.WOL, '16x #forge:exquisite_gems/emerald',
                '16x #forge:exquisite_gems/emerald', '16x #forge:exquisite_gems/emerald', '16x #forge:exquisite_gems/emerald',
                '#forge:double_plates/tungsten_steel')
            .inputFluids('#forge:mana 640000', '#forge:soldering_alloy 9216', '#forge:uu_matter 1000', 'thermal:syrup')
            .itemOutputs(eikonMaterials.ShBr.EMERALDW)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.IV])
            ['scannerResearch(java.util.function.UnaryOperator)'](b => b.researchStack(eikonMaterials.ShBr.RUBYW)
                .EUt(GTValues.VA[GTValues.IV]).duration(6000));
        // - ダイヤウェポン装甲片
        GT.assembly_line('diamond_plating')
            .itemInputs(`32x ${eikonMaterials.SB.SHINRYU}`, eikonMaterials.ShBr.RUBYW, eikonMaterials.ShBr.EMERALDW,
                '16x #forge:exquisite_gems/diamond', '16x #forge:exquisite_gems/diamond', '16x #forge:exquisite_gems/diamond',
                '16x #forge:exquisite_gems/diamond', '16x #forge:dense_plates/tungsten_steel')
            .inputFluids('#forge:mana 640000', '#forge:soldering_alloy 9216', '#forge:uu_matter 1000', 'thermal:syrup')
            .itemOutputs(eikonMaterials.ShBr.DIAMONDW)
            .duration(24000)
            .EUt(GTValues.VA[GTValues.IV])
            ['scannerResearch(java.util.function.UnaryOperator)'](b => b.researchStack(eikonMaterials.ShBr.EMERALDW)
                .EUt(GTValues.VA[GTValues.IV]).duration(6000));
    }
    // - 暁月編 (LuV / アセンブリライン(ステーションリサーチ))
    {
        // - ディヴァインライト・クリスタル
        GT.assembly_line('divine_light_crystal')
            .itemInputs(`64x ${eikonMaterials.ShBr.TITANIA}`, `64x ${eikonMaterials.ShBr.INNOCENCE}`, `64x ${eikonMaterials.ShBr.WOL}`,
                '16x #forge:exquisite_gems/water_gem', '16x #forge:exquisite_gems/ice_gem', '16x #forge:exquisite_gems/earth_gem',
                '64x kubejs:primal_mana', '64x #gtceu:batteries/iv', '64x projectexpansion:fading_matter_block')
            .inputFluids('#forge:mana 2560000', 'gtceu:distilled_water 1440000', '#forge:uu_matter 1000', '#forge:liquid_helium 1000')
            .itemOutputs(eikonMaterials.EW.HYDAELYN)
            .duration(24000)
            .EUt(GTValues.V[GTValues.LuV])
            .stationResearch(b => b.researchStack(eikonMaterials.EW.ZODIARK).EUt(GTValues.VHA[GTValues.LuV]).CWUt(256));
        // - エターナルダークネス・クリスタル
        GT.assembly_line('eternal_darkness_crystal')
            .itemInputs(`64x ${eikonMaterials.ShBr.HADES}`, `64x ${eikonMaterials.ShBr.RUBYW}`, `64x ${eikonMaterials.ShBr.EMERALDW}`,
                `64x ${eikonMaterials.ShBr.DIAMONDW}`, '16x #forge:exquisite_gems/wind_gem', '16x #forge:exquisite_gems/lightning_gem',
                '16x #forge:exquisite_gems/fire_gem', '64x kubejs:primal_mana', '64x #gtceu:batteries/iv', '64x projectexpansion:fading_matter_block')
            .inputFluids('#forge:mana 2560000', 'gtceu:distilled_water 1440000', '#forge:uu_matter 1000', '#forge:liquid_helium 1000')
            .itemOutputs(eikonMaterials.EW.ZODIARK)
            .duration(24000)
            .EUt(GTValues.V[GTValues.LuV])
            .stationResearch(b => b.researchStack(eikonMaterials.ShBr.DIAMONDW).EUt(GTValues.VHA[GTValues.LuV]).CWUt(256));
        // - ブルーフェザー
        GT.assembly_line('blue_feather')
            .itemInputs(eikonMaterials.EW.ZODIARK, eikonMaterials.EW.HYDAELYN, '64x #forge:ingots/high_durium', '64x #forge:ingots/high_mithrite',
                '16x #forge:exquisite_gems/echo_shard', '64x mysticalagradditions:insanium_coal', '64x projectexpansion:fading_matter_block',
                '64x avaritia:refined_coal', '64x kubejs:naquadah_fuel_rod_quad', '64x #forge:storage_blocks/netherite')
            .inputFluids('#forge:mana 2560000', '#forge:titanium_carbide 9216', '#forge:uu_matter 1000', '#forge:liquid_oxygen 1000')
            .itemOutputs(eikonMaterials.EW.ENDSINGER)
            .duration(24000)
            .EUt(GTValues.V[GTValues.LuV])
            .stationResearch(b => b.researchStack(eikonMaterials.EW.HYDAELYN).EUt(GTValues.VHA[GTValues.LuV]).CWUt(512));
    }
});
