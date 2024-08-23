module.exports = {
    name: 'ping',
    async execute(message, args, config) {
      const now = Date.now();
      const sentMessage = await message.channel.send('Pinging...');
      const latency = Date.now() - now;
      sentMessage.edit(`Pong! Latency is ${latency}ms`);
    }
  };
  