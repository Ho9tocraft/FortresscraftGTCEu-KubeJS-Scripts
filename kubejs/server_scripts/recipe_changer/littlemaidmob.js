/**
 * メイドさん魔改造
 */
ServerEvents.recipes(event => {
  const { assembly_line: AssemblyLine, assembler: Assembler } = event.recipes.gtceu;
  const LMMSalary = 'littlemaidrebirth:salary_box';
  const MaidSpawnEgg = 'littlemaidrebirth:little_maid_spawn_egg';

  event.remove({ output: LMMSalary });
  event.remove({ output: MaidSpawnEgg });
  event.shaped('littlemaidrebirth:salary_box', [
    'AAA',
    'ABA',
    'AAA'
  ], {
    A: '#forge:sugar',
    B: 'gtceu:uv_quantum_chest'
  });

  Assembler('append_duplicate_maid')
    .itemInputs(Item.of('easy_villagers:villager', '{villager:{Age:-24000}}').weakNBT())
    .notConsumable(MaidSpawnEgg)
    .itemOutputs(MaidSpawnEgg)
    .duration(72000)
    .EUt(GTValues.VA[GTValues.UV]);
});
