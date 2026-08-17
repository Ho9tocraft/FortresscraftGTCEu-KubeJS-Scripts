//requires: gtceu
/**
 * 大型熱交換器 (Large Heat Exchanger)
 * -----------------------------------
 */
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
  const { $IO: GTIO } = global.loadingStartupClasses.GTCEu;
  const { LargeHeatExchanger } = global.FGTCEuAddedRecipeType;

  event.create(LargeHeatExchanger)
    .category('multiblock')
    .setEUIO(GTIO.NONE)
    .setMaxIOSize(1, 0, 2, 2) // Item in, Item out, Fluid in, Fluid out
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.COOLING);
});

GTCEuStartupEvents.registry('gtceu:machine', event => {
  const { LargeHeatExchanger } = global.FGTCEuAddedRecipeType;
  const { outTranslatableString } = global.FGTCEuCommonStartupFunctions;
  const { HeatExchangerModifier } = global.FGTCEuCommonStartupFunctions.FGTCEuMachineMods;
  const { Casings, Controllers } = global.FGTCEuResLocCode.GTCEu;

  event.create('large_heat_exchanger', 'multiblock')
    .rotationState(RotationState.NON_Y_AXIS)
    .recipeTypes(LargeHeatExchanger)
    .recipeModifiers([
      (machine, recipe) => HeatExchangerModifier(machine, recipe)
    ])
    .appearanceBlock(GTBlocks.CASING_TITANIUM_STABLE)
    .pattern(definition => FactoryBlockPattern.start()
      .aisle('HHHHIHHHH', 'HHHHIHHHH', 'AHHHIHHHA', 'AHVVVVVHA', 'AAHHHHHAA', 'AAHHHHHAA', 'AAHHHHHAA', 'AAHHIHHAA', 'AAAHHHAAA')
      .aisle('HHHHHHHHH', 'HHPPPPPHH', 'HH  P  HH', 'HHCCPCCHH', 'AITTTTTIA', 'AITTTTTIA', 'AHCCCCCHA', 'AHH P HHA', 'AAHHHHHAA')
      .aisle('HHHHHHHHH', 'HCCCPCCCH', 'HC     CH', 'VCCCPCCCV', 'HCTCCCTCH', 'HCTCCCTCH', 'HCCC CCCH', 'HH  P  HH', 'AHHHHHHHA')
      .aisle('IHHHHHHHI', 'IPPPPPPPI', 'IP  P   I', 'VPPPPPPPV', 'HCTCPCTCH', 'HCTCPCTCH', 'HCC P CCH', 'IPPPPPPPI', 'AHHHIHHHA')
      .aisle('HHHHHHHHH', 'HCCCPCCCH', 'HC     CH', 'VCCCPCCCV', 'HCTC CTCH', 'HCTC CTCH', 'HCCC CCCH', 'HH  P  HH', 'AHHHHHHHA')
      .aisle('HHHHHHHHH', 'HHPPPPPHH', 'HH  P  HH', 'HHCCPCCHH', 'AIT   TIA', 'AIT   TIA', 'AHC   CHA', 'AHH P HHA', 'AAHHHHHAA')
      .aisle('HHHHHHHHH', 'HHHH@HHHH', 'AHHHHHHHA', 'AHVVVVVHA', 'AAHGGGHAA', 'AAHGGGHAA', 'AAHGGGHAA', 'AAHHHHHAA', 'AAAHHHAAA')
      .where('@', Predicates.controller(Predicates.blocks(definition.get())))
      .where('H', Predicates.blocks(GTBlocks.CASING_TITANIUM_STABLE.get())
        .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1)))
      .where('I', Predicates.blocks(GTBlocks.CASING_TITANIUM_STABLE.get())
        .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMaxGlobalLimited(4))
        .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setMaxGlobalLimited(4)))
      .where('C', Predicates.blocks(GTBlocks.COIL_HSSG.get()))
      .where('V', Predicates.blocks(GCYMBlocks.HEAT_VENT.get()))
      .where('G', Predicates.blocks(GTBlocks.CASING_LAMINATED_GLASS.get(), GTBlocks.CASING_TITANIUM_STABLE.get()))
      .where('P', Predicates.blocks(GTBlocks.CASING_TUNGSTENSTEEL_PIPE.get()))
      .where('T', Predicates.blocks(GTBlocks.CASING_STEEL_PIPE.get()))
      .where('A', Predicates.any())
      .where(' ', Predicates.air())
      .build())
    .workableCasingModel(
      GTCEu.id(Casings.StableTitanium),
      GTCEu.id(Controllers.ImplosionCompressor)
    )['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'multiblock.large_heat_exchanger', 0)),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.large_heat_exchanger', 1)),
      Component.translatable(outTranslatableString('gtceu', 'shutup_gt5u'))
    ]);
});
