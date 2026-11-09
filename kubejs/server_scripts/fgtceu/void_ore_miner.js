//requires: gtceu
ServerEvents.recipes(event => {
  const { BIReg } = global.loadingClasses;
  const { void_ore_miner: VoidOreMiner, assembler: Assembler } = event.recipes.gtceu;

  /* ---- 虚空採掘機本体のレシピ ---- */
  Assembler('recipe_void_ore_miner')
    .itemInputs('4x #forge:plates/steel', '2x #gtceu:circuits/lv', '2x #forge:gears/steel', '1x gtceu:lv_machine_hull',
      '4x gtceu:tin_quadruple_cable', '2x gtceu:lv_electric_motor', '2x gtceu:lv_electric_pump', '1x gtceu:steel_drill_head')
    .itemOutputs('gtceu:void_ore_miner')
    .duration(2400)
    .EUt(GTValues.VHA[GTValues.LV]);

  /* ---- 鉱石獲得レシピ ---- */
  let materials = 0;
  let skipped = 0;
  let registered = 0;
  const SeenRecipes = new Map();

  const variants = [
    { circuit: 1, variant: TagPrefix.rawOre },
    { circuit: 2, variant: TagPrefix.ore },
    { circuit: 3, variant: TagPrefix.oreBasalt },
    { circuit: 4, variant: TagPrefix.oreNetherrack },
    { circuit: 5, variant: TagPrefix.oreEndstone },
    { circuit: 6, variant: TagPrefix.oreBlackstone },
    { circuit: 7, variant: TagPrefix.oreDeepslate },
    { circuit: 8, variant: TagPrefix.oreMarble },
    { circuit: 9, variant: TagPrefix.oreRedGranite },
  ];

  const disableMaterials = /(?:osmium|zinc|mithril|uranium)/;

  GTMaterialRegistry.getRegisteredMaterials().forEach(material => {
    const dust = ChemicalHelper.get(TagPrefix.dust, material, 1);
    const raw = ChemicalHelper.get(TagPrefix.rawOre, material, 1);

    if (dust == null || dust.isEmpty() || raw == null || raw.isEmpty()) return;

    const dustId = String(BIReg.ITEM.getKey(dust.getItem()));
    if (disableMaterials.test(dustId)) return;
    materials++;

    variants.forEach((variant, idx) => {
      const { circuit, variant: prefix } = variant;
      if (prefix == null) return;

      const output = ChemicalHelper.get(prefix, material, 64);

      if (output == null || output.isEmpty()) return;

      const outputId = String(BIReg.ITEM.getKey(output.getItem()));
      const recipeId = `vminer_${outputId.replace(':', '_')}`;

      const seenKey = `${dustId}_${outputId}`;
      if (SeenRecipes.has(seenKey)) {
        console.info(`[VOID ORE MINER] Skipping duplicate recipe for: ${seenKey}`);
        skipped++;
        return;
      }
      SeenRecipes.set(seenKey, true);

      VoidOreMiner(recipeId)
        .itemInputs(dustId)
        .circuit(circuit)
        .itemOutputs(`64x ${outputId}`, `64x ${outputId}`, `64x ${outputId}`, `64x ${outputId}`)
        .duration(200)
        .EUt(GTValues.VHA[GTValues.LV]);
      
      registered++;
    });
  });

  console.info(`[VOID ORE MINER] Materials: ${materials}, Registered: ${registered} / Valid Value: ${(registered + skipped) / materials / 9}`);
});
