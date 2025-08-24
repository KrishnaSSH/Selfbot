const JOKES = [
  "Why did the developer go broke? Because he used up all his cache.",
  "There are 10 types of people: those who understand binary and those who don't.",
  "I would tell you a UDP joke, but you might not get it.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "To understand recursion, you must first understand recursion.",
];

module.exports = {
  name: "joke",
  async execute(message, _args, _config, _groq, _client) {
    const joke = JOKES[Math.floor(Math.random() * JOKES.length)];
    return message.channel.send("```😄 " + joke + "```");
  },
};
