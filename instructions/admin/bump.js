const {
  DISBOARD_APP_ID,
  BUMP_MIN_INTERVAL_MS,
  BUMP_MAX_INTERVAL_MS,
} = require("../../src/constants");

let bumpIntervals = {};

module.exports = {
  name: "bump",
  async execute(message, _args, _config) {
    const channelId = message.channel.id;

    try {
      await sendBumpCommand(message.channel);
    } catch (error) {
      console.error(`Error sending immediate /bump command:`, error);
    }

    // Prevent Detection
    if (!bumpIntervals[channelId]) {
      const startBumping = () => {
        bumpIntervals[channelId] = setTimeout(
          async () => {
            try {
              await sendBumpCommand(message.channel);
            } catch (error) {
              console.error(`Error sending /bump command:`, error);
            }
            startBumping();
          },
          Math.round(
            Math.random() * (BUMP_MAX_INTERVAL_MS - BUMP_MIN_INTERVAL_MS + 1),
          ) + BUMP_MIN_INTERVAL_MS,
        );
      };
      startBumping();
      message.channel.send(
        `\`\`\`✔ Started sending /bump command at random intervals in this channel.\`\`\``,
      );
    } else {
      message.channel.send(
        `\`\`\`❗ Already sending /bump commands in this channel.\`\`\``,
      );
    }
  },
};

async function sendBumpCommand(channel) {
  try {
    await channel.sendSlash(DISBOARD_APP_ID, "bump");
  } catch (error) {
    console.error("Failed to send /bump command:", error);
  }
}
