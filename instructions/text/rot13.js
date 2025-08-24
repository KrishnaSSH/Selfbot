function rot13(s) {
  return s.replace(/[a-z]/gi, (c) =>
    String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < "n" ? 13 : -13)),
  );
}
module.exports = {
  name: "rot13",
  async execute(message, args, _c, _g, _cl) {
    const t = args.join(" ");
    if (!t) return message.channel.send("```❕ Provide text.```");
    return message.channel.send("```" + rot13(t) + "```");
  },
};
