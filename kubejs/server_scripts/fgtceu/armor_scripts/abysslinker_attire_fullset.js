
PlayerEvents.tick(event => {
  const { fgtceuHelpers, fullSetAttires } = global;
  const tPlayer = event.player;
  if (!tPlayer || tPlayer.level.isClientSide()) return;
  if (tPlayer.age % 5 != 0) return;
  if (fgtceuHelpers.armorSetEvent.hasFullSet(tPlayer, fullSetAttires.abysslinker)) {
    if (!tPlayer.isCreative() && !tPlayer.isSpectator()) {
      tPlayer.abilities.mayfly = true;
      tPlayer.onUpdateAbilities();
    }
    tPlayer.potionEffects.add('minecraft:fire_resistance', 310, 3, true, false);
    tPlayer.potionEffects.add('minecraft:resistance', 310, 2, true, false);
    tPlayer.potionEffects.add('minecraft:regeneration', 310, 1, true, false);
    fgtceuHelpers.botaniaMana.injectIntoAny(tPlayer, 40, tPlayer.getItemBySlot('head'));
  } else {
    if (!tPlayer.isCreative() && !tPlayer.isSpectator() && tPlayer.abilities.mayfly) {
      tPlayer.abilities.flying = false;
      tPlayer.abilities.mayfly = false;
      tPlayer.onUpdateAbilities();
    }
  }
});

ServerEvents.tick(event => {
  const { fullSetAttires } = global;
  const { server } = event;
  if (server.tickCount % 5 != 0) return;
  server.entities.forEach((entity) => {
    // 条件1: ポーションエフェクト適用不可or装備スロットが存在しない場合
    if (!(entity.potionEffects && entity.getItemBySlot)) return;
    // 条件2: Modular Golems、プレイヤー、ISSBのモブ各種は除外
    if (/(?:^modulargolems|^minecraft:player$|^irons_spellbooks|^iss_)/.test(entity.type)) return;
    // 条件達成: 上記の条件を満たし、アビスリンカーのフルセットを装備している場合
    if (global.fgtceuHelpers.armorSetEvent.hasMobFullSet(entity, fullSetAttires.abysslinker)) {
      entity.potionEffects.add('minecraft:fire_resistance', 310, 3, true, false);
      entity.potionEffects.add('minecraft:resistance', 310, 2, true, false);
      entity.potionEffects.add('minecraft:regeneration', 310, 1, true, false);
    }
  });
});
