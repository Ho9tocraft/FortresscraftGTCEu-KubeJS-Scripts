// UgoBlock
// 時代: UV
// 中間素材は「まだ」マシ (スキャナーリサーチでLuVでいける)
ServerEvents.recipes(event => {
  const GT = event.recipes.gtceu;
  event.remove({ mod: 'ugoblock', not: { output: 'ugoblock:block_imitation_wand' } });
  // なめらかな泣く黒曜石
  GT.assembly_line('replace_ugoblock_smooth_crying_obsidian')
    .itemInputs('4x minecraft:crying_obsidian', '4x minecraft:obsidian',
      '4x #forge:storage_blocks/refined_obsidian', '64x thermal:obsidian_glass')
    .inputFluids('#forge:distilled_water 4000', '#forge:naquadria 82944')
    .itemOutputs('ugoblock:smooth_crying_obsidian')
    .duration(72000)
    .EUt(GTValues.V[GTValues.UV])
  ["scannerResearch(java.util.function.UnaryOperator)"]
    (b => b.researchStack('minecraft:crying_obsidian').EUt(GTValues.VA[GTValues.LuV]).duration(648000));
  // エンダー化したなめらかな泣く黒曜石
  GT.large_chemical_reactor('replace_ugoblock_ender_infused_smooth_crying_obsidian')
    .itemInputs('4x ugoblock:smooth_crying_obsidian')
    .inputFluids('#forge:ender')
    .itemOutputs('4x ugoblock:ender_infused_smooth_crying_obsidian')
    .duration(1200)
    .EUt(GTValues.V[GTValues.UV]);
  // 座席
  GT.assembly_line('replace_ugoblock_seat')
    .itemInputs('ugoblock:smooth_crying_obsidian', '3x #forge:plates/annealed_copper', '2x #forge:rods/osmium')
    .inputFluids('#forge:naquadah 14400', '#forge:abysslinker_mithril 14400', '#forge:mithrite 14400', '#forge:durium 14400')
    .itemOutputs('ugoblock:seat')
    .duration(1200)
    .EUt(GTValues.VA[GTValues.UV])
  ["scannerResearch(java.util.function.UnaryOperator)"]
    (b => b.researchStack('#create:seats').EUt(GTValues.VA[GTValues.LuV]).duration(36000));
  // スライド制御機
  GT.assembly_line('replace_ugoblock_slide_controller')
    .itemInputs('ugoblock:smooth_crying_obsidian', 'create:gantry_carriage', '64x create:gantry_shaft', '64x create:gantry_shaft',
      '2x projectred_transmission:red_alloy_wire', 'gtceu:uv_electric_motor', 'create:shaft', '6x #forge:foils/high_mithrite',
      'projectred_integration:toggle_latch_gate', 'gtceu:uv_electric_piston')
    .inputFluids('#forge:soldering_alloy 1296', '#forge:lubricant 4000')
    .itemOutputs('ugoblock:slide_controller')
    .duration(72000)
    .EUt(GTValues.V[GTValues.UV])
    .stationResearch(b => b.researchStack('create:gantry_carriage').EUt(GTValues.VA[GTValues.UV]).CWUt(1536));
  // 回転制御機
  GT.assembly_line('replace_ugoblock_rotation_controller')
    .itemInputs('ugoblock:smooth_crying_obsidian', 'create:mechanical_bearing', '4x projectred_transmission:red_alloy_wire',
      'gtceu:uv_electric_motor', '6x #forge:foils/high_mithrite', 'projectred_integration:toggle_latch_gate')
    .inputFluids('#forge:soldering_alloy 1296', '#forge:abysslinker_mithril 82944', '#forge:neutronium 1440')
    .itemOutputs('ugoblock:rotation_controller')
    .duration(72000)
    .EUt(GTValues.V[GTValues.UV])
    .stationResearch(b => b.researchStack('create:mechanical_bearing').EUt(GTValues.VA[GTValues.UV]).CWUt(1536));
  // ゴンドラ作成機
  GT.assembly_line('replace_ugoblock_basket_maker')
    .itemInputs('ugoblock:smooth_crying_obsidian', 'create:mechanical_bearing', '#forge:foils/high_mithrite')
    .inputFluids('#forge:high_durium 144', '#forge:mithrite 144', '#forge:abysslinker_mithril 82944')
    .itemOutputs('ugoblock:basket_maker')
    .duration(72000)
    .EUt(GTValues.V[GTValues.UV])
    .stationResearch(b => b.researchStack('ugoblock:seat').EUt(GTValues.VA[GTValues.UV]).CWUt(1536));
  // 無線レッドストーン送信機
  GT.assembly_line('replace_ugoblock_wireless_redstone_transmitter')
    .itemInputs('wirelessredstone:redstone_transmitter', 'ugoblock:ender_infused_smooth_crying_obsidian', 'minecraft:lever',
      'gtceu:uv_sensor')
    .inputFluids('#forge:ascendium 82944', '#forge:soldering_alloy 1296')
    .itemOutputs('ugoblock:wireless_redstone_transmitter')
    .duration(72000)
    .EUt(GTValues.V[GTValues.UV])
    .stationResearch(b => b.researchStack('wirelessredstone:redstone_transmitter').EUt(GTValues.VA[GTValues.UV]).CWUt(2048));
  // 無線レッドストーン受信機
  GT.assembly_line('replace_ugoblock_wireless_redstone_receiver')
    .itemInputs('wirelessredstone:redstone_receiver', 'ugoblock:ender_infused_smooth_crying_obsidian', 'minecraft:redstone_torch',
      'gtceu:uv_emitter')
    .inputFluids('#forge:ascendium 82944', '#forge:soldering_alloy 1296')
    .itemOutputs('ugoblock:wireless_redstone_receiver')
    .duration(72000)
    .EUt(GTValues.V[GTValues.UV])
    .stationResearch(b => b.researchStack('wirelessredstone:redstone_receiver').EUt(GTValues.VA[GTValues.UV]).CWUt(2048));
  // 持ち運び型無線レッドストーン送信機(レバー)
  GT.assembly_line('replace_ugoblock_portable_alternate_wireless_redstone_transmitter')
    .itemInputs('wirelessredstone:remote', 'projectred_integration:toggle_latch_gate', 'ugoblock:wireless_redstone_transmitter')
    .inputFluids('#forge:ascendium 144', '#forge:red_alloy 1296')
    .itemOutputs('ugoblock:portable_alternate_wireless_redstone_transmitter')
    .EUt(GTValues.V[GTValues.UV])
    .stationResearch(b => b.researchStack('ugoblock:wireless_redstone_transmitter').EUt(GTValues.VA[GTValues.UV]).CWUt(2048));
  event.shapeless('ugoblock:portable_alternate_wireless_redstone_transmitter', ['ugoblock:portable_momentary_wireless_redstone_transmitter']);
  // 持ち運び型無線レッドストーン送信機(ボタン)
  event.shapeless('ugoblock:portable_momentary_wireless_redstone_transmitter', ['ugoblock:portable_alternate_wireless_redstone_transmitter']);
});
