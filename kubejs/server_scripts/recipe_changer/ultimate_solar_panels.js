// requires: gtceu
// requires: ultimatesolarpanels
ServerEvents.recipes(event => {
  const { compressor: Compressor, alloy_smelter: AlloySmelter } = event.recipes.gtceu;
  // USPイリジウムのレシピを削除
  event.remove({ output: 'ultimatesolarpanels:iridium' });
  // 代わりにUSPイリジウム鉱石からイリジウム化合物を作成
  event.blasting('gtceu:tiny_iridium_metal_residue_dust', 'ultimatesolarpanels:iridium_ore');
  event.smelting('gtceu:tiny_iridium_metal_residue_dust', 'ultimatesolarpanels:iridium_ore');
  // ソーラーパネルのレシピを調整
  event.replaceInput(
    { input: 'ultimatesolarpanels:iridium' },
    'ultimatesolarpanels:iridium', '#forge:plates/iridium'
  );
  // シリコンも以下同文
  event.replaceInput(
    { input: 'ultimatesolarpanels:silicon' },
    'ultimatesolarpanels:silicon', '#forge:plates/silicon'
  );
  // サナリウムのレシピを追加
  Compressor('tiny_sunnarium_to_sunnarium')
    .itemInputs('ultimatesolarpanels:pile_of_sunnarium')
    .itemOutputs('ultimatesolarpanels:sunnarium')
    .duration(600)
    .EUt(GTValues.VHA[GTValues.MV]);
  // 強化鉄のレシピを追加(緩和レシピ)
  AlloySmelter('easier_reinforced_iron_from_dusts')
    .itemInputs('#forge:dusts/iron', '#forge:dusts/obsidian')
    .itemOutputs('ultimatesolarpanels:reinforced_iron_ingot')
    .duration(600)
    .EUt(GTValues.VA[GTValues.ULV]);
  AlloySmelter('easier_reinforced_iron_from_ingots')
    .itemInputs('#forge:ingots/iron', '#forge:obsidian')
    .itemOutputs('ultimatesolarpanels:reinforced_iron_ingot')
    .duration(600)
    .EUt(GTValues.VA[GTValues.ULV]);
  AlloySmelter('easier_reinforced_iron_from_mix_0')
    .itemInputs('#forge:dusts/iron', '#forge:obsidian')
    .itemOutputs('ultimatesolarpanels:reinforced_iron_ingot')
    .duration(600)
    .EUt(GTValues.VA[GTValues.ULV]);
  AlloySmelter('easier_reinforced_iron_from_mix_1')
    .itemInputs('#forge:ingots/iron', '#forge:dusts/obsidian')
    .itemOutputs('ultimatesolarpanels:reinforced_iron_ingot')
    .duration(600)
    .EUt(GTValues.VA[GTValues.ULV]);
});
