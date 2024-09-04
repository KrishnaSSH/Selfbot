module.exports = {
    name: '8ball',
    description: 'Provides a random answer to a yes/no question.',
    async execute(message, args, config) {
      const responses = [
        "Yes, definitely!",
        "No, not at all.",
        "Maybe, who knows?",
        "Ask again later.",
        "Absolutely!",
        "I wouldn't count on it.",
        "Sure, why not?",
        "It's unclear, try again."
      ];
  
      const question = args.join(' ');
  
      if (!question) {
        return message.reply("You need to ask a question!");
      }
  
      const response = responses[Math.floor(Math.random() * responses.length)];
  
      message.reply(`🎱 ${response}`);
    },
  };
  