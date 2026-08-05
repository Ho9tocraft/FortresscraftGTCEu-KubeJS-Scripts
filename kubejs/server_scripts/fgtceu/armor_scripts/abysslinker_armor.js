const attireRunning = (player, stack) => {
    const { injectIntoAny } = global.fgtceuHelpers.botaniaMana;
    injectIntoAny(player, 5, stack);
};

PlayerEvents.tick(event => {
    const { fullSetAttires, fgtceuHelpers } = global;
    const { abysslinker } = fullSetAttires;
    const { inHeadPL, inChestPL, inLegsPL, inFeetPL, getAttireFullPL } = fgtceuHelpers.armorSetEvent;
    const tPlayer = event.player;
    if (!tPlayer || tPlayer.level.isClientSide()) return;
    const inventorySlots = getAttireFullPL(tPlayer);
    if ((tPlayer.age % 20) != 0) return;
    if (inventorySlots.head.id == abysslinker.head) attireRunning(tPlayer, inventorySlots.head);
    if (inventorySlots.chest.id == abysslinker.chest) attireRunning(tPlayer, inventorySlots.chest);
    if (inventorySlots.legs.id == abysslinker.legs) attireRunning(tPlayer, inventorySlots.legs);
    if (inventorySlots.feat.id == abysslinker.feet) attireRunning(tPlayer, inventorySlots.feet);
});
