module.exports = {
  name: "sub",
  async execute(message, args, _c, _g, _cl) {
    const a = Number(args[0]),
      b = Number(args[1]);
    if (isNaN(a) || isNaN(b))
      return message.channel.send("```Usage: sub <a> <b>```");
    return message.channel.send("```" + (a - b) + "```");
  },
};
