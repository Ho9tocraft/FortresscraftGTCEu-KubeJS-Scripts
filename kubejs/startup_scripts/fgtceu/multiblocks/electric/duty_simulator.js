//requires: gtceu
//requires: hostilenetworks
/**
 * 極討滅戦シミュレーター (Duty Simulator): includes HNN
 * -----------------------------------------------------
 */
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
  const { $IO: GTIO } = global.loadingStartupClasses.GTCEu;
  const { DutySimulator, NeuralnetMSCCalc: MSCCalc, NeuralnetMSCFab: MSCFab } = global.FGTCEuAddedRecipeType;

  // Duty Simulator
  event.create(DutySimulator)
    .category('multiblock')
    .setEUIO(GTIO.IN)
    .setMaxIOSize(9, 9, 3, 3) // Item IN / Item OUT / Fluid IN / Fluid OUT
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.COMBUSTION);

  // Neuralnet Mob Simulation Computer Calculator
  event.create(MSCCalc)
    .category('multiblock')
    .setEUIO(GTIO.IN)
    .setMaxIOSize(2, 2, 0, 0)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.COMPUTATION);

  // Neuralnet Mob Simulation Computer Fabricator
  event.create(MSCFab)
    .category('multiblock')
    .setEUIO(GTIO.IN)
    .setMaxIOSize(2, 2, 0, 0)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.COMPUTATION);
});

GTCEuStartupEvents.registry('gtceu:machine', event => {
  const { DutySimulator, NeuralnetMSCCalc: MSCCalc, NeuralnetMSCFab: MSCFab } = global.FGTCEuAddedRecipeType;
  const { outTranslatableString } = global.FGTCEuCommonStartupFunctions;
  const { Casings, Controllers } = global.FGTCEuResLocCode.GTCEu;

  /**
   * 極討滅戦シミュレーションスーパーコンピュータ (Neuralnet Inc. Duty Simulation Supercomputer)
   */
  event.create('duty_simulation_supercomputer', 'multiblock')
    .rotationState(RotationState.ALL)
    .recipeType(DutySimulator, MSCCalc, MSCFab)
    .recipeModifiers([
      GTRecipeModifiers.PARALLEL_HATCH,
      GTRecipeModifiers.BATCH_MODE,
      GTRecipeModifiers.OC_NON_PERFECT_SUBTICK,
      GTRecipeModifiers.DEFAULT_ENVIRONMENT_REQUIREMENT
    ])
    .appearanceBlock(GTBlocks.CASING_HSSE_STURDY)
    .pattern(definition => FactoryBlockPattern.start()
      .aisle('HHHHH', 'HHHHH', 'HHHHH', 'HHHHH', 'HHHHH')
      .aisle('HHHHH', 'VCSCV', 'hCSCh', 'VCSCV', 'H   H')
      .aisle('HHHHH', 'VCSCV', 'hCSCh', 'VCSCV', 'H   H')
      .aisle('HHHHH', 'VCSCV', 'hCSCh', 'VCSCV', 'H   H')
      .aisle('HHHHH', 'HHHHH', 'HH@HH', 'HHHHH', 'HHHHH')
      .where('@', Predicates.controller(Predicates.blocks(definition.get())))
      .where('C', Predicates.blocks(GTBlocks.ADVANCED_COMPUTER_CASING.get()))
      .where('H', Predicates.blocks(GTBlocks.CASING_HSSE_STURDY.get())
        .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setExactLimit(1)) // アイテム入力は絶対に1
        .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMaxGlobalLimited(1)) // 液体入力は最大1
        .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setMinGlobalLimited(1).setMaxGlobalLimited(2)) //アイテム出力は最低1-最大2
        .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setMaxGlobalLimited(2)) // 液体出力は最大2
        .or(Predicates.abilities(PartAbility.INPUT_ENERGY, PartAbility.SUBSTATION_INPUT_ENERGY, PartAbility.INPUT_LASER).setExactLimit(1))
        .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
        .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1)))
      .where('h', Predicates.blocks(GTBlocks.COMPUTER_CASING.get()))
      .where('S', Predicates.blocks(GTBlocks.HIGH_POWER_CASING.get()))
      .where('V', Predicates.blocks(GTBlocks.COMPUTER_HEAT_VENT.get()))
      .where(' ', Predicates.any())
      .build())
    .workableCasingModel(
      GTCEu.id(Casings.SturdyHSSE),
      GTCEu.id(Controllers.ResearchStation)
    )['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'machine.available_recipe_map_1'),
        Component.translatable(`gtceu.${DutySimulator}`), Component.translatable(`gtceu.${MSCCalc}`),
        Component.translatable(`gtceu.${MSCFab}`)),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.duty_simulator', 0)),
    ]);
});
