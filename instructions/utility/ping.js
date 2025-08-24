module.exports = {
  name: "ping",
  async execute(message, _args, _config) {
    const now = Date.now();
    const sentMessage = await message.channel.send("```Pinging...```");
    const latency = Date.now() - now;
    sentMessage.edit(`\`\`\`🏓 Pong! ${latency}ms\`\`\``);
  },
};
