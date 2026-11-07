/**
 * 追加武器 レシピ
 */
ServerEvents.recipes(event => {
  // ブルーフェザー・フォセ
  event.shaped('kubejs:bluefeather_greatsword', [
    'FWF',
    'FWF',
    ' R '
  ], {
    F: 'kubejs:blue_feather',
    R: '#forge:rods/excerial_steel',
    W: '#forge:dense_plates/lunar_adamantium'
  });
  // ノートゥング【絶】
  event.shaped('kubejs:ultimate_nothung_greatsword', [
    'FWF',
    'FWF',
    ' R '
  ], {
    F: '#forge:foils/awakened_abysslinker_mithril',
    W: '#forge:dense_plates/lunar_adamantium',
    R: '#forge:rods/excerial_steel'
  });
});
