
PlayerEvents.tick(event => {
  const attireRunning = (player, stack) => {
    const { injectIntoAny } = global.fgtceuHelpers.botaniaMana;
    injectIntoAny(player, 20, stack);
  };

  const { fullSetAttires, fgtceuHelpers } = global;
  const { abysslinker } = fullSetAttires;
  const { inHeadPL, inChestPL, inLegsPL, inFeetPL, getAttirePL } = fgtceuHelpers.armorSetEvent;
  const tPlayer = event.player;
  if (!tPlayer || tPlayer.level.isClientSide()) return;
  const inventorySlots = getAttirePL(tPlayer);
  if ((tPlayer.age % 4) != 0) return;
  if (inHeadPL(tPlayer, abysslinker)) attireRunning(tPlayer, inventorySlots.head);
  if (inChestPL(tPlayer, abysslinker)) attireRunning(tPlayer, inventorySlots.chest);
  if (inLegsPL(tPlayer, abysslinker)) attireRunning(tPlayer, inventorySlots.legs);
  if (inFeetPL(tPlayer, abysslinker)) attireRunning(tPlayer, inventorySlots.feet);
});
