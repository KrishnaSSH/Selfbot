module.exports = {
  name: "b64enc",
  async execute(message, args, _c, _g, _cl) {
    const t = args.join(" ");
    if (!t) return message.channel.send("```❕ Provide text.```");
    return message.channel.send(
      "```" + Buffer.from(t, "utf8").toString("base64") + "```",
    );
  },
};
