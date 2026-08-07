
PlayerEvents.tick(event => {
  const { fgtceuHelpers, fullSetAttires } = global;
  const tPlayer = event.player;
  if (!tPlayer || tPlayer.level.isClientSide()) return;
  if (tPlayer.age % 10 != 0) return;
  if (fgtceuHelpers.armorSetEvent.hasFullSet(tPlayer, fullSetAttires.abysslinker)) {
    if (!tPlayer.isCreative() && !tPlayer.isSpectator()) {
      tPlayer.abilities.mayfly = true;
      tPlayer.onUpdateAbilities();
    }
    tPlayer.potionEffects.add('minecraft:fire_resistance', 300, 3, true, false);
    tPlayer.potionEffects.add('minecraft:resistance', 300, 2, true, false);
    tPlayer.potionEffects.add('minecraft:regeneration', 300, 1, true, false);
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
  if (server.tickCount % 10 != 0) return;
  server.entities.filterSelector('@e[type=!player,type=!irons_spellbooks:necromancer]').forEach((entity) => {
    if (!(entity.potionEffects && entity.getItemBySlot)) return;
    if (global.fgtceuHelpers.armorSetEvent.hasMobFullSet(entity, fullSetAttires.abysslinker)) {
      entity.potionEffects.add('minecraft:fire_resistance', 300, 3, true, false);
      entity.potionEffects.add('minecraft:resistance', 300, 2, true, false);
      entity.potionEffects.add('minecraft:regeneration', 300, 1, true, false);
    }
  });
});
