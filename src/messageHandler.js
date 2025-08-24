const { UNKNOWN_COMMAND_MSG, ERROR_EXECUTING_MSG } = require("./constants");
const { error } = require("./logger");

function createMessageHandler({ client, config, groq, commands }) {
  return async function onMessage(message) {
    // Only respond to self (selfbot)
    if (message.author.id !== client.user.id) return;

    const content = message.content || "";
    if (!content.startsWith(config.prefix)) return;

    const args = content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = (args.shift() || "").toLowerCase();

    if (commands.has(commandName)) {
      try {
        const cmd = commands.get(commandName);
        await cmd.execute(message, args, config, groq, client);
      } catch (e) {
        error(`Error executing command ${commandName}:`, e);
        await message.channel.send(ERROR_EXECUTING_MSG).catch(() => {});
      }
    } else {
      await message.channel.send(UNKNOWN_COMMAND_MSG).catch(() => {});
    }
  };
}

module.exports = { createMessageHandler };
