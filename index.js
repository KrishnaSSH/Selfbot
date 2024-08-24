const fs = require('fs');
const path = require('path');

// Other existing code

client.commands = new Map();
const commandFiles = fs.readdirSync('./instructions').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./instructions/${file}`);
  client.commands.set(command.name, command);
}

// Existing code
client.on('messageCreate', async (message) => {
  if (message.author.id !== client.user.id) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (client.commands.has(commandName)) {
    try {
      await client.commands.get(commandName).execute(message, args, config);
    } catch (error) {
      console.error(`Error executing ${commandName}:`, error);
    }
  } else {
    message.channel.send('Unknown command. Use the help command to see all available commands.');
  }
});

// Existing code
client.login(process.env.TOKEN);
