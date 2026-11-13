
PlayerEvents.tick(event => {
  const { fullSetAttires, fgtceuHelpers } = global;
  const { divine } = fullSetAttires;
  const { inHeadPL, inChestPL, inLegsPL, inFeetPL, getAttirePL } = fgtceuHelpers.armorSetEvent;
  const tPlayer = event.player;
  if (!tPlayer || tPlayer.level.isClientSide()) return;

  const attireRunDivine = (player, stack) => {
    const { injectIntoAny } = global.fgtceuHelpers.botaniaMana;
    injectIntoAny(player, 60, stack);
    tPlayer.potionEffects.add('kubejs:rising_soul', 310, 0, true, false);
  };

  const inventorySlots = getAttirePL(tPlayer);
  if ((tPlayer.age % 4) != 0) return;
  if (inHeadPL(tPlayer, divine)) attireRunDivine(tPlayer, inventorySlots.head);
  if (inChestPL(tPlayer, divine)) attireRunDivine(tPlayer, inventorySlots.chest);
  if (inLegsPL(tPlayer, divine)) attireRunDivine(tPlayer, inventorySlots.legs);
  if (inFeetPL(tPlayer, divine)) attireRunDivine(tPlayer, inventorySlots.feet);
});
