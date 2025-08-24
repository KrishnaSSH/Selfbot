module.exports = {
  name: "prefix",
  execute(message, _args, config) {
    message.channel.send(`\`\`\`👌 Current prefix is \`${config.prefix}\`\`\``);
  },
};
