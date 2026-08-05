/**
 * GTCEu Pyrolyse Oven Recipe
 */

const PyroOvenRecipeResource = {
    Fluid: {
        Nitrogen: '#forge:nitrogen',
        Steam: '#forge:steam',
        Water: 'minecraft:water',
        CoalGas: 'gtceu:coal_gas',
        Creosote: 'gtceu:creosote',
        WoodVinegar: 'gtceu:wood_vinegar',
        CoalTar: 'gtceu:coal_tar',
        HeavyOil: 'gtceu:oil_heavy',
        CharcoalByproducts: 'gtceu:charcoal_byproducts',
        WoodGas: 'gtceu:wood_gas',
        WoodTar: 'gtceu:wood_tar',
        FermentedBiomass: 'gtceu:fermented_biomass'
    },
    Item: {
        Sugar: 'minecraft:sugar',
        Coal: 'minecraft:coal',
        TagLogs: '#minecraft:logs_that_burn',
        TagCharcoalDust: '#forge:dusts/charcoal',
        CoalBlock: 'minecraft:coal_block',
        BioChaff: 'gtceu:bio_chaff',
        TagCarbonDust: '#forge:dusts/carbon',
        TagCoke: '#forge:gems/coke',
        CharcoalDust: 'gtceu:charcoal_dust',
        Coke: 'gtceu:coke_gem',
        Charcoal: 'minecraft:charcoal',
        CokeBlock: 'gtceu:coke_block',
        Ash: 'gtceu:ash_dust'
    }
};

ServerEvents.recipes(event => {
    const GT = event.recipes.gtceu;
    const addHPPyrolyseOvenRecipe = (recipe_id, itemInput, circuitId, fluidInput, itemOutput, fluidOutput, wtime, wvoltage) => {
        GT.hp_pyrolyse_oven(`hp_pyrolyse_oven_${recipe_id}`)
            .itemInputs(itemInput)
            .circuit(circuitId)
            .inputFluids(fluidInput)
            .itemOutputs(itemOutput)
            .outputFluids(fluidOutput)
            .duration(wtime).EUt(wvoltage);
    }
    const costMV = GTValues.VA[GTValues.MV];
    addHPPyrolyseOvenRecipe('charcoal_dust_from_sugar', `23x ${PyroOvenRecipeResource.Item.Sugar}`, 1,
        `${PyroOvenRecipeResource.Fluid.Nitrogen} 500`, `12x ${PyroOvenRecipeResource.Item.CharcoalDust}`,
        `${PyroOvenRecipeResource.Fluid.Water} 1500`, 64, costMV);
    addHPPyrolyseOvenRecipe('coal_gas_from_coal', `4x ${PyroOvenRecipeResource.Item.Coal}`, 22,
        `${PyroOvenRecipeResource.Fluid.Steam} 1000`, `4x ${PyroOvenRecipeResource.Item.Coke}`,
        `${PyroOvenRecipeResource.Fluid.CoalGas} 4000`, 160, costMV);
    addHPPyrolyseOvenRecipe('creosote_from_logs', `4x ${PyroOvenRecipeResource.Item.TagLogs}`, 1,
        `${PyroOvenRecipeResource.Fluid.Nitrogen} 250`, `12x ${PyroOvenRecipeResource.Item.Charcoal}`,
        `${PyroOvenRecipeResource.Fluid.Creosote} 1600`, 32, costMV);
    addHPPyrolyseOvenRecipe('coal_gas_from_coal_block', `8x ${PyroOvenRecipeResource.Item.CoalBlock}`,
        22, `${PyroOvenRecipeResource.Fluid.Steam} 4000`, `8x ${PyroOvenRecipeResource.Item.CokeBlock}`, `${PyroOvenRecipeResource.Fluid.CoalGas} 16000`, 640, costMV);
    addHPPyrolyseOvenRecipe('wood_vinegar', `4x ${PyroOvenRecipeResource.Item.TagLogs}`, 6,
        `${PyroOvenRecipeResource.Fluid.Nitrogen} 250`, `12x ${PyroOvenRecipeResource.Item.Charcoal}`,
        `${PyroOvenRecipeResource.Fluid.WoodVinegar} 3000`, 32, costMV);
    addHPPyrolyseOvenRecipe('fermented_biomass', `2x ${PyroOvenRecipeResource.Item.BioChaff}`, 2,
        `${PyroOvenRecipeResource.Fluid.Water} 4500`, PyroOvenRecipeResource.Item.Ash,
        `${PyroOvenRecipeResource.Fluid.FermentedBiomass} 4500`, 80, costMV);
    addHPPyrolyseOvenRecipe('creosote_from_coal_block', `8x ${PyroOvenRecipeResource.Item.CoalBlock}`,
        1, `${PyroOvenRecipeResource.Fluid.Nitrogen} 1000`, `8x ${PyroOvenRecipeResource.Item.CokeBlock}`, `${PyroOvenRecipeResource.Fluid.Creosote} 48000`, 64, costMV);
    addHPPyrolyseOvenRecipe('creosore_from_coal', PyroOvenRecipeResource.Item.Coal, 1,
        `${PyroOvenRecipeResource.Fluid.Nitrogen} 250`, PyroOvenRecipeResource.Item.Coke,
        `${PyroOvenRecipeResource.Fluid.Creosote} 1750`, 16, costMV);
    addHPPyrolyseOvenRecipe('coal_gas_from_logs', `4x ${PyroOvenRecipeResource.Item.TagLogs}`, 20,
        `${PyroOvenRecipeResource.Fluid.Steam} 250`, `12x ${PyroOvenRecipeResource.Item.Charcoal}`,
        `${PyroOvenRecipeResource.Fluid.CoalGas} 1200`, 144, costMV);
    addHPPyrolyseOvenRecipe('heavy_oil', `4x ${PyroOvenRecipeResource.Item.TagLogs}`, 3,
        `${PyroOvenRecipeResource.Fluid.Nitrogen}`, PyroOvenRecipeResource.Item.Ash,
        `${PyroOvenRecipeResource.Fluid.HeavyOil} 150`, 32, GTValues.VA[GTValues.HV]);
    addHPPyrolyseOvenRecipe('charcoal_byproducts', `4x ${PyroOvenRecipeResource.Item.TagLogs}`, 4,
        `${PyroOvenRecipeResource.Fluid.Nitrogen} 250`, `12x ${PyroOvenRecipeResource.Item.Charcoal}`,
        `${PyroOvenRecipeResource.Fluid.CharcoalByproducts} 2000`, 64, costMV);
    addHPPyrolyseOvenRecipe('wood_gas', `4x ${PyroOvenRecipeResource.Item.TagLogs}`, 5,
        `${PyroOvenRecipeResource.Fluid.Nitrogen} 250`, `12x ${PyroOvenRecipeResource.Item.Charcoal}`,
        `${PyroOvenRecipeResource.Fluid.WoodGas} 1000`, 64, costMV);
});
