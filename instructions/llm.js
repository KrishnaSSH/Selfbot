const Groq = require('groq-sdk');

let messageHistory = [];
let awaitingReplies = new Map();

module.exports = {
  name: 'llm',
  async execute(message, args, config, groq) {
    if (args.length === 0) {
      return message.channel.send('Please provide a question.');
    }

    const question = args.join(' ');
    const userId = message.author.id;

    // Add the user's question to history
    messageHistory.push({ role: "user", content: question });

    try {
      const response = await getGroqChatCompletion(messageHistory, groq);

      // Send the response in code blocks
      const responseMessage = await message.channel.send(`\`\`\`${response}\`\`\``);
      
      // Update message history with the assistant's response
      messageHistory.push({ role: "assistant", content: response });

      // Track the message for replies
      awaitingReplies.set(responseMessage.id, userId);

      // Optionally, you can uncomment the line below if you want to delete the question message
      // await message.delete();
    } catch (error) {
      console.error('Error processing LLM request:', error);
      message.channel.send('Failed to get a response from the LLM.');
    }
  }
};

async function getGroqChatCompletion(messages, groq) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama3-8b-8192",
    });
    return chatCompletion.choices[0]?.message?.content || "No response from the LLM.";
  } catch (error) {
    console.error('Error fetching chat completion:', error);
    throw new Error('Failed to fetch chat completion');
  }
}

module.exports.listenForReplies = async (message, groq) => {
  // Check if the message is a reply to a tracked LLM message
  if (message.reference && message.reference.messageId) {
    const originalMessageId = message.reference.messageId;

    if (awaitingReplies.has(originalMessageId)) {
      const userId = awaitingReplies.get(originalMessageId);

      // Check if the reply is from the same user
      if (message.author.id === userId) {
        // Add the user's reply to history
        messageHistory.push({ role: "user", content: message.content });
        awaitingReplies.delete(originalMessageId);

        try {
          // Generate a new response based on the updated history
          const response = await getGroqChatCompletion(messageHistory, groq);
          const responseMessage = await message.channel.send(`\`\`\`${response}\`\`\``);
          
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
