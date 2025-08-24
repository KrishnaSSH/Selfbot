module.exports = {
  name: "countdown",
  async execute(message, args, _config, _groq, _client) {
    const n = Math.min(10, Math.max(1, parseInt(args[0] || "5", 10)));
    const sent = await message.channel.send("```⏳ " + n + "```");
    for (let i = n - 1; i >= 0; i--) {
      await new Promise((r) => setTimeout(r, 1000));
      await sent.edit("```⏳ " + i + "```");
    }
    return sent.edit("```🚀 Go!```");
  },
};
