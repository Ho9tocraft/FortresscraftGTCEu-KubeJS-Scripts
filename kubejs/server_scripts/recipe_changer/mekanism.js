//requires: gtceu
//requires: mekanism
//requires: mekanismelements
//requires: mekanism_extras
ServerEvents.recipes(event => {
  if (Platform.isLoaded('almostunified')) {
    // AlmostUnified読み込み時
    event.remove([
      { type: 'minecraft:smelting', output: 'gtceu:osmium_ingot' }, // オスミウム焼く (かまど)
      { type: 'minecraft:blasting', output: 'gtceu:osmium_ingot' }, // オスミウム焼く (溶鉱炉)
      { type: 'thermal:smelter', output: 'gtceu:osmium_ingot' }, // オスミウム焼く (RSかまど)
      { type: 'minecraft:crafting', input: 'gtceu:osmium_ingot', output: 'gtceu:osmium_block' }, // B圧縮 (作業台)
      { id: 'mekanism:processing/osmium/storage_blocks/from_ingots' }, // B圧縮 (作業台)
      { id: 'mekanism:processing/osmium/nugget/from_ingot' }, // N解凍 (作業台)
      { id: 'mekanism:processing/osmium/ingot/from_nuggets' }, // N圧縮 (作業台)
      { id: 'mekanism:gas_conversion/osmium_from_ingot' }, // ガス変換削除 (純Os)
      { id: 'mekanism:gas_conversion/osmium_from_block' }, // ガス削除 (純Os)
      { id: 'mekanism_extras:enriching/enriched/dust_osmium' }, // 濃縮オスミウム変換削除 (純Os)
      { id: 'mekanism:processing/osmium/dust/from_ingot' }, // Mek粉砕機でのオスミウム出力調整のため、削除
    ]);
    event.replaceOutput(
      { input: 'gtceu:osmium_ingot', output: 'mekanism:dust_osmium' },
      'mekanism:dust_osmium', 'gtceu:osmium_dust');
  }

  const { electric_blast_furnace: EBF } = event.recipes.gtceu;

  /* ---- 機械レシピ調整・追加 ---- */
  // 低品位オスミウムからのガス変換
  event.custom({
    type: 'mekanism:gas_conversion',
    input: { ingredient: { tag: 'forge:ingots/low_grade_osmium' }},
    output: {
      gas: 'mekanism:osmium',
      amount: 200
    }
  });
  // 低品位オスミウムからの濃縮オスミウム変換
  event.custom({
    type: 'mekanism:enriching',
    input: { ingredient: { tag: 'forge:dusts/low_grade_osmium' }},
    output: { item: 'mekanism_extras:enriched_osmium' }
  });
  // 低品位オスミウムからの基本回路 (1オスミウム=8濃縮オスミウム=64低品位オスミウム)
  event.custom({
    type: 'mekanism:metallurgic_infusing',
    chemicalInput: { tag: 'mekanism:redstone', amount: 20 },
    itemInput: { ingredient: { tag: 'forge:ingots/low_grade_osmium' }, amount: 64 },
    output: { item: 'mekanism:basic_control_circuit' }
  });
  event.custom({
    type: 'mekanism:metallurgic_infusing',
    chemicalInput: { tag: 'mekanism:redstone', amount: 20 },
    itemInput: { ingredient: { item: 'mekanism_extras:enriched_osmium' }, amount: 8 },
    output: { item: 'mekanism:basic_control_circuit' }
  });
  // ゲージドロッパー
  event.shaped('mekanism:gauge_dropper', [
    ' I ',
    'G G',
    'GGG'
  ], {
    I: '#forge:ingots/low_grade_osmium',
    G: '#forge:glass_panes'
  });
  // 発展ティアインストーラーなど、発展ティア関連
  const AdvancedTiers = [
    { center: '#minecraft:planks', dist: 'mekanism:advanced_tier_installer' },
    { center: 'mekanism:basic_smelting_factory', dist: 'mekanism:advanced_smelting_factory' },
    { center: 'mekanism:basic_enriching_factory', dist: 'mekanism:advanced_enriching_factory' },
    { center: 'mekanism:basic_crushing_factory', dist: 'mekanism:advanced_crushing_factory' },
    { center: 'mekanism:basic_compressing_factory', dist: 'mekanism:advanced_compressing_factory' },
    { center: 'mekanism:basic_combining_factory', dist: 'mekanism:advanced_combining_factory' },
    { center: 'mekanism:basic_purifying_factory', dist: 'mekanism:advanced_purifying_factory' },
    { center: 'mekanism:basic_injecting_factory', dist: 'mekanism:advanced_injecting_factory' },
    { center: 'mekanism:basic_infusing_factory', dist: 'mekanism:advanced_infusing_factory' },
    { center: 'mekanism:basic_sawing_factory', dist: 'mekanism:advanced_sawing_factory' },
    { center: 'mekanism:enrichment_chamber', dist: 'mekanism:purification_chamber' },
  ];
  AdvancedTiers.forEach(tier => {
    event.shaped(tier.dist, [
      'ACA',
      'IPI',
      'ACA'
    ], {
      A: 'mekanism:alloy_infused',
      C: '#forge:circuits/advanced',
      I: '#forge:ingots/low_grade_osmium',
      P: tier.center
    });
  });
  // 鋼鉄ケーシング
  event.shaped('mekanism:steel_casing', [
    'SGS',
    'GOG',
    'SGS'
  ], {
    G: '#forge:glass/silica',
    O: '#forge:ingots/low_grade_osmium',
    S: '#forge:ingots/steel'
  });
  // 冶金吹込機
  event.shaped('mekanism:metallurgic_infuser', [
    'IFI',
    'ROR',
    'IFI'
  ], {
    F: 'minecraft:furnace',
    I: '#forge:ingots/iron',
    O: '#forge:ingots/low_grade_osmium',
    R: '#forge:dusts/redstone'
  });
  // 電動ポンプ
  event.shaped('mekanism:electric_pump', [
    ' B ',
    'ACA',
    'OOO'
  ], {
    A: 'mekanism:alloy_infused',
    B: 'minecraft:bucket',
    C: 'mekanism:steel_casing',
    O: '#forge:ingots/low_grade_osmium'
  });
  // 発展エネルギーキューブ
  event.shaped('mekanism:advanced_energy_cube', [
    'ATA',
    'OCO',
    'ATA'
  ], {
    A: 'mekanism:alloy_infused',
    C: 'mekanism:basic_energy_cube',
    O: '#forge:ingots/low_grade_osmium',
    T: 'mekanism:energy_tablet'
  }).modifyResult((grid, result) => {
    const src = grid.find('mekanism:basic_energy_cube');

    return Item.of(result.id, result.count, src.nbt.copy());
  });
  // 基本化学タンク
  event.shaped('mekanism:basic_chemical_tank', [
    'ROR',
    'O O',
    'ROR'
  ], {
    R: '#forge:dusts/redstone',
    O: '#forge:ingots/low_grade_osmium'
  });
  // 発展化学タンク
  event.shaped('mekanism:advanced_chemical_tank', [
    'ROR',
    'OTO',
    'ROR'
  ], {
    R: 'mekanism:alloy_infused',
    O: '#forge:ingots/low_grade_osmium',
    T: 'mekanism:basic_chemical_tank'
  }).modifyResult((grid, result) => {
    const src = grid.find('mekanism:basic_chemical_tank');

    return Item.of(result.id, result.count, src.nbt.copy());
  });
  // 精鋭化学タンク
  event.shaped('mekanism:elite_chemical_tank', [
    'ROR',
    'OTO',
    'ROR'
  ], {
    R: 'mekanism:alloy_reinforced',
    O: '#forge:ingots/low_grade_osmium',
    T: 'mekanism:advanced_chemical_tank'
  }).modifyResult((grid, result) => {
    const src = grid.find('mekanism:advanced_chemical_tank');

    return Item.of(result.id, result.count, src.nbt.copy());
  }); // 究極ティア以降はGregオスミウムを使用しなければならない
  // ソーラーパネル
  event.shaped('mekanismgenerators:solar_panel', [
    'GGG',
    'RAR',
    'OOO'
  ], {
    A: 'mekanism:alloy_infused',
    G: '#forge:glass_panes',
    R: '#forge:dusts/redstone',
    O: '#forge:ingots/low_grade_osmium'
  });
  // 熱発電機
  event.replaceInput(
    { output: 'mekanismgenerators:heat_generator' },
    '#forge:ingots/iron', ['#forge:double_plates/iron', '#forge:plates/tin_alloy']
  );
  event.replaceInput(
    { output: 'mekanismgenerators:heat_generator' },
    '#forge:ingots/osmium', '#forge:ingots/low_grade_osmium'
  );
  // 太陽光発電機
  event.replaceInput(
    { output: 'mekanismgenerators:solar_generator' },
    '#forge:ingots/osmium', '#forge:ingots/low_grade_osmium'
  );
  // ガス燃焼発電機
  event.replaceInput(
    { output: 'mekanismgenerators:gas_burning_generator' },
    '#forge:ingots/osmium', '#forge:ingots/low_grade_osmium'
  );
  // 風力発電機
  event.replaceInput(
    { output: 'mekanismgenerators:wind_generator' },
    '#forge:ingots/osmium', ['gtceu:osmium_turbine_blade', '#forge:ingots/low_grade_osmium']
  );
  // タービンケース
  event.shaped('mekanismgenerators:turbine_casing', [
    ' S ',
    'SOS',
    ' S '
  ], {
    O: '#forge:ingots/low_grade_osmium',
    S: '#forge:ingots/steel'
  });
  // [Mekanism: Elements] オスミウム用高性能吸着剤
  event.replaceInput(
    { output: 'mekanismelements:high_performance_adsorbent_osmium' },
    '#forge:ingots/osmium', '#forge:ingots/low_grade_osmium'
  );
  // [Mekanism: Elements] 海水汲上ポンプ
  event.replaceInput(
    { output: 'mekanismelements:seawater_pump' },
    '#forge:ingots/osmium', '#forge:ingots/low_grade_osmium'
  );
  // オスミウムのツール類
  const osmiumTools = [
    'mekanismtools:osmium_pickaxe',
    'mekanismtools:osmium_axe',
    'mekanismtools:osmium_shovel',
    'mekanismtools:osmium_hoe',
    'mekanismtools:osmium_sword',
    'mekanismtools:osmium_helmet',
    'mekanismtools:osmium_chestplate',
    'mekanismtools:osmium_leggings',
    'mekanismtools:osmium_boots',
    'mekanismtools:osmium_shield'
  ];
  osmiumTools.forEach(tool => {
    event.replaceInput(
      { output: tool },
      '#forge:ingots/osmium', '#forge:ingots/low_grade_osmium'
    );
  });
  // [Applied Mekanistics / MEGA Cells] 化学物質セル筐体ほか
  const AE2CompatCells = [
    { output: 'megacells:mega_chemical_cell_housing', iDust: 'ae2:sky_dust', iGlass: 'ae2:quartz_vibrant_glass', iCenter: '' },
    { output: 'megacells:chemical_storage_cell_1m', iDust: 'ae2:sky_dust', iGlass: 'ae2:quartz_vibrant_glass', iCenter: 'megacells:cell_component_1m' },
    { output: 'megacells:chemical_storage_cell_4m', iDust: 'ae2:sky_dust', iGlass: 'ae2:quartz_vibrant_glass', iCenter: 'megacells:cell_component_4m' },
    { output: 'megacells:chemical_storage_cell_16m', iDust: 'ae2:sky_dust', iGlass: 'ae2:quartz_vibrant_glass', iCenter: 'megacells:cell_component_16m' },
    { output: 'megacells:chemical_storage_cell_64m', iDust: 'ae2:sky_dust', iGlass: 'ae2:quartz_vibrant_glass', iCenter: 'megacells:cell_component_64m' },
    { output: 'megacells:chemical_storage_cell_256m', iDust: 'ae2:sky_dust', iGlass: 'ae2:quartz_vibrant_glass', iCenter: 'megacells:cell_component_256m' },
    { output: 'appmek:chemical_cell_housing', iDust: '#forge:dusts/redstone', iGlass: 'ae2:quartz_glass', iCenter: '' },
  ];
  AE2CompatCells.forEach(recipe => {
    const { output, iDust, iGlass, iCenter } = recipe;
    if (/housing/.test(output) || iCenter === '') {
      event.shaped(output, [
        'GDG',
        'D D',
        'OOO'
      ], {
        G: iGlass,
        D: iDust,
        O: '#forge:ingots/low_grade_osmium'
      });
    } else {
      event.shaped(output, [
        'GDG',
        'DCD',
        'OOO'
      ], {
        G: iGlass,
        D: iDust,
        C: iCenter,
        O: '#forge:ingots/low_grade_osmium'
      });
    }
  });
  // Mek粉砕機でのオスミウム出力調整
  event.custom({
    type: 'mekanism:crushing',
    input: { ingredient: { tag: 'forge:ingots/osmium' }},
    output: { item: 'gtceu:osmium_dust' }
  });
  event.custom({
    type: 'mekanism:crushing',
    input: { ingredient: { tag: 'forge:ingots/low_grade_osmium' }},
    output: { item: 'gtceu:low_grade_osmium_dust' }
  });

  /* ---- Mekanismのオスミウム(低品位オスミウム)をアップグレードするレシピ ---- */
  EBF('convert_osmium_lg_to_hg')
    .itemInputs('8x mekanism_extras:enriched_osmium')
    .inputFluids('gtceu:dichlorobenzidine 1000')
    .itemOutputs('1x gtceu:hot_osmium_ingot')
    .blastFurnaceTemp(5400)
    .duration(3600)
    .EUt(GTValues.VA[GTValues.LuV]);
});

// タグ調整
ServerEvents.tags('item', event => {
  // アイテムタグ
  event.add('forge:ingots/low_grade_osmium', 'mekanism:ingot_osmium');
  event.remove('forge:ingots/osmium', 'mekanism:ingot_osmium');
  event.add('forge:dusts/low_grade_osmium', 'mekanism:dust_osmium');
  event.remove('forge:dusts/osmium', 'mekanism:dust_osmium');
  event.add('forge:nuggets/low_grade_osmium', 'mekanism:nugget_osmium');
  event.remove('forge:nuggets/osmium', 'mekanism:nugget_osmium');
  event.add('forge:storage_blocks/low_grade_osmium', 'mekanism:block_osmium');
  event.remove('forge:storage_blocks/osmium', 'mekanism:block_osmium');
});
ServerEvents.tags('block', event => {
  // ブロックタグ
  event.add('forge:storage_blocks/low_grade_osmium', 'mekanism:block_osmium');
  event.remove('forge:storage_blocks/osmium', 'mekanism:block_osmium');
});
