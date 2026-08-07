/**
 * Recipe Remover for Thermal Extra
 */
ServerEvents.recipes(event => {
  // Abyssal Material (for Abysslinker Mithril)
  event.remove({ output: 'thermal_extra:abyssal_ingot' });
  event.remove({ output: 'thermal_extra:abyssal_dust' });
  event.remove({ output: 'thermal_extra:abyssal_block' });
});
