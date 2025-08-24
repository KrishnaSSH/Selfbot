module.exports = {
  name: "roll",
  async execute(message, args, _config, _groq, _client) {
    // Supports: roll, roll 6, roll 2d6
    const input = (args[0] || "6").toLowerCase();
    let dice = 1;
    let sides = 6;

    if (/^\d+$/.test(input)) {
      sides = Math.max(2, Math.min(1000, parseInt(input, 10)));
    } else if (/^(\d+)d(\d+)$/.test(input)) {
      const [, d, s] = input.match(/^(\d+)d(\d+)$/);
      dice = Math.max(1, Math.min(20, parseInt(d, 10)));
      sides = Math.max(2, Math.min(1000, parseInt(s, 10)));
    }

    const rolls = Array.from(
      { length: dice },
      () => 1 + Math.floor(Math.random() * sides),
    );
    const total = rolls.reduce((a, b) => a + b, 0);
    const detail = dice > 1 ? ` [${rolls.join(", ")}]` : "";
    return message.channel.send(
      `\`\`\`🎲 Rolled ${dice}d${sides}: ${total}${detail}\`\`\``,
    );
  },
};
