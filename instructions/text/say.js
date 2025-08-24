module.exports = {
  name: "say",
  async execute(message, args, _config, _groq, _client) {
    const text = args.join(" ");
    if (!text) return message.channel.send("```❕ Provide text to say.```");
    try {
      await message.delete();
    } catch (_e) {
      /* no-op: ignore delete failures */
    }
    return message.channel.send(text);
  },
};
