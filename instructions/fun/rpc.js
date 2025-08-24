module.exports = {
  name: "rpc",
  description: "Play a game of Rock, Paper, Scissors!",
  execute(message, args) {
    const userChoice = args[0]?.toLowerCase();
    const choices = ["rock", "paper", "scissors"];

    if (!userChoice || !choices.includes(userChoice)) {
      return message.reply(
        `\`\`\`❕ Please choose rock, paper, or scissors.\`\`\``,
      );
    }

    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = getResult(userChoice, botChoice);

    message.reply(
      `\`\`\`You chose **${userChoice}**. I chose **${botChoice}**. ${result}\`\`\``,
    );
  },
};

function getResult(userChoice, botChoice) {
  if (userChoice === botChoice) {
    return "It's a tie!";
  }

  if (
    (userChoice === "rock" && botChoice === "scissors") ||
    (userChoice === "paper" && botChoice === "rock") ||
    (userChoice === "scissors" && botChoice === "paper")
  ) {
    return "You win!";
  } else {
    return "You lose!";
  }
}
