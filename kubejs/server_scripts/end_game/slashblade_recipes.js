
ServerEvents.recipes(event => {
  // Endgame Contents
  const endgameSlashBlades = {
    yuzukitukumoEx: { bladeid: 'yuzukitukumo_ex', modelTex: 'model/named/exeyuzu' },
    moonlight: { bladeid: 'moonlight_slashblade', modelTex: 'model/named/exemoon' }
  };

  // Yuzuki
  event.recipes.slashblade.slashblade_shaped_recipe("slashblade:slashblade", [
    'ACA',
    'BDB',
    'ESE'
  ], {
    S: SlashBladeIngredient.of(SlashBladeRequestDefinition.newInstance().name('slashblade_addon:yukari')
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

  // Moonlight
  event.recipes.slashblade.slashblade_shaped_recipe('slashblade:slashblade', [
    'ACA',
    'BDB',
    'ESE'
  ], {
    S: SlashBladeIngredient.of(SlashBladeRequestDefinition.newInstance().name('slashblade_addon:terra_blade')
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
