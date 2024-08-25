module.exports = {
  name: 'status',
  async execute(message, args, config) {
    if (args.length < 2 || args[0].toLowerCase() !== 'set') {
      return message.channel.send(`Usage: ${config.prefix}status set <online/dnd/invisible/idle>`);
    }

    const status = args[1].toLowerCase();
    const validStatuses = ['online', 'dnd', 'invisible', 'idle'];

    if (!validStatuses.includes(status)) {
      return message.channel.send(`Invalid status. Use one of the following: ${validStatuses.join(', ')}`);
    }

    client.user.setPresence({ status: status });
    message.channel.send(`Status set to ${status}.`);
  }
};
