module.exports = {
  name: "wordcount",
  async execute(message, args, _c, _g, _cl) {
    const t = args.join(" ").trim();
    if (!t) return message.channel.send("```❕ Provide text.```");
    const count = t.split(/\s+/).filter(Boolean).length;
    return message.channel.send("```📝 Words: " + count + "```");
  },
};
