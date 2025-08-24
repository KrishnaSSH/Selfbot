module.exports = {
  name: "reverse",
  async execute(message, args, _config, _groq, _client) {
    const text = args.join(" ");
    if (!text) return message.channel.send("```❕ Provide text to reverse.```");
    return message.channel.send(
      "```" + text.split("").reverse().join("") + "```",
    );
  },
};
