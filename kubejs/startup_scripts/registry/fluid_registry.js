/**
 * Fluid Registry - defines ID, name, color, and temperature of custom fluids.
 */

StartupEvents.registry('fluid', event => {
    // 原子炉系
    // - 原子炉冷媒
    event.create('coolant')
        .thinTexture(0x2CB4AD)
        .bucketColor(0x2CB4AD)
        .temperature(293)
        .noBlock();
    // - 熱い原子炉冷媒
    event.create('hot_coolant')
        .thinTexture(0xEA5550)
        .bucketColor(0xEA5550)
        .temperature(2600)
        .noBlock();
    // - 高密度原子炉冷媒
    event.create('high_density_coolant')
        .thinTexture(0x005243)
        .bucketColor(0x005243)
        .temperature(293)
        .noBlock();
    // - 熱い高密度原子炉冷媒
    event.create('hot_high_density_coolant')
        .thinTexture(0xB7282E)
        .bucketColor(0xB7282E)
        .temperature(13000)
        .noBlock();
    // 砂糖生成工程
    // - サトウキビ汁
    event.create('sugarcane_juice')
        .thinTexture(0xF7FFEF)
        .bucketColor(0xF7FFEF)
        .temperature(293)
        .noBlock();
    // - 糖蜜
    event.create('sugar_syrup')
        .thinTexture(0xFFDC00)
        .bucketColor(0xFFDC00)
        .temperature(293)
        .noBlock();
    // - 廃糖蜜(モラセス)
    event.create('molasses')
        .thinTexture(0x24140e)
        .bucketColor(0x24140e)
        .temperature(293)
        .noBlock();
    // - ローリカー
    event.create('raw_sugar_solution')
        .thinTexture(0x6B3F31)
        .bucketColor(0x6B3F31)
        .temperature(293)
        .noBlock();
    // - ブラウンリカー
    event.create('washed_sugar_solution')
        .thinTexture(0xC2894B)
        .bucketColor(0xC2894B)
        .temperature(293)
        .noBlock();
    // - ファインリカー
    event.create('purified_sugar_solution')
        .thinTexture(0xFFF7EF)
        .bucketColor(0xFFF7EF)
        .temperature(293)
        .noBlock();
    // - 白下
    event.create('shiroshita_sugar')
        .thinTexture(0xFFFFEF)
        .bucketColor(0xFFFFEF)
        .temperature(293)
        .noBlock();
    // 生のてんさい溶液
    event.create('raw_beetroot_solution')
        .thinTexture(0xCA4273)
        .bucketColor(0xCA4273)
        .temperature(293)
        .noBlock();
    // 蒸留したてんさい溶液
    event.create('distilled_beetroot_solution')
        .thinTexture(0xC9A1B0)
        .bucketColor(0xC9A1B0)
        .temperature(293)
        .noBlock();
});
