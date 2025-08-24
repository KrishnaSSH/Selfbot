module.exports = {
  name: "delete",
  async execute(message, _args, _config, _client) {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.channel.send(
        ":warning: You do not have permission to use this command.",
      );
    }

    const guild = message.guild;

    // Ensure channels are fetched from the server
    await guild.channels.fetch();

    // Fetch and delete text and voice channels
    const channelsToDelete = guild.channels.cache.filter(
      (c) => c.type === "GUILD_TEXT" || c.type === "GUILD_VOICE",
    );
    if (channelsToDelete.size === 0) {
      console.log("No channels to delete.");
    } else {
      // Function to delete channels
      async function deleteChannels(channels) {
        for (const channel of channels.values()) {
          try {
            await channel.delete();
            console.log(`Deleted channel ${channel.id}`);
          } catch (error) {
            console.error(`Failed to delete channel ${channel.id}:`, error);
          }
        }
      }

      // Delete all channels
      await deleteChannels(channelsToDelete);
      message.channel.send("✔ All channels have been deleted.");
    }

    // Fetch and delete categories
    const categoriesToDelete = guild.channels.cache.filter(
      (c) => c.type === "GUILD_CATEGORY",
    );
    if (categoriesToDelete.size === 0) {
      console.log("No categories to delete.");
    } else {
      // Function to delete categories
      async function deleteCategories(categories) {
        for (const category of categories.values()) {
          try {
            await category.delete();
            console.log(`Deleted category ${category.id}`);
          } catch (error) {
            console.error(`Failed to delete category ${category.id}:`, error);
          }
        }
      }

      // Delete all categories
      await deleteCategories(categoriesToDelete);
      message.channel.send("✔ All categories have been deleted.");
    }
  },
};
