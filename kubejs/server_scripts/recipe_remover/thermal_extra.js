/**
 * Recipe Remover for Thermal Extra
 */
ServerEvents.recipes(event => {
  // Remove ALL Thermal Extra recipes
  event.remove({ mod: 'thermal_extra' });
});
