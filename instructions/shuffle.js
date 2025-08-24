function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
module.exports = {
  name: "shuffle",
  async execute(message, args, _c, _g, _cl) {
    if (!args.length)
      return message.channel.send("```❕ Provide words to shuffle.```");
    return message.channel.send(
      "```" + shuffle(args.slice()).join(" ") + "```",
    );
  },
};
