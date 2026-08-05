/**
 * Post UV Tier Recipes
 */
const PostUVTier = {
    UEV: 0,
    UIV: 1,
    UXV: 2,
    OpV: 3,
    MAX: 4
};
const PostUVTierStr = ['uev', 'uiv', 'uxv', 'opv', 'max'];
const WireCableRank = {
    Single: 0,
    Double: 1,
    Quad: 2,
    Octal: 3,
    Hex: 4
};
const MachineComponents = {
    Motor: (tierStr) => { return `gtceu:${tierStr}_electric_motor`; },
    Pump: (tierStr) => { return `gtceu:${tierStr}_electric_pump`; },
    Regulator: (tierStr) => { return `gtceu:${tierStr}_fluid_regulator`; },
    Conveyor: (tierStr) => { return `gtceu:${tierStr}_conveyor_module`; },
    Piston: (tierStr) => { return `gtceu:${tierStr}_electric_piston`; },
    RobotArm: (tierStr) => { return `gtceu:${tierStr}_robot_arm`; },
    FieldGenerator: (tierStr) => { return `gtceu:${tierStr}_field_generator`; },
    Emitter: (tierStr) => { return `gtceu:${tierStr}_emitter`; },
    Sensor: (tierStr) => { return `gtceu:${tierStr}_sensor`; }
};
const UHVComponents = {
    Motor: MachineComponents.Motor('uhv'),
    Pump: MachineComponents.Pump('uhv'),
    Regulator: MachineComponents.Regulator('uhv'),
    Conveyor: MachineComponents.Conveyor('uhv'),
    Piston: MachineComponents.Piston('uhv'),
    RobotArm: MachineComponents.RobotArm('uhv'),
    FieldGenerator: MachineComponents.FieldGenerator('uhv'),
    Emitter: MachineComponents.Emitter('uhv'),
    Sensor: MachineComponents.Sensor('uhv')
};
const FGTComponents = {
    PBIZ: 'polybenzimidazole',
    Cable: ['single_cable', 'double_cable', 'quadruple_cable', 'octal_cable', 'hex_cable' ],
    Wire: ['single_wire', 'double_wire', 'quadruple_wire', 'octal_wire', 'hex_wire'],
    Material: [
        'abysslinker_mithril',
        'durium',
        'high_mithrite',
        'ascendium',
        'arrokothium'
    ],
    Circuits: (tier) => { return `#forge:circuits/${PostUVTierStr[tier]}`; },
    Motor: (tier) => { return MachineComponents.Motor(PostUVTierStr[tier]); },
    Regulator: (tier) => { return MachineComponents.Regulator(PostUVTierStr[tier]); },
    Conveyor: (tier) => { return MachineComponents.Conveyor(PostUVTierStr[tier]); },
    Piston: (tier) => { return MachineComponents.Piston(PostUVTierStr[tier]); },
    RobotArm: (tier) => { return MachineComponents.RobotArm(PostUVTierStr[tier]); },
    FieldGenerator: (tier) => { return MachineComponents.FieldGenerator(PostUVTierStr[tier]); },
    Emitter: (tier) => { return MachineComponents.Emitter(PostUVTierStr[tier]); },
    Sensor: (tier) => { return MachineComponents.Sensor(PostUVTierStr[tier]); },
    CasingMaterial: [
        'mithrite',
        'high_mithrite',
        'high_durium',
        'awakened_abysslinker_mithril',
        'arrokothium'
    ],
    CasingResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_machine_casing`; },
    HullResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_machine_hull`; },
    FurnaceResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_electric_furnace`; },
    AlloySmelterResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_alloy_smelter`; },
    ArcFurnaceResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_arc_furnace`; },
    AssemblerResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_assembler`; },
    AutoclaveResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_autoclave`; },
    BenderResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_bender`; },
    BreweryResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_brewery`; },
    CannerResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_canner`; },
    CentrifugeResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_centrifuge`; },
    ChemicalBathResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_chemical_bath`; },
    ChemicalReactorResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_chemical_reactor`; },
    CompressorResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_compressor`; },
    CutterResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_cutter`; },
    DistilleryResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_distillery`; },
    ElectrolyzerResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_electrolyzer`; },
    ElectromagneticResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_electromagnetic_separator`; },
    ExtractorResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_extractor`; },
    ExtruderResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_extruder`; },
    FermenterResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_fermenter`; },
    FluidHeaterResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_fluid_heater`; },
    FluidSolidifierResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_fluid_solidifier`; },
    ForgeHammerResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_forge_hammer`; },
    FormingPressResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_forming_press`; },
    LatheResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_lathe`; },
    ScannerResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_scanner`; },
    MixerResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_mixer`; },
    OreWasherResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_ore_washer`; },
    PackerResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_packer`; },
    PolarizerResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_polarizer`; },
    LaserEngraverResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_laser_engraver`; },
    SifterResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_sifter`; },
    ThermalCentrifugeResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_thermal_centrifuge`; },
    WiremillResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_wiremill`; },
    CircuitAssemblerResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_circuit_assembler`; },
    MaceratorResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_macerator`; },
    GasCollectorResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_gas_collector`; },
    RockCrusherResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_rock_crusher`; },
    Transformer1AResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_transformer_1a`; },
    Transformer2AResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_transformer_2a`; },
    Transformer4AResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_transformer_4a`; },
    Transformer16AResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_transformer_16a`; },
    EnergyConverter1AResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_1a_energy_converter`; },
    EnergyConverter4AResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_4a_energy_converter`; },
    EnergyConverter8AResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_8a_energy_converter`; },
    EnergyConverter16AResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_16a_energy_converter`; },
    EnergyConverter64AResult: (tier) => { return `gtmutils:${PostUVTierStr[tier]}_64a_energy_converter`; },
    BatteryBuffer4AResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_battery_buffer_4x`; },
    BatteryBuffer8AResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_battery_buffer_8x`; },
    BatteryBuffer16AResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_battery_buffer_16x`; },
    ChargerResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_charger_4x`; },
    QChestResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_quantum_chest`; },
    QTankResult: (tier) => { return `gtceu:${PostUVTierStr[tier]}_quantum_tank`; },
};

/**
 * Provides Tiers/Rank based Cables
 * @param {Number} tier voltage tier
 * @param {Number} rank compress rank
 * @returns formed string
 */
let provideCable = (tier, rank) => {
    if (tier >= 3) return `gtceu:${FGTComponents.Material[tier]}_${FGTComponents.Wire[rank]}`;
    else return `gtceu:${FGTComponents.Material[tier]}_${FGTComponents.Cable[rank]}`;
};
/**
 * Provides Red Alloy Cable
 * @param {Number} rank compress rank
 * @returns formed string
 */
let provideRedAlloyCable = (rank) => {
    return `gtceu:red_alloy_${FGTComponents.Cable[rank]}`;
};
/**
 * Provides Tiers based Plates
 * @param {Number} tier voltage tier
 * @returns 
 */
let providePlate = (tier) => {
    return `gtceu:${FGTComponents.CasingMaterial[tier]}_plate`;
};
/**
 * @param {String} fluid 
 * @param {Number} amount 
 * @returns formed string
 */
let provideFluid = (fluid, amount) => {
    return `gtceu:${fluid} ${amount}`;
};

ServerEvents.recipes(event => {
    const GT = event.recipes.gtceu;
    /**
     * Generates Machine Casing Recipes
     * @param {Number} tier 
     */
    const generateCasingRecipes = (tier) => {
        const result = FGTComponents.CasingResult(tier);
        event.shaped(result,
            ['AAA',
             'ABA',
             'AAA'],
            {
                A: providePlate(tier),
                B: '#forge:tools/wrenches'
            });
        GT.assembler(`${PostUVTierStr[tier]}_machine_casing`)
            .itemInputs(`8x ${providePlate(tier)}`)
            .circuit(8)
            .itemOutputs(result)
            .duration(50)
            .EUt(GTValues.VH[GTValues.LV]);
    };
    /**
     * Generate Hull Recipes
     * @param {Number} tier 
     */
    const generateHullRecipes = (tier) => {
        const result = FGTComponents.HullResult(tier);
        event.remove({ output: result });
        event.shaped(result,
            ['ABA',
             'CDC',
             '   '],
            {
                A: `gtceu:${FGTComponents.PBIZ}_plate`,
                B: providePlate(tier),
                C: provideCable(tier, WireCableRank.Single),
                D: FGTComponents.CasingResult(tier)
            });
        GT.assembler(`${PostUVTierStr[tier]}_machine_hull`)
            .itemInputs(FGTComponents.CasingResult(tier), `2x ${provideCable(tier, WireCableRank.Single)}`)
            .inputFluids(provideFluid(FGTComponents.PBIZ, 288))
            .itemOutputs(result)
            .duration(50)
            .EUt(GTValues.VH[GTValues.LV]);
    };
    /**
     * Generate Furnace Recipes
     * @param {Number} tier 
     */
    const generateFurnaceRecipes = (tier) => {
        const result = FGTComponents.FurnaceResult(tier);
        event.remove({ output: result });
        event.shaped(result,
            ['ABA',
             'BCB',
             'DBD'],
            {
                A: FGTComponents.Circuits(tier),
                B: `gtceu:high_mithrite_${FGTComponents.Wire[WireCableRank.Double]}`,
                C: FGTComponents.HullResult(tier),
                D: provideCable(tier, WireCableRank.Single)
            });
    };
    /**
     * Generate Alloy Smelter Recipes
     * @param {Number} tier 
     */
    const generateAlloySmelterRecipes = (tier) => {
        const result = FGTComponents.AlloySmelterResult(tier);
        event.remove({ output: result });
        event.shaped(result,
            ['ABA',
             'BCB',
             'DBD'],
            {
                A: FGTComponents.Circuits(tier),
                B: `gtceu:high_mithrite_${FGTComponents.Wire[WireCableRank.Quad]}`,
                C: FGTComponents.HullResult(tier),
                D: provideCable(tier, WireCableRank.Single)
            });
    };
    const generateArcFurnaceRecipes = (tier) => {
        const result = FGTComponents.ArcFurnaceResult(tier);
        event.remove({ output: result });
        event.shaped(result,
            ['ABA',
             'BCB',
             'DDD'],
            {
                A: provideCable(tier, WireCableRank.Quad),
                B: '#forge:dusts/graphite',
                C: FGTComponents.Circuits(tier),
                D: providePlate(tier)
            });
    };
    const generateAssemblerRecipes = (tier) => {
        const result = FGTComponents.AssemblerResult(tier);
        event.remove({ output: result });
    };
    /**
     * Generate All Content Recipes
     * @param {Number} tier 
     */
    const generateRecipes = (tier) => {
        generateCasingRecipes(tier);
        generateHullRecipes(tier);
        generateFurnaceRecipes(tier);
        generateAlloySmelterRecipes(tier);
        generateArcFurnaceRecipes(tier);
        generateAssemblerRecipes(tier);
    };
    // UHV Tier
    {
        const CWUtValue = 64;
        const EuropiumCable = ``;
        GT.assembly_line('uhv_motor')
            .itemInputs('gtceu:long_magnetic_samarium_rod','4x gtceu:long_neutronium_rod','4x gtceu:tritanium_ring','8x gtceu:tritanium_round',
                '64x gtceu:fine_europium_wire', '64x gtceu:fine_europium_wire', `2x ${EuropiumCable}`)
            .inputFluids(provideFluid('gtceu:soldering_alloy', 576), provideFluid('gtceu:lubricant', 1000), provideFluid('gtceu:abyssal', 576))
            .itemOutputs(UHVComponents.Motor)
            .duration(600).EUt(GTValues.VA[GTValues.UV])
            .stationResearch(calc => calc.researchStack(MachineComponents.Motor('uv')).EUt(GTValues.VA[GTValues.UV]).CWUt(CWUtValue));
        GT.assembly_line('uhv_pump')
            .itemInputs(UHVComponents.Motor,'gtceu:naquadah_large_fluid_pipe','2x gtceu:neutronium_plate','8x gtceu:neutronium_screw',
                '16x gtceu:silicone_rubber_ring', 'gtceu:mithrite_rotor', `2x ${EuropiumCable}`)
            .inputFluids(provideFluid('gtceu:soldering_alloy', 576), provideFluid('gtceu:lubricant', 1000), provideFluid('gtceu:abyssal', 576))
            .itemOutputs(UHVComponents.Pump)
            .duration(600).EUt(GTValues.VA[GTValues.UV])
            .stationResearch(calc => calc.researchStack(MachineComponents.Pump('uv')).EUt(GTValues.VA[GTValues.UV]).CWUt(CWUtValue));
        GT.assembler('uhv_regulator')
            .itemInputs(UHVComponents.Pump, '2x #forge:circuits/uhv')
            .circuit(1)
            .itemOutputs(UHVComponents.Regulator)
            .duration(50)
            .EUt(GTValues.VA[GTValues.UHV]);
        GT.assembly_line('uhv_conveyor')
            .itemInputs(UHVComponents.Pump, '2x gtceu:neutronium_plate', '4x gtceu:tritanium_ring', '16x gtceu:tritanium_round',
                '4x gtceu:neutronium_screw', `2x ${EuropiumCable}`)
            .inputFluids(provideFluid('gtceu:soldering_alloy', 576), provideFluid('gtceu:lubricant', 1000),
                provideFluid('gtceu:styrene_butadiene_rubber', 3456), provideFluid('gtceu:abyssal', 576))
            .itemOutputs(UHVComponents.Conveyor)
            .duration(600).EUt(GTValues.VA[GTValues.UV])
            .stationResearch(calc => calc.researchStack(MachineComponents.Conveyor('uv')).EUt(GTValues.VA[GTValues.UV]).CWUt(CWUtValue));
        GT.assembly_line('uhv_piston')
            .itemInputs(UHVComponents.Motor, '4x gtceu:neutronium_plate', '4x gtceu:tritanium_ring', '16x gtceu:tritanium_ring',
                '4x gtceu:neutronium_rod', 'gtceu:mithrite_gear', '2x gtceu:small_tritanium_gear', `2x ${EuropiumCable}`)
            .inputFluids(provideFluid('gtceu:soldering_alloy', 576), provideFluid('gtceu:lubricant', 1000), provideFluid('gtceu:abyssal', 576))
            .itemOutputs(UHVComponents.Piston)
            .duration(600).EUt(GTValues.VA[GTValues.UV])
            .stationResearch(calc => calc.researchStack(MachineComponents.Piston('uv')).EUt(GTValues.VA[GTValues.UV]).CWUt(CWUtValue));
        GT.assembly_line('uhv_robot_arm')
            .itemInputs('4x gtceu:long_neutronium_rod', 'gtceu:neutronium_gear', '3x gtceu:small_tritanium_gear', `2x ${UHVComponents.Motor}`,
                UHVComponents.Piston, '#forge:circuits/uhv', '#forge:circuits/uv', '#forge:circuits/zpm', `4x ${EuropiumCable}`)
            .inputFluids(provideFluid('gtceu:soldering_alloy', 1728), provideFluid('gtceu:lubricant', 1000), provideFluid('gtceu:abyssal', 576))
            .itemOutputs(UHVComponents.RobotArm)
            .duration(600).EUt(GTValues.VA[GTValues.UV])
            .stationResearch(calc => calc.researchStack(MachineComponents.RobotArm('uv')).EUt(GTValues.VA[GTValues.UV]).CWUt(CWUtValue));
        GT.assembly_line('uhv_field_gen')
        GT.assembly_line('uhv_emitter')
        GT.assembly_line('uhv_sensor')
    }
    // UEV Tier
    generateRecipes(PostUVTier.UEV);
});
