/**
 * ThermalExpansion Lost Contents
 */
ServerEvents.recipes(event => {
    const greg = event.recipes.gtceu;
    const missingContents = {
        aerotheum: 'kubejs:aerotheum_dust',
        cryotheum: 'kubejs:cryotheum_dust',
        petrotheum: 'kubejs:petrotheum_dust',
        pyrotheum: 'kubejs:pyrotheum_dust',
        mana: 'kubejs:primal_mana'
    };
    const improveElemDusts = {
        aerotheum: {
            intake: 'thermal:blitz_rod',
            output: 'thermal:blitz_powder'
        },
        cryotheum: {
            intake: 'thermal:blizz_rod',
            output: 'thermal:blizz_powder'
        },
        petrotheum: {
            intake: 'thermal:basalz_rod',
            output: 'thermal:basalz_powder'
        }
    };
    const element_dust_recipe = [
        'AA ',
        'BC ',
        '   '
    ];

    /**
     * Macro for Mixer Recipe Builder
     * @param {String} recipe_id 
     * @param {String} first_ingredients 
     * @param {String} second_ingredients 
     * @param {String} outputs 
     */
    const mixerMacros = (recipe_id, first_ingredients, second_ingredients, outputs) => {
        greg.mixer(recipe_id)
            .itemInputs(first_ingredients, 'minecraft:redstone', second_ingredients)
            .itemOutputs(outputs)
            .duration(40)
            .EUt(16);
    };
    /**
     * 
     * @param {String} recipe_id 
     * @param {{intake: string, output:string}} target 
     */
    const elemDustsMacerate = (recipe_id, target) => {
        greg.macerator(recipe_id)
            .itemInputs(target.intake)
            .itemOutputs(`4x ${target.output}`)
            .duration(88)
            .EUt(2);
    };

    elemDustsMacerate('macerate_blitz_rod', improveElemDusts.aerotheum);
    elemDustsMacerate('macerate_blizz_rod', improveElemDusts.cryotheum);
    elemDustsMacerate('macerate_basalz_rod', improveElemDusts.petrotheum);

    event.shaped(`2x ${missingContents.aerotheum}`, element_dust_recipe, {
        A: improveElemDusts.aerotheum.output,
        B: 'minecraft:redstone',
        C: '#forge:dusts/saltpeter'
    }).noMirror().noShrink();
    event.shaped(`2x ${missingContents.cryotheum}`, element_dust_recipe, {
        A: improveElemDusts.cryotheum.output,
        B: 'minecraft:redstone',
        C: 'minecraft:snowball'
    }).noMirror().noShrink();
    event.shaped(`2x ${missingContents.petrotheum}`, element_dust_recipe, {
        A: improveElemDusts.petrotheum.output,
        B: 'minecraft:redstone',
        C: '#forge:dusts/obsidian'
    }).noMirror().noShrink();
    event.shaped(`2x ${missingContents.pyrotheum}`, element_dust_recipe, {
        A: 'minecraft:blaze_powder',
        B: 'minecraft:redstone',
        C: '#forge:dusts/sulfur'
    }).noMirror().noShrink();
    event.shaped(`4x ${missingContents.mana}`, [
        'AAB',
        'DEB',
        'DCC'
    ], {
        A: missingContents.aerotheum,
        B: missingContents.pyrotheum,
        C: missingContents.petrotheum,
        D: missingContents.cryotheum,
        E: 'botania:mana_powder'
    });
    mixerMacros('mixer_aerotheum', '2x thermal:blitz_powder', '#forge:dusts/saltpeter', `2x ${missingContents.aerotheum}`);
    mixerMacros('mixer_cryotheum', '2x thermal:blizz_powder', 'minecraft:snowball', `2x ${missingContents.cryotheum}`);
    mixerMacros('mixer_petrotheum', '2x thermal:basalz_powder', '#forge:dusts/obsidian', `2x ${missingContents.petrotheum}`);
    mixerMacros('mixer_pyrotheum', '2x minecraft:blaze_powder', '#forge:dusts/sulfur', `2x ${missingContents.pyrotheum}`);
    greg.mixer('mixer_primal_mana')
        .itemInputs(`2x ${missingContents.aerotheum}`, `2x ${missingContents.cryotheum}`,
            `2x ${missingContents.petrotheum}`, `2x ${missingContents.pyrotheum}`, 'botania:mana_powder')
        .itemOutputs(`4x ${missingContents.mana}`)
        .duration(100)
        .EUt(128);
});
