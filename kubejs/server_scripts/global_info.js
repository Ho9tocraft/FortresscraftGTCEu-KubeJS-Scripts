// priority: 9000

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
        // for Player
        inHeadPL (player, targerArmorSet) {
            return this.getAttirePartPL(player, 'head').id == targerArmorSet.head;
        },
        inChestPL (player, targerArmorSet) {
            return this.getAttirePartPL(player, 'chest').id == targerArmorSet.chest;
        },
        inLegsPL (player, targerArmorSet) {
            const { inventory: inv } = player;
            return this.getAttirePartPL(player, 'legs').id == targerArmorSet.legs;
        },
        inFeetPL (player, targerArmorSet) {
            const { inventory: inv } = player;
            return this.getAttirePartPL(player, 'feet').id == targerArmorSet.feet;
        },
        // for Non-Player
        inHeadEnt (entity, targetArmorSet) {
            const { EquipSlot } = loadingClasses;
            const { idOf } = itemUtil;
            return idOf(entity.getItemBySlot(EquipSlot.HEAD)) == targetArmorSet.head;
        },
        inChestEnt (entity, targetArmorSet) {
            const { EquipSlot } = loadingClasses;
            const { idOf } = itemUtil;
            return idOf(entity.getItemBySlot(EquipSlot.CHEST)) == targetArmorSet.chest;
        },
        inLegsEnt (entity, targetArmorSet) {
            const { EquipSlot } = loadingClasses;
            const { idOf } = itemUtil;
            return idOf(entity.getItemBySlot(EquipSlot.LEGS)) == targetArmorSet.legs;
        },
        inFeetEnt (entity, targetArmorSet) {
            const { EquipSlot } = loadingClasses;
            const { idOf } = itemUtil;
            return idOf(entity.getItemBySlot(EquipSlot.FEET)) == targetArmorSet.feet;
        },
        // check FullSet
        hasFullSet (player, targetArmorSet) { // for Player
            return this.inHeadPL(player, targetArmorSet) &&
                this.inChestPL(player, targetArmorSet) &&
                this.inLegsPL(player, targetArmorSet) &&
                this.inFeetPL(player, targetArmorSet);
        },
        hasMobFullSet (entity, targetArmorSet) { // for Non-Player
            return this.inHeadEnt(entity, targetArmorSet) &&
                this.inChestEnt(entity, targetArmorSet) &&
                this.inLegsEnt(entity, targetArmorSet) &&
                this.inFeetEnt(entity, targetArmorSet);
        },
        getAttireFullPL (player) {
            const { get } = player.inventory.armor;
            return {
                head: get(3),
                chest: get(2),
                legs: get(1),
                feet: get(0)
            };
        },
        getAttirePartPL (player, targetSlot) {
            return this.getAttireFullPL(player)[targetSlot];
        },
    },
    botaniaMana: {
        injectIntoAny: (player, amount, provide) => { // Generate Botania's Mana
            const { IMana } = loadingClasses;
            const sent = IMana.instance().dispatchMana(
                provide, player, amount, true
            );
            return sent;
        },
        ejectIntoAny: (player, amount, consume) => { // Consume Botania's Mana
        }
    },
    curiosAPIInv: {
        getCuriosMatched: (player, itemId) => {
            const { CuriosApi } = loadingClasses;
            const helper = CuriosApi.getCuriosHelper();
            const res = helper.findEquippedCurio(Item.of(itemId), player);
            return res;
        },
        isCuriosEquipped: (player, itemId) => {
            const res = getCuriosMatched(player, itemId);
            return res && res.isPresent();
        }
    },
    itemUtil: {
        idOf: (stack) => {
            const { BIReg } = loadingClasses;
            return String(BIReg.ITEM.getKey(stack.getItem()));
        },
    },
};
