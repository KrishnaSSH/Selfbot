function parseDuration(str) {
  const m = str.match(/^(\d+)(s|m|h|d)$/i);
  if (!m) return null;
  const num = parseInt(m[1], 10);
  const unit = m[2].toLowerCase();
  const mult =
    unit === "s"
      ? 1000
      : unit === "m"
        ? 60000
        : unit === "h"
          ? 3600000
          : 86400000;
  return num * mult;
}

module.exports = {
  name: "remindme",
  async execute(message, args, _config, _groq, _client) {
    if (args.length < 2)
      return message.channel.send(
        "```Usage: remindme <10s|5m|2h|1d> <message>```",
      );
    const ms = parseDuration(args[0]);
    if (!ms)
      return message.channel.send(
        "```❗ Invalid duration. Use s/m/h/d (e.g., 10s, 5m).```",
      );
    const text = args.slice(1).join(" ");
    await message.channel.send("```⏰ Reminder set!```");
    setTimeout(() => {
      message.reply("```⏰ Reminder: " + text + "```").catch(() => {});
    }, ms);
  },
};
