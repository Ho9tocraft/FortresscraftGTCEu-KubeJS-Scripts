//ignored: true
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
  if (true) return; // FAIL SAFE, DO NOT COPY

  const { $IO: GTIO } = global.loadingStartupClasses.GTCEu;
  const {} = global.FGTCEuAddedRecipeType;

   event.create('recipe_var')
    .category('category')
    .setEUIO('EU in / out')
    .setMaxIOSize(0, 0, 0, 0) // Item IN / Item OUT / Fluid IN / Fluid OUT
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.FURNACE);
});

GTCEuStartupEvents.registry('gtceu:machine', event => {
  if (true) return; // FAIL SAFE, DO NOT COPY

  const {} = global.FGTCEuAddedRecipeType;
  const { outTranslatableString } = global.FGTCEuCommonStartupFunctions;
  const {} = global.FGTCEuCommonStartupFunctions.FGTCEuMachineMods; // any Extra Modifiers
  const { Casings, Controllers } = global.FGTCEuResLocCode.GTCEu;
  const {} = global.loadingStartupClasses.GTCEu; // any Loaded Startup Classes
});
