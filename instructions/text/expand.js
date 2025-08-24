module.exports = {
  name: "expand",
  async execute(message, args, _config, _groq, _client) {
    const text = args.join(" ");
    if (!text) return message.channel.send("```❕ Provide text.```");
    return message.channel.send("```" + text.split("").join(" ") + "```");
  },
};
