//requires: gtceu

global.loadingStartupClasses = {
  $JavaBool: Java.loadClass('java.lang.Boolean'),
  GTCEu: {
    $CoilWorkableEMBMachine: Java.loadClass('com.gregtechceu.gtceu.api.machine.multiblock.CoilWorkableElectricMultiblockMachine'),
    $FusionReactorMachine: Java.loadClass('com.gregtechceu.gtceu.common.machine.multiblock.electric.FusionReactorMachine'),
    $GTRecipe: Java.loadClass('com.gregtechceu.gtceu.api.recipe.GTRecipe'),
    $IO: Java.loadClass('com.gregtechceu.gtceu.api.capability.recipe.IO'),
    $LargeTurbineMachine: Java.loadClass('com.gregtechceu.gtceu.common.machine.multiblock.generator.LargeTurbineMachine'),
    $MachineModelProp: Java.loadClass('com.gregtechceu.gtceu.api.machine.property.GTMachineModelProperties'),
    $MetaMachine: Java.loadClass('com.gregtechceu.gtceu.api.machine.MetaMachine'),
    $ParallelHatchPart: Java.loadClass('com.gregtechceu.gtceu.common.machine.multiblock.part.ParallelHatchPartMachine'),
    $RecipeLogic: Java.loadClass('com.gregtechceu.gtceu.api.machine.trait.RecipeLogic'),
    $RecipeModifier: Java.loadClass('com.gregtechceu.gtceu.api.recipe.modifier.RecipeModifier'),
  },
};

global.FGTCEuAddedRecipeType = {
  FissionReactor: 'fission_reactor',
  HighPowerPyrolyseOven: 'hp_pyrolyse_oven',
  HighPressureSteamTurbine: 'hp_steam_turbine',
  LargeHeatExchanger: 'large_heat_exchanger',
  FGTCEuGreenhouse: 'green_house',
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
};
