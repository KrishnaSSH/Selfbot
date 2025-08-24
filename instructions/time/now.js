module.exports = {
  name: "now",
  async execute(message, _a, _c, _g, _cl) {
    const d = new Date();
    return message.channel.send("```🕒 " + d.toString() + "```");
  },
};
