let isNuking = false;

module.exports = {
  name: 'stopnuke',
  description: 'Stops the ongoing nuke operation.',
  async execute(message, args, config) {
    if (!isNuking) {
      return message.reply('No nuke operation is currently in progress.');
    }

    isNuking = false; // Stop the nuke operation
    message.reply('Nuke operation has been stopped.');
  },
};
