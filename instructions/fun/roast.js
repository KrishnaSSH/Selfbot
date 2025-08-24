const ROASTS = [
  "I'd call you sharp, but that'd be a pointer to null.",
  "Your commits are like your jokes: no context.",
  "You must be a CSS file, because you don't do anything without a class.",
  "Is your keyboard stuck on caps lock, or are you always that loud?",
  "Your code has more bugs than a picnic in summer.",
];

module.exports = {
  name: "roast",
  async execute(message, _args, _config, _groq, _client) {
    const r = ROASTS[Math.floor(Math.random() * ROASTS.length)];
    return message.channel.send("```🔥 " + r + "```");
  },
};
