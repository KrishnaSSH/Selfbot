module.exports = {
  name: "hexdec",
  async execute(message, args, _c, _g, _cl) {
    const t = args.join(" ");
    if (!t) return message.channel.send("```❕ Provide hex.```");
    try {
      const s = Buffer.from(t.replace(/\s+/g, ""), "hex").toString("utf8");
      return message.channel.send("```" + s + "```");
    } catch (_e) {
      return message.channel.send("```❗ Invalid hex.```");
    }
  },
};
