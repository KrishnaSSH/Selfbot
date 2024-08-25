let bumpIntervals = {};

module.exports = {
  name: 'bumpbreak',
  execute(message, args, config) {
    const channelId = message.channel.id;

    if (bumpIntervals[channelId]) {
      clearTimeout(bumpIntervals[channelId]);
      delete bumpIntervals[channelId];
      message.channel.send(`\`\`\`✅ Stopped sending /bump commands in this channel.\`\`\``);
    } else {
      message.channel.send(`\`\`\`❌ No /bump command is currently being sent in this channel.\`\`\``);
    }
  }
};
