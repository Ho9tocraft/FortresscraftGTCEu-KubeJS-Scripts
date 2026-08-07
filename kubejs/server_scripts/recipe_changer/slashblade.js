ServerEvents.recipes(event => {
  const { shaped, shapeless } = event;
  // Avaritia(AV)はMystical Agriculture用。GTは刀の魂晶、揺蕩う刀の魂結晶の作成用
  const { avaritia: AV, gtceu: GT } = event.recipes;
  // 最初期から行けるよ！やったね！
  const { primitive_blast_furnace: PBF, electric_blast_furnace: EBF } = GT;
  const { shaped_table: AVSd } = AV;
  const proudsouls = ['slashblade:proudsoul_tiny', 'slashblade:proudsoul', 'slashblade:proudsoul_ingot', 'slashblade:proudsoul_sphere',
    'slashblade:proudsoul_crystal', 'slashblade:proudsoul_trapezohedron'];
  const [psTiny, ps, psIngot, psSphere, psCrystal, psTrapezohedron] = proudsouls;
  const [eProudsouls, eIron, eSteel, eBlaze, eBlitz] = ['mysticalagriculture:proudsoul_essence', 'mysticalagriculture:iron_essence',
    'mysticalagriculture:steel_essence', 'mysticalagriculture:blaze_essence', 'mysticalagriculture:blitz_essence'];
  const [bfAsh, bfDAsh, bfCoke, bfOxygen] = ['gtceu:ash_dust', 'gtceu:dark_ash_dust', '#forge:gems/coke', '#forge:oxygen'];
  proudsouls.forEach((value) => {
    switch (value) {
      // 刀の薄魂片(MA/バニラ作業台)
      case 'slashblade:proudsoul_tiny':
        shapeless(`4x ${value}`, [
          `2x ${eProudsouls}`
        ]);
        break;
      // 刀の魂片(MA/バニラ作業台)
      case 'slashblade:proudsoul':
        shaped(`4x ${value}`, [
          'AAA',
          'A A',
          'AAA'
        ], {
          A: eProudsouls
        });
        break;
      // 刀の魂塊(MA/AvaEX作業台, SB/作業台(Alt))
      case 'slashblade:proudsoul_ingot':
        shapeless(value, [`2x ${psTiny}`, '#forge:ingots/steel']);
        AVSd(4, `12x ${value}`, [
          'AAA   AAA',
          'A A   A A',
          'AAA   AAA',
          '   BBB   ',
          '   B B   ',
          '   BBB   ',
          'AAA   AAA',
          'A A   A A',
          'AAA   AAA'
        ], {
          A: eProudsouls,
          B: eIron
        });
        break;
      // 刀の魂珠(MA/AvaEX作業台(2種))
      case 'slashblade:proudsoul_sphere':
        AVSd(4, `12x ${value}`, [
          'AAA   AAA',
          'A A C A A',
          'AAAC CAAA',
          '  CBBBC  ',
          ' C B B C ',
          '  CBBBC  ',
          'AAAC CAAA',
          'A A C A A',
          'AAA   AAA'
        ], {
          A: eProudsouls,
          B: eIron,
          C: eBlaze
        });
        AVSd(4, `24x ${value}`, [
          'AAA   AAA',
          'A A   A A',
          'AAA   AAA',
          '   BBB   ',
          '   B B   ',
          '   BBB   ',
          'AAA   AAA',
          'A A   A A',
          'AAA   AAA'
        ], {
          A: eProudsouls,
          B: eSteel
        });
        break;
      // 刀の魂晶 (MA/AvaEX作業台(2種), SB/PBF, EBF(Alt))
      case 'slashblade:proudsoul_crystal':
        event.remove({ output: value });
        AVSd(4, `12x ${value}`, [
          'AAA D AAA',
          'A A C A A',
          'AAACDCAAA',
          '  CBBBC  ',
          'DCDB BDCD',
          '  CBBBC  ',
          'AAACDCAAA',
          'A A C A A',
          'AAA D AAA'
        ], {
          A: eProudsouls,
          B: eIron,
          C: eBlaze,
          D: eBlitz
        });
        AVSd(4, `24x ${value}`, [
          'AAA   AAA',
          'A A C A A',
          'AAAC CAAA',
          '  CBBBC  ',
          ' C B B C ',
          '  CBBBC  ',
          'AAAC CAAA',
          'A A C A A',
          'AAA   AAA'
        ], {
          A: eProudsouls,
          B: eSteel,
          C: eBlaze
        });
        PBF(`append_slashblade_${value.split(':')[1]}_pbf`)
          .itemInputs(psSphere, `4x ${bfCoke}`)
          .itemOutputs(psCrystal)
          .chancedOutput(bfAsh, 1111, 0)
          .duration(1200);
        EBF(`append_slashblade_${value.split(':')[1]}_ebf`)
          .itemInputs(`4x ${psSphere}`)
          .inputFluids(`${bfOxygen} 4000`)
          .itemOutputs(`4x ${psCrystal}`)
          .chancedOutput(`4x ${bfDAsh}`, 1000, 500)
          .blastFurnaceTemp(2000)
          .duration(500)
          .EUt(GTValues.VA[GTValues.MV]);
        break;
      // 揺蕩う刀の魂結晶 (刀の魂晶 (MA/AvaEX作業台(2種), SB/PBF, EBF(Alt)))
      case 'slashblade:proudsoul_trapezohedron':
        event.remove({ output: value });
        AVSd(4, `12x ${value}`, [
          'AAA D AAA',
          'ACA C ACA',
          'AAACDCAAA',
          '  CBBBC  ',
          'DCDB BDCD',
          '  CBBBC  ',
          'AAACDCAAA',
          'ACA C ACA',
          'AAA D AAA'
        ], {
          A: eProudsouls,
          B: eIron,
          C: eBlaze,
          D: eBlitz
        });
        AVSd(4, `24x ${value}`, [
          'AAA C AAA',
          'ACA C ACA',
          'AAACCCAAA',
          '  CBBBC  ',
          'CCCB BCCC',
          '  CBBBC  ',
          'AAACCCAAA',
          'ACA C ACA',
          'AAA C AAA'
        ], {
          A: eProudsouls,
          B: eSteel,
          C: eBlaze
        });
        PBF(`append_slashblade_${value.split(':')[1]}_pbf`)
          .itemInputs(psCrystal, `16x ${bfCoke}`)
          .itemOutputs(psTrapezohedron)
          .chancedOutput(bfAsh, 1111, 0)
          .duration(1200);
        EBF(`append_slashblade_${value.split(':')[1]}_ebf`)
          .itemInputs(`4x ${psCrystal}`)
          .inputFluids(`#forge:liquid_oxygen 1000`)
          .itemOutputs(`4x ${psTrapezohedron}`)
          .chancedOutput(`16x ${bfAsh}`, 2000, 1000)
          .blastFurnaceTemp(4000)
          .duration(200)
          .EUt(GTValues.VA[GTValues.HV]);
        break;
    }
  });
});
