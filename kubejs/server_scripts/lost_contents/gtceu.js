/**
 * Additional Recipe for GTCEU Modern
 */
ServerEvents.recipes(event => {
  const GT = event.recipes.gtceu;
  // 工業用蒸気マシンケーシング
  event.shaped('2x gtceu:industrial_steam_casing', [
    'ABA',
    'ACA',
    'ADA'
  ], {
    A: '#forge:plates/brass',
    B: '#gtceu:tools/crafting_hammers',
    C: 'gtceu:steam_machine_casing',
    D: '#forge:tools/wrenches'
  });
  GT.assembler('addition_industrial_steam_casing')
    .itemInputs('6x #forge:plates/brass', 'gtceu:steam_machine_casing')
    .circuit(6)
    .itemOutputs('2x gtceu:industrial_steam_casing')
    .duration(50)
    .EUt(GTValues.VH[GTValues.LV]);
});
