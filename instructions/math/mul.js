module.exports = {
  name: "mul",
  async execute(message, args, _c, _g, _cl) {
    const nums = args.map(Number).filter((n) => !isNaN(n));
    if (nums.length < 2)
      return message.channel.send("```Usage: mul <a> <b> [c]...```");
    const prod = nums.reduce((a, b) => a * b, 1);
    return message.channel.send("```" + prod + "```");
  },
};
