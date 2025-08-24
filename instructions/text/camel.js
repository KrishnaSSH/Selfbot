function camel(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+([a-z0-9])/g, (_, c) => c.toUpperCase());
}
module.exports = {
  name: "camel",
  async execute(message, args, _c, _g, _cl) {
    const t = args.join(" ");
    if (!t) return message.channel.send("```❕ Provide text.```");
    return message.channel.send("```" + camel(t) + "```");
  },
};
