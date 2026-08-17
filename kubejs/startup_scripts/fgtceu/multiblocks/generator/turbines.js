//requires: gtceu
/**
 * 高圧蒸気タービン＆拡張型タービン発電機
 *  (High Pressure Steam Turbine & Extended Large Turbine Generator Series)
 * ------------------------------------------------------------------------
 */
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
  const { $IO: GTIO } = global.loadingStartupClasses.GTCEu;
  const { HighPressureSteamTurbine } = global.FGTCEuAddedRecipeType;

  event.create(HighPressureSteamTurbine)
    .category('generator')
    .setEUIO(GTIO.OUT)
    .setMaxIOSize(0, 0, 1, 1)
    .setProgressBar(GuiTextures.PROGRESS_BAR_GAS_COLLECTOR, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.TURBINE);
});

GTCEuStartupEvents.registry('gtceu:machine', event => {
  const { HighPressureSteamTurbine } = global.FGTCEuAddedRecipeType;
  const { outTranslatableString } = global.FGTCEuCommonStartupFunctions;
  const { ExtendedLargeTurbineModifier } = global.FGTCEuCommonStartupFunctions.FGTCEuMachineMods;
  const { Casings, Controllers } = global.FGTCEuResLocCode.GTCEu;
  const { $LargeTurbineMachine: LargeTurbineMachine } = global.loadingStartupClasses.GTCEu;
  const SteamTurbine = 'steam_turbine';
  const GasTurbine = 'gas_turbine';
  const PlasmaTurbine = 'plasma_generator';

  /**
   * 高圧蒸気タービン (High Pressure Steam Turbine Generator)
   */
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
    .workableCasingModel(
      GTCEu.id(Casings.TurbineTitanium),
      GTCEu.id(Controllers.LargeSteamTurbine)
    )['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'universal.tooltip.base_production_eut'), GTValues.V[GTValues.EV] * 2),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.turbine.efficiency_tooltip'), GTValues.VNF[GTValues.EV]),
      Component.translatable(outTranslatableString('gtceu', 'machine.hp_steam_turbine', 0)),
      Component.translatable(outTranslatableString('gtceu', 'machine.hp_steam_turbine', 1)),
      Component.translatable(outTranslatableString('gtceu', 'shutup_gt5u'))
    ]);

  /**
   * 拡張型蒸気タービン (Extended Large Steam Turbine Generator)
   */
  event.create('extended_steam_large_turbine', 'multiblock')
    .machine((holder) => new LargeTurbineMachine(holder, GTValues.LuV))
    .rotationState(RotationState.ALL)
    .recipeTypes('steam_turbine')
    .recipeModifiers([
      (machine, recipe) => LargeTurbineMachine.recipeModifier(machine, recipe),
      (machine, recipe) => ExtendedLargeTurbineModifier(machine, recipe)
    ])
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
      .where('T', Predicates.blocks(GTBlocks.CASING_TEMPERED_GLASS.get()))
      .where('U', Predicates.blocks(GTBlocks.COMPUTER_HEAT_VENT.get()))
      .where('V', Predicates.blocks(GCYMBlocks.HEAT_VENT.get()))
      .where('W', Predicates.blocks(GTBlocks.SUPERCONDUCTING_COIL.get()))
      .where('Z', Predicates.blocks(GTBlocks.CASING_EXTREME_ENGINE_INTAKE.get()))
      .where(' ', Predicates.any())
      .build())
    .workableCasingModel(
      GTCEu.id(Casings.TurbineSteel),
      GTCEu.id(Controllers.LargeSteamTurbine)
    )['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'universal.tooltip.base_production_eut'), GTValues.V[GTValues.LuV] * 2),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.turbine.efficiency_tooltip'), GTValues.VNF[GTValues.LuV]),
      Component.translatable(outTranslatableString('gtceu', `machine.extended_steam_large_turbine`)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 0)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 1))
    ]);
  /**
   * 拡張型高圧蒸気タービン (Extended Large High Pressure Steam Turbine Generator)
   */
  event.create('extended_hp_steam_large_turbine', 'multiblock')
    .machine((holder) => new LargeTurbineMachine(holder, GTValues.ZPM))
    .rotationState(RotationState.ALL)
    .recipeTypes('hp_steam_turbine')
    .recipeModifiers([
      (machine, recipe) => LargeTurbineMachine.recipeModifier(machine, recipe),
      (machine, recipe) => ExtendedLargeTurbineModifier(machine, recipe)
    ])
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
    .workableCasingModel(
      GTCEu.id(Casings.TurbineTitanium),
      GTCEu.id(Controllers.LargeSteamTurbine)
    )['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'universal.tooltip.base_production_eut'), GTValues.V[GTValues.ZPM] * 2),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.turbine.efficiency_tooltip'), GTValues.VNF[GTValues.ZPM]),
      Component.translatable(outTranslatableString('gtceu', `machine.extended_steam_large_turbine`)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 0)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 1))
    ]);
  /**
   * 拡張型ガスタービン (Extended Large Gas Turbine Generator)
   */
  event.create('extended_gas_large_turbine', 'multiblock')
    .machine((holder) => new LargeTurbineMachine(holder, GTValues.ZPM))
    .rotationState(RotationState.ALL)
    .recipeTypes('gas_turbine')
    .recipeModifiers([
      (machine, recipe) => LargeTurbineMachine.recipeModifier(machine, recipe),
      (machine, recipe) => ExtendedLargeTurbineModifier(machine, recipe)
    ])
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
    .workableCasingModel(
      GTCEu.id(Casings.TurbineStainlessSteel),
      GTCEu.id(Controllers.LargeGasTurbine)
    )['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'universal.tooltip.base_production_eut'), GTValues.V[GTValues.ZPM] * 2),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.turbine.efficiency_tooltip'), GTValues.VNF[GTValues.ZPM]),
      Component.translatable(outTranslatableString('gtceu', `machine.extended_gas_large_turbine`)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 0)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 1))
    ]);
  /**
   * 拡張型プラズマタービン (Extended Large Plasma Turbine Generator)
   */
  event.create('extended_plasma_large_turbine', 'multiblock')
    .machine((holder) => new LargeTurbineMachine(holder, GTValues.UV))
    .rotationState(RotationState.ALL)
    .recipeTypes('plasma_generator')
    .recipeModifiers([
      (machine, recipe) => LargeTurbineMachine.recipeModifier(machine, recipe),
      (machine, recipe) => ExtendedLargeTurbineModifier(machine, recipe)
    ])
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
    .workableCasingModel(
      GTCEu.id(Casings.TurbineTungstensteel),
      GTCEu.id(Controllers.LargePlasmaTurbine)
    )['tooltips(net.minecraft.network.chat.Component[])']([
      Component.translatable(outTranslatableString('gtceu', 'universal.tooltip.base_production_eut'), GTValues.V[GTValues.UV] * 2),
      Component.translatable(outTranslatableString('gtceu', 'multiblock.turbine.efficiency_tooltip'), GTValues.VNF[GTValues.UV]),
      Component.translatable(outTranslatableString('gtceu', `machine.extended_plasma_large_turbine`)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 0)),
      Component.translatable(outTranslatableString('gtceu', 'machine.extended_large_turbine', 1))
    ]);
});
