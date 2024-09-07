require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');
const Groq = require('groq-sdk');
const client = new Client();
const eightBallCommand = require('./instructions/8ball');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const configPath = path.join(__dirname, 'config.json');
let config = {
  prefix: "$",
  llm_instructions: [
    {
      "role": "system",
      "content": "You are a helpful assistant that provides concise and accurate answers."
    }
  ]
};

// Load the config file if it exists
if (fs.existsSync(configPath)) {
  config = require(configPath);
}

// Initialize nuke status
client.nukeActive = false;

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Store commands in a Map
client.commands = new Map();

// Dynamically load command files from the instructions folder
const commandFiles = fs.readdirSync('./instructions').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./instructions/${file}`);
  client.commands.set(command.name, command);
  // Add aliases to the Map for easy lookup
  if (command.aliases) {
    for (const alias of command.aliases) {
      client.commands.set(alias, command);
    }
  }
}

client.on('messageCreate', async (message) => {
  if (message.author.id === client.user.id) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (client.commands.has(commandName)) {
    try {
      await client.commands.get(commandName).execute(message, args, config, groq, client);
    } catch (error) {
      console.error(`Error executing ${commandName}:`, error);
    }
  } else {
    // Only send "Unknown command" message if the command is not found
    message.channel.send('Unknown command. Use `$help` to see all available commands.');
  }
});
client.login(process.env.TOKEN);
