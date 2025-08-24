module.exports = {
  name: "kickall",
  description:
    "Kicks all members in the server that can be kicked by the user.",
  async execute(message, _args, _config) {
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      return message.reply(
        ":warning: You do not have permission to use this command.",
      );
    }

    const guild = message.guild;

    // Confirm the action
    const confirmMessage = await message.reply(
      "❗❕ Are you sure you want to kick all members? Type `yes` to confirm.",
    );
    const filter = (response) =>
      response.author.id === message.author.id &&
      response.content.toLowerCase() === "yes";

    try {
      const collected = await message.channel.awaitMessages({
        filter,
        max: 1,
        time: 30000,
        errors: ["time"],
      });

      if (!collected.size) {
        return confirmMessage.edit("❗ Operation cancelled due to timeout.");
      }

      const members = guild.members.cache.filter((member) => member.kickable);
      if (!members.size) {
        return message.reply("No members found that can be kicked.");
      }

      // Notify the user that kicking is starting
      await message.channel.send(
        `🔄 Attempting to kick ${members.size} members...`,
      );
      let kickedCount = 0;

      for (const [, member] of members.entries()) {
        try {
          await member.kick("Kicked by bot command");
          kickedCount++;
          console.log(`Kicked: ${member.user.tag}`);

          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Failed to kick ${member.user.tag}:`, error);
        }
      }

      message.channel.send(`✔ Successfully kicked ${kickedCount} members.`);
    } catch (error) {
      console.error("Error during confirmation or kicking:", error);
      confirmMessage.edit("❌ An error occurred while executing the command.");
    }
  },
};
