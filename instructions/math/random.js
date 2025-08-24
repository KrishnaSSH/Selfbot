module.exports = {
  name: "random",
  async execute(message, args, _c, _g, _cl) {
    const a = parseInt(args[0] || "1", 10),
      b = parseInt(args[1] || "100", 10);
    if (isNaN(a) || isNaN(b))
      return message.channel.send("```Usage: random <min> <max>```");
    const min = Math.min(a, b),
      max = Math.max(a, b);
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    return message.channel.send("```🎲 " + n + "```");
  },
};
