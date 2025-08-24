module.exports = {
  name: "status",
  async execute(message, args, config, _groq, client) {
    if (
      args.length < 2 ||
      !["online", "dnd", "invisible", "idle"].includes(args[1])
    ) {
      return message.channel.send(
        `\`\`\`Usage: ${config.prefix}status set {online/dnd/invisible/idle}\`\`\``,
      );
    }

    const status = args[1];

    try {
      switch (status) {
        case "online":
          await client.user.setStatus("online");
          break;
        case "dnd":
          await client.user.setStatus("dnd");
          break;
        case "invisible":
          await client.user.setStatus("invisible");
          break;
        case "idle":
          await client.user.setStatus("idle");
          break;
        default:
          return message.channel.send(
            `\`\`\`❗ Invalid status. Use one of the following: online, dnd, invisible, idle.\`\`\``,
          );
      }
      message.channel.send(`\`\`\`✅ Status set to ${status}.\`\`\``);
    } catch (error) {
      console.error("Error setting status:", error);
      message.channel.send(`\`\`\`❌ Failed to set the status.\`\`\``);
    }
  },
};
