//requires: gtceu
/**
 * 加圧水型原子炉 (Pressurized Water Reactor / PWR)
 * --------------------------------------------------
 */
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
  const { $IO: GTIO } = global.loadingStartupClasses.GTCEu;
  const { FissionReactor } = global.FGTCEuAddedRecipeType;

  event.create(FissionReactor)
    .category('generator')
    .setEUIO(GTIO.OUT)
    .setMaxIOSize(3, 3, 1, 1) // Item in, Item out, Fluid in, Fluid out
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW_MULTIPLE, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.FURNACE);
});

GTCEuStartupEvents.registry('gtceu:machine', event => {
  const { FissionReactor } = global.FGTCEuAddedRecipeType;
  const { outTranslatableString } = global.FGTCEuCommonStartupFunctions;

  event.create('fission_reactor', 'multiblock')
    .rotationState(RotationState.NON_Y_AXIS)
    .recipeTypes(FissionReactor)
    .generator(true)
    .regressWhenWaiting(false)
    .appearanceBlock(GTBlocks.CASING_TITANIUM_STABLE)
    .pattern(definition => FactoryBlockPattern.start()
      .aisle('HHHHHHHaaaaaa', 'HHHHHHHaaaaaa', 'HHHHHHHaaaaaa', 'HHHHHHHaaaaaa', 'HHHHHHHaaaaaa', 'HHHHHHHaaaaaa', 'HHHHHHHaaaaaa')
      .aisle('HHHHHHHaCCCCC', 'HPPPPPHaCVVVC', 'H  P  HaCVVVC', 'HPPPPPHaCVVVC', 'H  P  HaCCCCC', 'H  P  Haaaaaa', 'HHHHHHHaaaaaa')
      .aisle('HHHHHHHaCVVVC', 'HP P PPPPPPPV', 'H     HaVPPPV', 'HP   PPPPPPPV', 'H     HaCVVVC', 'H  P  Haaaaaa', 'HHHHHHHaaaaaa')
      .aisle('HHHHHHHaCCCCF', 'HPPPPPHaCWWWF', 'HP   PHaCWWWF', 'HP   PHaCWWWF', 'HP   PHaCCCCF', 'HPPPPPHaaaaaa', 'HHHHHHHaaaaaa')
      .aisle('HHHHHHHaCVVVC', 'HP P PPPPPPPV', 'H     HaVPPPV', 'HP   PPPPPPPV', 'H     HaCVVVC', 'H  P  Haaaaaa', 'HHHHHHHaaaaaa')
      .aisle('HHHHHHHaCCCCC', 'HPPPPPHaCVVVC', 'H  P  HaCVVVC', 'HPPPPPHaCVVVC', 'H  P  HaCCCCC', 'H  P  Haaaaaa', 'HHHHHHHaaaaaa')
      .aisle('HHH@HHHaaaaaa', 'HHHHHHHaaaaaa', 'HHHHHHHaaaaaa', 'HHHHHHHaaaaaa', 'HHHHHHHaaaaaa', 'HHHHHHHaaaaaa', 'HHHHHHHaaaaaa')
      .where('@', Predicates.controller(Predicates.blocks(definition.get())))
      .where('H', Predicates.blocks(GTBlocks.CASING_TITANIUM_STABLE.get())
        .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setMaxGlobalLimited(2))
        .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setMaxGlobalLimited(2))
        .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
        .or(Predicates.abilities(PartAbility.OUTPUT_ENERGY).setExactLimit(1)))
      .where('C', Predicates.blocks(GTBlocks.CASING_STAINLESS_CLEAN.get()))
      .where('F', Predicates.blocks(GTBlocks.CASING_STAINLESS_CLEAN.get())
        .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMaxGlobalLimited(1))
        .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setMaxGlobalLimited(1)))
      .where('V', Predicates.blocks(GCYMBlocks.HEAT_VENT.get()))
      .where('P', Predicates.blocks(GTBlocks.CASING_TUNGSTENSTEEL_PIPE.get()))
      .where('W', Predicates.blocks(GTBlocks.CASING_TITANIUM_PIPE.get()))
      .where('a', Predicates.any())
      .where(' ', Predicates.air())
      .build())
    .workableCasingModel('gtceu:block/casings/solid/machine_casing_stable_titanium', 'gtceu:block/multiblock/implosion_compressor')
  ['tooltips(net.minecraft.network.chat.Component[])']([
    Component.translatable(outTranslatableString('gtceu', 'machine.fission_reactor', 0)),
    Component.translatable(outTranslatableString('gtceu', 'machine.fission_reactor', 1)),
    Component.translatable(outTranslatableString('gtceu', 'machine.fission_reactor', 2))
  ]);
});
