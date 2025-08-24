module.exports = {
  name: "palindrome",
  async execute(message, args, _c, _g, _cl) {
    const t = args
      .join(" ")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    if (!t) return message.channel.send("```❕ Provide text.```");
    const is = t === t.split("").reverse().join("");
    return message.channel.send(
      "```" + (is ? "✅ Palindrome" : "❌ Not a palindrome") + "```",
    );
  },
};
