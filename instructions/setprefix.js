const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'setprefix',
  execute(message, args, config) {
    if (args.length === 0) return message.channel.send('❕ Please provide a new prefix.');
    const newPrefix = args[0];
    if (newPrefix.length > 1) return message.channel.send('❗ Prefix should be a single character.');

    config.prefix = newPrefix;
    const configPath = path.join(__dirname, '../config.json');
    fs.writeFileSync(configPath, JSON.stringify({ prefix: newPrefix, llm_instructions: config.llm_instructions }, null, 2));
    message.channel.send(` ✅ Prefix updated to \`${newPrefix}\``);
  }
};
