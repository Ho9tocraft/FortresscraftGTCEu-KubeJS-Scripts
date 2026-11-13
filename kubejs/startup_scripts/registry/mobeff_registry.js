// ステータス効果
StartupEvents.registry('mob_effect', event => {
  // アビス
  event.create('abyss')
    .beneficial()
    .color(0x4d4398);
  // 励起する魂
  event.create('rising_soul')
    .beneficial()
    .color(0xf7c114)
    .effectTick((entity, amplifier) => {
      const { $MagicData: MagicData, $PacketDistributor: PDist, $SyncManaPacket: SMPacket } = global.loadingStartupClasses.ISSB;
      const REGEN_INTERVAL = 120; // 6 sec (20 ticks = 1 sec)
      const REGEN_RATE = 0.01; // 1％
      const regenAmount = (max) => Math.max(1, Math.floor(max * REGEN_RATE));
      
      if (entity.level.clientSide || !entity.isPlayer() || !entity.isAlive()) return;
      if (entity.age % REGEN_INTERVAL !== 0) return;

      // HP回復
      const maxHP = entity.getMaxHealth();
      if (entity.getHealth() < maxHP) entity.heal(regenAmount(maxHP));

      // MP回復
      const maxMP = entity.getAttributeValue('irons_spellbooks:max_mana');
      const data = MagicData.getPlayerMagicData(entity);
      const currentMP = data.getMana();

      if (maxMP > 0 && currentMP < maxMP) {
        data.setMana(Math.min(maxMP, currentMP + regenAmount(maxMP)));
        PDist.sendToPlayer(entity, new SMPacket(data));
      }
    });
});
