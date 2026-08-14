// priority: 999
Platform.setModName('kubejs', 'Fortresscraft GTCEu'); // Mod Name

/**
 * @typedef {{
 *   mode: 'normal'|'extreme'|'savage'|'ultimate',
 *   indebug: boolean,
 *   forced_options: {
 *     _comment_bypass_shishamotech_disabling: string,
 *     bypass_shishamotech_disabling: boolean,
 *     _comment_disable_mbd2_mekanism_multiblock: string,
 *     disable_mbd2_mekanism_multiblock: boolean,
 *     _comment_disable_mbd2_botania_multiblock: string,
 *     disable_mbd2_botania_multiblock: boolean
 *   }
 * }} FGTCEuConfig
 */

/* ---- Mod Integrations ---- */
global.loadedMods = {
  GT_COMMUNITY_ADDITIONS: Platform.isLoaded('gtca'), // GT Community Additions
  SHISHAMO_TECH: Platform.isLoaded('shishamo_tech'), // Shishamo Tech
};

/* ---- Modpack Config ---- */
const configName = 'config/packmode.json';
/**
 * default config
 * @type {FGTCEuConfig}
 */
const defaultConfig = {
  mode: 'normal', // Normal, Extreme(極), Savage(零式), Ultimate(絶)
  indebug: false,
  forced_options: {
    // forced options
    _comment_bypass_shishamotech_disabling: 'Enable Bypassing ST-related disabling. If not Normal or Extreme, this feature is always enable.',
    bypass_shishamotech_disabling: false, // マルチブロック機械(大型・パラレルとMEアクセスハッチ対応のアセンブリラインなど)
    _comment_disable_mbd2_mekanism_multiblock: 'Disable Multiblocked 2 Mekanism Multiblock.',
    disable_mbd2_mekanism_multiblock: false, // Mek用マルチブロック機械(マルチブロック回転式流体凝縮機など)
    _comment_disable_mbd2_botania_multiblock: 'Disable Multiblocked 2 Botania Multiblock.',
    disable_mbd2_botania_multiblock: false, // Botania用マルチブロック機械(マルチブロックマナ生成など)
  }
};

const rawConfig = JsonIO.read(configName);
/**
 * config
 * @type {FGTCEuConfig}
 */
let config = {
  mode: String(rawConfig.get('mode')),
  indebug: Boolean(rawConfig.get('indebug')),
  forced_options: {
    bypass_shishamotech_disabling: Boolean(rawConfig.get('forced_options') ? rawConfig.get('forced_options').get('bypass_shishamotech_disabling') : defaultConfig.forced_options.bypass_shishamotech_disabling),
    disable_mbd2_mekanism_multiblock: Boolean(rawConfig.get('forced_options') ? rawConfig.get('forced_options').get('disable_mbd2_mekanism_multiblock') : defaultConfig.forced_options.disable_mbd2_mekanism_multiblock),
    disable_mbd2_botania_multiblock: Boolean(rawConfig.get('forced_options') ? rawConfig.get('forced_options').get('disable_mbd2_botania_multiblock') : defaultConfig.forced_options._comment_disable_mbd2_botania_multiblock),
  }
};
let initStart = false;
if (!rawConfig) {
  JsonIO.write(configName, defaultConfig);
  console.warn(`Created new ${configName}`);
  config = defaultConfig;
  initStart = true; // バリデーション回避
}

// configバリデーション
if (!initStart) {
  // タイプバリデーション
  console.log('TYPE VALIDATION start.');
  if (typeof config.mode !== 'string' || typeof config.indebug !== 'boolean' ||
    typeof config.forced_options.bypass_shishamotech_disabling !== 'boolean' ||
    typeof config.forced_options.disable_mbd2_mekanism_multiblock !== 'boolean' ||
    typeof config.forced_options.disable_mbd2_botania_multiblock !== 'boolean') {
    // いずれかのタイプバリデーション失敗
    if (typeof config.mode !== 'string') {
      console.error(`SYNTAX ERROR DETECTED: config.mode is not string, found: ${typeof config.mode}`);
      config.mode = defaultConfig.mode;
    }
    if (typeof config.indebug !== 'boolean') {
      console.error(`SYNTAX ERROR DETECTED: config.indebug is not boolean, found: ${typeof config.indebug}`);
      config.indebug = defaultConfig.indebug;
    }
    if (typeof config.forced_options.bypass_shishamotech_disabling !== 'boolean') {
      const erroredSTL = config.forced_options.bypass_shishamotech_disabling;
      console.error(`SYNTAX ERROR DETECTED: config.forced_options.bypass_shishamotech_disabling is not boolean, found: ${typeof erroredSTL}`);
      config.forced_options.bypass_shishamotech_disabling = defaultConfig.forced_options.bypass_shishamotech_disabling;
    }
    if (typeof config.forced_options.disable_mbd2_mekanism_multiblock !== 'boolean') {
      const erroredDMM = config.forced_options.disable_mbd2_mekanism_multiblock;
      console.error(`SYNTAX ERROR DETECTED: config.forced_options.disable_mbd2_mekanism_multiblock is not boolean, found: ${typeof erroredDMM}`);
      config.forced_options.disable_mbd2_mekanism_multiblock = defaultConfig.forced_options.disable_mbd2_mekanism_multiblock;
    }
    if (typeof config.forced_options.disable_mbd2_botania_multiblock !== 'boolean') {
      const erroredDBM = config.forced_options.disable_mbd2_botania_multiblock;
      console.error(`SYNTAX ERROR DETECTED: config.forced_options.disable_mbd2_botania_multiblock is not string, found: ${typeof erroredDBM}`);
      config.forced_options.disable_mbd2_botania_multiblock = defaultConfig.forced_options.disable_mbd2_botania_multiblock;
    }
  }
  else {
    // タイプバリデーション通過、モード指定バリデーション
    console.log('TYPE VALIDATION passed, MODE SELECT VALIDATION start.');
    switch (config.mode) {
      case 'normal':
        break;
      case 'extreme':
      case 'savage':
      case 'ultimate':
        const modeText = `${config.mode.charAt(0).toUpperCase()}${config.mode.slice(1)}`;
        console.warn(`WIP: Fortresscraft GTCEu (${modeText}) is now Work in Progress, fallbacking to Normal.`);
        config.mode = 'normal';
        break;
      default:
        console.error(`SYNTAX ERROR DETECTED: config.mode is invalid, overwrote. Current: ${config.mode}`);
        config.mode = defaultConfig.mode;
        break;
    }
  }
}

// 適用
global.packFeatures = {
  mode: config.mode,
  debug: config.indebug,
  bypassSTDisable: (config.mode === 'normal' || config.mode === 'extreme') ? config.forced_options.bypass_shishamotech_disabling : true,
  disableMBD2Mek: config.forced_options.disable_mbd2_mekanism_multiblock,
  disableMBD2Bot: config.forced_options.disable_mbd2_botania_multiblock,
};
