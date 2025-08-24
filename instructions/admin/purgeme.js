const {
  PURGE_MAX,
  PURGE_DELAY_MS,
  PURGE_SUCCESS_DELETE_MS,
} = require("../../src/constants");

module.exports = {
  name: "purgeme",
  async execute(message, args, _config) {
    if (args.length === 0 || isNaN(args[0])) {
      return message.channel.send(
        `\`\`\`❕ Please provide a valid number of messages to delete.\`\`\``,
      );
    }

    const limit = parseInt(args[0], 10);
    if (limit <= 0 || limit > PURGE_MAX) {
      return message.channel.send(
        `\`\`\`❗ You can only delete between 1 and 100 messages at a time.\`\`\``,
      );
    }

    try {
      const messages = await message.channel.messages.fetch({
        limit: limit + 1,
      });
      const userMessages = messages.filter(
        (msg) => msg.author.id === message.author.id,
      );

      // Delete messages one by one
      for (const msg of userMessages.values()) {
        await msg.delete();
        // Optional: Wait a bit between deletions to avoid rate limits
        await new Promise((resolve) => setTimeout(resolve, PURGE_DELAY_MS));
      }

      const successMessage = await message.channel.send(
        `\`\`\`✔️ Deleted ${userMessages.size - 1} messages.\`\`\``,
      );
      // Delete the success message after 5 seconds
      setTimeout(() => successMessage.delete(), PURGE_SUCCESS_DELETE_MS);
    } catch (error) {
      console.error("Error deleting messages:", error);
      message.channel
        .send(
          `\`\`\`❌ An error occurred while trying to delete messages.\`\`\``,
        )
        .then((msg) => msg.delete({ timeout: 5000 }));
    }
  },
};
