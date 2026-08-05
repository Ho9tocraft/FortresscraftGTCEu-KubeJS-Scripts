/**
 * Fusion Reactor Recipes
 */

const fluidResource = {
    Abyssal: 'gtceu:abyssal',
    Arrokothium: 'gtceu:arrokothium',
    Ascendium: 'gtceu:ascendium',
    AscendiumPlasma: 'gtceu:ascendium_plasma',
    Excerium: 'gtceu:excerium',
    ExceriumPlasma: 'gtceu:excerium_plasma',
    AwakenedAbysslinkerMithril: 'gtceu:awakened_abysslinker_mithril',
    LunarAdamantium: 'gtceu:lunar_adamantium',
    Europium: 'gtceu:europium',
    Gallium: 'gtceu:gallium',
    Nickel: 'gtceu:nickel',
    Thorium: 'gtceu:thorium'
};

/**
 * Form 'fluid_id buckets' form
 * @param {String} fluid_id Fluid ID
 * @param {Number} buckets Amount (mB)
 * @returns Formed String
 */
let MacroFluidStats = (fluid_id, buckets) => { return `${fluid_id} ${buckets}`; };

ServerEvents.recipes(event => {
    const GT = event.recipes.gtceu;
    /**
     * Register GT Fusion Reactor Recipe
     * @param {String} recipe_id Recipe ID
     * @param {String} ingredient1 Ingredient 1 (must be Fluid)
     * @param {String} ingredient2 Ingredient 1 (must be Fluid)
     * @param {String} output Output (must be Fluid)
     * @param {Number} work_time Working Time (Tick)
     * @param {Number} energy Energy
     * @param {Number} startEU Starting EU
     */
    const GTFusionReactor = (recipe_id, ingredient1, ingredient2, output, work_time, energy, startEU) => {
        GT.fusion_reactor(recipe_id)
            .inputFluids(ingredient1, ingredient2)
            .outputFluids(output)
            .duration(work_time)
            .EUt(energy)
            .fusionStartEU(startEU);
    };
    // Abyssal
    GTFusionReactor('fusion_abyssal',
        MacroFluidStats(fluidResource.Thorium, 1296),
        MacroFluidStats(fluidResource.Europium, 144),
        MacroFluidStats(fluidResource.Abyssal, 36),
        200, 32768, 4000000);
    // Ascendium
    GTFusionReactor('fusion_ascendium', 
        MacroFluidStats(fluidResource.AwakenedAbysslinkerMithril, 144),
        MacroFluidStats(fluidResource.Nickel, 144),
        MacroFluidStats(fluidResource.Ascendium, 16),
        200, 524288, 144000000);
    // Ascendium Plasma
    GTFusionReactor('fusion_ascendium_plasma',
        MacroFluidStats(fluidResource.AwakenedAbysslinkerMithril, 1296),
        MacroFluidStats(fluidResource.Gallium, 144),
        MacroFluidStats(fluidResource.AscendiumPlasma, 720),
        4, 524288, 144000000);
    // Arrokothium
    GTFusionReactor('fusion_arrokothium',
        MacroFluidStats(fluidResource.Ascendium, 1296),
        MacroFluidStats(fluidResource.LunarAdamantium, 144),
        MacroFluidStats(fluidResource.Arrokothium, 16),
        200, 524288, 196000000);
    // Excerium Plasma
    GTFusionReactor('fusion_excerium_plasma',
        MacroFluidStats(fluidResource.Ascendium, 432),
        MacroFluidStats(fluidResource.LunarAdamantium, 144),
        MacroFluidStats(fluidResource.ExceriumPlasma, 576),
        20, 524288, 144000000);
});
