// requires: curios
const ABYSSLINKER_MAGIC_CIRCLE = 'kubejs:abysslinker_magic_circle';
PlayerEvents.tick(event => {
  const { curiosAPIInv, botaniaMana } = global.fgtceuHelpers;
  const tPlayer = event.player;
  if (!tPlayer || tPlayer.level.isClientSide()) return;
  if (tPlayer.age % 10 != 0) return;
  if (curiosAPIInv.isCuriosEquipped(tPlayer, ABYSSLINKER_MAGIC_CIRCLE)) {
    tPlayer.potionEffects.add('kubejs:abyss', 300, 0, true, false);
    botaniaMana.injectIntoAny(tPlayer, 5, curiosAPIInv.getCuriosMatched(tPlayer, ABYSSLINKER_MAGIC_CIRCLE).get().getRight());
  }
});
