//requires: gtceu
/**
 * 高出力熱分解炉 (High Power Pyrolyse Oven)
 * -----------------------------------------
 */
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
  const { $IO: GTIO } = global.loadingStartupClasses.GTCEu;
  const { HighPowerPyrolyseOven } = global.FGTCEuAddedRecipeType;

  event.create(HighPowerPyrolyseOven)
    .category('multiblock')
    .setEUIO(GTIO.IN)
    .setMaxIOSize(2, 1, 1, 1)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.FIRE);
});

GTCEuStartupEvents.registry('gtceu:machine', event => {
  const { HighPowerPyrolyseOven } = global.FGTCEuAddedRecipeType;
  const { outTranslatableString } = global.FGTCEuCommonStartupFunctions;
  const { Casings, Controllers } = global.FGTCEuResLocCode.GTCEu;
  const { $CoilWorkableEMBMachine: CoilWorkableElectricMultiblockMachine } = global.loadingStartupClasses.GTCEu;

  event.create('high_power_pyrolyse_oven', 'multiblock')
    .machine((holder) => new CoilWorkableElectricMultiblockMachine(holder))
    .rotationState(RotationState.NON_Y_AXIS)
    .recipeTypes(HighPowerPyrolyseOven)
    .recipeModifiers([
      GTRecipeModifiers.PARALLEL_HATCH,
      GTRecipeModifiers.BATCH_MODE,
      (machine, recipe) => GTRecipeModifiers.pyrolyseOvenOverclock(machine, recipe)
    ])
    .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
    .pattern(definition => FactoryBlockPattern.start()
      .aisle('HHHHH', 'HHHHH', 'HHHHH', 'HHHHH')
      .aisle('HCCCH', 'H   H', 'H   H', 'HHHHH')
      .aisle('HCCCH', 'H   H', 'H   H', 'HHMHH')
      .aisle('HCCCH', 'H   H', 'H   H', 'HHHHH')
      .aisle('HH@HH', 'HHHHH', 'HHHHH', 'HHHHH')
      .where('@', Predicates.controller(Predicates.blocks(definition.get())))
      .where('H', Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get()).setMinGlobalLimited(10)
        .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
        .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1))
        .or(Predicates.autoAbilities(definition.getRecipeTypes())))
      .where('C', Predicates.heatingCoils())
      .where('M', Predicates.abilities(PartAbility.MUFFLER).setExactLimit(1))
      .where(' ', Predicates.air())
      .build())
    .workableCasingModel(
      GTCEu.id(Casings.SolidSteel),
      GTCEu.id(Controllers.PyrolyseOven))
    .additionalDisplay((controller, components) => {
      if (controller instanceof CoilWorkableElectricMultiblockMachine && controller.isFormed()) {
        components.add(Component.translatable('gtceu.multiblock.pyrolyse_oven.speed',
          controller.getCoilTier() == 0 ? 75 : Math.trunc(50 * (controller.getCoilTier() + 1))));
      }
    })['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'multiblock.hp_pyrolyse_oven', 0)),
      Component.translatable(outTranslatableString('gtceu', 'machine.pyrolyse_oven', 1)),
      Component.translatable(outTranslatableString('gtceu', 'shutup_gt5u')),
      Component.translatable(outTranslatableString('gtceu', 'parallel'))
    ]);
});
