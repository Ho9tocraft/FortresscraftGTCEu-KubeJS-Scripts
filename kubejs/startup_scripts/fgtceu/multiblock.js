//requires: gtceu
/**
 * Add Some of the Machines for increase QoL
 */
// グローバルから
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
  const {
    loadingStartupClasses,
    FGTCEuCommonStartupFunctions,
  } = global;
  // レシピタイプ定義
  const {
    FissionReactor,
    HighPowerPyrolyseOven,
    HighPressureSteamTurbine,
    LargeHeatExchanger,
    FGTCEuGreenhouse: GHouse,
  } = global.FGTCEuAddedRecipeType;
  /* ---- EN Consumed / ZERO EN Run ---- */
  // Large Heat Exchanger
  event.create(LargeHeatExchanger)
    .category('multiblock')
    .setEUIO(loadingStartupClasses.GTCEu.$IO.NONE)
    .setMaxIOSize(1, 0, 2, 2) // Item in, Item out, Fluid in, Fluid out
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.COOLING);
  // High Power Pyrolyse Oven
  event.create(HighPowerPyrolyseOven)
    .category('multiblock')
    .setEUIO(loadingStartupClasses.GTCEu.$IO.IN)
    .setMaxIOSize(2, 1, 1, 1)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.FIRE);
  // Modern Green House
  event.create(GHouse)
    .category('multiblock')
    .setEUIO(loadingStartupClasses.GTCEu.$IO.IN)
    .setMaxIOSize(4, 9, 1, 0)
    .setProgressBar(GuiTextures.PROGRESS_BAR_EXTRACT, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.FURNACE);

  /* ---- EN Provided ---- */
  // Fission Reactor
  event.create(FissionReactor)
    .category('generator')
    .setEUIO(loadingStartupClasses.GTCEu.$IO.OUT)
    .setMaxIOSize(3, 3, 1, 1)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW_MULTIPLE, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.FURNACE);
  // High Pressure Steam Turbine (from GT5u)
  event.create(HighPressureSteamTurbine)
    .category('generator')
    .setEUIO(loadingStartupClasses.GTCEu.$IO.OUT)
    .setMaxIOSize(0, 0, 1, 1)
    .setProgressBar(GuiTextures.PROGRESS_BAR_GAS_COLLECTOR, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.TURBINE);
});

GTCEuStartupEvents.registry('gtceu:machine', event => {
  const {
    loadingStartupClasses,
    FGTCEuAddedRecipeType,
    FGTCEuCommonStartupFunctions,
  } = global;
  // Javaクラスのロードが主
  const {
    $CoilWorkableEMBMachine: CoilWorkableElectricMultiblockMachine,
    $FusionReactorMachine: FusionReactorMachine,
    $LargeTurbineMachine: LargeTurbineMachine,
  } = loadingStartupClasses.GTCEu;
  // レシピタイプ定義
  const {
    FissionReactor,
    HighPowerPyrolyseOven,
    HighPressureSteamTurbine,
    LargeHeatExchanger,
    FGTCEuGreenhouse: GHouse,
  } = FGTCEuAddedRecipeType;
  // FGTCEu汎用コード
  const {
    outTranslatableString,
  } = FGTCEuCommonStartupFunctions;

  /*--------
    Machines
    --------*/
  // High Power Pyrolyse Oven
  // 高出力熱分解炉
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
    .workableCasingModel('gtceu:block/casings/solid/machine_casing_solid_steel',
      'gtceu:block/multiblock/pyrolyse_oven')
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
  event.create('modern_green_house', 'multiblock')
    .rotationState(RotationState.NON_Y_AXIS)
    .recipeTypes(GHouse)
    .recipeModifiers([GTRecipeModifiers.PARALLEL_HATCH, GTRecipeModifiers.BATCH_MODE])
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
        .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setExactLimit(1))
        .or(Predicates.autoAbilities(definition.getRecipeTypes())))
      .where('a', Predicates.air())
      .where('0', Predicates.any())
      .build())
    .workableCasingModel('gtceu:block/casings/solid/machine_casing_solid_steel',
      'block/multiblock/generator/large_steam_turbine')
  ['tooltips(net.minecraft.network.chat.Component[])']([
    Component.translatable(outTranslatableString('gtceu', 'multiblock.green_house', 0)),
    Component.translatable(outTranslatableString('gtceu', 'multiblock.green_house', 1))
  ]);
  // [NOW PENDING] Oversailing Fusion Reactor (O-FR)
  /**
  create('oversailing_fusion_reactor', 'multiblock')
      .rotationState(RotationState.ALL)
      .recipeTypes('fusion_reactor')
      .recipeModifiers([
          GTRecipeModifiers.PARALLEL_HATCH,
          GTRecipeModifiers.BATCH_MODE,
          (machine, recipe) => FusionReactorMachine.recipeModifier(machine, recipe)
      ])
  */
  // Large Heat Exchanger
  // 大型熱交換器
  // GregTech 5 Unofficial, Comes Again to GTCEu Modern!
  event.create('large_heat_exchanger', 'multiblock')
    .rotationState(RotationState.NON_Y_AXIS)
    .recipeTypes(LargeHeatExchanger)
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
    .workableCasingModel('gtceu:block/casings/solid/machine_casing_stable_titanium', 'gtceu:block/multiblock/implosion_compressor')
  ['tooltips(net.minecraft.network.chat.Component[])']([
    Component.translatable(outTranslatableString('gtceu', 'multiblock.large_heat_exchanger', 0)),
    Component.translatable(outTranslatableString('gtceu', 'multiblock.large_heat_exchanger', 1)),
    Component.translatable(outTranslatableString('gtceu', 'shutup_gt5u'))
  ]);

  /*----------
    Generators
    ----------*/
  // Pressurized Water Reactor (PWR)
  // 加圧水型原子炉
  // …とは言うが、いちおう沸騰水型のまねごとはできる。
  // また、トリウムであれば水さえもいらない。その代わり低出力（とはいえEVなのだが）。
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
  // High Pressure Steam Turbine
  // 高圧蒸気タービン
  console.log(HighPressureSteamTurbine);
  event.create('hp_steam_large_turbine', 'multiblock')
    .machine((holder) => new LargeTurbineMachine(holder, GTValues.EV))
    .rotationState(RotationState.ALL)
    .recipeTypes(HighPressureSteamTurbine)
    .recipeModifiers([(machine, recipe) => LargeTurbineMachine.recipeModifier(machine, recipe)])
    .generator(true)
    .appearanceBlock(GTBlocks.CASING_TITANIUM_TURBINE)
    .pattern(definition => FactoryBlockPattern.start()
      .aisle('CCCC', 'CHHC', 'CCCC')
      .aisle('CHHC', 'RGGR', 'CHHC')
      .aisle('CCCC', 'C@HC', 'CCCC')
      .where('@', Predicates.controller(Predicates.blocks(definition.get())))
      .where('G', Predicates.blocks(GTBlocks.CASING_TITANIUM_GEARBOX.get()))
      .where('C', Predicates.blocks(GTBlocks.CASING_TITANIUM_TURBINE.get()))
      .where('R', Predicates.abilities(PartAbility.ROTOR_HOLDER).setExactLimit(1)
        .or(Predicates.abilities(PartAbility.OUTPUT_ENERGY).setExactLimit(1)))
      .where('H', Predicates.blocks(GTBlocks.CASING_TITANIUM_TURBINE.get())
        .or(Predicates.autoAbilities(definition.getRecipeTypes()))
        .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1)))
      .build())
    .workableCasingModel('gtceu:block/casings/mechanic/machine_casing_turbine_titanium', 'gtceu:block/multiblock/generator/large_steam_turbine')
  ['tooltips(net.minecraft.network.chat.Component[])']([
    Component.translatable(outTranslatableString('gtceu', 'universal.tooltip.base_production_eut'), GTValues.V[GTValues.EV] * 2),
    Component.translatable(outTranslatableString('gtceu', 'multiblock.turbine.efficiency_tooltip'), GTValues.VNF[GTValues.EV]),
    Component.translatable(outTranslatableString('gtceu', 'machine.hp_steam_turbine', 0)),
    Component.translatable(outTranslatableString('gtceu', 'machine.hp_steam_turbine', 1)),
    Component.translatable(outTranslatableString('gtceu', 'shutup_gt5u'))
  ]);
  /* Extended Large Turbine Generator Series | 拡張型タービン発電機 */
  // マフラーハッチなし
  {
    /* Extended Large Steam Turbine Generator | 拡張型蒸気タービン */
    event.create('extended_steam_large_turbine', 'multiblock')
      .machine((holder) => new LargeTurbineMachine(holder, GTValues.LuV))
      .rotationState(RotationState.ALL)
      .recipeTypes('steam_turbine')
      .recipeModifiers([(machine, recipe) => LargeTurbineMachine.recipeModifier(machine, recipe)])
      .generator(true)
      .appearanceBlock(GTBlocks.CASING_STEEL_TURBINE)
      .pattern(definition => FactoryBlockPattern.start()
        .aisle('FFFFFFCCCCC', 'F   F CVVVC', 'F   F CHHHC', 'F   F CVVVC', 'FFFFFFCCCCC')
        .aisle('F   F CVVVC', 'CCCCCCCUUUZ', 'CHHHCTCPPPV', 'CCCCCCCUUUZ', 'F   F CVVVC')
        .aisle('F   F CHHHC', 'CHHHCZCPPPV', 'RGGGPPPPWWO', 'CHHHCZCPPPV', 'F   F CHHHC')
        .aisle('F   F CVVVC', 'CCCCCCCUUUZ', 'CH@HCTCPPPV', 'CCCCCCCUUUZ', 'F   F CVVVC')
        .aisle('FFFFFFCCCCC', 'F   F CVVVC', 'F   F CHHHC', 'F   F CVVVC', 'FFFFFFCCCCC')
        .where('@', Predicates.controller(Predicates.blocks(definition.get())))
        .where('C', Predicates.blocks(GTBlocks.CASING_STEEL_TURBINE.get()))
        .where('F', Predicates.frames(GTMaterials.get('high_mithrite')))
        .where('G', Predicates.blocks(GTBlocks.CASING_STEEL_GEARBOX.get()))
        .where('H', Predicates.blocks(GTBlocks.CASING_STEEL_TURBINE.get())
          .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS, PartAbility.EXPORT_FLUIDS))
          .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1)))
        .where('O', Predicates.abilities(PartAbility.OUTPUT_ENERGY,
          PartAbility.OUTPUT_LASER, PartAbility.SUBSTATION_OUTPUT_ENERGY).setExactLimit(1))
        .where('P', Predicates.blocks(GTBlocks.CASING_TUNGSTENSTEEL_PIPE.get()))
        .where('R', Predicates.abilities(PartAbility.ROTOR_HOLDER).setExactLimit(1))
        .where('T', Predicates.blocks(GTBlocks.CASING_TEMPERED_GLASS))
        .where('U', Predicates.blocks(GTBlocks.COMPUTER_HEAT_VENT))
        .where('V', Predicates.blocks(GCYMBlocks.HEAT_VENT))
        .where('W', Predicates.blocks(GTBlocks.SUPERCONDUCTING_COIL))
        .where('Z', Predicates.blocks(GTBlocks.CASING_EXTREME_ENGINE_INTAKE))
        .where(' ', Predicates.any())
        .build())
      .workableCasingModel(GTCEu.id('block/casings/mechanic/machine_casing_turbine_steel'),
        GTCEu.id('block/multiblock/generator/large_steam_turbine'))
    ['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'universal.tooltip.base_production_eut'), GTValues.V[GTValues.LuV] * 2),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.turbine.efficiency_tooltip'), GTValues.VNF[GTValues.LuV]),
      Component.translatable(outTranslatableString('gtceu', `machine.extended_steam_large_turbine`)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 0)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 1))
    ]);
    /* Extended Large High Pressure Steam Turbine Generator | 拡張型高圧蒸気タービン */
    event.create('extended_hp_steam_large_turbine', 'multiblock')
      .machine((holder) => new LargeTurbineMachine(holder, GTValues.LuV))
      .rotationState(RotationState.ALL)
      .recipeTypes('hp_steam_turbine')
      .recipeModifiers([(machine, recipe) => LargeTurbineMachine.recipeModifier(machine, recipe)])
      .generator(true)
      .appearanceBlock(GTBlocks.CASING_TITANIUM_TURBINE)
      .pattern(definition => FactoryBlockPattern.start()
        .aisle('FFFFFFCCCCC', 'F   F CVVVC', 'F   F CHHHC', 'F   F CVVVC', 'FFFFFFCCCCC')
        .aisle('F   F CVVVC', 'CCCCCCCUUUZ', 'CHHHCTCPPPV', 'CCCCCCCUUUZ', 'F   F CVVVC')
        .aisle('F   F CHHHC', 'CHHHCZCPPPV', 'RGGGPPPPWWO', 'CHHHCZCPPPV', 'F   F CHHHC')
        .aisle('F   F CVVVC', 'CCCCCCCUUUZ', 'CH@HCTCPPPV', 'CCCCCCCUUUZ', 'F   F CVVVC')
        .aisle('FFFFFFCCCCC', 'F   F CVVVC', 'F   F CHHHC', 'F   F CVVVC', 'FFFFFFCCCCC')
        .where('@', Predicates.controller(Predicates.blocks(definition.get())))
        .where('C', Predicates.blocks(GTBlocks.CASING_TITANIUM_TURBINE.get()))
        .where('F', Predicates.frames(GTMaterials.get('high_mithrite')))
        .where('G', Predicates.blocks(GTBlocks.CASING_TITANIUM_GEARBOX.get()))
        .where('H', Predicates.blocks(GTBlocks.CASING_TITANIUM_TURBINE.get())
          .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS, PartAbility.EXPORT_FLUIDS))
          .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1)))
        .where('O', Predicates.abilities(PartAbility.OUTPUT_ENERGY,
          PartAbility.OUTPUT_LASER, PartAbility.SUBSTATION_OUTPUT_ENERGY).setExactLimit(1))
        .where('P', Predicates.blocks(GTBlocks.CASING_TUNGSTENSTEEL_PIPE.get()))
        .where('R', Predicates.abilities(PartAbility.ROTOR_HOLDER).setExactLimit(1))
        .where('T', Predicates.blocks(GTBlocks.CASING_TEMPERED_GLASS.get()))
        .where('U', Predicates.blocks(GTBlocks.COMPUTER_HEAT_VENT.get()))
        .where('V', Predicates.blocks(GCYMBlocks.HEAT_VENT.get()))
        .where('W', Predicates.blocks(GTBlocks.SUPERCONDUCTING_COIL.get()))
        .where('Z', Predicates.blocks(GTBlocks.CASING_EXTREME_ENGINE_INTAKE.get()))
        .where(' ', Predicates.any())
        .build())
      .workableCasingModel(GTCEu.id('block/casings/mechanic/machine_casing_turbine_titanium'),
        GTCEu.id('block/multiblock/generator/large_steam_turbine'))
    ['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'universal.tooltip.base_production_eut'), GTValues.V[GTValues.ZPM] * 2),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.turbine.efficiency_tooltip'), GTValues.VNF[GTValues.ZPM]),
      Component.translatable(outTranslatableString('gtceu', `machine.extended_steam_large_turbine`)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 0)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 1))
    ]);
    /* Extended Large Plasma Turbine Generator | 拡張型プラズマタービン */
    event.create('extended_plasma_large_turbine', 'multiblock')
      .machine((holder) => new LargeTurbineMachine(holder, GTValues.LuV))
      .rotationState(RotationState.ALL)
      .recipeTypes('plasma_generator')
      .recipeModifiers([(machine, recipe) => LargeTurbineMachine.recipeModifier(machine, recipe)])
      .generator(true)
      .appearanceBlock(GTBlocks.CASING_TUNGSTENSTEEL_TURBINE)
      .pattern(definition => FactoryBlockPattern.start()
        .aisle('FFFFFFCCCCC', 'F   F CVVVC', 'F   F CHHHC', 'F   F CVVVC', 'FFFFFFCCCCC')
        .aisle('F   F CVVVC', 'CCCCCCCUUUZ', 'CHHHCTCPPPV', 'CCCCCCCUUUZ', 'F   F CVVVC')
        .aisle('F   F CHHHC', 'CHHHCZCPPPV', 'RGGGPPPPWWO', 'CHHHCZCPPPV', 'F   F CHHHC')
        .aisle('F   F CVVVC', 'CCCCCCCUUUZ', 'CH@HCTCPPPV', 'CCCCCCCUUUZ', 'F   F CVVVC')
        .aisle('FFFFFFCCCCC', 'F   F CVVVC', 'F   F CHHHC', 'F   F CVVVC', 'FFFFFFCCCCC')
        .where('@', Predicates.controller(Predicates.blocks(definition.get())))
        .where('C', Predicates.blocks(GTBlocks.CASING_TUNGSTENSTEEL_TURBINE.get()))
        .where('F', Predicates.frames(GTMaterials.get('high_mithrite')))
        .where('G', Predicates.blocks(GTBlocks.CASING_TUNGSTENSTEEL_GEARBOX.get()))
        .where('H', Predicates.blocks(GTBlocks.CASING_TUNGSTENSTEEL_TURBINE.get())
          .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS, PartAbility.EXPORT_FLUIDS))
          .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1)))
        .where('O', Predicates.abilities(PartAbility.OUTPUT_ENERGY,
          PartAbility.OUTPUT_LASER, PartAbility.SUBSTATION_OUTPUT_ENERGY).setExactLimit(1))
        .where('P', Predicates.blocks(GTBlocks.CASING_TUNGSTENSTEEL_PIPE.get()))
        .where('R', Predicates.abilities(PartAbility.ROTOR_HOLDER).setExactLimit(1))
        .where('T', Predicates.blocks(GTBlocks.CASING_TEMPERED_GLASS.get()))
        .where('U', Predicates.blocks(GTBlocks.COMPUTER_HEAT_VENT.get()))
        .where('V', Predicates.blocks(GCYMBlocks.HEAT_VENT.get()))
        .where('W', Predicates.blocks(GTBlocks.SUPERCONDUCTING_COIL.get()))
        .where('Z', Predicates.blocks(GTBlocks.CASING_EXTREME_ENGINE_INTAKE.get()))
        .where(' ', Predicates.any())
        .build())
      .workableCasingModel(GTCEu.id('block/casings/mechanic/machine_casing_turbine_tungstensteel'),
        GTCEu.id('block/multiblock/generator/large_plasma_turbine'))
    ['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'universal.tooltip.base_production_eut'), GTValues.V[GTValues.UV] * 2),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.turbine.efficiency_tooltip'), GTValues.VNF[GTValues.UV]),
      Component.translatable(outTranslatableString('gtceu', `machine.extended_plasma_large_turbine`)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 0)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 1))
    ]);
  }
  // マフラーハッチあり
  {
    /* Extended Large Gas Turbine Generator | 拡張型ガスタービン */
    event.create('extended_gas_large_turbine', 'multiblock')
      .machine((holder) => new LargeTurbineMachine(holder, GTValues.LuV))
      .rotationState(RotationState.ALL)
      .recipeTypes('gas_turbine')
      .recipeModifiers([(machine, recipe) => LargeTurbineMachine.recipeModifier(machine, recipe)])
      .generator(true)
      .appearanceBlock(GTBlocks.CASING_STAINLESS_TURBINE)
      .pattern(definition => FactoryBlockPattern.start()
        .aisle('FFFFFFCCCCC', 'F   F CVVVC', 'F   F CMMMC', 'F   F CVVVC', 'FFFFFFCCCCC')
        .aisle('F   F CVVVC', 'CCCCCCCUUUZ', 'CMMMCTCPPPV', 'CCCCCCCUUUZ', 'F   F CVVVC')
        .aisle('F   F CMMMC', 'CMMMCZCPPPV', 'RGGGPPPPWWO', 'CMMMCZCPPPV', 'F   F CMMMC')
        .aisle('F   F CVVVC', 'CCCCCCCUUUZ', 'CM@MCTCPPPV', 'CCCCCCCUUUZ', 'F   F CVVVC')
        .aisle('FFFFFFCCCCC', 'F   F CVVVC', 'F   F CMMMC', 'F   F CVVVC', 'FFFFFFCCCCC')
        .where('@', Predicates.controller(Predicates.blocks(definition.get())))
        .where('C', Predicates.blocks(GTBlocks.CASING_STAINLESS_TURBINE.get()))
        .where('F', Predicates.frames(GTMaterials.get('high_mithrite')))
        .where('G', Predicates.blocks(GTBlocks.CASING_STAINLESS_STEEL_GEARBOX.get()))
        .where('M', Predicates.blocks(GTBlocks.CASING_STAINLESS_TURBINE.get())
          .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS))
          .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
          .or(Predicates.abilities(PartAbility.MUFFLER).setExactLimit(1)))
        .where('O', Predicates.abilities(PartAbility.OUTPUT_ENERGY,
          PartAbility.OUTPUT_LASER, PartAbility.SUBSTATION_OUTPUT_ENERGY).setExactLimit(1))
        .where('P', Predicates.blocks(GTBlocks.CASING_TUNGSTENSTEEL_PIPE.get()))
        .where('R', Predicates.abilities(PartAbility.ROTOR_HOLDER).setExactLimit(1))
        .where('T', Predicates.blocks(GTBlocks.CASING_TEMPERED_GLASS.get()))
        .where('U', Predicates.blocks(GTBlocks.COMPUTER_HEAT_VENT.get()))
        .where('V', Predicates.blocks(GCYMBlocks.HEAT_VENT.get()))
        .where('W', Predicates.blocks(GTBlocks.SUPERCONDUCTING_COIL.get()))
        .where('Z', Predicates.blocks(GTBlocks.CASING_EXTREME_ENGINE_INTAKE.get()))
        .where(' ', Predicates.any())
        .build())
      .workableCasingModel(GTCEu.id('block/casings/mechanic/machine_casing_turbine_stainless_steel'),
        GTCEu.id('block/multiblock/generator/large_gas_steam_turbine'))
    ['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'universal.tooltip.base_production_eut'), GTValues.V[GTValues.ZPM] * 2),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.turbine.efficiency_tooltip'), GTValues.VNF[GTValues.ZPM]),
      Component.translatable(outTranslatableString('gtceu', `machine.extended_gas_large_turbine`)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 0)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 1))
    ]);
  }
});
