module.exports = {
  name: "timer",
  async execute(message, args, _config, _groq, _client) {
    const ms = Math.max(1, Math.min(3600, parseInt(args[0] || "5", 10))) * 1000;
    await message.channel.send("```⏱️ Timer started for " + ms / 1000 + "s```");
    setTimeout(() => message.reply("```⏱️ Timer done!```").catch(() => {}), ms);
  },
};
