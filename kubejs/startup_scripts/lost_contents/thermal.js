/**
 * Item Registry for Lost Contents
 */

/**
 * Macro for ResourceLocation
 * @param {String} location 
 * @returns String for Resource Location
 */
let FormResourceLocation = (location) => { return `kubejs:item/${location}`; };

StartupEvents.registry('item', event => {
  // Thermal: Aerotheum, Cryotheum, Petrotheum, Pyrotheum, Primal Mana
  const ThermalLCBlend = ['aerotheum', 'cryotheum', 'petrotheum', 'pyrotheum'];
  ThermalLCBlend.forEach((blend) => {
    event.create(`${blend}_dust`).texture(FormResourceLocation(`${blend}_blend`));
  });
  event.create('primal_mana').rarity('epic');
});
