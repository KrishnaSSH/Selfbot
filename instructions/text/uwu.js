function uwuify(t) {
  return t
    .replace(/r|l/g, "w")
    .replace(/R|L/g, "W")
    .replace(/n([aeiou])/g, "ny$1")
    .replace(/N([aeiou])/g, "Ny$1")
    .replace(/ove/g, "uv")
    .replace(/!+/g, " uwu~");
}

module.exports = {
  name: "uwu",
  async execute(message, args, _config, _groq, _client) {
    const text = args.join(" ");
    if (!text) return message.channel.send("```❕ Provide text to uwuify.```");
    return message.channel.send("```" + uwuify(text) + "```");
  },
};
