function gen(len) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:,.?/";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}
module.exports = {
  name: "randompassword",
  async execute(message, args, _c, _g, _cl) {
    const n = Math.max(4, Math.min(128, parseInt(args[0] || "12", 10)));
    return message.channel.send("```🔐 " + gen(n) + "```");
  },
};
