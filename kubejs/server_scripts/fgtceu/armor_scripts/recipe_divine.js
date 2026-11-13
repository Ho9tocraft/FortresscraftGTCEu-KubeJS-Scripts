// requires: botania

// Divine (魂振) Attire Recipes
ServerEvents.recipes(event => {
  const { shaped, recipes } = event;
  const { forge_hammer: ForgeHammer } = recipes.gtceu;

  // 神話の絹糸
  ForgeHammer('silk_of_mythologic')
    .itemInputs('8x botania:manaweave_cloth')
    .itemOutputs('kubejs:silk_of_mythologic')
    .duration(400)
    .EUt(GTValues.VA[GTValues.ULV]);
  
  // 魂振装備 (本体)
  shaped('kubejs:divine_hair_accessory', [
    'sss',
    'sHs'
  ], {
    s: 'kubejs:silk_of_mythologic',
    H: 'botania:manaweave_helmet'
  });
  shaped('kubejs:divine_shirt', [
    'sHs',
    'sss',
    'sss'
  ], {
    s: 'kubejs:silk_of_mythologic',
    H: 'botania:manaweave_chestplate'
  });
  shaped('kubejs:divine_skirt', [
    'sss',
    'sHs',
    's s'
  ], {
    s: 'kubejs:silk_of_mythologic',
    H: 'botania:manaweave_leggings'
  });
  shaped('kubejs:divine_boots', [
    's s',
    'sHs'
  ], {
    s: 'kubejs:silk_of_mythologic',
    H: 'botania:manaweave_boots'
  });
});
