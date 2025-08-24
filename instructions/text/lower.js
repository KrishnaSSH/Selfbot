module.exports = {
  name: "lower",
  async execute(message, args, _config, _groq, _client) {
    const t = args.join(" ");
    if (!t) return message.channel.send("```❕ Provide text.```");
    return message.channel.send("```" + t.toLowerCase() + "```");
  },
};
