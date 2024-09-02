const Groq = require('groq-sdk');

let messageHistory = [];
let awaitingReplies = new Map();
const MAX_MESSAGE_LENGTH = 2000;  // Set the character limit based on Discord's max message length

module.exports = {
  name: 'llm',
  async execute(message, args, config, groq) {
    if (args.length === 0) {
      return message.channel.send('❗ Please provide a question.');
    }

    const question = args.join(' ');
    const userId = message.author.id;

    // Add the user's question to history
    messageHistory.push({ role: "user", content: question });

    try {
      const response = await getGroqChatCompletion(messageHistory, groq);

      // Split the response if it exceeds the character limit
      const responseChunks = splitMessage(response, MAX_MESSAGE_LENGTH);

      // Send the response in parts, within code blocks
      for (const chunk of responseChunks) {
        const responseMessage = await message.channel.send(`\`\`\`${chunk}\`\`\``);
        
        // Track the message for replies
        awaitingReplies.set(responseMessage.id, userId);
      }

      // Update message history with the assistant's response
      messageHistory.push({ role: "assistant", content: response });
        } catch (error) {
          console.error('Error processing LLM reply:', error);
          message.channel.send('Failed to get a response from the LLM.');
        }
      }
    }
  }
};
