//requires: gtceu

// Void Ore Miner / 虚空採掘機

GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
  const { $IO: GTIO } = global.loadingStartupClasses.GTCEu;
  const { VoidOreMiner } = global.FGTCEuAddedRecipeType;

  // 性質上、見本となる鉱石が必要になる(ただし、原石ではなく粉)。
  event.create(VoidOreMiner)
    .category('multiblock')
    .setEUIO(GTIO.IN)
    .setMaxIOSize(4, 9, 0, 0)
    .setProgressBar(GuiTextures.PROGRESS_BAR_MACERATE, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.DRILL_TOOL);
});

GTCEuStartupEvents.registry('gtceu:machine', event => {
  const { VoidOreMiner } = global.FGTCEuAddedRecipeType;
  const { outTranslatableString } = global.FGTCEuCommonStartupFunctions;
  const { Casings, Controllers } = global.FGTCEuResLocCode.GTCEu;

  // LV時代から使用できる。
  event.create('void_ore_miner', 'multiblock')
    .rotationState(RotationState.NON_Y_AXIS)
    .recipeTypes(VoidOreMiner)
    .recipeModifiers([GTRecipeModifiers.PARALLEL_HATCH, GTRecipeModifiers.BATCH_MODE, GTRecipeModifiers.OC_NON_PERFECT_SUBTICK])
    .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
    .pattern(definition => FactoryBlockPattern.start()
      .aisle('FF   FF', 'F     F', 'F     F', '       ', '       ', '       ', '       ', '       ', '       ')
      .aisle('FF   FF', ' FF FF ', ' FHHHF ', ' F   F ', '       ', '       ', '       ', '       ', '       ')
      .aisle('       ', ' FF FF ', ' HHHHH ', '   F   ', '  FFF  ', '   F   ', '       ', '       ', '       ')
      .aisle('       ', '       ', ' HHHHH ', '  FCF  ', '  FCF  ', '  FCF  ', '   F   ', '   F   ', '   F   ')
      .aisle('       ', ' FF FF ', ' HHHHH ', '   F   ', '  FFF  ', '   F   ', '       ', '       ', '       ')
      .aisle('FF   FF', ' FF FF ', ' FH@HF ', ' F   F ', '       ', '       ', '       ', '       ', '       ')
      .aisle('FF   FF', 'F     F', 'F     F', '       ', '       ', '       ', '       ', '       ', '       ')
      .where('@', Predicates.controller(Predicates.blocks(definition.get())))
      .where('C', Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get()))
      .where('F', Predicates.frames(GTMaterials.Steel))
      .where('H', Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get())
        .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1))
        .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setMinGlobalLimited(1).setMaxGlobalLimited(2))
        .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setMinGlobalLimited(1).setMaxGlobalLimited(4))
        .or(Predicates.abilities(PartAbility.INPUT_ENERGY, PartAbility.INPUT_LASER, PartAbility.SUBSTATION_INPUT_ENERGY).setMinGlobalLimited(1).setMaxGlobalLimited(2))
      ).where(' ', Predicates.any())
      .build()
    ).workableCasingModel(
      GTCEu.id(Casings.SolidSteel),
      GTCEu.id(Controllers.ImplosionCompressor)
    )['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'multiblock.void_ore_miner', 0)),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.void_ore_miner', 1)),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.void_ore_miner', 2))
    ]);
});
