module.exports = {
  name: "unixtime",
  async execute(message, _a, _c, _g, _cl) {
    return message.channel.send(
      "```⌚ " + Math.floor(Date.now() / 1000) + "```",
    );
  },
};
