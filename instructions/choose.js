module.exports = {
  name: "choose",
  async execute(message, args, _config, _groq, _client) {
    const joined = args.join(" ").trim();
    if (!joined.includes("|")) {
      return message.channel.send(
        "```❕ Provide options separated by | e.g. choose pizza | burger | sushi```",
      );
    }
    const options = joined
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    if (options.length < 2)
      return message.channel.send("```❕ Need at least two options.```");
    const pick = options[Math.floor(Math.random() * options.length)];
    return message.channel.send("```🎯 " + pick + "```");
  },
};
