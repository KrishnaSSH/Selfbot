const COMPLIMENTS = [
  "You're like a semicolon: you complete me.",
  "Your brain has 0 lint errors.",
  "You're the type that reads the docs and still ships on time.",
  "You debug like a wizard.",
  "You make merge conflicts look easy.",
];

module.exports = {
  name: "compliment",
  async execute(message, _args, _config, _groq, _client) {
    const c = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    return message.channel.send("```✨ " + c + "```");
  },
};
