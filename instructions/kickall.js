module.exports = {
  name: 'kickall',
  description: 'Kicks all members in the server that can be kicked by the user.',
  async execute(message, args, config) {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      return message.reply(':warning: You do not have permission to use this command.');
    }

    const guild = message.guild;
    const confirmMessage = await message.reply('❗❕ Are you sure you want to kick all members? Type `yes` to confirm.');
    const filter = response => response.author.id === message.author.id && response.content.toLowerCase() === 'yes';

    try {
      const collected = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] });
      if (!collected.size) {
        return confirmMessage.edit('❗ Operation cancelled due to timeout.');
      }

      const members = guild.members.cache;
      let kickedCount = 0;

      for (const [id, member] of members) {
        if (member.kickable) {
          try {
            await member.kick('Kicked by bot command');
            kickedCount++;
          } catch (error) {
            console.error(`Failed to kick member ${member.user.tag}:`, error);
          }
        }
      }

      message.channel.send(`✔ Kicked ${kickedCount} members successfully.`);
    } catch (error) {
      console.error('Error during confirmation or kicking:', error);
      confirmMessage.edit('❌ An error occurred while executing the command.');
    }
  },
};
