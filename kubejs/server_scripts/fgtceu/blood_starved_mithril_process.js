/**
 * ------------------
 * 赫霊銀鉱の高次処理
 * ------------------
 */

ServerEvents.recipes((event) => {
  const {
    large_chemical_reactor: LCR,
    centrifuge,
    distillation_tower,
    electrolyzer: ELZ,
  } = event.recipes.gtceu;

  // 1. 赫霊銀鉱8個+王水1000mB → 赫霊銀泥6個+粗ハイミスライト泥〔I型〕6個+白金族泥3個+赫霊銀スラグ3000mB＠化学反応炉
  LCR('bsm_process_phase_01')
    .itemInputs('8x gtceu:blood_starved_mithril_dust')
    .inputFluids('gtceu:aqua_regia 1000')
    .itemOutputs('6x gtceu:blood_starved_group_mud_dust', '6x gtceu:raw_high_mithrite_mud_type_i_dust', '3x gtceu:platinum_group_sludge_dust')
    .outputFluids('gtceu:blood_starved_mithril_slag 3000')
    .duration(400)
    .EUt(GTValues.VHA[GTValues.ZPM]);
  // 2a. 赫霊銀泥1個 → 粗アビサル泥12個+粗ハイミスライト泥〔II型〕9個+粗アビスリンカーミスリル鉱滓6個＠遠心分離機
  centrifuge('bsm_process_phase_02a')
    .itemInputs('gtceu:blood_starved_group_mud_dust')
    .itemOutputs('12x gtceu:raw_abyssal_mud_dust', '9x gtceu:raw_high_mithrite_mud_type_ii_dust', '6x gtceu:raw_abysslinker_mithril_slag_dust')
    .duration(400)
    .EUt(GTValues.VHA[GTValues.ZPM]);
  // 2b. 赫霊銀スラグ1000mB → 粗アビスリンカーミスリル鉱滓3個+水500mB+塩酸500mB＠蒸留塔
  distillation_tower('bsm_process_phase_02b')
    .inputFluids('gtceu:blood_starved_mithril_slag 1000')
    .itemOutputs('3x gtceu:raw_abysslinker_mithril_slag_dust')
    .outputFluids('gtceu:hydrochloric_acid 500','minecraft:water 500')
    .duration(400)
    .EUt(GTValues.VHA[GTValues.ZPM]);
  // 2c. 粗ハイミスライト泥〔I型〕4個+ニトロ化混合物1000mB+原初のマナ100mB → 光霊銀鉱原石2個+イコンミスライト粉1個+希塩酸2000mB＠化学反応炉
  LCR('bsm_process_phase_02c')
    .itemInputs('4x gtceu:raw_high_mithrite_mud_type_i_dust')
    .inputFluids('gtceu:nitration_mixture 1000', 'gtceu:mana 100')
    .itemOutputs('2x gtceu:raw_lumithrite', 'gtceu:eikon_mithrite_dust')
    .outputFluids('gtceu:diluted_hydrochloric_acid 2000')
    .duration(300)
    .EUt(GTValues.VHA[GTValues.ZPM]);
  // 3a. 粗アビスリンカーミスリル鉱滓9個+過硫酸ナトリウム3000mB → アビスリンカーミスリル粉6個+ナトリウム1個+希硫酸2000mB＠化学反応炉
  LCR('bsm_process_phase_03a')
    .itemInputs('9x gtceu:raw_abysslinker_mithril_slag_dust')
    .inputFluids('gtceu:sodium_persulfate 3000')
    .itemOutputs('6x gtceu:abysslinker_mithril_dust', 'gtceu:sodium_dust')
    .outputFluids('gtceu:diluted_sulfuric_acid 2000')
    .duration(600)
    .EUt(GTValues.VHA[GTValues.ZPM]);
  // 3b. 粗アビサル2個 → アビサル粉2個+ユーロピウム粉1個+原初のマナ1000mB＠電解槽
  ELZ('bsm_process_phase_03b')
    .itemInputs('2x gtceu:raw_abyssal_mud_dust')
    .itemOutputs('2x gtceu:abyssal_dust', 'gtceu:europium_dust')
    .outputFluids('gtceu:mana 1000')
    .duration(300)
    .EUt(GTValues.VHA[GTValues.ZPM]);
  // 3c. 粗ハイミスライト泥〔II型〕4個+鬼神のミルバン油1000mB → イコンミスライト原石2個+光霊銀鉱粉1個+ニトロベンゼン200mB＠化学反応炉
  LCR('bsm_process_phase_03c')
    .itemInputs('4x gtceu:raw_high_mithrite_mud_type_ii_dust')
    .inputFluids('gtceu:zurvanised_nitrobenzene 1000')
    .itemOutputs('2x gtceu:raw_eikon_mithrite', 'gtceu:lumithrite_dust')
    .outputFluids('gtceu:nitrobenzene 200')
    .duration(300)
    .EUt(GTValues.VHA[GTValues.ZPM]);
});
