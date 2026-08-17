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
  const runMSCCalc = (model, predict, EUt, dTick) => { };
  const runMSCFab = (model, predict, EUt, dTick) => { };

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
});
