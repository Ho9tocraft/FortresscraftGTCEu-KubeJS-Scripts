/**
 * Appending GTCA's Green House Recipes
 */

ServerEvents.recipes(event => {
  // 前提
  const { arrayIncludes } = global.fgtceuHelpers.jsUtil;
  // Green House recipes
  const { green_house: GTFarm,  } = event.recipes.gtceu;
  const Math = JavaMath;

  /**
   * 
   * @param {{id: string, count: integer}} seed seed item
   * @param {{id: string, count: integer}} dist dist item
   * @param {{id: string, count: integer}[]} optDist optional dist item
   */
  const distCropsGHRecipes = (seed, dist, optDist) => {
    if (!seed || !seed.id || !dist || !dist.id || dist.count < 1) return; // エラーチェック
    const regexPlaceholder = /(?:p(?:lace)?h(?:older)?|ph|<ph>)/i;
    if (regexPlaceholder.test(seed.id) || regexPlaceholder.test(dist.id) ||
      seed.id === '<PH>' || dist.id === '<PH>') return; // プレースホルダーは無視
    seed.count = seed.count || 2;
    seed.count = seed.count > 64 ? 64 : seed.count;
    dist.count = dist.count > 64 ? 64 : dist.count;
    optDist = optDist || [];
    const isMADist = /^mystical/.test(dist.id);
    const crop = dist.id.replace(/(.+):([a-z0-9_]+?)(?:_essence|item|_log)?$/, '$1_$2');
    const chanceDist = isMADist ? 'mysticalagriculture:fertilized_essence' : dist.id;
    const chanceDCount = isMADist ? '2' :
      `${Math.max(Math.round(dist.count / 6) - (
        (seed.count === 1 && seed.id === dist.id) ? 1 : 0
      ), 1)}`;
    console.log(`${chanceDCount}x ${chanceDist}`);
    const [oDist1, oDist2, oDist3] = optDist; // optDistが4個以上の要素を持っていたとしても無視される
    switch (optDist.length) {
      case 0:
        GTFarm(crop)
          .itemInputs(`1x ${seed.id}`)
          .circuit(1)
          .inputFluids('minecraft:water 1000')
          .itemOutputs(`${seed.count}x ${seed.id}`, `${dist.count}x ${dist.id}`)
          .chancedOutput(`1x ${chanceDist}`, 500, 100)
          .chancedOutput(seed.id, 250, 50)
          .duration(1200)
          .EUt(GTValues.VHA[GTValues.MV]);
        GTFarm(`${crop}_fertilizer`)
          .itemInputs(`1x ${seed.id}`, '4x gtceu:fertilizer')
          .circuit(2)
          .inputFluids('minecraft:water 1000')
          .itemOutputs(`${seed.count}x ${seed.id}`, `${dist.count}x ${dist.id}`, `${dist.count}x ${dist.id}`)
          .chancedOutput(`${chanceDCount * 2}x ${chanceDist}`, 1000, 200)
          .chancedOutput(`2x ${seed.id}`, 500, 100)
          .duration(900)
          .EUt(GTValues.VHA[GTValues.MV]);
        break;
      case 1:
        GTFarm(crop)
          .itemInputs(`1x ${seed.id}`)
          .circuit(1)
          .inputFluids('minecraft:water 1000')
          .itemOutputs(`${seed.count}x ${seed.id}`, `${dist.count}x ${dist.id}`,
            `${Math.round(oDist1.count / 2)}x ${oDist1.id}`)
          .chancedOutput(`1x ${chanceDist}`, 500, 100)
          .chancedOutput(seed.id, 250, 50)
          .duration(1200)
          .EUt(GTValues.VHA[GTValues.MV]);
        GTFarm(`${crop}_fertilizer`)
          .itemInputs(`1x ${seed.id}`, '4x gtceu:fertilizer')
          .circuit(2)
          .inputFluids('minecraft:water 1000')
          .itemOutputs(`${seed.count}x ${seed.id}`, `${dist.count}x ${dist.id}`, `${dist.count}x ${dist.id}`,
            `${oDist1.count}x ${oDist1.id}`)
          .chancedOutput(`${chanceDCount * 2}x ${chanceDist}`, 1000, 200)
          .chancedOutput(`2x ${seed.id}`, 500, 100)
          .duration(900)
          .EUt(GTValues.VHA[GTValues.MV]);
        break;
      case 2:
        GTFarm(crop)
          .itemInputs(`1x ${seed.id}`)
          .circuit(1)
          .inputFluids('minecraft:water 1000')
          .itemOutputs(`${seed.count}x ${seed.id}`, `${dist.count}x ${dist.id}`,
            `${Math.round(oDist1.count / 2)}x ${oDist1.id}`,
            `${Math.round(oDist2.count / 2)}x ${oDist2.id}`)
          .chancedOutput(`1x ${chanceDist}`, 500, 100)
          .chancedOutput(seed.id, 250, 50)
          .duration(1200)
          .EUt(GTValues.VHA[GTValues.MV]);
        GTFarm(`${crop}_fertilizer`)
          .itemInputs(`1x ${seed.id}`, '4x gtceu:fertilizer')
          .circuit(2)
          .inputFluids('minecraft:water 1000')
          .itemOutputs(`${seed.count}x ${seed.id}`, `${dist.count}x ${dist.id}`, `${dist.count}x ${dist.id}`,
            `${oDist1.count}x ${oDist1.id}`,
            `${oDist2.count}x ${oDist2.id}`)
          .chancedOutput(`${chanceDCount * 2}x ${chanceDist}`, 1000, 200)
          .chancedOutput(`2x ${seed.id}`, 500, 100)
          .duration(900)
          .EUt(GTValues.VHA[GTValues.MV]);
        break;
      default: // length >= 3
        GTFarm(crop)
          .itemInputs(`1x ${seed.id}`)
          .circuit(1)
          .inputFluids('minecraft:water 1000')
          .itemOutputs(`${seed.count}x ${seed.id}`, `${dist.count}x ${dist.id}`,
            `${Math.round(oDist1.count / 2)}x ${oDist1.id}`,
            `${Math.round(oDist2.count / 2)}x ${oDist2.id}`,
            `${Math.round(oDist3.count / 2)}x ${oDist3.id}`)
          .chancedOutput(`1x ${chanceDist}`, 500, 100)
          .chancedOutput(seed.id, 250, 50)
          .duration(1200)
          .EUt(GTValues.VHA[GTValues.MV]);
        GTFarm(crop)
          .itemInputs(`1x ${seed.id}`, '4x gtceu:fertilizer')
          .circuit(2)
          .inputFluids('minecraft:water 1000')
          .itemOutputs(`${seed.count}x ${seed.id}`, `${dist.count}x ${dist.id}`, `${dist.count}x ${dist.id}`,
            `${oDist1.count}x ${oDist1.id}`,
            `${oDist2.count}x ${oDist2.id}`,
            `${oDist3.count}x ${oDist3.id}`)
          .chancedOutput(`${chanceDCount * 2}x ${chanceDist}`, 1000, 200)
          .chancedOutput(`2x ${seed.id}`, 500, 100)
          .duration(900)
          .EUt(GTValues.VHA[GTValues.MV]);
        break;
    }
  };

  /**
   * @typedef {{ id: string, count: integer }} CropInfo
   * @typedef {{ seed: CropInfo, dist: CropInfo, optDist: CropInfo[] }[]} CropQueue
   */
  /**
   * @description Crops Queue
   * @type {CropQueue}
   */
  [
    // Minecraft trees
    { seed: { id: 'minecraft:oak_sapling', count: 6 }, dist: { id: 'minecraft:oak_log', count: 64 }, optDist: [{ id: 'minecraft:apple', count: 8 }] },
    { seed: { id: 'minecraft:spruce_sapling', count: 6 }, dist: { id: 'minecraft:spruce_log', count: 64 }, optDist: [] },
    { seed: { id: 'minecraft:birch_sapling', count: 6 }, dist: { id: 'minecraft:birch_log', count: 64 }, optDist: [] },
    { seed: { id: 'minecraft:jungle_sapling', count: 6 }, dist: { id: 'minecraft:jungle_log', count: 64 }, optDist: [] },
    { seed: { id: 'minecraft:acacia_sapling', count: 6 }, dist: { id: 'minecraft:acacia_log', count: 64 }, optDist: [] },
    { seed: { id: 'minecraft:dark_oak_sapling', count: 6 }, dist: { id: 'minecraft:dark_oak_log', count: 64 }, optDist: [{ id: 'minecraft:apple', count: 4 }] },
    { seed: { id: 'minecraft:mangrove_propagule', count: 6 }, dist: { id: 'minecraft:mangrove_log', count: 64 }, optDist: [] },
    { seed: { id: 'minecraft:cherry_sapling', count: 6 }, dist: { id: 'minecraft:cherry_log', count: 64 }, optDist: [] },
    // Minecraft crops
    { seed: { id: 'minecraft:pumpkin_seeds', count: 4 }, dist: { id: 'minecraft:pumpkin', count: 6 }, optDist: [] },
    { seed: { id: 'minecraft:beetroot_seeds', count: 4 }, dist: { id: 'minecraft:beetroot', count: 16 }, optDist: [] },
    { seed: { id: 'minecraft:sweet_berries', count: 1 }, dist: { id: 'minecraft:sweet_berries', count: 16 }, optDist: [] },
    { seed: { id: 'minecraft:glow_berries', count: 1 }, dist: { id: 'minecraft:glow_berries', count: 8 }, optDist: [] },
    { seed: { id: 'minecraft:wheat_seeds', count: 4 }, dist: { id: 'minecraft:wheat', count: 16 }, optDist: [] },
    { seed: { id: 'minecraft:melon_seeds', count: 4 }, dist: { id: 'minecraft:melon', count: 6 }, optDist: [{ id: 'minecraft:melon_slice', count: 4 }] },
    { seed: { id: 'minecraft:carrot', count: 4 }, dist: { id: 'minecraft:carrot', count: 12 }, optDist: [] },
    { seed: { id: 'minecraft:sugar_cane', count: 1 }, dist: { id: 'minecraft:sugar_cane', count: 12 }, optDist: [] },
    { seed: { id: 'minecraft:kelp', count: 1 }, dist: { id: 'minecraft:kelp', count: 12 }, optDist: [] },
    { seed: { id: 'minecraft:cactus', count: 1 }, dist: { id: 'minecraft:cactus', count: 12 }, optDist: [] },
    { seed: { id: 'minecraft:brown_mushroom', count: 1 }, dist: { id: 'minecraft:brown_mushroom', count: 12 }, optDist: [] },
    { seed: { id: 'minecraft:red_mushroom', count: 1 }, dist: { id: 'minecraft:red_mushroom', count: 12 }, optDist: [] },
    { seed: { id: 'minecraft:nether_wart', count: 1 }, dist: { id: 'minecraft:nether_wart', count: 12 }, optDist: [] },
    { seed: { id: 'minecraft:bamboo', count: 1 }, dist: { id: 'minecraft:bamboo', count: 12 }, optDist: [] },
    // Mystical Agriculture tier ELEMENTS / 1
    { seed: { id: 'mysticalagriculture:air_seeds', count: 2 }, dist: { id: 'mysticalagriculture:air_essence', count: 48 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:earth_seeds', count: 2 }, dist: { id: 'mysticalagriculture:earth_essence', count: 48 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:water_seeds', count: 2 }, dist: { id: 'mysticalagriculture:water_essence', count: 48 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:fire_seeds', count: 2 }, dist: { id: 'mysticalagriculture:fire_essence', count: 48 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:inferium_seeds', count: 2 }, dist: { id: 'mysticalagriculture:inferium_essence', count: 48 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:stone_seeds', count: 2 }, dist: { id: 'mysticalagriculture:stone_essence', count: 48 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:dirt_seeds', count: 2 }, dist: { id: 'mysticalagriculture:dirt_essence', count: 48 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:wood_seeds', count: 2 }, dist: { id: 'mysticalagriculture:wood_essence', count: 48 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:ice_seeds', count: 2 }, dist: { id: 'mysticalagriculture:ice_essence', count: 48 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:deepslate_seeds', count: 2 }, dist: { id: 'mysticalagriculture:deepslate_essence', count: 48 }, optDist: [] },
    // Mystical Agriculture tier 2
    { seed: { id: 'mysticalagriculture:nature_seeds', count: 2 }, dist: { id: 'mysticalagriculture:nature_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:dye_seeds', count: 2 }, dist: { id: 'mysticalagriculture:dye_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:nether_seeds', count: 2 }, dist: { id: 'mysticalagriculture:nether_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:coal_seeds', count: 2 }, dist: { id: 'mysticalagriculture:coal_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:coral_seeds', count: 2 }, dist: { id: 'mysticalagriculture:coral_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:honey_seeds', count: 2 }, dist: { id: 'mysticalagriculture:honey_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:amethyst_seeds', count: 2 }, dist: { id: 'mysticalagriculture:amethyst_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:pig_seeds', count: 2 }, dist: { id: 'mysticalagriculture:pig_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:chicken_seeds', count: 2 }, dist: { id: 'mysticalagriculture:chicken_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:cow_seeds', count: 2 }, dist: { id: 'mysticalagriculture:cow_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:sheep_seeds', count: 2 }, dist: { id: 'mysticalagriculture:sheep_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:squid_seeds', count: 2 }, dist: { id: 'mysticalagriculture:squid_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:fish_seeds', count: 2 }, dist: { id: 'mysticalagriculture:fish_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:slime_seeds', count: 2 }, dist: { id: 'mysticalagriculture:slime_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:turtle_seeds', count: 2 }, dist: { id: 'mysticalagriculture:turtle_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:silicon_seeds', count: 2 }, dist: { id: 'mysticalagriculture:silicon_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:sulfur_seeds', count: 2 }, dist: { id: 'mysticalagriculture:sulfur_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:aluminum_seeds', count: 2 }, dist: { id: 'mysticalagriculture:aluminum_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:saltpeter_seeds', count: 2 }, dist: { id: 'mysticalagriculture:saltpeter_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:apatite_seeds', count: 2 }, dist: { id: 'mysticalagriculture:apatite_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:mystical_flower_seeds', count: 2 }, dist: { id: 'mysticalagriculture:mystical_flower_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:limestone_seeds', count: 2 }, dist: { id: 'mysticalagriculture:limestone_essence', count: 32 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:basalt_seeds', count: 2 }, dist: { id: 'mysticalagriculture:basalt_essence', count: 32 }, optDist: [] },
    // Mystical Agriculture tier 3
    { seed: { id: 'mysticalagriculture:iron_seeds', count: 2 }, dist: { id: 'mysticalagriculture:iron_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:copper_seeds', count: 2 }, dist: { id: 'mysticalagriculture:copper_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:nether_quartz_seeds', count: 2 }, dist: { id: 'mysticalagriculture:nether_quartz_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:glowstone_seeds', count: 2 }, dist: { id: 'mysticalagriculture:glowstone_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:redstone_seeds', count: 2 }, dist: { id: 'mysticalagriculture:redstone_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:obsidian_seeds', count: 2 }, dist: { id: 'mysticalagriculture:obsidian_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:prismarine_seeds', count: 2 }, dist: { id: 'mysticalagriculture:prismarine_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:zombie_seeds', count: 2 }, dist: { id: 'mysticalagriculture:zombie_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:skeleton_seeds', count: 2 }, dist: { id: 'mysticalagriculture:skeleton_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:creeper_seeds', count: 2 }, dist: { id: 'mysticalagriculture:creeper_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:spider_seeds', count: 2 }, dist: { id: 'mysticalagriculture:spider_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:rabbit_seeds', count: 2 }, dist: { id: 'mysticalagriculture:rabbit_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:tin_seeds', count: 2 }, dist: { id: 'mysticalagriculture:tin_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:bronze_seeds', count: 2 }, dist: { id: 'mysticalagriculture:bronze_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:zinc_seeds', count: 2 }, dist: { id: 'mysticalagriculture:zinc_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:brass_seeds', count: 2 }, dist: { id: 'mysticalagriculture:brass_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:silver_seeds', count: 2 }, dist: { id: 'mysticalagriculture:silver_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:lead_seeds', count: 2 }, dist: { id: 'mysticalagriculture:lead_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:blizz_seeds', count: 2 }, dist: { id: 'mysticalagriculture:blizz_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:blitz_seeds', count: 2 }, dist: { id: 'mysticalagriculture:blitz_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:basalz_seeds', count: 2 }, dist: { id: 'mysticalagriculture:basalz_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:manasteel_seeds', count: 2 }, dist: { id: 'mysticalagriculture:manasteel_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:steeleaf_seeds', count: 2 }, dist: { id: 'mysticalagriculture:steeleaf_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:ironwood_seeds', count: 2 }, dist: { id: 'mysticalagriculture:ironwood_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:sky_stone_seeds', count: 2 }, dist: { id: 'mysticalagriculture:sky_stone_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:certus_quartz_seeds', count: 2 }, dist: { id: 'mysticalagriculture:certus_quartz_essence', count: 24 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:proudsoul_seeds', count: 2 }, dist: { id: 'mysticalagriculture:proudsoul_essence', count: 24 }, optDist: [] },
    // Mystical Agriculture tier 4
    { seed: { id: 'mysticalagriculture:gold_seeds', count: 2 }, dist: { id: 'mysticalagriculture:gold_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:lapis_lazuli_seeds', count: 2 }, dist: { id: 'mysticalagriculture:lapis_lazuli_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:end_seeds', count: 2 }, dist: { id: 'mysticalagriculture:end_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:experience_seeds', count: 2 }, dist: { id: 'mysticalagriculture:experience_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:blaze_seeds', count: 2 }, dist: { id: 'mysticalagriculture:blaze_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:ghast_seeds', count: 2 }, dist: { id: 'mysticalagriculture:ghast_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:enderman_seeds', count: 2 }, dist: { id: 'mysticalagriculture:enderman_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:steel_seeds', count: 2 }, dist: { id: 'mysticalagriculture:steel_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:nickel_seeds', count: 2 }, dist: { id: 'mysticalagriculture:nickel_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:constantan_seeds', count: 2 }, dist: { id: 'mysticalagriculture:constantan_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:electrum_seeds', count: 2 }, dist: { id: 'mysticalagriculture:electrum_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:invar_seeds', count: 2 }, dist: { id: 'mysticalagriculture:invar_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:mithril_seeds', count: 2 }, dist: { id: 'mysticalagriculture:mithril_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:tungsten_seeds', count: 2 }, dist: { id: 'mysticalagriculture:tungsten_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:titanium_seeds', count: 2 }, dist: { id: 'mysticalagriculture:titanium_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:uranium_seeds', count: 2 }, dist: { id: 'mysticalagriculture:uranium_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:ruby_seeds', count: 2 }, dist: { id: 'mysticalagriculture:ruby_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:sapphire_seeds', count: 2 }, dist: { id: 'mysticalagriculture:sapphire_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:peridot_seeds', count: 2 }, dist: { id: 'mysticalagriculture:peridot_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:soulium_seeds', count: 2 }, dist: { id: 'mysticalagriculture:soulium_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:signalum_seeds', count: 2 }, dist: { id: 'mysticalagriculture:signalum_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:lumium_seeds', count: 2 }, dist: { id: 'mysticalagriculture:lumium_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:elementium_seeds', count: 2 }, dist: { id: 'mysticalagriculture:elementium_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:osmium_seeds', count: 2 }, dist: { id: 'mysticalagriculture:osmium_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:fluorite_seeds', count: 2 }, dist: { id: 'mysticalagriculture:fluorite_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:refined_glowstone_seeds', count: 2 }, dist: { id: 'mysticalagriculture:refined_glowstone_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:refined_obsidian_seeds', count: 2 }, dist: { id: 'mysticalagriculture:refined_obsidian_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:knightmetal_seeds', count: 2 }, dist: { id: 'mysticalagriculture:knightmetal_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:fiery_ingot_seeds', count: 2 }, dist: { id: 'mysticalagriculture:fiery_ingot_essence', count: 16 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:fluix_seeds', count: 2 }, dist: { id: 'mysticalagriculture:fluix_essence', count: 16 }, optDist: [] },
    // Mystical Agriculture tier 5
    { seed: { id: 'mysticalagriculture:diamond_seeds', count: 2 }, dist: { id: 'mysticalagriculture:diamond_essence', count: 12 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:emerald_seeds', count: 2 }, dist: { id: 'mysticalagriculture:emerald_essence', count: 12 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:netherite_seeds', count: 2 }, dist: { id: 'mysticalagriculture:netherite_essence', count: 12 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:wither_skeleton_seeds', count: 2 }, dist: { id: 'mysticalagriculture:wither_skeleton_essence', count: 12 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:platinum_seeds', count: 2 }, dist: { id: 'mysticalagriculture:platinum_essence', count: 12 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:iridium_seeds', count: 2 }, dist: { id: 'mysticalagriculture:iridium_essence', count: 12 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:enderium_seeds', count: 2 }, dist: { id: 'mysticalagriculture:enderium_essence', count: 12 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:terrasteel_seeds', count: 2 }, dist: { id: 'mysticalagriculture:terrasteel_essence', count: 12 }, optDist: [] },
    // Mystical Agriculture tier 6
    { seed: { id: 'mysticalagriculture:nether_star_seeds', count: 2 }, dist: { id: 'mysticalagriculture:nether_star_essence', count: 8 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:dragon_egg_seeds', count: 2 }, dist: { id: 'mysticalagriculture:dragon_egg_essence', count: 8 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:gaia_spirit_seeds', count: 2 }, dist: { id: 'mysticalagriculture:gaia_spirit_essence', count: 8 }, optDist: [] },
    { seed: { id: 'mysticalagriculture:neutronium_seeds', count: 2 }, dist: { id: 'mysticalagriculture:neutronium_essence', count: 8 }, optDist: [] },
    // Pam's Harvestcraft 2 trees
    { seed: { id: 'pamhc2trees:apple_sapling', count: 4 }, dist: { id: 'minecraft:apple', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}] },
    { seed: { id: 'pamhc2trees:avocado_sapling', count: 4 }, dist: { id: 'pamhc2trees:avocadoitem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:candlenut_sapling', count: 4 }, dist: { id: 'pamhc2trees:candlenutitem', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}] },
    { seed: { id: 'pamhc2trees:cherry_sapling', count: 4 }, dist: { id: 'pamhc2trees:cherryitem', count: 16 }, optDist: [{id:'pamtreewood:red_cherry_log', count: 32}] },
    { seed: { id: 'pamhc2trees:chestnut_sapling', count: 4 }, dist: { id: 'pamhc2trees:chestnutitem', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}] },
    { seed: { id: 'pamhc2trees:gooseberry_sapling', count: 4 }, dist: { id: 'pamhc2trees:gooseberryitem', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}] },
    { seed: { id: 'pamhc2trees:lemon_sapling', count: 4 }, dist: { id: 'pamhc2trees:lemonitem', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}] },
    { seed: { id: 'pamhc2trees:nutmeg_sapling', count: 4 }, dist: { id: 'pamhc2trees:nutmegitem', count: 16 }, optDist: [{id:'pamtreewood:nutmeg_log', count: 32}] },
    { seed: { id: 'pamhc2trees:orange_sapling', count: 4 }, dist: { id: 'pamhc2trees:orangeitem', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}] },
    { seed: { id: 'pamhc2trees:peach_sapling', count: 4 }, dist: { id: 'pamhc2trees:peachitem', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}] },
    { seed: { id: 'pamhc2trees:pear_sapling', count: 4 }, dist: { id: 'pamhc2trees:pearitem', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}] },
    { seed: { id: 'pamhc2trees:plum_sapling', count: 4 }, dist: { id: 'pamhc2trees:plumitem', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}] },
    { seed: { id: 'pamhc2trees:walnut_sapling', count: 4 }, dist: { id: 'pamhc2trees:walnutitem', count: 16 }, optDist: [{id:'pamtreewood:walnut_log', count: 32}] },
    { seed: { id: 'pamhc2trees:spiderweb_sapling', count: 4 }, dist: { id: 'minecraft:string', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}, {id:'minecraft:cobweb', count: 4}] },
    { seed: { id: 'pamhc2trees:hazelnut_sapling', count: 4 }, dist: { id: 'pamhc2trees:hazelnutitem', count: 16 }, optDist: [{id:'pamtreewood:hazelnut_log', count: 32}] },
    { seed: { id: 'pamhc2trees:pawpaw_sapling', count: 4 }, dist: { id: 'pamhc2trees:pawpawitem', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}] },
    { seed: { id: 'pamhc2trees:soursop_sapling', count: 4 }, dist: { id: 'pamhc2trees:soursopitem', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}] },
    { seed: { id: 'pamhc2trees:acorn_sapling', count: 4 }, dist: { id: 'pamhc2trees:acornitem', count: 16 }, optDist: [{id:'minecraft:oak_log', count: 32}] },
    { seed: { id: 'pamhc2trees:almond_sapling', count: 4 }, dist: { id: 'pamhc2trees:almonditem', count: 16 }, optDist: [{id:'pamtreewood:almond_log', count: 32}] },
    { seed: { id: 'pamhc2trees:apricot_sapling', count: 4 }, dist: { id: 'pamhc2trees:apricotitem', count: 16 }, optDist: [{id:'pamtreewood:apricot_log', count: 32}] },
    { seed: { id: 'pamhc2trees:banana_sapling', count: 4 }, dist: { id: 'pamhc2trees:bananaitem', count: 16 }, optDist: [{id:'pamtreewood:banana_log', count: 32}] },
    { seed: { id: 'pamhc2trees:cashew_sapling', count: 4 }, dist: { id: 'pamhc2trees:cashewitem', count: 16 }, optDist: [{id:'pamtreewood:cashew_log', count: 32}] },
    { seed: { id: 'pamhc2trees:cinnamon_sapling', count: 4 }, dist: { id: 'pamhc2trees:cinnamonitem', count: 16 }, optDist: [{id:'pamhc2trees:pamcinnamon', count: 32}] },
    { seed: { id: 'pamhc2trees:coconut_sapling', count: 4 }, dist: { id: 'pamhc2trees:coconutitem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:date_sapling', count: 4 }, dist: { id: 'pamhc2trees:dateitem', count: 16 }, optDist: [{id:'pamtreewood:date_log', count: 32}] },
    { seed: { id: 'pamhc2trees:dragonfruit_sapling', count: 4 }, dist: { id: 'pamhc2trees:dragonfruititem', count: 16 }, optDist: [{id:'pamtreewood:dragonfruit_log', count: 32}] },
    { seed: { id: 'pamhc2trees:durian_sapling', count: 4 }, dist: { id: 'pamhc2trees:durianitem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:fig_sapling', count: 4 }, dist: { id: 'pamhc2trees:figitem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:grapefruit_sapling', count: 4 }, dist: { id: 'pamhc2trees:grapefruititem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:lime_sapling', count: 4 }, dist: { id: 'pamhc2trees:limeitem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:mango_sapling', count: 4 }, dist: { id: 'pamhc2trees:mangoitem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:olive_sapling', count: 4 }, dist: { id: 'pamhc2trees:oliveitem', count: 16 }, optDist: [{id:'pamtreewood:olive_log', count: 32}] },
    { seed: { id: 'pamhc2trees:papaya_sapling', count: 4 }, dist: { id: 'pamhc2trees:papayaitem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:paperbark_sapling', count: 4 }, dist: { id: 'minecraft:paper', count: 16 }, optDist: [{id:'pamhc2trees:pampaperbark', count: 32}] },
    { seed: { id: 'pamhc2trees:pecan_sapling', count: 4 }, dist: { id: 'pamhc2trees:pecanitem', count: 16 }, optDist: [{id:'pamtreewood:pecan_log', count: 32}] },
    { seed: { id: 'pamhc2trees:peppercorn_sapling', count: 4 }, dist: { id: 'pamhc2trees:peppercornitem', count: 16 }, optDist: [{id:'pamtreewood:peppercorn_log', count: 32}] },
    { seed: { id: 'pamhc2trees:persimmon_sapling', count: 4 }, dist: { id: 'pamhc2trees:persimmonitem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:pistachio_sapling', count: 4 }, dist: { id: 'pamhc2trees:pistachioitem', count: 16 }, optDist: [{id:'pamtreewood:pistachio_log', count: 32}] },
    { seed: { id: 'pamhc2trees:pomegranate_sapling', count: 4 }, dist: { id: 'pamhc2trees:pomegranateitem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:starfruit_sapling', count: 4 }, dist: { id: 'pamhc2trees:starfruititem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:vanillabean_sapling', count: 4 }, dist: { id: 'pamhc2trees:vanillabeanitem', count: 16 }, optDist: [{id:'pamtreewood:vanillabean_log', count: 32}] },
    { seed: { id: 'pamhc2trees:breadfruit_sapling', count: 4 }, dist: { id: 'pamhc2trees:breadfruititem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:guava_sapling', count: 4 }, dist: { id: 'pamhc2trees:guavaitem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:jackfruit_sapling', count: 4 }, dist: { id: 'pamhc2trees:jackfruititem', count: 16 }, optDist: [{id:'pamtreewood:jackfruit_log', count: 32}] },
    { seed: { id: 'pamhc2trees:lychee_sapling', count: 4 }, dist: { id: 'pamhc2trees:lycheeitem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:passionfruit_sapling', count: 4 }, dist: { id: 'pamhc2trees:passionfruititem', count: 16 }, optDist: [{id:'pamtreewood:passionfruit_log', count: 32}] },
    { seed: { id: 'pamhc2trees:rambutan_sapling', count: 4 }, dist: { id: 'pamhc2trees:rambutanitem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:tamarind_sapling', count: 4 }, dist: { id: 'pamhc2trees:tamarinditem', count: 16 }, optDist: [{id:'minecraft:jungle_log', count: 32}] },
    { seed: { id: 'pamhc2trees:maple_sapling', count: 4 }, dist: { id: 'pamhc2trees:maplesyrupitem', count: 16 }, optDist: [{id:'pamhc2trees:pammaple', count: 32}] },
    { seed: { id: 'pamhc2trees:pinenut_sapling', count: 4 }, dist: { id: 'pamhc2trees:pinenutitem', count: 16 }, optDist: [{id:'minecraft:spruce_log', count: 32}] },
    // Pam's Harvestcraft 2 crops
    { seed: { id: 'pamhc2crops:agaveseeditem', count: 4 }, dist: { id: 'pamhc2crops:agaveitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:amaranthseeditem', count: 4 }, dist: { id: 'pamhc2crops:amaranthitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:arrowrootseeditem', count: 4 }, dist: { id: 'pamhc2crops:arrowrootitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:artichokeseeditem', count: 4 }, dist: { id: 'pamhc2crops:artichokeitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:asparagusseeditem', count: 4 }, dist: { id: 'pamhc2crops:asparagusitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:barleyseeditem', count: 4 }, dist: { id: 'pamhc2crops:barleyitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:beanseeditem', count: 4 }, dist: { id: 'pamhc2crops:beanitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:bellpepperseeditem', count: 4 }, dist: { id: 'pamhc2crops:bellpepperitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:blackberryseeditem', count: 4 }, dist: { id: 'pamhc2crops:blackberryitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:blueberryseeditem', count: 4 }, dist: { id: 'pamhc2crops:blueberryitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:broccoliseeditem', count: 4 }, dist: { id: 'pamhc2crops:broccoliitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:brusselsproutseeditem', count: 4 }, dist: { id: 'pamhc2crops:brusselsproutitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:cabbageseeditem', count: 4 }, dist: { id: 'pamhc2crops:cabbageitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:cactusfruitseeditem', count: 4 }, dist: { id: 'pamhc2crops:cactusfruititem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:candleberryseeditem', count: 4 }, dist: { id: 'pamhc2crops:candleberryitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:cantaloupeseeditem', count: 4 }, dist: { id: 'pamhc2crops:cantaloupeitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:cassavaseeditem', count: 4 }, dist: { id: 'pamhc2crops:cassavaitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:cauliflowerseeditem', count: 4 }, dist: { id: 'pamhc2crops:caulifloweritem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:celeryseeditem', count: 4 }, dist: { id: 'pamhc2crops:celeryitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:chickpeaseeditem', count: 4 }, dist: { id: 'pamhc2crops:chickpeaitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:chilipepperseeditem', count: 4 }, dist: { id: 'pamhc2crops:chilipepperitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:coffeebeanseeditem', count: 4 }, dist: { id: 'pamhc2crops:coffeebeanitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:cornseeditem', count: 4 }, dist: { id: 'pamhc2crops:cornitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:cottonseeditem', count: 4 }, dist: { id: 'pamhc2crops:cottonitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:cranberryseeditem', count: 4 }, dist: { id: 'pamhc2crops:cucumberitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:eggplantseeditem', count: 4 }, dist: { id: 'pamhc2crops:eggplantitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:elderberryseeditem', count: 4 }, dist: { id: 'pamhc2crops:elderberryitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:flaxseeditem', count: 4 }, dist: { id: 'pamhc2crops:flaxitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:garlicseeditem', count: 4 }, dist: { id: 'pamhc2crops:garlicitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:gingerseeditem', count: 4 }, dist: { id: 'pamhc2crops:gingeritem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:grapeseeditem', count: 4 }, dist: { id: 'pamhc2crops:grapeitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:greengrapeseeditem', count: 4 }, dist: { id: 'pamhc2crops:greengrapeitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:huckleberryseeditem', count: 4 }, dist: { id: 'pamhc2crops:huckleberryitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:jicamaseeditem', count: 4 }, dist: { id: 'pamhc2crops:jicamaitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:juniperberryseeditem', count: 4 }, dist: { id: 'pamhc2crops:juniperberryitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:juteseeditem', count: 4 }, dist: { id: 'pamhc2crops:juteitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:kaleseeditem', count: 4 }, dist: { id: 'pamhc2crops:kaleitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:kenafseeditem', count: 4 }, dist: { id: 'pamhc2crops:kenafitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:kiwiseeditem', count: 4 }, dist: { id: 'pamhc2crops:kiwiitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:kohlrabiseeditem', count: 4 }, dist: { id: 'pamhc2crops:kohlrabiitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:leekseeditem', count: 4 }, dist: { id: 'pamhc2crops:leekitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:lentilseeditem', count: 4 }, dist: { id: 'pamhc2crops:lentilitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:lettuceseeditem', count: 4 }, dist: { id: 'pamhc2crops:lettuceitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:milletseeditem', count: 4 }, dist: { id: 'pamhc2crops:milletitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:mulberryseeditem', count: 4 }, dist: { id: 'pamhc2crops:mulberryitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:mustardseedsseeditem', count: 4 }, dist: { id: 'pamhc2crops:mustardseedsitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:oatsseeditem', count: 4 }, dist: { id: 'pamhc2crops:oatsitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:okraseeditem', count: 4 }, dist: { id: 'pamhc2crops:okraitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:onionseeditem', count: 4 }, dist: { id: 'pamhc2crops:onionitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:parsnipseeditem', count: 4 }, dist: { id: 'pamhc2crops:parsnipitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:peanutseeditem', count: 4 }, dist: { id: 'pamhc2crops:peanutitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:peasseeditem', count: 4 }, dist: { id: 'pamhc2crops:peasitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:pineappleseeditem', count: 4 }, dist: { id: 'pamhc2crops:pineappleitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:quinoaseeditem', count: 4 }, dist: { id: 'pamhc2crops:quinoaitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:radishseeditem', count: 4 }, dist: { id: 'pamhc2crops:radishitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:raspberryseeditem', count: 4 }, dist: { id: 'pamhc2crops:raspberryitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:rhubarbseeditem', count: 4 }, dist: { id: 'pamhc2crops:rhubarbitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:riceseeditem', count: 4 }, dist: { id: 'pamhc2crops:riceitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:rutabagaseeditem', count: 4 }, dist: { id: 'pamhc2crops:rutabagaitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:ryeseeditem', count: 4 }, dist: { id: 'pamhc2crops:ryeitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:scallionseeditem', count: 4 }, dist: { id: 'pamhc2crops:scallionitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:sesameseedsseeditem', count: 4 }, dist: { id: 'pamhc2crops:sesameseedsitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:sisalseeditem', count: 4 }, dist: { id: 'pamhc2crops:sisalitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:soybeanseeditem', count: 4 }, dist: { id: 'pamhc2crops:soybeanitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:spiceleafseeditem', count: 4 }, dist: { id: 'pamhc2crops:spiceleafitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:spinachseeditem', count: 4 }, dist: { id: 'pamhc2crops:spinachitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:strawberryseeditem', count: 4 }, dist: { id: 'pamhc2crops:strawberryitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:sweetpotatoseeditem', count: 4 }, dist: { id: 'pamhc2crops:sweetpotatoitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:taroseeditem', count: 4 }, dist: { id: 'pamhc2crops:taroitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:tealeafseeditem', count: 4 }, dist: { id: 'pamhc2crops:tealeafitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:tomatilloseeditem', count: 4 }, dist: { id: 'pamhc2crops:tomatilloitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:tomatoseeditem', count: 4 }, dist: { id: 'pamhc2crops:tomatoitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:turnipseeditem', count: 4 }, dist: { id: 'pamhc2crops:turnipitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:waterchestnutseeditem', count: 4 }, dist: { id: 'pamhc2crops:waterchestnutitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:whitemushroomseeditem', count: 4 }, dist: { id: 'pamhc2crops:whitemushroomitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:wintersquashseeditem', count: 4 }, dist: { id: 'pamhc2crops:wintersquashitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:zucchiniseeditem', count: 4 }, dist: { id: 'pamhc2crops:zucchiniitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:alfalfaseeditem', count: 4 }, dist: { id: 'pamhc2crops:alfalfaitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:barrelcactusseeditem', count: 4 }, dist: { id: 'pamhc2crops:barrelcactusitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:canolaseeditem', count: 4 }, dist: { id: 'pamhc2crops:canolaitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:cattailseeditem', count: 4 }, dist: { id: 'pamhc2crops:cattailitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:chiaseeditem', count: 4 }, dist: { id: 'pamhc2crops:chiaitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:cloudberryseeditem', count: 4 }, dist: { id: 'pamhc2crops:cloudberryitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:lotusseeditem', count: 4 }, dist: { id: 'pamhc2crops:lotusitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:nettlesseeditem', count: 4 }, dist: { id: 'pamhc2crops:nettlesitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:nopalesseeditem', count: 4 }, dist: { id: 'pamhc2crops:nopalesitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:sorghumseeditem', count: 4 }, dist: { id: 'pamhc2crops:sorghumitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:truffleseeditem', count: 4 }, dist: { id: 'pamhc2crops:truffleitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:wolfberryseeditem', count: 4 }, dist: { id: 'pamhc2crops:wolfberryitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:yuccaseeditem', count: 4 }, dist: { id: 'pamhc2crops:yuccaitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:bokchoyseeditem', count: 4 }, dist: { id: 'pamhc2crops:bokchoyitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:calabashseeditem', count: 4 }, dist: { id: 'pamhc2crops:calabashitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:guaranaseeditem', count: 4 }, dist: { id: 'pamhc2crops:guaranaitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:papyrusseeditem', count: 4 }, dist: { id: 'pamhc2crops:papyrusitem', count: 16 }, optDist: [] },
    { seed: { id: 'pamhc2crops:sunchokeseeditem', count: 4 }, dist: { id: 'pamhc2crops:sunchokeitem', count: 16 }, optDist: [] },
    // for Appending
    { seed: { id: '<PH>', count: 4 }, dist: { id: '<PH>', count: 16 }, optDist: [] },
  ].forEach(crop => {
    distCropsGHRecipes(crop.seed, crop.dist, crop.optDist);
  });

  // メープルシロップの樹木ブロックからの追加生成
});
