/**
 * GTCEu Extended Parallel Hatch
 */
GTCEuStartupEvents.registry('gtceu:machine', (event) => {
    const {
        $JavaBool, GTCEu: itnGTCEu,
    } = global.loadingStartupClasses;
    const {
        $RecipeLogic, $MachineModelProp,
        $ParallelHatchPart: $ParallelHatchPartMachine,
    } = itnGTCEu;
    event.create('parallel_hatch', 'custom')
        .tiers(GTValues.UHV, GTValues.UEV, GTValues.UIV, GTValues.UXV)
        .machine((holder, tier) => {
            return new $ParallelHatchPartMachine(holder, tier);
        })
        .definition((tier, builder) => builder.rotationState(RotationState.ALL)
            .abilities(PartAbility.PARALLEL_HATCH)
            .modelProperty($MachineModelProp.IS_FORMED, $JavaBool.FALSE)
            .modelProperty($RecipeLogic.STATUS_PROPERTY, $RecipeLogic.Status.IDLE)
            .model(GTMachineModels.createWorkableTieredHullMachineModel(GTCEu.id('block/machines/parallel_hatch_mk4'))
            ['andThen(com.gregtechceu.gtceu.api.registry.registrate.MachineBuilder$ModelInitializer)']((ctx, prov, model) => { model.addReplaceableTextures('bottom', 'top', 'side'); }))
        );
});
