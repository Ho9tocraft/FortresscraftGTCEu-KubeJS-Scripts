// priority: 10

// Material Registry
GTCEuStartupEvents.registry('gtceu:material', event => {
    // Superheated Steam (過熱蒸気)
    event.create('superheated_steam')
        .gas(600).color(0xE6E6E6);
    // Dimethyl Ether (ジメチルエーテル) ※GTCA互換のため、IDだけ"dymethyl_ether"
    event.create('dymethyl_ether')
        .gas().color(0xFFE6FF);
    // Zurvanised Oil of Mirbane (鬼神のミルバン油) ※IDは"zurvanised_nitrobenzene"である
    event.create('zurvanised_nitrobenzene')
        .fluid().color(0xA22041);
});
