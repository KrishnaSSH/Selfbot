module.exports = {
  name: "flip",
  async execute(message, _args, _config, _groq, _client) {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    return message.channel.send("```🪙 " + result + "```");
  },
};
