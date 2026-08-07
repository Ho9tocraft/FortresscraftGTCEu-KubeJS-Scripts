PlayerEvents.tick(event => {
  const ResLc = Java.loadClass('net.minecraft.resources.ResourceLocation');
  const BIReg = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
  const AttrM = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier');
  const UUIDs = Java.loadClass('java.util.UUID');
  const Oprte = AttrM.Operation;

  const getAttrRL = (id) => { return BIReg.ATTRIBUTE.get(new ResLc(id)); }
  const effAttr = {
    baseId: 'kubejs:abyss',
    SPPOW: {
      attrId: getAttrRL('irons_spellbooks:spell_power'),
      attrUuid: UUIDs.fromString('338f3c6c-684c-472e-93b5-62a3b6ca63ed'),
      attrEff: 0.03
    },
    MaxMP: {
      attrId: getAttrRL('irons_spellbooks:max_mana'),
      attrUuid: UUIDs.fromString('d4d0c70b-afb7-49ac-9efb-042ca8637cfb'),
      attrEff: 0.05
    }
  };
  const isNight = (pPlayer) => {
    const mcTime = pPlayer.level.getDayTime() % 24000;
    return mcTime >= 16000 && mcTime < 22000;
  };
  const upsert = (pPlayer, pAttr, pUuid, pName, pAmount, pOprte) => {
    if (!pAttr) return;
    let inst = pPlayer.getAttribute(pAttr);
    if (!inst) return;
    inst.removeModifier(pUuid);
    inst.addTransientModifier(new AttrM(pUuid, pName, pAmount, pOprte));
  }
  const remove = (pPlayer, pAttr, pUuid) => {
    if (!pAttr) return;
    let inst = pPlayer.getAttribute(pAttr);
    if (!inst) return;
    inst.removeModifier(pUuid);
  };

  const { player } = event;
  if (!player) return;
  if (player.level && player.level.isClientSide()) return;
  if (player.potionEffects.isActive(effAttr.baseId) && isNight(player)) {
    upsert(player, effAttr.SPPOW.attrId, effAttr.SPPOW.attrUuid, 'abyss_eff_sppow', effAttr.SPPOW.attrEff, Oprte.MULTIPLY_TOTAL);
    upsert(player, effAttr.MaxMP.attrId, effAttr.MaxMP.attrUuid, 'abyss_eff_maxmp', effAttr.MaxMP.attrEff, Oprte.MULTIPLY_TOTAL);
  } else {
    remove(player, effAttr.SPPOW.attrId, effAttr.SPPOW.attrUuid);
    remove(player, effAttr.MaxMP.attrId, effAttr.MaxMP.attrUuid);
  }
});
