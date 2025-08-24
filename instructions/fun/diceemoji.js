const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
module.exports = {
  name: "dice",
  async execute(message, _args, _config, _groq, _client) {
    const f = faces[Math.floor(Math.random() * faces.length)];
    return message.channel.send("```" + f + "```");
  },
};
