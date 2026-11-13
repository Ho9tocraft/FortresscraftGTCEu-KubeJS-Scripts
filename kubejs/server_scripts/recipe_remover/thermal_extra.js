/**
 * Recipe Remover for Thermal, Thermal Extra
 */
ServerEvents.recipes(event => {
  // Remove ALL Thermal Extra recipes
  event.remove({ mod: 'thermal_extra' });
  event.remove({ type: 'thermal:press', input: 'thermal:press_coin_die' });
});
