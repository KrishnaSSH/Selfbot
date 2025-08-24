module.exports = {
  name: "b64dec",
  async execute(message, args, _c, _g, _cl) {
    const t = args.join(" ");
    if (!t) return message.channel.send("```❕ Provide base64.```");
    try {
      const s = Buffer.from(t, "base64").toString("utf8");
      return message.channel.send("```" + s + "```");
    } catch (_e) {
      return message.channel.send("```❗ Invalid base64.```");
    }
  },
};
