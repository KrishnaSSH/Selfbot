module.exports = {
    name: 'prefix',
    execute(message, args, config) {
      message.channel.send(`Current prefix is \`${config.prefix}\``);
    }
  };
  