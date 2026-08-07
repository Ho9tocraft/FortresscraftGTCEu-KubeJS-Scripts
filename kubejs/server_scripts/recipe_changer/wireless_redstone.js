// Wireless Redstone
// こちらは逆に易化
ServerEvents.recipes(event => {
  const transmitter = 'wirelessredstone:redstone_transmitter';
  const receiver = 'wirelessredstone:redstone_receiver';
  const p2ptransmitter = 'wirelessredstone:p2p_redstone_transmitter';
  const p2preceiver = 'wirelessredstone:p2p_redstone_receiver';
  const tool = 'wirelessredstone:frequency_tool';
  const sniffer = 'wirelessredstone:frequency_sniffer';
  const remote = 'wirelessredstone:remote';
  const linker = 'wirelessredstone:linker';

  const replaceRecipes = (replaceMaterial, replaceCallback) => {
    event.remove([{ input: replaceMaterial }, { output: replaceMaterial }]);
    replaceCallback();
  };
  replaceRecipes('wirelessredstone:circuit', () => {
    event.shaped(transmitter, [
      'ABA',
      'BCB',
      'ABA'
    ], {
      A: '#forge:double_plates/molybdenum',
      B: 'projectred_transmission:red_alloy_wire',
      C: 'minecraft:redstone_torch'
    });
    event.shaped(receiver, [
      'ABA',
      'BCB',
      'ABA'
    ], {
      A: '#forge:double_plates/molybdenum',
      B: 'projectred_transmission:red_alloy_wire',
      C: 'minecraft:lever'
    });
    event.shaped(p2ptransmitter, [
      'ABA',
      'BCB',
      'ABA'
    ], {
      A: '#forge:double_plates/annealed_copper',
      B: 'minecraft:redstone_torch',
      C: '#gtceu:circuits/ulv'
    });
    event.shaped(p2preceiver, [
      'ABA',
      'BCB',
      'ABA'
    ], {
      A: '#forge:double_plates/annealed_copper',
      B: 'projectred_transmission:red_alloy_wire',
      C: '#gtceu:circuits/ulv'
    });
    event.shaped(tool, [
      'ABA',
      'CDC',
      ' C '
    ], {
      A: 'projectred_transmission:red_alloy_wire',
      B: 'minecraft:comparator',
      C: '#forge:plates/silver',
      D: '#gtceu:circuits/ulv'
    });
    event.shaped(sniffer, [
      'ABA',
      'ACA',
      'ADA'
    ], {
      A: '#forge:plates/silver',
      B: 'wirelessredstone:redstone_receiver',
      C: '#gtceu:circuits/ulv',
      D: 'minecraft:comparator'
    });
    event.shaped(remote, [
      'A',
      'B'
    ], {
      A: 'minecraft:redstone_torch',
      B: 'wirelessredstone:redstone_transmitter'
    });
    event.shaped(linker, [
      'ABA',
      'CDC',
      'EBE'
    ], {
      A: 'minecraft:redstone_torch',
      B: '#forge:gems/amethyst',
      C: '#forge:plates/silver',
      D: '#gtceu:circuits/ulv',
      E: 'projectred_transmission:red_alloy_wire'
    });
  });
});
