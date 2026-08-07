// Abyss Linker Attire Recipes
ServerEvents.recipes(event => {
  const { shaped, recipes } = event;
  const { gtceu: GT } = recipes;
  const { assembler: Ar, assembly_line: AL } = GT;
  // Abyss Linker Magic Circle
  shaped('kubejs:abysslinker_magic_circle', [
    'ABA',
    'CAD',
    'A A'
  ], {
    A: '#forge:foils/abysslinker_mithril',
    B: '#gtceu:tools/crafting_files',
    C: '#gtceu:tools/crafting_mallets',
    D: '#gtceu:tools/crafting_wire_cutters'
  });
  // Abyss Linker Magic Circle (Without Crafting Tools / Using GT Assembler)
  Ar('abysslinker_magic_circle')
    .itemInputs('5x #forge:foils/abysslinker_mithril')
    .circuit(1)
    .inputFluids('#forge:mana 750')
    .itemOutputs('kubejs:abysslinker_magic_circle')
    .duration(1200)
    .EUt(GTValues.VA[GTValues.LuV]);
  // Abyss Linker Head
  AL('abysslinker_head')
    .itemInputs('5x #forge:foils/abysslinker_mithril', '4x #forge:dense_plates/abysslinker_mithril', '5x #forge:dense_plates/high_mithrite',
      '64x #forge:plates/ruby', '64x #forge:plates/sapphire', '64x #forge:plates/topaz', '64x #forge:plates/emerald', '64x #forge:plates/opal',
      'botania:manaweave_helmet', 'botania:mana_ring_greater')
    .inputFluids('#forge:mana 16000', '#forge:durium 41472')
    .itemOutputs('kubejs:abysslinker_head')
    .duration(216000)
    .EUt(GTValues.VA[GTValues.LuV]);
  // Abyss Linker Tunic
  AL('abysslinker_tunic')
    .itemInputs('5x #forge:foils/abysslinker_mithril', '4x #forge:dense_plates/abysslinker_mithril', '5x #forge:dense_plates/high_mithrite',
      '64x #forge:plates/ruby', '64x #forge:plates/sapphire', '64x #forge:plates/topaz', '64x #forge:plates/emerald', '64x #forge:plates/opal',
      'botania:manaweave_chestplate', 'botania:mana_ring_greater')
    .inputFluids('#forge:mana 16000', '#forge:durium 41472')
    .itemOutputs('kubejs:abysslinker_tunic')
    .duration(216000)
    .EUt(GTValues.VA[GTValues.LuV]);
  // Abyss Linker Pants
  AL('abysslinker_pants')
    .itemInputs('5x #forge:foils/abysslinker_mithril', '4x #forge:dense_plates/abysslinker_mithril', '5x #forge:dense_plates/high_mithrite',
      '64x #forge:plates/ruby', '64x #forge:plates/sapphire', '64x #forge:plates/topaz', '64x #forge:plates/emerald', '64x #forge:plates/opal',
      'botania:manaweave_leggings', 'botania:mana_ring_greater')
    .inputFluids('#forge:mana 16000', '#forge:durium 41472')
    .itemOutputs('kubejs:abysslinker_pants')
    .duration(216000)
    .EUt(GTValues.VA[GTValues.LuV]);
  // Abyss LInker Boots
  AL('abysslinker_boots')
    .itemInputs('5x #forge:foils/abysslinker_mithril', '4x #forge:dense_plates/abysslinker_mithril', '5x #forge:dense_plates/high_mithrite',
      '64x #forge:plates/ruby', '64x #forge:plates/sapphire', '64x #forge:plates/topaz', '64x #forge:plates/emerald', '64x #forge:plates/opal',
      'botania:manaweave_boots', 'botania:mana_ring_greater')
    .inputFluids('#forge:mana 16000', '#forge:durium 41472')
    .itemOutputs('kubejs:abysslinker_boots')
    .duration(216000)
    .EUt(GTValues.VA[GTValues.LuV]);
});
