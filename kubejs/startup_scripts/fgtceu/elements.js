/**
 * Registration of custom chemical elements
 */

/**
 * Defination Stats / 定義リスト
 */
const DEFINATION_STATS = {
    VOLTAGE: {
        ULV:          8,
        LV:          32,
        MV:         128,
        HV:         512,
        EV:        2048,
        IV:        8192,
        LuV:      32768,
        ZPM:     131072,
        UV:      524288,
        UHV:    2097152,
        UEV:    8388608,
        UIV:   33554432,
        UXV:  134217728,
        OpV:  536870912,
        MAX: 2147483648
    },
    COILS: {
        CUPRONICKEL: { TEMP:  1800, LEVEL:  1, DISCOUNT:  1 },
        KANTHAL:     { TEMP:  2700, LEVEL:  2, DISCOUNT:  1 },
        NICHROME:    { TEMP:  3600, LEVEL:  2, DISCOUNT:  2 },
        RTM_ALLOY:   { TEMP:  4500, LEVEL:  4, DISCOUNT:  2 },
        HSS_G:       { TEMP:  5400, LEVEL:  4, DISCOUNT:  4 },
        NAQUADAH:    { TEMP:  7200, LEVEL:  8, DISCOUNT:  4 },
        TRINIUM:     { TEMP:  9001, LEVEL:  8, DISCOUNT:  8 },
        TRITANIUM:   { TEMP: 10800, LEVEL: 16, DISCOUNT:  8 },
    }
};

/**
 * Calcuration Voltage fixed Amperage / 電流によって調整された電圧を計算します
 * @param {Number} voltage Voltage / 電圧
 * @param {Number} amperage Amperage / 電流
 * @returns Result Value / 返り値(四捨五入済み)
 */
let AmperageCalc = (voltage, amperage) => {
    return Math.round(voltage * amperage);
};

// Elements / 元素
// ダリウムの元素記号どうしよう
GTCEuStartupEvents.registry('gtceu:element', event => {
    const { create } = event;
    // Abyssal / アビサル
    event.create('abyssal')
        .protons(1500)
        .neutrons(3250)
        .symbol('Ay');
    // Durium / ダリウム
    event.create('durium')
        .protons(1501)
        .neutrons(3750)
        .symbol('Dw'); // やむを得ずDreamweaverから引用
    // Ascendium / アセンディウム
    event.create('ascendium')
        .protons(3000)
        .neutrons(6000)
        .symbol('Lb');
    // Arrokothium / アロコシウム
    event.create('arrokothium')
        .protons(7500)
        .neutrons(17500)
        .symbol('Ak'); // Arrokoth
    // Excerium / エクセリウム
    event.create('excerium')
        .protons(7850)
        .neutrons(22500)
        .symbol('巫');
    // Primal Mana / 原初のマナ
    event.create('mana')
        .symbol('Ma');
    // 火属性
    event.create('fire_element')
        .symbol('火');
    // 風属性
    event.create('wind_element')
        .symbol('風');
    // 雷属性
    event.create('lightning_element')
        .symbol('雷');
    // 氷属性
    event.create('ice_element')
        .symbol('氷');
    // 水属性
    event.create('water_element')
        .symbol('水');
    // 土属性
    event.create('earth_element')
        .symbol('土');
});

//Material Registry
GTCEuStartupEvents.registry('gtceu:material', event => {
    /**
     * Element-based / 元素
     */
    // Abyssal / アビサル (Ay)
    // こいつのためにThermal Extraのアビサル系はレシピが蒸発することに。
    // UEVの超伝導ワイヤー。
    event.create('abyssal')
        .ingot().fluid()
        .element(GTElements.get('abyssal'))
        .color(0x8B0000).iconSet('dull')
        .blastTemp(4000, 'mid', DEFINATION_STATS.VOLTAGE.LuV, 300)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_DENSE,
            GTMaterialFlags.GENERATE_FRAME, GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.GENERATE_ROTOR)
        .rotorStats(350, 400, 8.0, 32768)
        .cableProperties(DEFINATION_STATS.VOLTAGE.UEV, 128, 0, true);
    // Durium / ダリウム (Dw)
    // FF14から引用。UEV～UIVの回路に湯水のように使う。
    // UIVのワイヤー。
    event.create('durium')
        .ingot().fluid().ore(4, 2, false)
        .element(GTElements.get('durium'))
        .color(0x2E8B57).iconSet('dull')
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_DENSE,
            GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.GENERATE_FINE_WIRE)
        .addOreByproducts(GTMaterials.Andesite, GTMaterials.Beryllium, GTMaterials.Gallium)
        .cableProperties(DEFINATION_STATS.VOLTAGE.UIV, 512, 1024, false);
    // Primal Mana / 原初のマナ
    // Thermalからないなった液体。Botaniaをやれば簡単に入手できるが、面倒くさい人向けの攻略法あり。
    event.create('mana')
        .fluid().element(GTElements.get('mana')).color(0xDDA0DD)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    /**
     * Alloys / 合金
     */
    // Mithril / ミスリル (Tier Kanthal)
    // アビスリンカーミスリルの中間素材。Mystical Agricultureの種を使えば増産可能。
    event.create('mithril')
        .ingot().fluid()
        .color(0xF7BE20).iconSet('dull')
        .blastTemp(2100, null)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR)
        .components('platinum', 'mana');
    // Abysslinker Mithril / アビスリンカーミスリル (Tier HSS-G, but needed neutronium)
    // HSS-Gで作れるが、ニュートロニウムを要求される。
    // UEVのワイヤー。
    event.create('abysslinker_mithril')
        .ingot().fluid()
        .color(0xE2041B).iconSet('bright')
        .blastTemp(DEFINATION_STATS.COILS.HSS_G.TEMP, 'mid', DEFINATION_STATS.VOLTAGE.LuV, 6000)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_DENSE, GTMaterialFlags.GENERATE_RING,
            GTMaterialFlags.GENERATE_FRAME, GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.GENERATE_ROTOR)
        .rotorStats(1000, 500, 10.0, 786432)
        .cableProperties(DEFINATION_STATS.VOLTAGE.UEV, 256, 512, false)
        .components('3x mithril', 'abyssal', '9x neutronium');
    // High Durium / ハイダリウム 
    // (Tier Naquadah, Backward Compatibility with Adamantium(GT Community Addition))
    // GT Community AdditionのAdamantiumの下位互換。元ネタはFF14。
    // UXV～OpVの回路に湯水のように使ううえ、UXVの超伝導ワイヤーになる。
    event.create('high_durium')
        .ingot().fluid()
        .color(0x3CB371).iconSet('dull')
        .blastTemp(DEFINATION_STATS.COILS.NAQUADAH.TEMP, 'mid', AmperageCalc(DEFINATION_STATS.VOLTAGE.ZPM, 0.75), 6000)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_DENSE, GTMaterialFlags.GENERATE_RING,
            GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.GENERATE_FINE_WIRE,
            GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.GENERATE_ROTOR)
        .toolStats(ToolProperty.Builder.of(12.0, 14.0, 8192, 6,
            [
                GTToolType.SWORD, GTToolType.PICKAXE, GTToolType.SHOVEL, GTToolType.AXE, GTToolType.HOE, GTToolType.SAW, GTToolType.HARD_HAMMER,
                GTToolType.WRENCH, GTToolType.FILE, GTToolType.CROWBAR, GTToolType.SCREWDRIVER, GTToolType.WIRE_CUTTER, GTToolType.SCYTHE,
                GTToolType.KNIFE, GTToolType.BUTCHERY_KNIFE, GTToolType.DRILL_LV, GTToolType.DRILL_MV, GTToolType.DRILL_HV, GTToolType.DRILL_EV,
                GTToolType.DRILL_IV, GTToolType.CHAINSAW_LV, GTToolType.WRENCH_LV, GTToolType.WRENCH_HV, GTToolType.WRENCH_IV, 
                GTToolType.BUZZSAW, GTToolType.SCREWDRIVER_LV, GTToolType.WIRE_CUTTER_LV, GTToolType.WIRE_CUTTER_HV, GTToolType.WIRE_CUTTER_IV
            ]
        ).build())
        .rotorStats(500, 300, 8.0, 8192)
        .cableProperties(DEFINATION_STATS.VOLTAGE.UXV, 512, 0, true)
        .components('5x durium', '5x mana', 'silver');
    // Lunar Adamantium / ルナアダマン
    // (Tier Tritanium, Cross-Compatibility with Arrokothium)
    // ローターに関して、アロコシウムとは耐久力以外で上位互換だが、耐久力がかーなーりー低い。
    event.create('lunar_adamantium')
        .ingot().fluid()
        .color(0x674598).iconSet('bright')
        .blastTemp(DEFINATION_STATS.COILS.TRITANIUM.TEMP, 'mid', AmperageCalc(DEFINATION_STATS.VOLTAGE.UV, 0.75), 600)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_DENSE, GTMaterialFlags.GENERATE_FRAME, GTMaterialFlags.GENERATE_RING,
            GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.GENERATE_ROTOR)
        .rotorStats(51200, 1750, 10.0, 9437184)
        .components('4x platinum', '2x iron', '2x mana');
    /**
     * Ores / 鉱石
     */
    // Mithrite / ミスライト
    // (Tier Kanthal, Upward Compatibility with Tungstensteel)
    // タングステンスチールの上位互換。元ネタはFF14。
    // タービンブレードで無為にタングステンスチールを消費したくない人向け。
    // なお、Applied Energisticsのアドオンで死ぬほど使う。
    // UIVの超伝導ワイヤー。
    event.create('mithrite')
        .ingot().fluid().ore(2, 2, true)
        .color(0x40E0D0).iconSet('shiny')
        .blastTemp(DEFINATION_STATS.COILS.KANTHAL.TEMP, null)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_DENSE,
            GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.GENERATE_FINE_WIRE, GTMaterialFlags.GENERATE_RING,
            GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.GENERATE_ROTOR)
        .toolStats(ToolProperty.Builder.of(6.0, 7.0, 4096, 4, 
            [
                GTToolType.SWORD, GTToolType.PICKAXE, GTToolType.SHOVEL, GTToolType.AXE, GTToolType.HOE, GTToolType.SAW, GTToolType.HARD_HAMMER,
                GTToolType.WRENCH, GTToolType.FILE, GTToolType.CROWBAR, GTToolType.SCREWDRIVER, GTToolType.WIRE_CUTTER, GTToolType.SCYTHE,
                GTToolType.KNIFE, GTToolType.BUTCHERY_KNIFE, GTToolType.DRILL_LV, GTToolType.DRILL_MV, GTToolType.DRILL_HV, GTToolType.DRILL_EV,
                GTToolType.DRILL_IV, GTToolType.CHAINSAW_LV, GTToolType.WRENCH_LV, GTToolType.WRENCH_HV, GTToolType.WRENCH_IV, 
                GTToolType.BUZZSAW, GTToolType.SCREWDRIVER_LV, GTToolType.WIRE_CUTTER_LV, GTToolType.WIRE_CUTTER_HV, GTToolType.WIRE_CUTTER_IV
            ]
        ).build())
        .rotorStats(160, 120, 4.0, 3000)
        .cableProperties(DEFINATION_STATS.VOLTAGE.UIV, 256, 0, true)
        .addOreByproducts(GTMaterials.Cooperite, GTMaterials.Gallium, GTMaterials.Vanadium, GTMaterials.GarnetSand)
        .components('4x mithril', '4x vanadium', 'silver');
    // Eikon Mithrite / イコンミスライト
    event.create('eikon_mithrite')
        .ore(2, 2, true).color(0xB0C4DE).iconSet('diamond')
        .washedIn(GTMaterials.Mercury, 1000)
        .addOreByproducts(GTMaterials.Cooperite, GTMaterials.Gallium, GTMaterials.RareEarth, GTMaterials.Tungstate)
        .components('4x mithrite', '3x lutetium', '2x silver');
    // Lumithrite / 光霊銀鉱
    event.create('lumithrite')
        .ore(4, 2, false).color(0xE6E6FA).iconSet('diamond')
        .washedIn(GTMaterials.Mercury, 1000)
        .addOreByproducts(GTMaterials.Cooperite, GTMaterials.Gallium, GTMaterials.RareEarth, GTMaterials.Bastnasite)
        .components('7x mithrite', 'aluminium', 'silver');
    // Blood-Starved Mithril / 赫霊銀鉱
    event.create('blood_starved_mithril')
        .ore(4, 4, true).color(0xB7282E).secondaryColor(0xF4B3C2).iconSet('fine')
        .washedIn(GTMaterials.NitricAcid, 4000)
        .addOreByproducts(GTMaterials.Cooperite, GTMaterials.Gallium, GTMaterials.Borax, GTMaterials.Gallium)
        .components('11x mithrite', '3x vanadium', '3x silver');
        // 特殊な工程を経ないとアビスリンカーミスリルの抽出は不可
    // High Mithrite / ハイミスライト
    // (Tier Nichrome, Upward Compatibility with Mithrite)
    // ミスライトの上位互換。元ネタはもちろんFF14。
    // 覚醒アビスリンカーミスリルの中間素材。なお、UXVのワイヤー。
    event.create('high_mithrite')
        .ingot().fluid()
        .color(0x48D1CC).iconSet('shiny').secondaryColor(0xE6E6FA)
        .blastTemp(DEFINATION_STATS.COILS.NICHROME.TEMP, null, AmperageCalc(DEFINATION_STATS.VOLTAGE.EV, 0.5), 2000)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_DENSE,
            GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.GENERATE_FINE_WIRE, GTMaterialFlags.GENERATE_RING,
            GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.GENERATE_ROTOR, GTMaterialFlags.GENERATE_FRAME)
        .toolStats(ToolProperty.Builder.of(8.0, 7.0, 6144, 4,
            [
                GTToolType.SWORD, GTToolType.PICKAXE, GTToolType.SHOVEL, GTToolType.AXE, GTToolType.HOE, GTToolType.SAW, GTToolType.HARD_HAMMER,
                GTToolType.WRENCH, GTToolType.FILE, GTToolType.CROWBAR, GTToolType.SCREWDRIVER, GTToolType.WIRE_CUTTER, GTToolType.SCYTHE,
                GTToolType.KNIFE, GTToolType.BUTCHERY_KNIFE, GTToolType.DRILL_LV, GTToolType.DRILL_MV, GTToolType.DRILL_HV, GTToolType.DRILL_EV,
                GTToolType.DRILL_IV, GTToolType.CHAINSAW_LV, GTToolType.WRENCH_LV, GTToolType.WRENCH_HV, GTToolType.WRENCH_IV, 
                GTToolType.BUZZSAW, GTToolType.SCREWDRIVER_LV, GTToolType.WIRE_CUTTER_LV, GTToolType.WIRE_CUTTER_HV, GTToolType.WIRE_CUTTER_IV
            ]
        ).build())
        .rotorStats(160, 120, 4.0, 6144)
        .cableProperties(DEFINATION_STATS.VOLTAGE.UXV, 1024, 32768, false)
        .components('2x eikon_mithrite', '3x lumithrite', '2x mithrite');
    // ファイアジェム
    event.create('fire_gem')
        .gem().ore(4, 2, true)
        .color(0xDC143C).iconSet('certus')
        .flags(GTMaterialFlags.HIGH_SIFTER_OUTPUT)
        .element(GTElements.get('fire_element'));
    // ウィンドジェム
    event.create('wind_gem')
        .gem().ore(4, 2, true)
        .color(0x3CB371).iconSet('certus')
        .flags(GTMaterialFlags.HIGH_SIFTER_OUTPUT)
        .element(GTElements.get('wind_element'));
    // ライトニングジェム
    event.create('lightning_gem')
        .gem().ore(4, 2, true)
        .color(0x9370DB).iconSet('certus')
        .flags(GTMaterialFlags.HIGH_SIFTER_OUTPUT)
        .element(GTElements.get('lightning_element'));
    // アイスジェム
    event.create('ice_gem')
        .gem().ore(4, 2, true)
        .color(0xADD8E6).iconSet('certus')
        .flags(GTMaterialFlags.HIGH_SIFTER_OUTPUT)
        .element(GTElements.get('ice_element'));
    // ウォータージェム
    event.create('water_gem')
        .gem().ore(4, 2, true)
        .color(0x4169E1).iconSet('certus')
        .flags(GTMaterialFlags.HIGH_SIFTER_OUTPUT)
        .element(GTElements.get('water_element'));
    // アースジェム
    event.create('earth_gem')
        .gem().ore(4, 2, true)
        .color(0xDAA520).iconSet('certus')
        .flags(GTMaterialFlags.HIGH_SIFTER_OUTPUT)
        .element(GTElements.get('earth_element'));
    /**
     * Op Alloy and Elements / オーバーパワード合金および元素
     */
    // Awakened Abysslinker Mithril / 覚醒アビスリンカーミスリル
    // (Tier Trinium, Cross-Compatibility with Cosmic Neutronium)
    // トリニウムで焼けるが、死ぬほどコストが高い。
    // タービンを超効率で使える。
    // なんなら、OpVで使う。
    event.create('awakened_abysslinker_mithril')
        .ingot().fluid()
        .color(0xB7282E).iconSet('bright')
        .blastTemp(DEFINATION_STATS.COILS.NAQUADAH.TEMP, 'high', AmperageCalc(DEFINATION_STATS.VOLTAGE.ZPM, 0.75), 4800)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_DENSE,
            GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.GENERATE_FINE_WIRE, GTMaterialFlags.GENERATE_RING,
            GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.GENERATE_ROTOR)
        .rotorStats(1000, 750, 10.0, 3145728)
        .components('4x abysslinker_mithril', '3x high_mithrite', '2x high_durium', '5x neutronium', '4x mana');
    // Arrokothium / アロコシウム
    // (Tier Tritanium, Upward Compatibility with Cosmic Neutronium)
    // 元ネタはエッジワース・カイパーベルト天体「アロコス」、もといその旧名「ウルティマ・トゥーレ」および
    // それモチーフのFF14：暁月編最終エリア「ウルティマ・トゥーレ」。
    // タービンを覚醒アビスリンカーミスリルを凌駕する効率で使える。
    // …だけでなく、MAXで使う。その性質上、MAXの超伝導ワイヤーである。
    // もちろん、タダで作れるわけもないトンデモ金属である。
    // 核融合炉: アセンディウム+Cosmic Neutronium
    event.create('arrokothium')
        .ingot().fluid()
        .element(GTElements.get('arrokothium'))
        .color(0xBB5535).iconSet('bright')
        .blastTemp(DEFINATION_STATS.COILS.TRITANIUM.TEMP, 'high', AmperageCalc(DEFINATION_STATS.VOLTAGE.UV, 0.75), 7200)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_DENSE,
            GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.GENERATE_FINE_WIRE, GTMaterialFlags.GENERATE_RING,
            GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.GENERATE_ROTOR)
        .cableProperties(DEFINATION_STATS.VOLTAGE.MAX, 2048, 0, true)
        .rotorStats(2000, 1500, 10.0, 12582912);
    // Ascendium / アセンディウム
    // アロコシウムを作るための中間素材。核融合炉: 覚醒アビスリンカーミスリル+ニッケル
    // OpVの超伝導ワイヤー。
    // 一応、プラズマも用意されている。
    event.create('ascendium')
        .ingot().fluid().plasma()
        .element(GTElements.get('ascendium'))
        .color(0xEF857D).iconSet('bright')
        .blastTemp(DEFINATION_STATS.COILS.TRITANIUM.TEMP, 'high', AmperageCalc(DEFINATION_STATS.VOLTAGE.ZPM, 0.75), 7200)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_DENSE, GTMaterialFlags.GENERATE_FOIL,
            GTMaterialFlags.GENERATE_FINE_WIRE)
        .cableProperties(DEFINATION_STATS.VOLTAGE.OpV, 1024, 0, true);
    // Excerium / エクセリウム
    // アセンディウム派生その2。核融合炉: アセンディウム+ルナアダマン
    // プラズマ発電を極めるために使用する金属。アセンディウムが霞んで見えるほどに出力が高い他、
    // アセンディウムと同じ始動EUである(しかも、LuV稼働のおまけつき)。
    // だけでなく、液化エクセリウムをナクアダ燃料棒と一緒に加圧水型原子炉で処理してやると、
    // プラスで電力を確保できるほか、液化アセンディウムに還元できる特殊効果を持つ(なんなら増える)。
    // また、合金素材とすることで、アロコシウムを凌駕する超効率・超出力のタービンブレードを持つ
    // 「エクセリアル鋼」を作ることが可能になる。
    event.create('excerium')
        .ingot().fluid().plasma()
        .element(GTElements.get('excerium'))
        .color(0xEA5506).iconSet('metallic')
        .blastTemp(DEFINATION_STATS.COILS.TRITANIUM.TEMP, 'higher', AmperageCalc(DEFINATION_STATS.VOLTAGE.UV, 0.75), 7200)
        .flags(GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_FRAME);
    // Excerial Steel / エクセリアル鋼
    // 最終最高の合金。全てを出し尽くした最強の証。
    // もはやプレイヤーが、倒せぬものなどない、と言ってもいいほどの力量で辿り着いたということを示す。
    // 化け物効率のタービンブレードを持つ。
    event.create('excerial_steel')
        .ingot().fluid()
        .color(0xEAF4FC).iconSet('metallic')
        .blastTemp(DEFINATION_STATS.COILS.TRITANIUM.TEMP, 'highest', AmperageCalc(DEFINATION_STATS.VOLTAGE.UV, 0.75), 3600)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_DENSE, GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.GENERATE_RING, GTMaterialFlags.GENERATE_ROTOR)
        .rotorStats(51200, 3600, 10.0, 78643200)
        .formula('焉')
        //.components('5x excerium', '5x ascendium', '4x arrokothium', '4x tungstensteel', '3x durium', '3x lunar_adamantium', '3x platinum', '3x neutronium', '3x mana');
        .components('5x excerium', '5x arrokothium', '5x lunar_adamantium', '3x hsse');
});
