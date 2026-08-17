//requires: gtceu
/**
 * モダン・グリーンハウス (Modern Greenhouse)
 * ------------------------------------------
 */
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
  const { $IO: GTIO } = global.loadingStartupClasses.GTCEu;
  const { FGTCEuGreenhouse: GHouse } = global.FGTCEuAddedRecipeType;

  event.create(GHouse)
    .category('multiblock')
    .setEUIO(GTIO.IN)
    .setMaxIOSize(4, 9, 1, 0)
    .setProgressBar(GuiTextures.PROGRESS_BAR_EXTRACT, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.FURNACE)
    .setSlotOverlay(true, false, GuiTextures.BOX_OVERLAY);
});

GTCEuStartupEvents.registry('gtceu:machine', event => {
  const { FGTCEuGreenhouse: GHouse } = global.FGTCEuAddedRecipeType;
  const { outTranslatableString } = global.FGTCEuCommonStartupFunctions;
  const { Casings, Controllers } = global.FGTCEuResLocCode.GTCEu;

  event.create('modern_green_house', 'multiblock')
    .rotationState(RotationState.NON_Y_AXIS)
    .recipeTypes(GHouse)
    .recipeModifiers([GTRecipeModifiers.PARALLEL_HATCH, GTRecipeModifiers.BATCH_MODE, GTRecipeModifiers.OC_NON_PERFECT_SUBTICK])
    .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
    .pattern(definition => FactoryBlockPattern.start()
      .aisle('CCCCC', 'CHHHC', 'CGGGC', 'CGGGC', 'CCGCC', '0CCC0')
      .aisle('CCCCC', 'HDDDH', 'GaaaG', 'GaaaG', 'GaaaG', '0GCG0')
      .aisle('CCCCC', 'HDDDH', 'GaaaG', 'GaaaG', 'GaaaG', '0GCG0')
      .aisle('CCCCC', 'HDDDH', 'GaaaG', 'GaaaG', 'GaaaG', '0GCG0')
      .aisle('CCCCC', 'HDDDH', 'GaaaG', 'GaaaG', 'GaaaG', '0GCG0')
      .aisle('CCCCC', 'HDDDH', 'GaaaG', 'GaaaG', 'GaaaG', '0GCG0')
      .aisle('CCCCC', 'CHHHC', 'CGGGC', 'CGGGC', 'CCGCC', '0C@C0')
      .where('@', Predicates.controller(Predicates.blocks(definition.get())))
      .where('C', Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get()))
      .where('D', Predicates.blocks('minecraft:dirt'))
      .where('G', Predicates.blocks(GTBlocks.CASING_TEMPERED_GLASS.get()))
      .where('H', Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get())
        .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
        .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1))
        .or(Predicates.autoAbilities(definition.getRecipeTypes())))
      .where('a', Predicates.air())
      .where('0', Predicates.any())
      .build())
    .workableCasingModel(
      GTCEu.id(Casings.SolidSteel),
      GTCEu.id(Controllers.LargeSteamTurbine)
    )['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'multiblock.green_house', 0)),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.green_house', 1))
    ]);
});
