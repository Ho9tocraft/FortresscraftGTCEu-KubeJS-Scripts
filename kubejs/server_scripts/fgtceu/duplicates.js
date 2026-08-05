
ServerEvents.recipes(event => {
    const { large_chemical_reactor: LCR, mixer: Mixer } = event.recipes.gtceu;
    const cancelingReleaseMaterials = (id) => {
        return id === 'gtceu:lithium_dust' || id === 'gtceu:antimony_dust'
    };
    const dupMaterials = [
        { id: 'gtceu:antimony_dust', amp: 4 },
        { id: 'gtceu:awakened_abysslinker_mithril_dust', amp: 16 },
        { id: 'gtceu:durium_dust', amp: 4 },
        { id: 'gtceu:enriched_naquadah_dust', amp: 8 },
        { id: 'gtceu:gallium_dust', amp: 2 },
        { id: 'gtceu:lithium_dust', amp: 2 },
    ];
    const dupIngredients = {
        Deepslate: 'gtceu:deepslate_dust',
        HeliumPlasma: 'gtceu:helium_plasma',
        Matter: 'gtceu:uu_matter',
        Mana: 'gtceu:mana'
    };

    // [大型化学反応炉] 素材+深層岩粉x(4 * amp) + マター (4000 * (amp * 0.75))mB
    //  + 原初のマナ (32000 * (amp + 4))mB → 素材x(128 / amp) + 黒色灰x(amp)
    // [ミキサー] 素材x(16 / amp) + 原初のマナ (64000 * amp)mB + ヘリウムプラズマ 125000mB
    //  → マター (4000 * amp)mB + 灰x9 (確率)
    dupMaterials.forEach(mat => {
        const { id: ID, amp: Amp } = mat;
        LCR(`duplicating_${ID}`)
            .itemInputs(ID, `${4 * Amp}x ${dupIngredients.Deepslate}`)
            .inputFluids(`${dupIngredients.Matter} ${4000 * (Amp * 0.75)}`,
                `${dupIngredients.Mana} ${32000 * Amp}`)
            .itemOutputs(`${128 / Amp}x ${ID}`, `${Amp}x gtceu:dark_ash_dust`)
            .duration(200)
            .EUt(GTValues.VA[GTValues.ZPM]);
        if (cancelingReleaseMaterials(ID)) return;
        Mixer(`releasing_${ID}_to_matter`)
            .itemInputs(`${16 / Amp}x ${ID}`)
            .inputFluids(`${dupIngredients.Mana} ${64000 * Amp}`,
                `${dupIngredients.HeliumPlasma} 125000`)
            .chancedOutput('9x gtceu:ash_dust', 500 * (16 / (Amp / 2)), 50 * (Amp / 2))
            .outputFluids(`${dupIngredients.Matter} ${4000 * Amp}`)
            .duration(2400)
            .EUt(GTValues.VA[GTValues.UHV]);
    });
});
