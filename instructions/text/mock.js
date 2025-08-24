function sPoNgEbOb(text) {
  return text
    .split("")
    .map((ch, i) => (i % 2 ? ch.toLowerCase() : ch.toUpperCase()))
    .join("");
}

module.exports = {
  name: "mock",
  async execute(message, args, _config, _groq, _client) {
    const text = args.join(" ");
    if (!text) return message.channel.send("```❕ Provide text to mock.```");
    return message.channel.send("```" + sPoNgEbOb(text) + "```");
  },
};
