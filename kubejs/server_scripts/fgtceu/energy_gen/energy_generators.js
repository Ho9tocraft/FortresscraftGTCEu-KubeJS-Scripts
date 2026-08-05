// priority: 0

// Energy Generators

ServerEvents.recipes((event) => {
    // Get ALL Queue
    const { recipes } = event;
    const {
        hp_steam_turbine: HPSteamTurbineGenerator,
        gas_turbine: GasTurbineGenerator,
        large_heat_exchanger: LargeHeatExchanger,
        plasma_generator: PlasmaTurbineGenerator,
        steam_turbine: SteamTurbineGenerator,
    } = recipes.gtceu;
    const { V, LV, EV, UV } = GTValues;
    const coolant = {
        ReactorCoolant: 'coolant',
        HDReactorCoolant: 'high_density_coolant',
    };

    // 定義系
    /**
     * MEMO
     * 蒸留水4 = 蒸気640 = 過熱蒸気48
     * また、過熱高密度冷媒1 = 過熱冷媒100, 過熱冷媒1 = 過熱蒸気4800(蒸留水100)
     */
    const FuelConds = {
        steam: {},
        hp_steam: {
            superheated_steam: {
                inFluid: 'gtceu:superheated_steam 48',
                outFluid: 'gtceu:steam 640',
                duration: 25,
                outEUt: EV
            },
        },
        gas: {
            zurvanised_nitrobenzene: {
                inFluid: 'gtceu:zurvanized_nitrobenzene 1',
                duration: 200,
                outEUt: LV
            },
        },
        plasma: {
            ascendium: {
                inFluid: 'gtceu:ascendium_plasma 1',
                outFluid: 'gtceu:ascendium 1',
                duration: 1200,
                outEUt: EV
            },
            excerium: {
                inFluid: 'gtceu:excerium_plasma 1',
                outFluid: 'gtceu:excerium 1',
                duration: 1200,
                outEUt: UV
            },
        },
    };

    // Steam Turbine
    [''].forEach((fuel) => {
        if (!fuel || !(fuel in FuelConds.steam)) return; // 空文字・無要素スキップ
        const { inFluid, outFluid, duration, outEUt } = FuelConds.steam[fuel];
        SteamTurbineGenerator(`generation_grid_${fuel}`)
            .inputFluids(inFluid)
            .outputFluids(outFluid)
            .duration(duration)
            .EUt(-outEUt);
    });
    // High Pressure Steam Turbine
    Object.keys(FuelConds.hp_steam).forEach((fuel) => {
        if (!(fuel || fuel in FuelConds.hp_steam)) return; // 空文字・無要素スキップ
        const { inFluid, outFluid, duration, outEUt } = FuelConds.hp_steam[fuel];
        HPSteamTurbineGenerator(`generation_grid_${fuel}`)
            .inputFluids(inFluid)
            .outputFluids(outFluid)
            .duration(duration)
            .EUt(-outEUt);
    });
    // Gas Turbine
    Object.keys(FuelConds.gas).forEach((fuel) => {
        if (!(fuel || fuel in FuelConds.gas)) return; // 空文字・無要素スキップ
        const { inFluid, duration, outEUt } = FuelConds.gas[fuel];
        GasTurbineGenerator(`generation_grid_${fuel}`)
            .inputFluids(inFluid)
            .duration(duration)
            .EUt(-outEUt);
    });
    // Plasma Turbine & Large Heat Exchanger (Plasma Section)
    [...['helium','oxygen','nitrogen','argon','iron','tin','nickel','americium'], ...Object.keys(FuelConds.plasma)].forEach((fuel) => {
        if (!fuel) return; // 空文字スキップ
        const coolantHeatingValue = 400 * (
            fuel === 'helium' ?     40 :
            fuel === 'oxygen' ?     48 :
            fuel === 'nitrogen' ?   64 :
            fuel === 'argon' ?      96 :
            fuel === 'iron' ?      112 :
            fuel === 'tin' ?       128 :
            fuel === 'nickel' ?    192 :
            fuel === 'americium' ? 320 :
            fuel in FuelConds.plasma ?
                FuelConds.plasma[fuel].duration * (5 + Math.max((FuelConds.plasma[fuel].outEUt - EV), 0)) : 0);
        if (coolantHeatingValue === 0) return; // coolantHeatingValue = 0
        // Large Heat Exchanger (Plasma Section)
        LargeHeatExchanger(`plasma_cooling_${fuel}`)
            .inputFluids(`gtceu:${fuel}_plasma 1000`,`kubejs:${coolant.HDReactorCoolant} ${coolantHeatingValue}`)
            .outputFluids(`gtceu:${fuel} 1000`, `kubejs:hot_${coolant.HDReactorCoolant} ${coolantHeatingValue}`)
            .duration(1); // 1t
        // Plasma Turbine
        if (!(fuel in FuelConds.plasma)) return; // 無要素スキップ
        const { inFluid, outFluid, duration, outEUt } = FuelConds.plasma[fuel];
        PlasmaTurbineGenerator(`generation_grid_${fuel}`)
            .inputFluids(inFluid)
            .outputFluids(outFluid)
            .duration(duration)
            .EUt(-V[outEUt]);
    });
});
