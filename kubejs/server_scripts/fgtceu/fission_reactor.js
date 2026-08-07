/**
 * Fission Reactor Recipe
 */

ServerEvents.recipes(event => {
  const GT = event.recipes.gtceu;
  const fuelType = ['thorium', 'uranium', 'plutonium', 'naquadah'];
  const fuelTypeKey = {
    Thorium: 0,
    Uranium: 1,
    Plutonium: 2,
    Naquadah: 3
  };
  const coolantType = ['air', 'water', 'coolant'];
  const coolantTypeKey = {
    AIR: 0,
    WATER: 1,
    COOLANT: 2
  };
  /**
   * Output Fuel Duration
   * @param {Number} pFuelType 
   * @returns Fuel Duration
   */
  let outputFuelDuration = (pFuelType) => {
    switch (pFuelType) {
      case fuelTypeKey.Thorium:
        return 800;
      case fuelTypeKey.Uranium:
        return 320;
      case fuelTypeKey.Plutonium:
        return 160;
      case fuelTypeKey.Naquadah:
        return 1600;
    }
  };
  /**
   * Provides Coolant Value
   * @param {String} pIO 'in' or 'out'
   * @param {Number} pFuelDuration Fuel Duration
   * @param {String} pCoolantType Coolant Value
   * @returns Coolant Value
   */
  let coolantAmount = (pIO, pFuelDuration, pCoolantType) => {
    const tBaseValue = pCoolantType == 'water' ? (pIO == 'in' ? 4 : 640) : 2000;
    if (pCoolantType == 'water') return tBaseValue * pFuelDuration;
    else if (pCoolantType == 'coolant') return tBaseValue * pFuelDuration;
    else return 0;
  };
  /**
   * Provides Coolant Efficienty on Duration
   * @param {String} pCoolantType 
   * @returns Coolant Efficienty (Duration)
   */
  let coolantEfficientDuration = (pCoolantType) => {
    if (pCoolantType == 'air') return 0.75;
    else if (pCoolantType == 'water') return 1;
    else if (pCoolantType == 'coolant') return 2;
    else return 0;
  };
  /**
   * Provides Coolant Efficienty on Power Distribution
   * @param {String} pCoolantType 
   * @returns Coolant Efficienty (Power Distribution)
   */
  let coolantEfficientOutput = (pCoolantType) => {
    if (pCoolantType == 'air') return 0.3;
    else if (pCoolantType == 'water') return 0.5;
    else if (pCoolantType == 'coolant') return 0.75;
    else return 0;
  }
  /**
   * Generate Fission Reactor Recipes
   * @param {Number} pFuelType 
   * @param {String} pCoolantType 
   */
  const FissionReactorRecipes = (pFuelType, pCoolantType) => {
    const voltageEUt = -2048;
    const fuelDuration = outputFuelDuration(pFuelType);
    const coolantEfficDuration = coolantEfficientDuration(pCoolantType);
    const coolantEfficOutput = coolantEfficientOutput(pCoolantType);
    if (pCoolantType == 'air' && pFuelType == fuelTypeKey.Thorium) {
      GT.fission_reactor(`${fuelType[pFuelType]}_single_cooling_${pCoolantType}`)
        .itemInputs(`kubejs:${fuelType[pFuelType]}_fuel_rod_single`)
        .itemOutputs(`kubejs:depleted_${fuelType[pFuelType]}_fuel_rod_single`)
        .duration(fuelDuration * 5 * coolantEfficDuration)
        .EUt(voltageEUt * coolantEfficOutput);
      GT.fission_reactor(`${fuelType[pFuelType]}_double_cooling_${pCoolantType}`)
        .itemInputs(`kubejs:${fuelType[pFuelType]}_fuel_rod_double`)
        .itemOutputs(`kubejs:depleted_${fuelType[pFuelType]}_fuel_rod_double`)
        .duration(fuelDuration * 5 * coolantEfficDuration * 2)
        .EUt(voltageEUt * coolantEfficOutput);
      GT.fission_reactor(`${fuelType[pFuelType]}_quad_cooling_${pCoolantType}`)
        .itemInputs(`kubejs:${fuelType[pFuelType]}_fuel_rod_quad`)
        .itemOutputs(`kubejs:depleted_${fuelType[pFuelType]}_fuel_rod_quad`)
        .duration(fuelDuration * 5 * coolantEfficDuration * 4)
        .EUt(voltageEUt * coolantEfficOutput);
    }
    else {
      const coolant = pCoolantType == 'water' ? 'gtceu:distilled_water' : 'kubejs:coolant';
      const hotCoolant = pCoolantType == 'water' ? 'gtceu:steam' : 'kubejs:hot_coolant';
      const coolantValue = coolantAmount('in', fuelDuration / 1.6, pCoolantType);
      const hotCoolantValue = coolantAmount('out', fuelDuration / 1.6, pCoolantType);
      GT.fission_reactor(`${fuelType[pFuelType]}_single_cooling_${pCoolantType}`)
        .itemInputs(`kubejs:${fuelType[pFuelType]}_fuel_rod_single`)
        .itemOutputs(`kubejs:depleted_${fuelType[pFuelType]}_fuel_rod_single`)
        .inputFluids(`${coolant} ${coolantValue}`)
        .outputFluids(`${hotCoolant} ${hotCoolantValue}`)
        .duration(fuelDuration * 20 * coolantEfficDuration)
        .EUt(voltageEUt * coolantEfficOutput);
      GT.fission_reactor(`${fuelType[pFuelType]}_double_cooling_${pCoolantType}`)
        .itemInputs(`kubejs:${fuelType[pFuelType]}_fuel_rod_double`)
        .itemOutputs(`kubejs:depleted_${fuelType[pFuelType]}_fuel_rod_double`)
        .inputFluids(`${coolant} ${(coolantValue * 2)}`)
        .outputFluids(`${hotCoolant} ${(hotCoolantValue * 2)}`)
        .duration(fuelDuration * 20 * 2 * coolantEfficDuration)
        .EUt(voltageEUt * coolantEfficOutput);
      GT.fission_reactor(`${fuelType[pFuelType]}_quad_cooling_${pCoolantType}`)
        .itemInputs(`kubejs:${fuelType[pFuelType]}_fuel_rod_quad`)
        .itemOutputs(`kubejs:depleted_${fuelType[pFuelType]}_fuel_rod_quad`)
        .inputFluids(`${coolant} ${(coolantValue * 4)}`)
        .outputFluids(`${hotCoolant} ${(hotCoolantValue * 4)}`)
        .duration(fuelDuration * 20 * 4 * coolantEfficDuration)
        .EUt(voltageEUt * coolantEfficOutput);
    }
  };
  /**
   * Fuel Processing
   * @param {Number} pFuelType 
   */
  const FissionFuelProcessing = (pFuelType) => {
    const tFuelSingle = `kubejs:${fuelType[pFuelType]}_fuel_rod_single`;
    const tFuelDouble = `kubejs:${fuelType[pFuelType]}_fuel_rod_double`;
    const tFuelQuad = `kubejs:${fuelType[pFuelType]}_fuel_rod_quad`;
    const tDeplSingle = `kubejs:depleted_${fuelType[pFuelType]}_fuel_rod_single`;
    const tDeplDouble = `kubejs:depleted_${fuelType[pFuelType]}_fuel_rod_double`;
    const tDeplQuad = `kubejs:depleted_${fuelType[pFuelType]}_fuel_rod_quad`;
    const tFuelCost = ['thorium', 'uranium_235', 'plutonium', 'enriched_naquadah'];
    const tDeplProduct = [
      { small: 'lutetium_dust', large: 'thorium_dust' },
      { small: 'plutonium_dust', large: 'uranium_dust' },
      { small: 'plutonium_241_dust', large: 'plutonium_dust' },
      { small: 'naquadria_dust', large: 'naquadah_dust' }
    ];
    const tIronDust = 'gtceu:iron_dust';
    GT.canner(`canning_${fuelType[pFuelType]}`)
      .itemInputs('kubejs:empty_fuel_rod', `3x #forge:dusts/${tFuelCost[pFuelType]}`)
      .itemOutputs(tFuelSingle)
      .duration(30)
      .EUt(16);
    event.shaped(tFuelDouble, [
      'ABA'
    ], {
      A: tFuelSingle,
      B: '#forge:plates/iron'
    });
    event.shaped(tFuelQuad, [
      'ABA',
      'CBC',
      'ABA'
    ], {
      A: tFuelSingle,
      B: '#forge:plates/iron',
      C: '#forge:plates/copper'
    })
    GT.thermal_centrifuge(`reprocess_${fuelType[pFuelType]}_single`)
      .itemInputs(tDeplSingle)
      .itemOutputs(`2x gtceu:small_${tDeplProduct[pFuelType].small}`, `gtceu:${tDeplProduct[pFuelType].large}`, tIronDust)
      .duration(500)
      .EUt(GTValues.VA[GTValues.LV]);
    GT.thermal_centrifuge(`reprocess_${fuelType[pFuelType]}_double`)
      .itemInputs(tDeplDouble)
      .itemOutputs(`gtceu:${tDeplProduct[pFuelType].small}`, `2x gtceu:${tDeplProduct[pFuelType].large}`, `3x ${tIronDust}`)
      .duration(500)
      .EUt(GTValues.VA[GTValues.LV]);
    GT.thermal_centrifuge(`reprocess_${fuelType[pFuelType]}_quad`)
      .itemInputs(tDeplQuad)
      .itemOutputs(`2x gtceu:${tDeplProduct[pFuelType].small}`, `4x gtceu:${tDeplProduct[pFuelType].large}`, `6x ${tIronDust}`)
      .duration(500)
      .EUt(GTValues.VA[GTValues.LV]);
  };
  // Thorium
  FissionReactorRecipes(fuelTypeKey.Thorium, coolantType[coolantTypeKey.AIR]);
  FissionReactorRecipes(fuelTypeKey.Thorium, coolantType[coolantTypeKey.WATER]);
  FissionReactorRecipes(fuelTypeKey.Thorium, coolantType[coolantTypeKey.COOLANT]);
  FissionFuelProcessing(fuelTypeKey.Thorium);
  // Uranium
  FissionReactorRecipes(fuelTypeKey.Uranium, coolantType[coolantTypeKey.WATER]);
  FissionReactorRecipes(fuelTypeKey.Uranium, coolantType[coolantTypeKey.COOLANT]);
  FissionFuelProcessing(fuelTypeKey.Uranium);
  // Plutonium
  FissionReactorRecipes(fuelTypeKey.Plutonium, coolantType[coolantTypeKey.WATER]);
  FissionReactorRecipes(fuelTypeKey.Plutonium, coolantType[coolantTypeKey.COOLANT]);
  FissionFuelProcessing(fuelTypeKey.Plutonium);
  // Naquadah
  FissionReactorRecipes(fuelTypeKey.Naquadah, coolantType[coolantTypeKey.WATER]);
  FissionReactorRecipes(fuelTypeKey.Naquadah, coolantType[coolantTypeKey.COOLANT]);
  FissionFuelProcessing(fuelTypeKey.Naquadah);
  // Add Coolant Recipes
  GT.mixer('reactor_coolant')
    .itemInputs('#forge:dusts/lapis')
    .inputFluids('gtceu:distilled_water 1500')
    .outputFluids('kubejs:coolant 1500')
    .duration(200)
    .EUt(GTValues.VA[GTValues.HV]);
  // Add High Density Coolant Recipes
  GT.large_chemical_reactor('reactor_high_density_coolant')
    .itemInputs('4x #forge:dusts/boron', '3x #forge:dusts/lithium', '2x #forge:dusts/lapis')
    .inputFluids('kubejs:coolant 1000', 'gtceu:dimethylhydrazine 500', 'gtceu:sodium_potassium 500')
    .outputFluids('kubejs:high_density_coolant 2000')
    .duration(1200)
    .EUt(GTValues.VA[GTValues.LuV]);
  // Add Empty Fission Fuel Rod
  GT.assembler('empty_fuel_rod')
    .itemInputs('4x gtceu:steel_fluid_cell', '4x gtceu:long_sterling_silver_rod', 'gtceu:stainless_steel_ring')
    .itemOutputs('kubejs:empty_fuel_rod')
    .duration(100)
    .EUt(GTValues.VA[GTValues.HV]);
  // EXTRA: Excerium Reprocessing Cycle
  const NqFuelRodType = ['single', 'double', 'quad'];
  NqFuelRodType.forEach((value) => {
    const boundAmp = (value === 'quad' ? 4 : value === 'double' ? 2 : 1);
    const AshCount = 8 * boundAmp;
    const exceriumCost = 4000 * boundAmp;
    GT.fission_reactor(`excerium_reprocess_on_${value}_fuel_rod`)
      .itemInputs(`4x kubejs:naquadah_fuel_rod_${value}`)
      .inputFluids(`gtceu:excerium ${exceriumCost}`)
      .itemOutputs(`${AshCount}x kubejs:scorched_sacred_ash`)
      .outputFluids(`gtceu:ascendium_plasma ${exceriumCost}`)
      .duration(800 * boundAmp)
      .EUt(-640);
  });
  GT.centrifuge('scorched_sacred_ash_reprocess')
    .itemInputs('kubejs:scorched_sacred_ash')
    .itemOutputs('16x gtceu:naquadria_dust', '8x gtceu:enriched_naquadah_dust',
      '4x gtceu:naquadah_dust', '4x gtceu:lunar_adamantium_dust')
    .chancedOutput('3x gtceu:tiny_ascendium_dust', 2000, 200)
    .chancedOutput('3x gtceu:tiny_naquadria_dust', 500, 50)
    .duration(100)
    .EUt(GTValues.VA[GTValues.LV]);
});
