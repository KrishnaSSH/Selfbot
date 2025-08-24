module.exports = {
  name: "div",
  async execute(message, args, _c, _g, _cl) {
    const a = Number(args[0]),
      b = Number(args[1]);
    if (isNaN(a) || isNaN(b) || b === 0)
      return message.channel.send("```Usage: div <a> <b> (b!=0)```");
    return message.channel.send("```" + a / b + "```");
  },
};
