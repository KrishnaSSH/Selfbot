module.exports = {
  name: 'help',
  async execute(message, args, config) {
    const commands = [
      { name: '🤖bump', description: ' Sends the /bump command immediately and starts sending it at random intervals.' },
      { name: '⛔bumpbreak', description: ' Stops sending the /bump command in the current channel.' },
      { name: '🏓ping', description: ' Responds with the latency in milliseconds.' },
      { name: '🖼️avatar', description: ' Shows the avatar of the specified user or your own avatar if no argument is provided.' },
      { name: '🔨prefix', description: 'Shows the current command prefix.' },
      { name: '🛠️setprefix', description: ' Sets a new command prefix.' },
      { name: '🧹purgeme', description: ' Deletes your messages from the channel.' },
      { name: '💬llm', description: ' Uses Groq API to process a question and replies with the answer.' },
      { name: '🎮activity', description: ' Allows you to set custom activities such as playing, listening, or streaming.' },
      { name: '✂️rpc', description: ' Plays rock paper scissors.' },
      { name: '📢spam', description: ' Sends a specified message a given number of times.' },
      { name: '💥nuke', description: ' Deletes all existing channels, creates new channels, and keeps pinging everyone in all the channels.' },
      { name: '🗑️delete', description: ' Deletes all channels and categories in the server.' },
      { name: '🚫banall', description: ' Bans all members that can be banned by the user in the server.' },
      { name: '📵status', description: ' Sets your Discord status. Usage: `$status set <online/dnd/invisible/idle>`' }
    ];

    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const command = commands.find(cmd => cmd.name === commandName);

      if (command) {
        let response = `**ℹ️ Help for ${config.prefix}${command.name}:**\n${command.description}\n`;
        
        switch (command.name) {
          case 'bump':
            response += `**📋 Usage:** \`${config.prefix}bump\``;
            break;
          case 'bumpbreak':
            response += `**📋 Usage:** \`${config.prefix}bumpbreak\``;
            break;
          case 'ping':
            response += `**📋 Usage:** \`${config.prefix}ping\``;
            break;
          case 'avatar':
            response += `**📋 Usage:** \`${config.prefix}avatar [user]\`\n**📝 Example:** \`${config.prefix}avatar @user\``;
            break;
          case 'prefix':
            response += `**📋 Usage:** \`${config.prefix}prefix\``;
            break;
          case 'setprefix':
            response += `**📋 Usage:** \`${config.prefix}setprefix <newprefix>\`\n**📝 Example:** \`${config.prefix}setprefix !\``;
            break;
          case 'purgeme':
            response += `**📋 Usage:** \`${config.prefix}purgeme <number>\`\n**📝 Example:** \`${config.prefix}purgeme 10\``;
            break;
          case 'llm':
            response += `**📋 Usage:** \`${config.prefix}llm <question>\`\n**📝 Example:** \`${config.prefix}llm What is the weather today?\``;
            break;
          case 'spam':
            response += `**📋 Usage:** \`${config.prefix}spam <amount> <message>\`\n**📝 Example:** \`${config.prefix}spam 5 Hello world\``;
            break;
          case 'nuke':
            response += `**📋 Usage:** \`${config.prefix}nuke\`\n` +
                        `**💥 Description:** Deletes all existing channels and categories, then creates up to 500 new channels and sends @everyone pings in each channel.`;
            break;
          case 'delete':
            response += `**📋 Usage:** \`${config.prefix}delete\`\n` +
                        `**🗑️ Description:** Deletes all channels and categories in the server.`;
            break;
          case 'banall':
            response += `**📋 Usage:** \`${config.prefix}banall\`\n` +
                        `**🚫 Description:** Bans all members that can be banned by the user in the server.`;
            break;
          case 'rpc':
            response += `**📋 Usage:** \`${config.prefix}rpc\`\n` +
                        `**✂️ Description:** Allows you to play rock paper and scissors.`;
            break;
          case 'activity':
            response += `**📋 Usage:** \`${config.prefix}activity <type> <activity>\`\n` +
                        `**🎮 Description:** Allows you to set custom activities such as playing, listening, streaming ... `;
            break;
          case 'status':
            response += `**📋 Usage:** \`${config.prefix}status set <online/dnd/invisible/idle>\`\n` +
                        `**📡 Description:** Sets your Discord status.`;
            break;
        }

        return message.channel.send(response);
      } else {
        return message.channel.send('❌ Unknown command. Use `$help` to see all available commands.');
      }
    }

    let helpMessage = '**📝 Available Commands:**\n';
    commands.forEach(cmd => {
      helpMessage += `\`${config.prefix}${cmd.name}\`: ${cmd.description}\n`;
    });
    helpMessage += '**ℹ️ Usage:** Use `$help <command>` to get detailed information about a specific command.';

    message.channel.send(helpMessage);
  }
};
