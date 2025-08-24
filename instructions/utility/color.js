function randHex() {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
}

module.exports = {
  name: "color",
  async execute(message, _args, _config, _groq, _client) {
    const hex = randHex();
    return message.channel.send("```🎨 Random color: " + hex + "```");
  },
};
