// priority: 20

// GLOBAL OBJECT


// --- 定数---
// 防具フルセット効果基準
global.fullSetAttires = {
    abysslinker: {
        head: 'kubejs:abysslinker_head', chest: 'kubejs:abysslinker_tunic',
        legs: 'kubejs:abysslinker_pants', feet: 'kubejs:abysslinker_boots'
    }
};
// Java Classのロード基準
global.loadingClasses = {
    BIReg: Java.loadClass('net.minecraft.core.registries.BuiltInRegistries'),
    CuriosApi: Java.loadClass('top.theillusivec4.curios.api.CuriosApi'),
    EquipSlot: Java.loadClass('net.minecraft.world.entity.EquipmentSlot'),
    IMana: Java.loadClass('vazkii.botania.api.mana.ManaItemHandler'),
};

// --- 関数 ---
global.fgtceuHelpers = {
    armorSetEvent: {
        inHeadPL (player, targerArmorSet) { // for Player
            return global.fgtceuHelpers.armorSetEvent.getAttirePL(player).head.id == targerArmorSet.head;
        },
        inChestPL (player, targerArmorSet) { // for Player
            return global.fgtceuHelpers.armorSetEvent.getAttirePL(player).chest.id == targerArmorSet.chest;
        },
        inLegsPL (player, targerArmorSet) { // for Player
            return global.fgtceuHelpers.armorSetEvent.getAttirePL(player).legs.id == targerArmorSet.legs;
        },
        inFeetPL (player, targerArmorSet) { // for Player
            return global.fgtceuHelpers.armorSetEvent.getAttirePL(player).feet.id == targerArmorSet.feet;
        },
        inHeadEnt (entity, targetArmorSet) { // for Non-Player
            const { EquipSlot } = global.loadingClasses;
            return global.fgtceuHelpers.itemUtil.idOf(entity.getItemBySlot(EquipSlot.HEAD)) == targetArmorSet.head;
        },
        inChestEnt (entity, targetArmorSet) { // for Non-Player
            const { EquipSlot } = global.loadingClasses;
            return global.fgtceuHelpers.itemUtil.idOf(entity.getItemBySlot(EquipSlot.CHEST)) == targetArmorSet.chest;
        },
        inLegsEnt (entity, targetArmorSet) { // for Non-Player
            const { EquipSlot } = global.loadingClasses;
            return global.fgtceuHelpers.itemUtil.idOf(entity.getItemBySlot(EquipSlot.LEGS)) == targetArmorSet.legs;
        },
        inFeetEnt (entity, targetArmorSet) { // for Non-Player
            const { EquipSlot } = global.loadingClasses;
            return global.fgtceuHelpers.itemUtil.idOf(entity.getItemBySlot(EquipSlot.FEET)) == targetArmorSet.feet;
        },
        hasFullSet (player, targetArmorSet) { // for Player
            return global.fgtceuHelpers.armorSetEvent.inHeadPL(player, targetArmorSet) &&
                global.fgtceuHelpers.armorSetEvent.inChestPL(player, targetArmorSet) &&
                global.fgtceuHelpers.armorSetEvent.inLegsPL(player, targetArmorSet) &&
                global.fgtceuHelpers.armorSetEvent.inFeetPL(player, targetArmorSet);
        },
        hasMobFullSet (entity, targetArmorSet) { // for Non-Player
            return global.fgtceuHelpers.armorSetEvent.inHeadEnt(entity, targetArmorSet) &&
                global.fgtceuHelpers.armorSetEvent.inChestEnt(entity, targetArmorSet) &&
                global.fgtceuHelpers.armorSetEvent.inLegsEnt(entity, targetArmorSet) &&
                global.fgtceuHelpers.armorSetEvent.inFeetEnt(entity, targetArmorSet);
        },
        getAttirePL (player) {
            return {
                head: player.inventory.armor.get(3),
                chest: player.inventory.armor.get(2),
                legs: player.inventory.armor.get(1),
                feet: player.inventory.armor.get(0)
            };
        },
    },
    botaniaMana: {
        injectIntoAny (player, amount, provide) { // Generate Botania's Mana
            const { IMana } = global.loadingClasses;
            const sent = IMana.instance().dispatchMana(
                provide, player, amount, true
            );
            return sent;
        },
        ejectIntoAny (player, amount, consume) { // Consume Botania's Mana
        }
    },
    curiosAPIInv: {
        getCuriosMatched (player, itemId) {
            const { CuriosApi } = global.loadingClasses;
            const helper = CuriosApi.getCuriosHelper();
            const res = helper.findEquippedCurio(Item.of(itemId), player);
            return res;
        },
        isCuriosEquipped (player, itemId) {
            const res = this.getCuriosMatched(player, itemId);
            return res && res.isPresent();
        }
    },
    itemUtil: {
        idOf (stack) {
            const { BIReg } = global.loadingClasses;
            return String(BIReg.ITEM.getKey(stack.getItem()));
        },
    },
};
