module.exports = {
  name: "clap",
  async execute(message, args, _config, _groq, _client) {
    if (!args.length)
      return message.channel.send("```❕ Provide text: clap this text```");
    return message.channel.send("```" + args.join(" 👏 ") + "```");
  },
};
