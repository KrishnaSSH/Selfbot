module.exports = {
  name: "charcount",
  async execute(message, args, _c, _g, _cl) {
    const t = args.join("");
    if (!t) return message.channel.send("```❕ Provide text.```");
    return message.channel.send("```🔢 Chars: " + t.length + "```");
  },
};
