global.loadingStartupClasses = {
    $JavaBool: Java.loadClass('java.lang.Boolean'),
    GTCEu: {
        $CoilWorkableEMBMachine: Java.loadClass('com.gregtechceu.gtceu.api.machine.multiblock.CoilWorkableElectricMultiblockMachine'),
        $FusionReactorMachine:   Java.loadClass('com.gregtechceu.gtceu.common.machine.multiblock.electric.FusionReactorMachine'),
        $IO:                     Java.loadClass('com.gregtechceu.gtceu.api.capability.recipe.IO'),
        $MachineModelProp:       Java.loadClass('com.gregtechceu.gtceu.api.machine.property.GTMachineModelProperties'),
        $ParallelHatchPart:      Java.loadClass('com.gregtechceu.gtceu.common.machine.multiblock.part.ParallelHatchPartMachine'),
        $RecipeLogic:            Java.loadClass('com.gregtechceu.gtceu.api.machine.trait.RecipeLogic'),
        $LargeTurbineMachine:    Java.loadClass('com.gregtechceu.gtceu.common.machine.multiblock.generator.LargeTurbineMachine'),
    },
};

global.FGTCEuAddedRecipeType = {
    FissionReactor:           'fission_reactor',
    HighPowerPyrolyseOven:    'hp_pyrolyse_oven',
    HighPressureSteamTurbine: 'hp_steam_turbine',
    LargeHeatExchanger:       'large_heat_exchanger',
};

global.FGTCEuCommonStartupFunctions = {
    /**
     * 
     * @param {string} modid 
     * @param {string} codeTxt 
     * @param {integer|undefined} sectNum 
     * @returns {string} Output Text
     */
    outTranslatableString (modid, codeTxt, sectNum) {
        // Typescriptじゃないのでエラーチェック
        if (typeof modid !== 'string')                                    throw new TypeError(`Mod ID is invalid type: ${typeof modid}.`);
        if (typeof codeTxt !== 'string')                                  throw new TypeError(`Code Text is invalid type: ${typeof codeTxt}.`);
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
        codeTxt = codeTxt
            .replace(/(?:shutup|dammit|go_?home|goddamn)_?gt5u/i, 'backported_gt5u')
            .replace(/(?:(?:multiblock|machine)\.)?parallel(?:izable)?/i, 'parallel');

        const MatchSpecialCode = {
            gtceu: {
                parallel: 'gtceu.multiblock.parallelizable.tooltip',
                backported: 'gtceu.backported_gt5u.tooltip',
            },
        };
        if (modid in MatchSpecialCode && codeTxt in MatchSpecialCode[modid]) return MatchSpecialCode[modid][codeTxt];
        return `${modid}.${codeTxt}.tooltip${typeof sectNum === 'undefined' ? '' : `.${sectNum}`}`;
    },
};
