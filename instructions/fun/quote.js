const QUOTES = [
  "Stay hungry, stay foolish.",
  "Talk is cheap. Show me the code.",
  "Simplicity is the soul of efficiency.",
  "Programs must be written for people to read, and only incidentally for machines to execute.",
  "First, solve the problem. Then, write the code.",
];

module.exports = {
  name: "quote",
  async execute(message, _args, _config, _groq, _client) {
    const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    return message.channel.send("```💬 " + q + "```");
  },
};
