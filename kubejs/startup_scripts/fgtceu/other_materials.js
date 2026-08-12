// requires: gtceu
/* ---- Material Registry ---- */
GTCEuStartupEvents.registry('gtceu:material', event => {
  /* ---- Common ---- */
  // Superheated Steam (過熱蒸気)
  event.create('superheated_steam')
    .gas(600).color(0xE6E6E6);
  // Zurvanised Oil of Mirbane (鬼神のミルバン油) ※IDは"zurvanised_nitrobenzene"である
  event.create('zurvanised_nitrobenzene')
    .fluid().color(0xA22041);
  // Blood-starved Mithril Processing (赫霊銀鉱処理)
  {
    // 赫霊銀泥
    event.create('blood_starved_group_mud')
      .dust().color(0x6C2C2F).secondaryColor(0xE2041B).iconSet('dull');
    // 粗ハイミスライト泥〔I型〕
    event.create('raw_high_mithrite_mud_type_i')
      .dust().color(0x113332).secondaryColor(0x40E0D0).iconSet('dull');
    // 粗ハイミスライト泥〔II型〕
    event.create('raw_high_mithrite_mud_type_ii')
      .dust().color(0x349996).secondaryColor(0x40E0D0).iconSet('fine');
    // 粗アビサル泥
    event.create('raw_abyssal_mud')
      .dust().color(0x330000).secondaryColor(0x8B0000).iconSet('dull');
    // 粗アビスリンカーミスリル鉱滓
    event.create('raw_abysslinker_mithril_slag')
      .dust().color(0x990312).secondaryColor(0xE2041B).iconSet('bright');
    // 赫霊銀スラグ
    event.create('blood_starved_mithril_slag')
      .fluid().color(0x330B0D);
  }
  /* ---- Installing without GT Community Additions ---- */
  if (!global.loadedMods.GT_COMMUNITY_ADDITIONS) {
    // Dimethyl Ether (ジメチルエーテル) ※GTCA互換のため、IDだけ"dymethyl_ether"
    event.create('dymethyl_ether')
      .gas().color(0xFFE6FF);
  }
});
