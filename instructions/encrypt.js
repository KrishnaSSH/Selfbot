module.exports = {
  name: 'encrypt',
  description: 'Encrypt a message using a glitched-out cipher',
  execute(message, args) {
    if (args.length === 0) {
      return message.channel.send('❗ Please provide a message to encrypt.');
    }

    const text = args.join(' ');
    const encryptedText = glitchEncrypt(text); // Glitched encryption function

    message.channel.send(`🛡️ Encrypted Message: \`${encryptedText}\``);
  }
};

// Function to perform "glitched" encryption with random special characters
function glitchEncrypt(str) {
  const glitchCharacters = ['҉', '∂', 'Ҝ', 'ε', 'ł', 'σ', '∑', 'ř', '∫', '¥', '∂', 'Σ', '∂', '∇', 'λ'];
  return str.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      // Randomly replace some characters with "glitched" symbols
      const glitch = Math.random() < 0.3 ? glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)] : char;
      return glitch;
    }
    return char; // Non-alphabet characters remain unchanged
  }).join('');
}
