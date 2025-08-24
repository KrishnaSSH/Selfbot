module.exports = {
  name: "spoiler",
  async execute(message, args, _config, _groq, _client) {
    const text = args.join(" ");
    if (!text) return message.channel.send("```❕ Provide text to spoiler.```");
    return message.channel.send("||" + text + "||");
  },
};
