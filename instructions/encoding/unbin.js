module.exports = {
  name: "unbin",
  async execute(message, args, _c, _g, _cl) {
    const t = args.join(" ").trim();
    if (!t) return message.channel.send("```❕ Provide binary.```");
    try {
      const s = t
        .split(/\s+/)
        .map((b) => String.fromCharCode(parseInt(b, 2)))
        .join("");
      return message.channel.send("```" + s + "```");
    } catch (_e) {
      return message.channel.send("```❗ Invalid binary.```");
    }
  },
};
