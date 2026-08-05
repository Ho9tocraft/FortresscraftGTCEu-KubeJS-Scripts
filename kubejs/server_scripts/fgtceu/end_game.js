// Endgame Contents
const endgameSlashBlades = {
    yuzukitukumoEx: { bladeid: 'yuzukitukumo_ex', modelTex: 'model/named/exeyuzu' },
    moonlight: { bladeid: 'moonlight_slashblade', modelTex: 'model/named/exemoon' }
};

// Define SlashBlade
ServerEvents.highPriorityData(event => {
    const yuzukitukumoEx = SBSlashBladeDefinition.of(`fgtceu:${endgameSlashBlades.yuzukitukumoEx.bladeid}`,
        SBRenderDefinition.newInstance() // Render
            .effectColor(0xFDEFF2)
            .standbyRenderType(SBCarryType.KATANA)
            .modelName(`slashblade_fgtceu:${endgameSlashBlades.yuzukitukumoEx.modelTex}.obj`)
            .textureName(`slashblade_fgtceu:${endgameSlashBlades.yuzukitukumoEx.modelTex}.png`)
            .build(),
        SBPropertiesDefinition.newInstance()
            .maxDamage(20)
            .baseAttackModifier(256)
            .slashArtsType('slashblade_addon:rapid_blistering_swords')
            .addSpecialEffect('slashblade_addon:mana_repair')
            .defaultSwordType([SBSwordType.BEWITCHED])
            .build(),
        [
            SBEnchantmentDefinition.of('minecraft:sharpness', 5),
            SBEnchantmentDefinition.of('minecraft:fire_aspect', 3),
            SBEnchantmentDefinition.of('minecraft:looting', 3),
            SBEnchantmentDefinition.of('minecraft:unbreaking', 3),
            SBEnchantmentDefinition.of('minecraft:mending', 1),
            SBEnchantmentDefinition.of('enderio:xp_boost', 3),
            SBEnchantmentDefinition.of('enderio:soulbound', 1)
        ]
    );
    const moonlight = SBSlashBladeDefinition.of (`fgtceu:${endgameSlashBlades.moonlight.bladeid}`,
        SBRenderDefinition.newInstance()
            .effectColor(0x59B9C6)
            .standbyRenderType(SBCarryType.KATANA)
            .modelName(`slashblade_fgtceu:${endgameSlashBlades.moonlight.modelTex}.obj`)
            .textureName(`slashblade_fgtceu:${endgameSlashBlades.moonlight.modelTex}.png`)
            .build(),
        SBPropertiesDefinition.newInstance()
            .maxDamage(60)
            .baseAttackModifier(256)
            .slashArtsType('slashblade:drive_horizontal')
            .addSpecialEffect('slashblade_addon:mana_repair')
            .defaultSwordType([SBSwordType.BEWITCHED])
            .build(),
        [
            SBEnchantmentDefinition.of('minecraft:sharpness', 5),
            SBEnchantmentDefinition.of('minecraft:looting', 3),
            SBEnchantmentDefinition.of('minecraft:unbreaking', 3),
            SBEnchantmentDefinition.of('minecraft:mending', 1),
            SBEnchantmentDefinition.of('enderio:xp_boost', 3),
            SBEnchantmentDefinition.of('enderio:soulbound', 1)
        ]
    );
    event.addJson(`slashblade_fgtceu:slashblade/named_blades/${endgameSlashBlades.yuzukitukumoEx.bladeid}.json`,
        SBSlashBladeDefinition.toJSON(yuzukitukumoEx));
    event.addJson(`slashblade_fgtceu:slashblade/named_blades/${endgameSlashBlades.moonlight.bladeid}.json`,
        SBSlashBladeDefinition.toJSON(moonlight));
});

// Define Avaritia Singularity
AvaritiaEvents.singularity(event => {
    // Proudsoul Trapezohedron
    event.register('avaritia:proudsoul', s => {
        s.setDisplayName('singularity.avaritia.proudsoul')
            .setColors(0xFF00FA,0x0087FF)
            .setCount(10000)
            .setTimeCost(600)
            .setIngredient(Ingredient.of('slashblade:proudsoul_trapezohedron'))
            .setEnabled(true)
            .setRecipeEnabled(true);
    });
});

// Add Recipes
ServerEvents.recipes(event => {
    const Mods = {
        AVARITIA: event.recipes.avaritia,
        SLASHBLADE: event.recipes.slashblade
    };
    Mods.AVARITIA.compressor('slashblade:proudsoul_trapezohedron', Item.of('avaritia:singularity', '{Id:"avaritia:proudsoul"}'))
        .timeCost(600)
        .inputCount(10000);
    Mods.SLASHBLADE.slashblade_shaped_recipe('slashblade:slashblade', [
        'ACA',
        'BDB',
        'ESE'
    ], {
        S: SlashBladeIngredient.of(SlashBladeRequestDefinition.name('slashblade_addon:yukari')
            .killCount(1600)
            .proudSoul(250000)
            .refineCount(10)
            .addEnchantment(SBEnchantmentDefinition.of('enderio:soulbound', 1))
            .build()
        ),
        A: 'kubejs:blue_feather',
        B: '#forge:dense_plates/arrokothium',
        C: '#forge:dense_plates/awakened_abysslinker_mithril',
        D: '#forge:plates/ascendium',
        E: 'slashblade:proudsoul_trapezohedron'
    }, `slashblade_fgtceu:${endgameSlashBlades.yuzukitukumoEx.bladeid}`);
    Mods.SLASHBLADE.slashblade_shaped_recipe('slashblade:slashblade', [
        'ACA',
        'BDB',
        'ESE'
    ], {
        S: SlashBladeIngredient.of(SlashBladeRequestDefinition.name('slashblade_addon:terra_blade')
            .killCount(1000)
            .proudSoul(4900)
            .refineCount(3)
            .build()
        ),
        A: 'kubejs:blue_feather',
        B: 'kubejs:sephirot_sap',
        C: '#forge:dense_plates/high_mithrite',
        D: '#forge:plates/ascendium',
        E: 'slashblade:proudsoul_trapezohedron'
    }, `slashblade_fgtceu:${endgameSlashBlades.moonlight.bladeid}`);
});
