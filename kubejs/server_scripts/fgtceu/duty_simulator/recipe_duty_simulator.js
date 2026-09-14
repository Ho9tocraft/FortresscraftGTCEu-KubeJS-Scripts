ServerEvents.recipes(event => {
  const {
    assembly_line: AssemblyLine,
    duty_simulator: ExDuty,
    neuralnet_mob_simulation_computer_calc: MSCCalc,
    neuralnet_mob_simulation_computer_fab: MSCFab,
  } = event.recipes.gtceu;

  const { VHA, VA, IV, LuV, ZPM, UV, UHV } = GTValues;

  /**
   * @typedef {'ifrit'|'garuda'|'titan'|'leviathan'|'moggle_mog'|'mog'|'ramuh'|'shiva'|'ravana'|'bismarck'|'nidhogg'|'sephirot'|'sophia'|'zurvan'|'susano'|'lakshmi'|'shinryu'|'tsukuyomi'|'titania'|'innocence'|'hades'|'warrior_of_light'|'wol'|'ruby_weapon'|'emerald_weapon'|'diamond_weapon'|'zodiark'|'hydaelyn'|'endsinger'} Eikons
   * @typedef {'wind'|'fire'|'lightning'|'water'|'ice'|'earth'} EikonElements
   */
  /**
   * @param {Eikons} target 
   * @returns {string|null}
   */
  const outTgtId = (target) => {
    switch (target) {
      case 'ifrit':
        return 'ifrit_horn';
      case 'garuda':
        return 'garuda_feather';
      case 'titan':
        return 'titan_heart';
      case 'leviathan':
        return 'leviathan_barb';
      case 'moggle_mog':
      case 'mog':
        return 'moggle_mog_whisker';
      case 'ramuh':
        return 'levin_orb';
      case 'shiva':
        return 'ice_tear';
      case 'ravana':
        return 'ravana_forewing';
      case 'bismarck':
        return 'bismarck_beleen';
      case 'nidhogg':
        return 'nidhogg_scale';
      case 'sephirot':
        return 'sephirot_sap';
      case 'sophia':
        return 'sophic_bead_fragment';
      case 'zurvan':
        return 'zurvanite_carapace_fragment';
      case 'susano':
        return 'blade_of_revelry';
      case 'lakshmi':
        return 'blissful_shroud';
      case 'shinryu':
        return 'shinryu_scale';
      case 'tsukuyomi':
        return 'celestial_kimono_remnant';
      case 'titania':
        return 'dancing_wing';
      case 'innocence':
        return 'immaculate_wingblade';
      case 'hades':
        return 'hades_auracite';
      case 'warrior_of_light':
      case 'wol':
        return 'plate_of_light';
      case 'ruby_weapon':
        return 'ruby_plating';
      case 'emerald_weapon':
        return 'emerald_plating';
      case 'diamond_weapon':
        return 'diamond_plating';
      case 'zodiark':
        return 'eternal_darkness_crystal';
      case 'hydaelyn':
        return 'divine_light_crystal';
      case 'endsinger':
        return 'blue_feather';
      default:
        console.error(`Unknown Target: ${target}`);
        return null;
    };
  };
  /**
   * 
   * @param {Eikons} target Target
   * @param {integer} count Target Output Count
   * @param {integer} tierMAEssence Mystical Agriculture Essence Tier
   * @param {EikonElements[]} crystals Crystal byproducts
   * @param {string[]} bypros Byproducts
   * @param {integer} EUt EU/t
   * @param {integer} dTick Duration (Ticks)
   * @returns 
   */
  const runExDuty = (target, count, tierMAEssence, crystals, bypros, EUt, dTick) => {
    const MAEssence = [
      'inferium', 'prudentium', 'tertium',
      'imperium', 'supremium', 'awakened_supremium'
    ];
    if (outTgtId(target) === null) return;
    const mainTgt = `kubejs:${outTgtId(target)}`;
    const outputTarget = [`${count + (6 - tierMAEssence)}x ${mainTgt}`];
    const chancedEssenceItem = target === 'shinryu' ? 'kubejs:blue_feather' : '4x mysticalagriculture:experience_essence';
    const chancedEssenceChance = target === 'shinryu' ? 5 : 20;
    ExDuty(`simulation_run_${target}`)
      .itemInputs(mainTgt, `mysticalagriculture:${MAEssence[tierMAEssence]}_essence`)
      .itemOutputs(outputTarget.concat(crystals).concat(bypros))
      .chancedOutput(chancedEssenceItem, chancedEssenceChance, 0)
      .duration(dTick)
      .EUt(EUt);
  };
  const runMSCCalc = (model, predict, EUt, dTick) => {
    MSCCalc(`simulation_run_${model}`)
      .notConsumable(Item.of('hostilenetworks:data_model', `{data_model:{id:"hostilenetworks:${model}"}}`).weakNBT())
      .itemInputs('hostilenetworks:prediction_matrix')
      .itemOutputs(`hostilenetworks:${predict}`)
      .chancedOutput(Item.of('hostilenetworks:prediction', `{data_model:{id:"hostilenetworks:${model}"}}`), 3000, 500)
      .duration(dTick)
      .EUt(EUt);
  };
  const runMSCFab = (predict, circuit, output, dTick) => {
    MSCFab(`fabricate_${predict}_circuit_${circuit}`)
      .itemInputs(Item.of('hostilenetworks:prediction', `{data_model:{id:"hostilenetworks:${predict}"}}`).weakNBT())
      .circuit(circuit).itemOutputs(output)
      .duration(dTick)
      .EUt(VHA[LuV]);
  };

  AssemblyLine('duty_simulation_supercomputer')
    .itemInputs(
      'gtceu:sturdy_machine_casing', '6x #forge:plates/abysslinker_mithril',
      '64x hostilenetworks:sim_chamber', '64x hostilenetworks:loot_fabricator',
      'kubejs:plate_of_light', 'kubejs:ruby_plating', 'kubejs:emerald_plating', 'kubejs:diamond_plating',
      '4x #gtceu:circuits/zpm', '2x gtceu:zpm_robot_arm', '2x gtceu:zpm_field_generator'
    )
    .inputFluids(
      'gtceu:soldering_alloy 5184',
      'gtceu:polybenzimidazole 1296'
    )
    .itemOutputs('gtceu:duty_simulation_supercomputer')
    .stationResearch(b => b.researchStack('hostilenetworks:sim_chamber')
      .EUt(VHA[ZPM])
      .CWUt(64))
    .duration(36000)
    .EUt(VA[ZPM]);

  /**
   * @type {{eName:Eikons,eCount:integer,maeTier:integer,crs:EikonElements[],byp:string[],EUt:integer,dTick:integer}[]}
   */
  const eikons = [
    { eName: 'ifrit', eCount: 7, maeTier: 0, crs: ['fire'], byp: ['4x minecraft:bone_meal', '2x gtceu:tiny_blaze_dust'], EUt: VHA[IV], dTick: 12000 },
    { eName: 'garuda', eCount: 7, maeTier: 0, crs: ['wind'], byp: ['4x mysticalagriculture:air_essence', '2x mysticalagriculture:nature_essence'], EUt: VHA[IV], dTick: 12000 },
    { eName: 'titan', eCount: 7, maeTier: 0, crs: ['earth'], byp: ['4x gtceu:raw_bauxite', '2x gtceu:raw_apatite'], EUt: VHA[IV], dTick: 12000 },
    { eName: 'leviathan', eCount: 3, maeTier: 0, crs: ['water'], byp: ['4x mysticalagriculture:water_essence', '2x gtceu:raw_salt'], EUt: VHA[IV], dTick: 12000 },
    { eName: 'mog', eCount: 6, maeTier: 0, crs: ['earth', 'water'], byp: ['4x minecraft:white_wool', '2x minecraft:string'], EUt: VHA[IV], dTick: 12000 },
    { eName: 'ramuh', eCount: 5, maeTier: 0, crs: ['lightning'], byp: ['6x gtceu:tiny_electrum_dust'], EUt: VHA[IV], dTick: 12000 },
    { eName: 'shiva', eCount: 5, maeTier: 0, crs: ['ice'], byp: ['4x minecraft:blue_ice', '2x minecraft:ghast_tear'], EUt: VHA[IV], dTick: 12000 },
    { eName: 'ravana', eCount: 5, maeTier: 1, crs: ['fire', 'earth'], byp: ['4x slashblade:proudsoul_tiny', '2x gtceu:damascus_steel_block'], EUt: VHA[LuV], dTick: 6000 },
    { eName: 'bismarck', eCount: 5, maeTier: 1, crs: ['wind', 'water'], byp: ['4x minecraft:bone', '2x mysticalagriculture:chicken_essence'], EUt: VHA[LuV], dTick: 6000 },
    { eName: 'nidhogg', eCount: 5, maeTier: 1, crs: ['lightning', 'fire'], byp: ['6x slashblade:proudsoul'], EUt: VHA[LuV], dTick: 6000 },
    { eName: 'sephirot', eCount: 4, maeTier: 1, crs: ['earth', 'water'], byp: ['4x minecraft:iron_ingot', '2x gtceu:sodium_bisulfate_dust'], EUt: VHA[LuV], dTick: 6000 },
    { eName: 'sophia', eCount: 4, maeTier: 1, crs: ['wind', 'lightning'], byp: ['6x gtceu:glass_gem'], EUt: VHA[LuV], dTick: 6000 },
    { eName: 'zurvan', eCount: 4, maeTier: 1, crs: ['fire', 'ice'], byp: ['6x gtceu:biphenyl_dust'], EUt: VHA[LuV], dTick: 6000 },
    { eName: 'susano', eCount: 4, maeTier: 2, crs: ['water', 'wind', 'lightning'], byp: ['4x slashblade:proudsoul_ingot', '2x slashblade:proudsoul_sphere'], EUt: VHA[ZPM], dTick: 3000 },
    { eName: 'lakshmi', eCount: 4, maeTier: 2, crs: [], byp: ['5x minecraft:pink_wool', 'minecraft:totem_of_undying'], EUt: VHA[ZPM], dTick: 4000 },
    { eName: 'shinryu', eCount: 4, maeTier: 2, crs: [], byp: ['4x mysticalagriculture:dragon_egg_essence', 'minecraft:dragon_egg', 'kubejs:nidhogg_scale'], EUt: VHA[ZPM], dTick: 4000 },
    { eName: 'tsukuyomi', eCount: 4, maeTier: 2, crs: [], byp: [], EUt: VHA[ZPM], dTick: 6000 },
    { eName: 'titania', eCount: 4, maeTier: 3, crs: ['ice', 'wind'], byp: ['4x botania:elementium_ingot', '2x botania:terrasteel_ingot'], EUt: VHA[ZPM], dTick: 6000 },
    { eName: 'innocence', eCount: 4, maeTier: 3, crs: ['ice', 'water'], byp: ['6x minecraft:snow_block'], EUt: VHA[ZPM], dTick: 6000 },
    { eName: 'hades', eCount: 3, maeTier: 3, crs: ['lightning', 'fire'], byp: ['6x minecraft:netherite_ingot'], EUt: VHA[ZPM], dTick: 6000 },
    { eName: 'wol', eCount: 3, maeTier: 3, crs: [], byp: ['3x slashblade:proudsoul_sphere', '3x slashblade:proudsoul_trapezohedron'], EUt: VHA[ZPM], dTick: 6000 },
    { eName: 'ruby_weapon', eCount: 3, maeTier: 3, crs: ['fire', 'earth'], byp: [], EUt: VHA[ZPM], dTick: 4000 },
    { eName: 'emerald_weapon', eCount: 3, maeTier: 3, crs: ['wind', 'earth'], byp: [], EUt: VHA[ZPM], dTick: 4000 },
    { eName: 'diamond_weapon', eCount: 3, maeTier: 3, crs: ['ice', 'fire', 'wind'], byp: [], EUt: VHA[ZPM], dTick: 4000 },
    { eName: 'zodiark', eCount: 2, maeTier: 4, crs: ['fire', 'wind', 'lightning'], byp: ['4x gtceu:abyssal_dust'], EUt: VHA[UV], dTick: 2000 },
    { eName: 'hydaelyn', eCount: 2, maeTier: 4, crs: ['earth', 'ice', 'water'], byp: ['4x minecraft:glowstone'], EUt: VHA[UV], dTick: 2000 },
    { eName: 'endsinger', eCount: 1, maeTier: 5, crs: ['earth', 'wind', 'fire', 'water'], byp: ['6x kubejs:shinryu_scale'], EUt: VHA[UV], dTick: 2000 },
  ];
  eikons.forEach((eikon) => {
    runExDuty(eikon.eName, eikon.eCount, eikon.maeTier, eikon.crs, eikon.byp, eikon.EUt, eikon.duration);
  });
  const superCmp = [
    { model: 'artifacts/mimic', predict: 'overworld', EUt: VHA[UV], dTick: 256 },
    { model: 'blaze', predict: 'nether', EUt: VHA[ZPM], dTick: 256 },
    { model: 'creeper', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'drowned', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'elder_guardian', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'ender_dragon', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'enderman', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'evoker', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'ghast', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'guardian', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'hoglin', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'iron_golem', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'magma_cube', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'phantom', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'polar_bear', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'shulker', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'skeleton', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'slime', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'spider', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'thermal/basalz', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'thermal/blitz', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'thermal/blizz', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'twilightforest/alpha_yeti', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/carminite_golem', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/death_tome', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/fire_beetle', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/giant', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/goblin', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/helmet_crab', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/hydra', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/kobold', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/lich', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/minoshroom', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/minotaur', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/naga', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/raven', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/redcap', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/skeleton_druid', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/snow_queen', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/towerwood_borer', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/troll', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/ur_ghast', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/winter_wolf', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'twilightforest/yeti', predict: 'twilight', EUt: VHA[UV], dTick: 256 },
    { model: 'vindicator', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'warden', predict: 'overworld', EUt: VHA[UV], dTick: 8192 },
    { model: 'witch', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'wither', predict: 'overworld', EUt: VHA[UV], dTick: 1024 },
    { model: 'wither_skeleton', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'zombie', predict: 'overworld', EUt: VHA[ZPM], dTick: 256 },
    { model: 'zombified_piglin', predict: 'nether', EUt: VHA[ZPM], dTick: 256 },
  ];
  superCmp.forEach((entry) => {
    runMSCCalc(entry.model, entry.predict, entry.EUt, entry.dTick);
  });
  const superFab = [
    { predict: 'artifacts/mimic', circuit: 1, output: 'artifacts:crystal_heart', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 2, output: 'artifacts:superstitious_hat', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 3, output: 'artifacts:power_glove', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 4, output: 'artifacts:kitty_slippers', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 5, output: 'artifacts:charm_of_sinking', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 6, output: 'artifacts:villager_hat', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 7, output: 'artifacts:lucky_scarf', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 8, output: 'artifacts:fire_gauntlet', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 9, output: 'artifacts:feral_claws', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 10, output: 'artifacts:aqua_dashers', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 11, output: 'artifacts:obsidian_skull', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 12, output: 'artifacts:antidote_vessel', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 13, output: 'artifacts:panic_necklace', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 14, output: 'artifacts:universal_attractor', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 15, output: 'artifacts:whoopee_cushion', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 16, output: 'artifacts:golden_hook', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 17, output: 'artifacts:cross_necklace', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 18, output: 'artifacts:vampiric_glove', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 19, output: 'artifacts:running_shoes', dTick: 60 },
    { predict: 'artifacts/mimic', circuit: 20, output: 'artifacts:everlasting_beef', dTick: 60 },
    { predict: 'blaze', circuit: 1, output: '16x minecraft:blaze_rod', dTick: 60 },
    { predict: 'blaze', circuit: 2, output: '16x gtceu:sulfur_dust', dTick: 60 },
    { predict: 'creeper', circuit: 1, output: '32x minecraft:gunpowder', dTick: 60 },
    { predict: 'creeper', circuit: 2, output: '4x minecraft:creeper_head', dTick: 600 },
    { predict: 'drowned', circuit: 1, output: '64x minecraft:rotten_flesh', dTick: 60 },
    { predict: 'drowned', circuit: 2, output: '8x minecraft:copper_ingot', dTick: 60 },
    { predict: 'drowned', circuit: 3, output: '1x minecraft:trident', dTick: 6000 },
    { predict: 'elder_guardian', circuit: 1, output: '8x minecraft:prismarine_crystals', dTick: 60 },
    { predict: 'elder_guardian', circuit: 2, output: '24x minecraft:prismarine_shard', dTick: 60 },
    { predict: 'elder_guardian', circuit: 3, output: '32x minecraft:wet_sponge', dTick: 60 },
    { predict: 'ender_dragon', circuit: 1, output: '16x minecraft:dragon_breath', dTick: 600 },
    { predict: 'ender_dragon', circuit: 2, output: '1x minecraft:dragon_egg', dTick: 600 },
    { predict: 'enderman', circuit: 1, output: '16x minecraft:ender_pearl', dTick: 60 },
    { predict: 'enderman', circuit: 2, output: '1x minecraft:end_crystal', dTick: 600 },
    { predict: 'evoker', circuit: 1, output: '1x minecraft:totem_of_undying', dTick: 600 },
    { predict: 'evoker', circuit: 2, output: '16x minecraft:emerald', dTick: 60 },
    { predict: 'evoker', circuit: 3, output: '1x kubejs:emerald_plating', dTick: 12000 },
    { predict: 'ghast', circuit: 1, output: '16x minecraft:ghast_tear', dTick: 60 },
    { predict: 'ghast', circuit: 2, output: '32x minecraft:gunpowder', dTick: 60 },
    { predict: 'guardian', circuit: 1, output: '16x minecraft:prismarine_crystals', dTick: 60 },
    { predict: 'hoglin', circuit: 1, output: '32x minecraft:porkchop', dTick: 60 },
    { predict: 'hoglin', circuit: 2, output: '16x minecraft:leather', dTick: 60 },
    { predict: 'iron_golem', circuit: 1, output: '32x minecraft:iron_ingot', dTick: 60 },
    { predict: 'magma_cube', circuit: 1, output: '32x minecraft:magma_cream', dTick: 60 },
    { predict: 'phantom', circuit: 1, output: '8x minecraft:phantom_membrane', dTick: 60 },
    { predict: 'polar_bear', circuit: 1, output: '32x minecraft:cod', dTick: 60 },
    { predict: 'polar_bear', circuit: 2, output: '16x minecraft:salmon', dTick: 60 },
    { predict: 'shulker', circuit: 1, output: '8x minecraft:shulker_shell', dTick: 60 },
    { predict: 'shulker', circuit: 2, output: '4x minecraft:end_rod', dTick: 60 },
    { predict: 'shulker', circuit: 3, output: '6x minecraft:diamond', dTick: 600 },
    { predict: 'skeleton', circuit: 1, output: '24x minecraft:arrow', dTick: 60 },
    { predict: 'skeleton', circuit: 2, output: '32x minecraft:bone', dTick: 60 },
    { predict: 'skeleton', circuit: 3, output: '4x minecraft:skeleton_skull', dTick: 600 },
    { predict: 'slime', circuit: 1, output: '32x minecraft:slime_ball', dTick: 60 },
    { predict: 'slime', circuit: 2, output: '16x gtceu:mithril_ingot', dTick: 60 },
    { predict: 'slime', circuit: 3, output: '16x gtceu:lithium_dust', dTick: 60 },
    { predict: 'slime', circuit: 4, output: '16x gtceu:small_gallium_dust', dTick: 60 },
    { predict: 'spider', circuit: 1, output: '32x minecraft:string', dTick: 60 },
    { predict: 'spider', circuit: 2, output: '16x minecraft:spider_eye', dTick: 60 },
    { predict: 'thermal/basalz', circuit: 1, output: '32x thermal:basalz_rod', dTick: 60 },
    { predict: 'thermal/blitz', circuit: 1, output: '32x thermal:blitz_rod', dTick: 60 },
    { predict: 'thermal/blizz', circuit: 1, output: '32x thermal:blizz_rod', dTick: 60 },
    { predict: 'twilightforest/alpha_yeti', circuit: 1, output: '4x twilightforest:alpha_yeti_fur', dTick: 600 },
    { predict: 'twilightforest/carminite_golem', circuit: 1, output: '32x twilightforest:towerwood', dTick: 60 },
    { predict: 'twilightforest/carminite_golem', circuit: 2, output: '32x minecraft:iron_ingot', dTick: 60 },
    { predict: 'twilightforest/death_tome', circuit: 1, output: '32x minecraft:paper', dTick: 60 },
    { predict: 'twilightforest/death_tome', circuit: 2, output: '16x minecraft:book', dTick: 60 },
    { predict: 'twilightforest/death_tome', circuit: 3, output: '1x twilightforest:magic_map_focus', dTick: 60 },
    { predict: 'twilightforest/fire_beetle', circuit: 1, output: '1x minecraft:gunpowder', dTick: 60 },
    { predict: 'twilightforest/giant', circuit: 1, output: '1x mysticalagriculture:experience_seeds', dTick: 60000 },
    { predict: 'twilightforest/goblin', circuit: 1, output: '16x twilightforest:armor_shard', dTick: 60000 },
    { predict: 'twilightforest/helmet_crab', circuit: 1, output: '8x twilightforest:armor_shard', dTick: 60000 },
    { predict: 'twilightforest/helmet_crab', circuit: 2, output: '24x minecraft:cod', dTick: 60000 },
    { predict: 'twilightforest/hydra', circuit: 1, output: '8x twilightforest:hydra_chop', dTick: 3600 },
    { predict: 'twilightforest/hydra', circuit: 2, output: '8x twilightforest:fiery_blood', dTick: 3600 },
    { predict: 'twilightforest/kobold', circuit: 1, output: '16x minecraft:gold_nugget', dTick: 60 },
    { predict: 'twilightforest/lich', circuit: 1, output: '1x twilightforest:lifedrain_scepter', dTick: 3600 },
    { predict: 'twilightforest/lich', circuit: 2, output: '1x twilightforest:fortification_scepter', dTick: 3600 },
    { predict: 'twilightforest/lich', circuit: 3, output: '1x twilightforest:zombie_scepter', dTick: 3600 },
    { predict: 'twilightforest/lich', circuit: 4, output: '1x twilightforest:twilight_scepter', dTick: 3600 },
    { predict: 'twilightforest/minoshroom', circuit: 1, output: '1x twilightforest:meef_stroganoff', dTick: 360 },
    { predict: 'twilightforest/minotaur', circuit: 1, output: '16x twilightforest:raw_meef', dTick: 60 },
    { predict: 'twilightforest/naga', circuit: 1, output: '16x twilightforest:naga_scale', dTick: 60 },
    { predict: 'twilightforest/redcap', circuit: 1, output: '32x minecraft:coal', dTick: 60 },
    { predict: 'twilightforest/skeleton_druid', circuit: 1, output: '32x twilightforest:torchberries', dTick: 60 },
    { predict: 'twilightforest/skeleton_druid', circuit: 2, output: '32x minecraft:bone', dTick: 60 },
    { predict: 'twilightforest/skeleton_druid', circuit: 3, output: '4x minecraft:skeleton_skull', dTick: 60 },
    { predict: 'twilightforest/snow_queen', circuit: 1, output: '32x minecraft:snowball', dTick: 60 },
    { predict: 'twilightforest/snow_queen', circuit: 2, output: '24x minecraft:packed_ice', dTick: 60 },
    { predict: 'twilightforest/towerwood_borer', circuit: 1, output: '8x twilightforest:borer_essence', dTick: 60 },
    { predict: 'twilightforest/ur_ghast', circuit: 1, output: '32x twilightforest:carminite', dTick: 60 },
    { predict: 'twilightforest/ur_ghast', circuit: 2, output: '16x twilightforest:fiery_tears', dTick: 60 },
    { predict: 'twilightforest/winter_wolf', circuit: 1, output: '16x twilightforest:arctic_fur', dTick: 60 },
    { predict: 'twilightforest/yeti', circuit: 1, output: '32x twilightforest:arctic_fur', dTick: 60 },
    { predict: 'vindicator', circuit: 1, output: '8x minecraft:emerald', dTick: 60 },
    { predict: 'warden', circuit: 1, output: '2x minecraft:echo_shard', dTick: 6000 },
    { predict: 'warden', circuit: 2, output: '1x minecraft:sculk_sensor', dTick: 6000 },
    { predict: 'warden', circuit: 3, output: '32x gtceu:raw_naquadah', dTick: 36000 },
    { predict: 'witch', circuit: 1, output: '16x minecraft:redstone', dTick: 60 },
    { predict: 'witch', circuit: 2, output: '16x minecraft:glowstone', dTick: 60 },
    { predict: 'witch', circuit: 3, output: '32x minecraft:sugar', dTick: 60 },
    { predict: 'wither', circuit: 1, output: '1x minecraft:nether_star', dTick: 600 },
    { predict: 'wither_skeleton', circuit: 1, output: '24x minecraft:bone', dTick: 60 },
    { predict: 'wither_skeleton', circuit: 2, output: '32x minecraft:coal', dTick: 60 },
    { predict: 'wither_skeleton', circuit: 3, output: '3x minecraft:wither_skeleton_skull', dTick: 60 },
    { predict: 'zombie', circuit: 1, output: '64x minecraft:rotten_flesh', dTick: 60 },
    { predict: 'zombie', circuit: 2, output: '16x minecraft:carrot', dTick: 60 },
    { predict: 'zombie', circuit: 3, output: '16x minecraft:potato', dTick: 60 },
    { predict: 'zombified_piglin', circuit: 1, output: '8x minecraft:gold_ingot', dTick: 60 },
  ];
});
