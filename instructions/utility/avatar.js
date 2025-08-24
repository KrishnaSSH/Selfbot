module.exports = {
  name: "avatar",
  async execute(message, args, _config) {
    const user = args.length
      ? await message.client.users.fetch(args[0].replace(/[^0-9]/g, ""))
      : message.author;
    if (!user) return message.channel.send("❕ User not found.");
    message.channel.send(user.displayAvatarURL({ dynamic: true, size: 2048 }));
  },
};
