/**
 * 過剰燃焼型核融合炉 (Oversailing Fusion Reactor)
 * --------------------------------------------------------------
 */
GTCEuStartupEvents.registry('gtceu:machine', event => {
  const RecipeFReactor = 'fusion_reactor';
  const { outTranslatableString } = global.FGTCEuCommonStartupFunctions;
  const { OversailingFusionReactorModifier } = global.FGTCEuCommonStartupFunctions.FGTCEuMachineMods;
  const { Casings, Controllers } = global.FGTCEuResLocCode.GTCEu;
  const { $FusionReactorMachine: FusionReactorMachine } = global.loadingStartupClasses.GTCEu;

  event.create('oversailing_fusion_reactor', 'multiblock')
    .machine((holder) => new FusionReactorMachine(holder, GTValues.OpV))
    .rotationState(RotationState.NON_Y_AXIS)
    .recipeTypes(RecipeFReactor)
    .recipeModifiers([
      GTRecipeModifiers.PARALLEL_HATCH, GTRecipeModifiers.BATCH_MODE,
      (machine, recipe) => FusionReactorMachine.recipeModifier(machine, recipe),
      (machine, recipe) => OversailingFusionReactorModifier(machine, recipe)
    ])
    .appearanceBlock(GTBlocks.FUSION_CASING_MK3)
    .pattern(definition => FactoryBlockPattern.start()
      .aisle('           F           ', '           F           ', '           F           ', '           F           ', '         FFFFF         ', '         CCCCC         ', '                       ', '                       ', '          F F          ', '                       ', '                       ', '                       ', '                       ')
      .aisle('          FFF          ', '          FFF          ', '          FFF          ', '          FFF          ', '      FFFFFFFFFFF      ', '      CCCCFFFCCCC      ', '                       ', '                       ', '         FF FF         ', '         CCCCC         ', '                       ', '                       ', '                       ')
      .aisle('                       ', '                       ', '                       ', '                       ', '    FFF  H   H  FFF    ', '    CCC HHHHHHH CCC    ', '        HHHHHHH        ', '        HHHHHHH        ', '       FFHHHHHFF       ', '       CCCHHHCCC       ', '                       ', '                       ', '                       ')
      .aisle('   FF             FF   ', '   FF             FF   ', '   FF             FF   ', '   FF     H H     FF   ', '   FF  HHHHHHHH   FF   ', '   CC  HGGGGGGGH  CC   ', '       HGGGGGGGH       ', '       HGGGGGGGH       ', '     F HHGGGGGHH F     ', '     CCCHHGGGHHCCC     ', '        HHHHHHH        ', '        CCCCCCC        ', '                       ')
      .aisle('   FF    FFFFF    FF   ', '   FF    FFFFF    FF   ', '   FF    F H F    FF   ', '   FF  HHHHHHHH   FF   ', '  FFFFHHGGGGGGGH FFFF  ', '  CCFFHG#######GHFFCC  ', '    FFHG#######GHFF    ', '    FFHG#######GHFF    ', '    FFFHGGGGGGGHFFF    ', '    CCFHGGGGGGGHFCC    ', '       HHGGGGGHH       ', '       CCHHHHHCC       ', '                       ')
      .aisle('         FFFFF         ', '         FFFFF         ', '         CCCCC         ', '      HHHHHHHHHH       ', '  F FFHGGGGGGGGGHFF F  ', '  C FHG#########GHF C  ', '    FHG#########GHF    ', '    FHG#########GHF    ', '   FFHHG#######GHHFF   ', '   CCFHG#######GHFCC   ', '      CHGGGGGGGHC      ', '      CCHHHHHHHCC      ', '                       ')
      .aisle('                       ', '                       ', '        CC   CC        ', '     HHHHHHHHHHHH      ', ' FF HHGGGGGGGGGGGH  FF ', ' CC HG###GGGGG###GH CC ', '    HG###GGGGG###GH    ', '    HG###GGGGG###GH    ', '    FHG##GGGGG##GHF    ', '   CFHG##GGGGG##GHFC   ', '     CHGGGGGGGGGHC     ', '     CCHHHHHHHHHCC     ', '                       ')
      .aisle('                       ', '                       ', '       CC     CC       ', '    HHHHHHHHHHHHHH     ', ' F HHGGGGJJJJJGGGGH  F ', ' C HG###GJJJJJG###GH C ', '   HG###GJJJJJG###GH   ', '   HG###GJJJJJG###GH   ', '  FHHG##GJJJJJG##GHHF  ', '  CCHG##GJJJJJG##GHCC  ', '    HHGGGJJJJJGGGHH    ', '    CCHHHHHHHHHHHCC    ', '         CCCCC         ')
      .aisle('                       ', '                       ', '      CC       CC      ', '    HHHHHHGGGHHHHHH    ', ' F HGGGGJCCCCCJGGGGH F ', ' CHG###GJCCCCCJG###GHC ', '  HG###GJCCCCCJG###GH  ', '  HG###GJCCCCCJG###GH  ', '  FHG##GJCCCCCJG##GHF  ', '  CHG##GJCCCCCJG##GHC  ', '   HHGGGJCCCCCJGGGHH   ', '   CCHHHH     HHHHCC   ', '        CC   CC        ')
      .aisle('    FF           FF    ', '    FF           FF    ', '    FCC         CCF    ', '    HHHHHG   GHHHHH    ', 'FFHHGGGJCC   CCJGGGHHFF', 'CCHG##GJCC   CCJG##GHCC', '  HG##GJCC   CCJG##GH  ', '  HG##GJCC   CCJG##GH  ', ' FHGG#GJCC   CCJG#GGHF ', ' CCHG#GJCC   CCJG#GHCC ', '   HGGGJCC   CCJGGGH   ', '   CHHHH       HHHHC   ', '       CC     CC       ')
      .aisle(' F  FF           FF  F ', ' F  FF           FF  F ', ' F   C           C   F ', ' F HHHHHG     GHHHHH F ', 'FF HGGGJC     CJGGGH FF', 'CFHG##GJC     CJG##GHFC', '  HG##GJC     CJG##GH  ', '  HG##GJC     CJG##GH  ', 'FFHGG#GJC     CJG#GGHFF', ' CHGG#GJC     CJG#GGHC ', '   HGGGJC     CJGGGH   ', '   CHHHH       HHHHC   ', '       C       C       ')
      .aisle('FF  FF           FF  FF', 'FF  FF           FF  FF', 'FF  HC           CH  FF', 'FF  HHHHG     GHHHH  FF', 'FF HGGGJC     CJGGGH FF', 'CFHG##GJC     CJG##GHFC', '  HG##GJC     CJG##GH  ', '  HG##GJC     CJG##GH  ', '  HGG#GJC     CJG#GGH  ', ' CHGG#GJC     CJG#GGHC ', '   HGGGJC     CJGGGH   ', '   CHHHH       HHHHC   ', '       C       C       ')
      .aisle(' F  FF           FF  F ', ' F  FF           FF  F ', ' F   C           C   F ', ' F HHHHHG     GHHHHH F ', 'FF HGGGJC     CJGGGH FF', 'CFHG##GJC     CJG##GHFC', '  HG##GJC     CJG##GH  ', '  HG##GJC     CJG##GH  ', 'FFHGG#GJC     CJG#GGHFF', ' CHGG#GJC     CJG#GGHC ', '   HGGGJC     CJGGGH   ', '   CHHHH       HHHHC   ', '       C       C       ')
      .aisle('    FF           FF    ', '    FF           FF    ', '    FCC         CCF    ', '    HHHHHG   GHHHHH    ', 'FFHHGGGJCC   CCJGGGHHFF', 'CCHG##GJCC   CCJG##GHCC', '  HG##GJCC   CCJG##GH  ', '  HG##GJCC   CCJG##GH  ', ' FHGG#GJCC   CCJG#GGHF ', ' CCHG#GJCC   CCJG#GHCC ', '   HGGGJCC   CCJGGGH   ', '   CHHHH       HHHHC   ', '       CC     CC       ')
      .aisle('                       ', '                       ', '      CC       CC      ', '    HHHHHHGGGHHHHHH    ', ' F HGGGGJCCCCCJGGGGH F ', ' CHG###GJCCCCCJG###GHC ', '  HG###GJCCCCCJG###GH  ', '  HG###GJCCCCCJG###GH  ', '  FHG##GJCCCCCJG##GHF  ', '  CHG##GJCCCCCJG##GHC  ', '   HHGGGJCCCCCJGGGHH   ', '   CCHHHH     HHHHCC   ', '        CC   CC        ')
      .aisle('                       ', '                       ', '       CC     CC       ', '     HHHHHHHHHHHHH     ', ' F  HGGGGJJJJJGGGGH  F ', ' C HG###GJJJJJG###GH C ', '   HG###GJJJJJG###GH   ', '   HG###GJJJJJG###GH   ', '  FHHG##GJJJJJG##GHHF  ', '  CCHG##GJJJJJG##GHCC  ', '    HHGGGJJJJJGGGHH    ', '    CCHHHHHHHHHHHCC    ', '         CCCCC         ')
      .aisle('                       ', '                       ', '        CC   CC        ', '      HHHHHHHHHHH      ', ' FF  HGGGGGGGGGGGH  FF ', ' CC HG###GGGGG###GH CC ', '    HG###GGGGG###GH    ', '    HG###GGGGG###GH    ', '    FHG##GGGGG##GHF    ', '   CFHG##GGGGG##GHFC   ', '     CHGGGGGGGGGHC     ', '     CCHHHHHHHHHCC     ', '                       ')
      .aisle('         FFFFF         ', '         FFFFF         ', '         CCCCC         ', '       HHHHHHHHH       ', '  F FFHGGGGGGGGGHFF F  ', '  C FHG#########GHF C  ', '    FHG#########GHF    ', '    FHG#########GHF    ', '   FFHHG#######GHHFF   ', '   CCFHG#######GHFCC   ', '      CHGGGGGGGHC      ', '      CCHHHHHHHCC      ', '                       ')
      .aisle('   FF    FFFFF    FF   ', '   FF    FFFFF    FF   ', '   FF    F H F    FF   ', '   FF   HHHHHHH   FF   ', '  FFFF HGGGGGGGH FFFF  ', '  CCFFHG#######GHFFCC  ', '    FFHG#######GHFF    ', '    FFHG#######GHFF    ', '    FFFHGGGGGGGHFFF    ', '    CCFHGGGGGGGHFCC    ', '       HHGGGGGHH       ', '       CCHHHHHCC       ', '                       ')
      .aisle('   FF             FF   ', '   FF             FF   ', '   FF             FF   ', '   FF     H H     FF   ', '   FF   HHHHHHH   FF   ', '   CC  HGGGGGGGH  CC   ', '       HGGGGGGGH       ', '       HGGGGGGGH       ', '     F HHGGGGGHH F     ', '     CCCHHGGGHHCCC     ', '        HHHHHHH        ', '        CCCCCCC        ', '                       ')
      .aisle('                       ', '                       ', '                       ', '                       ', '    FFF  H   H  FFF    ', '    CCC HHHHHHH CCC    ', '        HHH@HHH        ', '        HHHHHHH        ', '       FFHHHHHFF       ', '       CCCHHHCCC       ', '                       ', '                       ', '                       ')
      .aisle('          FFF          ', '          FFF          ', '          FFF          ', '          FFF          ', '      FFFFFFFFFFF      ', '      CCCCFFFCCCC      ', '                       ', '                       ', '         FF FF         ', '         CCCCC         ', '                       ', '                       ', '                       ')
      .aisle('           F           ', '           F           ', '           F           ', '           F           ', '         FFFFF         ', '         CCCCC         ', '                       ', '                       ', '          F F          ', '                       ', '                       ', '                       ', '                       ')
      .where('@', Predicates.controller(Predicates.blocks(definition.get())))
      .where('F', Predicates.frames(GTMaterials.HSSG))
      .where('C', Predicates.blocks(GTBlocks.SUPERCONDUCTING_COIL.get()))
      .where('H', Predicates.blocks(GTBlocks.FUSION_CASING_MK3.get())
        .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMinGlobalLimited(2).setMaxGlobalLimited(8).setPreviewCount(2))
        .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setMinGlobalLimited(1).setMaxGlobalLimited(4).setPreviewCount(1))
        .or(Predicates.abilities(PartAbility.INPUT_ENERGY, PartAbility.SUBSTATION_INPUT_ENERGY,
          PartAbility.INPUT_LASER).setMinGlobalLimited(1).setMaxGlobalLimited(16).setPreviewCount(16))
        .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1).setPreviewCount(1)))
      .where('J', Predicates.blocks(GTBlocks.FUSION_CASING_MK3.get()))
      .where('G', Predicates.blocks(GTBlocks.FUSION_GLASS.get()))
      .where('#', Predicates.air())
      .where(' ', Predicates.any())
      .build())
    .workableCasingModel(
      GTCEu.id(Casings.FusionCasingMk3),
      GTCEu.id(Controllers.FusionReactor)
    )['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable('gtceu.machine.fusion_reactor.capacity',
        FusionReactorMachine.calculateEnergyStorageFactor(GTValues.OpV, 16) / 1000000),
      Component.translatable('gtceu.machine.fusion_reactor.overclocking'),
      Component.translatable('gtceu.multiblock.oversailing_fusion_reactor.description')
    ]);
});
