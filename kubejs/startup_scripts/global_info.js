//priority: 10
//requires: gtceu

global.loadingStartupClasses = {
  $JavaBool: Java.loadClass('java.lang.Boolean'),
  GTCEu: {
    // Class
    $CoilWorkableEMBMachine: Java.loadClass('com.gregtechceu.gtceu.api.machine.multiblock.CoilWorkableElectricMultiblockMachine'),
    $ContentModifier: Java.loadClass('com.gregtechceu.gtceu.api.recipe.content.ContentModifier'),
    $FusionReactorMachine: Java.loadClass('com.gregtechceu.gtceu.common.machine.multiblock.electric.FusionReactorMachine'),
    $GTRecipe: Java.loadClass('com.gregtechceu.gtceu.api.recipe.GTRecipe'),
    $IO: Java.loadClass('com.gregtechceu.gtceu.api.capability.recipe.IO'),
    $LargeTurbineMachine: Java.loadClass('com.gregtechceu.gtceu.common.machine.multiblock.generator.LargeTurbineMachine'),
    $MachineModelProp: Java.loadClass('com.gregtechceu.gtceu.api.machine.property.GTMachineModelProperties'),
    $MetaMachine: Java.loadClass('com.gregtechceu.gtceu.api.machine.MetaMachine'),
    $ParallelHatchPart: Java.loadClass('com.gregtechceu.gtceu.common.machine.multiblock.part.ParallelHatchPartMachine'),
    $ParallelLogic: Java.loadClass('com.gregtechceu.gtceu.api.recipe.modifier.ParallelLogic'),
    $RecipeLogic: Java.loadClass('com.gregtechceu.gtceu.api.machine.trait.RecipeLogic'),
    $RecipeModifier: Java.loadClass('com.gregtechceu.gtceu.api.recipe.modifier.RecipeModifier'),
    // Interface
    $IMultiController: Java.loadClass('com.gregtechceu.gtceu.api.machine.feature.multiblock.IMultiController'),
  },
  MC: {
    $ResourceLocation: Java.loadClass('net.minecraft.resources.ResourceLocation'),
  },
};

/* FGTCEu Resource Locations */
global.FGTCEuResLocCode = {
  /**
   * @desc GTCEu Casings/Controllers Path
   */
  GTCEu: {
    Casings: {
      FusionCasingMk3: 'block/casings/fusion/fusion_casing_mk3',
      LargeScaleAssembling: 'block/casings/gcym/large_scale_assembling_casing',
      SolidSteel: 'block/casings/solid/machine_casing_solid_steel',
      StableTitanium: 'block/casings/solid/machine_casing_stable_titanium',
      SturdyHSSE: 'block/casings/solid/machine_casing_sturdy_hsse',
      TurbineStainlessSteel: 'block/casings/mechanic/machine_casing_turbine_stainless_steel',
      TurbineSteel: 'block/casings/mechanic/machine_casing_turbine_steel',
      TurbineTitanium: 'block/casings/mechanic/machine_casing_turbine_titanium',
      TurbineTungstensteel: 'block/casings/mechanic/machine_casing_turbine_tungstensteel',
    },
    Controllers: {
      FusionReactor: 'block/multiblock/fusion_reactor',
      ImplosionCompressor: 'block/multiblock/implosion_compressor',
      LargeAssembler: 'block/multiblock/gcym/large_assembler',
      LargeGasTurbine: 'block/multiblock/generator/large_steam_turbine',
      LargePlasmaTurbine: 'block/multiblock/generator/large_plasma_turbine',
      LargeSteamTurbine: 'block/multiblock/generator/large_gas_turbine',
      PyrolyseOven: 'block/multiblock/pyrolyse_oven',
      ResearchStation: 'block/multiblock/research_station',
    },
  },
};

global.FGTCEuAddedRecipeType = {
  DutySimulator: 'duty_simulator',
  FGTCEuGreenhouse: 'green_house',
  FissionReactor: 'fission_reactor',
  HighPowerPyrolyseOven: 'hp_pyrolyse_oven',
  HighPressureSteamTurbine: 'hp_steam_turbine',
  LargeHeatExchanger: 'large_heat_exchanger',
  NeuralnetMSCCalc: 'neuralnet_mob_simulation_computer_calc',
  NeuralnetMSCFab: 'neuralnet_mob_simulation_computer_fab',
};

global.FGTCEuCommonStartupFunctions = {
  /**
   * 
   * @param {string} modid 
   * @param {string} codeTxt 
   * @param {integer|undefined} sectNum 
   * @returns {string} Output Text
   */
  outTranslatableString(modid, codeTxt, sectNum) {
    // Typescriptじゃないのでエラーチェック
    if (typeof modid !== 'string') throw new TypeError(`Mod ID is invalid type: ${typeof modid}.`);
    if (typeof codeTxt !== 'string') throw new TypeError(`Code Text is invalid type: ${typeof codeTxt}.`);
    if (!(typeof sectNum === 'number' || typeof sectNum === 'undefined')) throw new TypeError(`Count is invalid type: ${typeof sectNum}.`);

    // コード整形
    /**
     * gregtech、gtca表記: gtceu
     */
    modid = modid.replace(/(?:gregtech|gtca)/i, 'gtceu');
    /**
     * shutup_gt5uなど: backported_gt5u(い・や・だ・こ・と・わ・る！)
     * (multiblock.)parallelizableなど: parallel(パラレルハッチ使用可能)
     */
    const flagCode
      = /(?:shutup|dammit|go_?home|goddamn|backported)_?gt5u/i.test(codeTxt) ? 'backported'
        : /parallel(?:izable)?/i.test(codeTxt) ? 'parallel'
          : /base_?production_?eut/i.test(codeTxt) ? 'baseProdEUt'
            : /turbine\.efficiency(?:_tooltip)?/i.test(codeTxt) ? 'efficiencyTurbine'
              : codeTxt;

    const MatchSpecialCode = {
      gtceu: {
        parallel: 'gtceu.multiblock.parallelizable.tooltip',
        backported: 'gtceu.backported_gt5u.tooltip',
        baseProdEUt: 'gtceu.universal.tooltip.base_production_eut',
        efficiencyTurbine: 'gtceu.multiblock.turbine.efficiency_tooltip',
      },
    };
    if (modid in MatchSpecialCode && flagCode in MatchSpecialCode[modid]) return MatchSpecialCode[modid][flagCode];
    return `${modid}.${codeTxt}.tooltip${typeof sectNum === 'undefined' ? '' : `.${sectNum}`}`;
  },
  FGTCEuMachineMods: {
    /**
     * Modifiers for XL Turbine
     * @param {$MetaMachine} machine 
     * @param {$GTRecipe} recipe 
     * @returns 
     */
    ExtendedLargeTurbineModifier(machine, recipe) {
      const {
        $GTRecipe: GTRecipe,
        $LargeTurbineMachine: LargeTurbineMachine,
        $MetaMachine: MetaMachine,
        $RecipeModifier: RecipeMod
      } = global.loadingStartupClasses.GTCEu;
      if (!(machine instanceof MetaMachine) || !(recipe instanceof GTRecipe)) return ModifierFunction.NULL;
      if (!(machine instanceof LargeTurbineMachine)) {
        return RecipeMod.nullWrongType(LargeTurbineMachine, machine);
      }
      else {
        return ModifierFunction.builder()
          .eutMultiplier(16.0)
          .build();
      }
    },
    /**
     * Modifiers for Heat Exchanger
     * @param {$MetaMachine} machine 
     * @param {$GTRecipe} recipe 
     */
    HeatExchangerModifier(machine, recipe) {
      const {
        $ContentModifier: ContentModifier,
        $ParallelLogic: ParallelLogic,
        $GTRecipe: GTRecipe,
        $IMultiController: IMultiController,
      } = global.loadingStartupClasses.GTCEu;
      if (recipe instanceof GTRecipe && recipe.getId() !== null &&
          !/plasma_cooling/.test(recipe.getId().getPath())) {
        // Max Parallel
        const xParallel = 65536;
        // Current Parallel
        const cParallel = ParallelLogic.getParallelAmount(machine, recipe, xParallel);
        return ModifierFunction.builder()
          .modifyAllContents(ContentModifier.multiplier(cParallel))
          .parallels(cParallel)
          .build();
      }

      return ModifierFunction.IDENTITY;
    },
    /**
     * 
     * @param {$MetaMachine} machine 
     * @param {$GTRecipe} recipe 
     */
    OversailingFusionReactorModifier(machine, recipe) {
      const {
        $FusionReactorMachine: FusionReactorMachine,
        $GTRecipe: GTRecipe,
        $MetaMachine: MetaMachine,
        $RecipeModifier: RecipeMod
      } = global.loadingStartupClasses.GTCEu;
      if (!(machine instanceof MetaMachine) || !(recipe instanceof GTRecipe)) return ModifierFunction.NULL;
      if (!(machine instanceof FusionReactorMachine)) {
        return RecipeMod.nullWrongType(FusionReactorMachine, machine);
      }
      else {
        return ModifierFunction.builder()
          .eutMultiplier(0.95)
          .durationMultiplier(0.8)
          .build();
      }
    },
  },
};
