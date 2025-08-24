module.exports = {
  name: "add",
  async execute(message, args, _c, _g, _cl) {
    const nums = args.map(Number).filter((n) => !isNaN(n));
    if (nums.length < 2)
      return message.channel.send("```Usage: add <a> <b> [c]...```");
    const sum = nums.reduce((a, b) => a + b, 0);
    return message.channel.send("```" + sum + "```");
  },
};
