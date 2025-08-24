function kebab(s) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$|--+/g, (m) => (m === "--" ? " - " : ""));
}
module.exports = {
  name: "kebab",
  async execute(message, args, _c, _g, _cl) {
    const t = args.join(" ");
    if (!t) return message.channel.send("```❕ Provide text.```");
    return message.channel.send("```" + kebab(t) + "```");
  },
};
