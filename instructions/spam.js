module.exports = {
    name: 'spam',
    async execute(message, args, config) {
      if (args.length < 2) {
        return message.channel.send('Usage: `[prefix]spam "amount" "message"`');
      }
  
      // Extract amount and message from args
      const amount = parseInt(args[0], 10);
      const messageContent = args.slice(1).join(' ');
  
      if (isNaN(amount) || amount <= 0 || amount > 100) {
        return message.channel.send('Please provide a valid number between 1 and 100 for the amount.');
      }
  
      if (!messageContent) {
        return message.channel.send('Please provide a message to spam.');
      }
  
      try {
        // Delete the command message
        await message.delete();
  
        // Spam messages
        for (let i = 0; i < amount; i++) {
          await message.channel.send(messageContent);
        }
      } catch (error) {
        console.error('Error spamming messages:', error);
        message.channel.send('An error occurred while trying to spam messages.');
      }
    }
  };
  