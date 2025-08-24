module.exports = {
  name: "sort",
  async execute(message, args, _c, _g, _cl) {
    if (!args.length)
      return message.channel.send("```❕ Provide words to sort.```");
    return message.channel.send(
      "```" +
        args
          .slice()
          .sort((a, b) => a.localeCompare(b))
          .join(" ") +
        "```",
    );
  },
};
