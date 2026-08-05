/**
 * Recipe for Primal Mana
 */
const ManaMaterials = {
    KJS_PRIMAL_MANA:         { id: 'kubejs:primal_mana',                provide: 250 },
    BOTANIA_MANADUST:        { id: 'botania:mana_powder',               provide: 100 },
    BOP_MAGIC_LOG:           { id: 'biomesoplenty:magic_log',           provide:  50 },
    BOP_STRIPPED_MAGIC_LOG:  { id: 'biomesoplenty:stripped_magic_log',  provide:  50 },
    BOP_MAGIC_WOOD:          { id: 'biomesoplenty:magic_wood',          provide:  50 },
    BOP_STRIPPED_MAGIC_WOOD: { id: 'biomesoplenty:stripped_magic_wood', provide:  50 },
};
const ManaResults = {
    MANA: 'gtceu:mana',
    WoodPulp: 'gtceu:wood_dust',
    Sugar: 'minecraft:sugar',
    MANADust: ManaMaterials.BOTANIA_MANADUST.id,
    Durium: 'gtceu:durium_dust'
};

ServerEvents.recipes(event => {
    const greg = event.recipes.gtceu;
    // Biomes O' Plenty Magic Log Series
    greg.centrifuge('mana_from_magic_log')
        .itemInputs(ManaMaterials.BOP_MAGIC_LOG.id)
        .itemOutputs(`4x ${ManaResults.WoodPulp}`)
        .outputFluids(`${ManaResults.MANA} ${ManaMaterials.BOP_MAGIC_LOG.provide}`)
        .duration(1200)
        .EUt(8);
    greg.centrifuge('mana_from_magic_wood')
        .itemInputs(ManaMaterials.BOP_MAGIC_WOOD.id)
        .itemOutputs(`4x ${ManaResults.WoodPulp}`)
        .outputFluids(`${ManaResults.MANA} ${ManaMaterials.BOP_MAGIC_WOOD.provide}`)
        .duration(1200)
        .EUt(8);
    greg.centrifuge('mana_from_stripped_magic_log')
        .itemInputs(ManaMaterials.BOP_STRIPPED_MAGIC_LOG.id)
        .itemOutputs(`4x ${ManaResults.WoodPulp}`)
        .outputFluids(`${ManaResults.MANA} ${ManaMaterials.BOP_STRIPPED_MAGIC_LOG.provide}`)
        .duration(1200)
        .EUt(8);
    greg.centrifuge('mana_from_stripped_magic_wood')
        .itemInputs(ManaMaterials.BOP_STRIPPED_MAGIC_WOOD.id)
        .itemOutputs(`4x ${ManaResults.WoodPulp}`)
        .outputFluids(`${ManaResults.MANA} ${ManaMaterials.BOP_STRIPPED_MAGIC_WOOD.provide}`)
        .duration(1200)
        .EUt(8);
    // Botania Mana Powder
    greg.centrifuge('mana_from_mana_powder')
        .itemInputs(ManaMaterials.BOTANIA_MANADUST.id)
        .chancedOutput(ManaResults.Sugar, 1000, 250)
        .outputFluids(`${ManaResults.MANA} ${ManaMaterials.BOTANIA_MANADUST.provide}`)
        .duration(600)
        .EUt(24);
    // KubeJS Primal Mana
    greg.centrifuge('mana_from_primal_mana_dust')
        .itemInputs(ManaMaterials.KJS_PRIMAL_MANA.id)
        .chancedOutput(ManaResults.MANADust, 2500, 500)
        .outputFluids(`${ManaResults.MANA} ${ManaMaterials.KJS_PRIMAL_MANA.provide}`)
        .duration(1200)
        .EUt(1024);
    // (After IV Age) Durium Boost
    /**
     * Durium Boost LCR Recipe
     * @param {String} recipe_id 
     * @param {String} ingredient 
     * @param {Number} provide 
     * @param {String} outputs 
     */
    const DuriumBoost = (recipe_id, ingredient, provide, outputs) => {
        const provManaValue = provide * 4;
        greg.large_chemical_reactor(recipe_id)
            .itemInputs('8x gtceu:durium_ingot', ingredient)
            .itemOutputs(`8x ${ManaResults.Durium}`)
            .chancedOutput(outputs, 2500, 500)
            .inputFluids('gtceu:radon 4000')
            .outputFluids(`${ManaResults.MANA} ${provManaValue}`)
            .duration(600)
            .EUt(1024);
    };
    DuriumBoost('mana_from_magic_log_with_durium', ManaMaterials.BOP_MAGIC_LOG.id,
        ManaMaterials.BOP_MAGIC_LOG.provide, `4x ${ManaResults.WoodPulp}`);
    DuriumBoost('mana_from_magic_wood_with_durium', ManaMaterials.BOP_MAGIC_WOOD.id,
        ManaMaterials.BOP_MAGIC_WOOD.provide, `4x ${ManaResults.WoodPulp}`);
    DuriumBoost('mana_from_stripped_magic_log_with_durium', ManaMaterials.BOP_STRIPPED_MAGIC_LOG.id,
        ManaMaterials.BOP_STRIPPED_MAGIC_LOG.provide, `4x ${ManaResults.WoodPulp}`);
    DuriumBoost('mana_from_stripped_magic_wood_with_durium', ManaMaterials.BOP_STRIPPED_MAGIC_WOOD.id,
        ManaMaterials.BOP_STRIPPED_MAGIC_WOOD.provide, `4x ${ManaResults.WoodPulp}`);
    DuriumBoost('mana_from_mana_powder_with_durium', ManaMaterials.BOTANIA_MANADUST.id,
        ManaMaterials.BOTANIA_MANADUST.provide, ManaResults.Sugar);
    DuriumBoost('mana_from_primal_mana_dust_with_durium', ManaMaterials.KJS_PRIMAL_MANA.id,
        ManaMaterials.KJS_PRIMAL_MANA.provide, ManaResults.MANADust);
});
