/**
 * メイドさん魔改造
 */
ServerEvents.recipes(event => {
    const GT = event.recipes.gtceu;
    event.remove({ output: 'littlemaidrebirth:salary_box' });
    event.shaped('littlemaidrebirth:salary_box', [
        'AAA',
        'ABA',
        'AAA'
    ], {
        A: '#forge:sugar',
        B: 'gtceu:uv_quantum_chest'
    });
    event.remove({ output: 'littlemaidrebirth:little_maid_spawn_egg' });
    GT.assembly_line('replace_lmm_spawn_egg')
        .itemInputs('64x #gtceu:circuits/uhv', '64x #gtceu:circuits/uhv', '64x #gtceu:circuits/uhv', '64x #gtceu:circuits/uhv',
            '64x gtceu:stem_cells', '64x botania:gaia_ingot', '64x slashblade:proudsoul_trapezohedron', 'projectexpansion:infinite_steak',
            '64x #forge:dusts/sugar', '64x #forge:circuits/absolute', '64x torcherino:double_compressed_torcherino', 
            'pamhc2foodcore:chocolatecakeitem', 'kubejs:divine_light_crystal', 'kubejs:eternal_darkness_crystal',
            '2x gtceu:uv_robot_arm', 'projecte:life_stone')
        .inputFluids('#forge:mutagen 4000', 'gtceu:uu_matter 1000', '#forge:sterilized_growth_medium 16000', 'kubejs:coolant 1000')
        .itemOutputs('littlemaidrebirth:little_maid_spawn_egg')
        .duration(432000)
        .EUt(GTValues.VA[GTValues.UV])
        .stationResearch(b => b.researchStack('littlemaidrebirth:salary_box').EUt(GTValues.VHA[GTValues.UV]).CWUt(1536));
});
