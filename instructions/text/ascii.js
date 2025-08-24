module.exports = {
  name: "ascii",
  async execute(message, args, _c, _g, _cl) {
    const t = args.join(" ");
    if (!t) return message.channel.send("```❕ Provide text.```");
    const codes = [...t].map((ch) => ch.charCodeAt(0)).join(", ");
    return message.channel.send("```ASCII: " + codes + "```");
  },
};
