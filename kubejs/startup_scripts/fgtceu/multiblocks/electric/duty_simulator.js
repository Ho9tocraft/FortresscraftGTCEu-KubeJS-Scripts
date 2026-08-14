//requires: gtceu
//requires: hostilenetworks
/**
 * 極討滅戦シミュレーター (Duty Simulator): includes HNN
 * -----------------------------------------------------
 */
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
  const { $IO: GTIO } = global.loadingStartupClasses.GTCEu;
  const { DutySimulator, NeuralnetMSCCalc: MSCCalc, NeuralnetMSCFab: MSCFab } = global.FGTCEuAddedRecipeType;

  // Duty Simulator
  event.create(DutySimulator)
    .category('multiblock')
    .setEUIO(GTIO.IN)
    .setMaxIOSize(9, 9, 3, 3) // Item IN / Item OUT / Fluid IN / Fluid OUT
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.COMBUSTION);

  // Neuralnet Mob Simulation Computer Calculator
  event.create(MSCCalc)
    .category('multiblock')
    .setEUIO(GTIO.IN)
    .setMaxIOSize(2, 2, 0, 0)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.COMPUTATION);

  // Neuralnet Mob Simulation Computer Fabricator
  event.create(MSCFab)
    .category('multiblock')
    .setEUIO(GTIO.IN)
    .setMaxIOSize(2, 2, 0, 0)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.COMPUTATION);
});

GTCEuStartupEvents.registry('gtceu:machine', event => {
  const { DutySimulator, NeuralnetMSCCalc: MSCCalc, NeuralnetMSCFab: MSCFab } = global.FGTCEuAddedRecipeType;
  const { outTranslatableString } = global.FGTCEuCommonStartupFunctions;
});
