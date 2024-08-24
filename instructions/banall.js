module.exports = {
    name: 'banall',
    description: 'Bans all members in the server that can be banned by the user.',
    async execute(message, args, config) {
      if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.reply('You do not have permission to use this command.');
      }
  
      const guild = message.guild;
  

      const confirmMessage = await message.reply('Are you sure you want to ban all members? Type `yes` to confirm.');
      const filter = response => response.author.id === message.author.id && response.content.toLowerCase() === 'yes';
      
      try {
        const collected = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] });
        if (!collected.size) {
          return confirmMessage.edit('Operation cancelled due to timeout.');
        }
  
        // Iterate over members and ban them if possible
        const members = guild.members.cache;
        let bannedCount = 0;
  
        for (const [id, member] of members) {
          if (member.bannable) {
            try {
              await member.ban({ reason: 'Banned by bot command' });
              bannedCount++;
            } catch (error) {
              console.error(`Failed to ban member ${member.user.tag}:`, error);
            }
          }
        }
  
        message.channel.send(`Banned ${bannedCount} members successfully.`);
      } catch (error) {
        console.error('Error during confirmation or banning:', error);
        confirmMessage.edit('An error occurred while executing the command.');
      }
    },
  };
  