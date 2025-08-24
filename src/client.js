const { Client } = require("discord.js-selfbot-v13");
const { loadConfig } = require("./config");
const { createGroq } = require("./groq");
const { loadCommands } = require("./commandLoader");
const { createMessageHandler } = require("./messageHandler");
const { info } = require("./logger");

function bootstrap() {
  const client = new Client();
  const config = loadConfig();
  const groq = createGroq();
  const commands = loadCommands(process.cwd());

  // custom instance state
  client.nukeActive = false;
  client.commands = commands;

  client.once("ready", () => {
    info(`Logged in as ${client.user.tag}!`);
  });

  const onMessage = createMessageHandler({ client, config, groq, commands });
  client.on("messageCreate", onMessage);

  const token = process.env.TOKEN;
  if (!token) {
    throw new Error("Missing TOKEN in environment. Set it in .env");
  }
  client.login(token);

  return { client, config, commands, groq };
}

module.exports = { bootstrap };
