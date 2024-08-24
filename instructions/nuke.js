let isNuking = false;

module.exports = {
  name: 'nuke',
  description: 'Deletes all channels in the server and creates new channels with @everyone mentions.',
  async execute(message, args, config) {
    if (isNuking) {
      return message.reply('A nuke operation is already in progress.');
    }

    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
      return message.reply('You do not have the required permissions to use this command.');
    }

    const amount = parseInt(args[0], 10);
    if (isNaN(amount) || amount <= 0 || amount > 100) {
      return message.reply('Please provide a valid number of channels to create (1-100).');
    }

    isNuking = true; // Set the flag to indicate nuke operation is ongoing

    const guild = message.guild;

    // Delete all channels
    const channels = guild.channels.cache;
    for (const channel of channels.values()) {
      if (!isNuking) break; 

      try {
        await channel.delete();
      } catch (error) {
        console.error(`Failed to delete channel ${channel.name}:`, error);
      }
    }

    // Create new channels and send @everyone mentions
    for (let i = 0; i < amount; i++) {
      if (!isNuking) break; 

      try {
        const channel = await guild.channels.create(`channel-${i + 1}`, { type: 'text' });
        
        for (let j = 0; j < 20; j++) {
          if (!isNuking) break; // Stop if the nuke operation was cancelled

          await channel.send(`@everyone This is message number ${j + 1} in channel ${i + 1}`);
        }
      } catch (error) {
        console.error(`Failed to create channel ${i + 1}:`, error);
      }
    }

    isNuking = false; // Reset the flag when done
    message.reply(`Deleted all channels and created ${amount} new channels with @everyone mentions successfully!`);
  },
};
