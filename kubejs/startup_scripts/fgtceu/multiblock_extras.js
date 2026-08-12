/* ---- Loaded Mods based Multiblocks ---- */
GTCEuStartupEvents.registry('gtceu:machine', event => {
  const { loadedMods, packFeatures, FGTCEuCommonStartupFunctions } = global;
  const { outTranslatableString } = FGTCEuCommonStartupFunctions;
  // ShishamoTech導入状況時
  if (!loadedMods.SHISHAMO_TECH || packFeatures.bypassSTDisable) {
    // Full-faithial Parallel Rapid Assembly Line
    // 完全並列型高速組立ライン
    event.create('ffaithial_prpd_assembly_line', 'multiblock')
      .rotationState(RotationState.ALL)
      .recipeTypes('assembler', 'circuit_assembler', 'assembly_line')
      .recipeModifiers([
        GTRecipeModifiers.OC_NON_PERFECT_SUBTICK,
        GTRecipeModifiers.BATCH_MODE,
        GTRecipeModifiers.PARALLEL_HATCH,
        GTRecipeModifiers.DEFAULT_ENVIRONMENT_REQUIREMENT,
      ])
      .appearanceBlock(GCYMBlocks.CASING_LARGE_SCALE_ASSEMBLING)
      .pattern(definition => FactoryBlockPattern.start()
        .aisle('nnHHHnn','nHHHHHn','HHHHHHH','HHHHHHH','HHHHHHH','nHHHHHn','nnHHHnn')
        .aisle('nCHHHCn','CChPhCC','Hh G hH','Hh   hH','Hh R hH','CCGMGCC','nCHHHCn')
        .aisle('nnHHHnn','nvhPhvn','Hh G hH','L     L','Hh R hH','nvGMGvn','nnHHHnn')
        .aisle('nCHHHCn','CChPhCC','Hh G hH','L     L','Hh R hH','ChGMGhC','nCHHHCn')
        .aisle('nnHHHnn','nHhPhHn','Hh G hH','L     L','H  R  H','nhGMGhn','nnHHHnn')
        .aisle('nnHHHnn','nHhPhHn','Hh G hH','L     L','H  R  H','nhGMGhn','nnHHHnn')
        .aisle('nnHHHnn','nHhPhHn','Hh G hH','L     L','H  R  H','nhGMGhn','nnHHHnn')
        .aisle('nnHHHnn','nHhPhHn','Hh G hH','L     L','H  R  H','nhGMGhn','nnHHHnn')
        .aisle('nnHHHnn','nHhPhHn','Hh G hH','L     L','H  R  H','nhGMGhn','nnHHHnn')
        .aisle('nCHHHCn','CChPhCC','Hh G hH','L     L','Hh R hH','ChGMGhC','nCHHHCn')
        .aisle('nnHHHnn','nVhPhVn','Hh G hH','L     L','Hh R hH','nVGMGVn','nnHHHnn')
        .aisle('nCHHHCn','CChPhCC','HhhGhhH','L     L','HhhRhhH','CCGMGCC','nCHHHCn')
        .aisle('nnHHHnn','nCCCCCn','HChhhCH','HCLLLCH','HCCRCCH','nCCCCCn','nnHHHnn')
        .aisle('nnnGnnn','nnGCGnn','nGCCCGn','GCWWWCG','nGCRCGn','nnGCGnn','nnnGnnn')
        .aisle('nnnnnnn','nnGGGnn','nGCCCGn','nGC@CGn','nGCCCGn','nnGGGnn','nnnnnnn')
        .where('@', Predicates.controller(Predicates.blocks(definition.get()))) // コントローラー本体
        .where('H', Predicates.blocks(GCYMBlocks.CASING_LARGE_SCALE_ASSEMBLING.get())
          .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1)) // メンテ
          .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1)) // パラレル
          .or(Predicates.abilities(PartAbility.DATA_ACCESS, PartAbility.OPTICAL_DATA_RECEPTION).setMaxGlobalLimited(1)) // データ受付
          .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setMinGlobalLimited(1).setMaxGlobalLimited(16)) // アイテム搬入
          .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMinGlobalLimited(1).setMaxGlobalLimited(4)) // 液体搬入
          .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setExactLimit(1)) // アイテム搬出
          .or(Predicates.abilities(PartAbility.INPUT_ENERGY,
            PartAbility.INPUT_LASER, PartAbility.SUBSTATION_INPUT_ENERGY).setMinGlobalLimited(1).setMaxGlobalLimited(2))) // 電力
        .where('C', Predicates.blocks(GCYMBlocks.CASING_LARGE_SCALE_ASSEMBLING.get()))
        .where('G', Predicates.blocks(GTBlocks.CASING_GRATE.get()))
        .where('h', Predicates.blocks(GTBlocks.COIL_HSSG.get()))
        .where('L', Predicates.blocks(GTBlocks.CASING_LAMINATED_GLASS.get()))
        .where('M', Predicates.blocks(GTBlocks.CASING_ASSEMBLY_CONTROL.get()))
        .where('P', Predicates.blocks(GTBlocks.CASING_STEEL_PIPE.get()))
        .where('R', Predicates.blocks(GTBlocks.CASING_ASSEMBLY_LINE.get()))
        .where('V', Predicates.blocks(GCYMBlocks.HEAT_VENT.get()))
        .where('v', Predicates.blocks(GTBlocks.COMPUTER_HEAT_VENT.get()))
        .where('W', Predicates.blocks(GTBlocks.SUPERCONDUCTING_COIL.get()))
        .where('n', Predicates.any())
        .where(' ', Predicates.air())
        .build())
      .workableCasingModel(GTCEu.id('block/casings/gcym/large_scale_assembling_casing'),
        GTCEu.id('block/multiblock/gcym/large_assembler'))
    ['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'machine.available_recipe_map_1'),
        Component.translatable('gtceu.assembler'), Component.translatable('gtceu.circuit_assembler'),
        Component.translatable('gtceu.assembly_line')),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.ffaithial_prpd_assembly_line', 0)),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.ffaithial_prpd_assembly_line', 1)),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.ffaithial_prpd_assembly_line', 2)),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.ffaithial_prpd_assembly_line', 3)),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.ffaithial_prpd_assembly_line', 4)),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.ffaithial_prpd_assembly_line', 5)),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.ffaithial_prpd_assembly_line', 6)),
    ]);
  }
});
