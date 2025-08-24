const ARTS = [
  "(\u256F\u00B0\u25A1\u00B0)\u256F\uFE35 \u253B\u2501\u253B",
  "( ͡° ͜ʖ ͡°)",
  "(ง'̀-'́)ง",
  "¯\\_(ツ)_/¯",
  "(✿◕‿◕)",
  "ಠ_ಠ",
  "(☞ﾟ∀ﾟ)☞",
  "(ʘ‿ʘ)",
];

module.exports = {
  name: "asciiart",
  async execute(message, _args, _config, _groq, _client) {
    const a = ARTS[Math.floor(Math.random() * ARTS.length)];
    return message.channel.send("```" + a + "```");
  },
};
