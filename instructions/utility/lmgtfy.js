module.exports = {
  name: "google",
  async execute(message, args, _config, _groq, _client) {
    const q = args.join(" ");
    if (!q) return message.channel.send("```❕ Provide a search query.```");
    const url = "https://www.google.com/search?q=" + encodeURIComponent(q);
    return message.channel.send("```🔎 " + url + "```");
  },
};
