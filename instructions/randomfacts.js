const facts = [
  "The shortest war in history was between Britain and Zanzibar on August 27, 1896. It lasted only 38 minutes!",
  "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.",
  "Octopuses have three hearts and blue blood.",
  "Wombat poop is cube-shaped to prevent it from rolling away.",
  "A group of flamingos is called a 'flamboyance'.",
  "Bananas are berries, but strawberries aren't.",
  "The inventor of the Pringles can is now buried in one.",
  "There are more stars in the universe than grains of sand on all the Earth's beaches.",
  "A day on Venus is longer than a year on Venus.",
  "The human nose can detect over 1 trillion different scents.",
  "Koalas have fingerprints that are almost indistinguishable from human ones.",
  "The Eiffel Tower can be 15 cm taller during the summer due to the expansion of iron in the heat.",
  "A shrimp's heart is located in its head.",
  "An octopus has nine brains: one central brain and eight smaller brains, one for each arm.",
  "You can hear a blue whale's heartbeat from over 2 miles away.",
  "There are more possible iterations of a game of chess than there are atoms in the known universe.",
  "The longest time between two twins being born is 87 days.",
  "Cleopatra lived closer in time to the moon landing than to the construction of the Great Pyramid of Giza.",
  "Butterflies taste with their feet.",
  "The longest recorded flight of a chicken is 13 seconds.",
  "The human body contains about 37.2 trillion cells.",
  "A jiffy is an actual unit of time: 1/100th of a second.",
  "The Guinness World Record for the most T-shirts worn at once is 260.",
  "Scotland has 421 words for ‘snow’.",
  "The total weight of all ants on Earth is roughly equal to the total weight of all humans.",
  "The shortest complete sentence in the English language is 'I am.'",
  "Polar bear skin is actually black under their white fur.",
  "It rains diamonds on Jupiter and Saturn.",
  "The Great Wall of China is not visible from space without aid.",
  "The world’s largest desert is Antarctica, not the Sahara.",
  "Sharks have been around longer than trees.",
  "The heart of a blue whale is as big as a small car.",
  "There are over 200 corpses of climbers on Mount Everest that are now landmarks.",
  "The total surface area of the human lungs is roughly the same size as a tennis court.",
  "Dolphins have names for each other and can call out to one another specifically.",
  "There are more types of bacteria in your mouth than there are people on Earth.",
  "The inventor of the microwave appliance only received $2 for his discovery.",
  "Walt Disney was afraid of mice.",
  "The longest hiccuping spree lasted 68 years.",
  "The inventor of the modern frisbee was turned into a frisbee after his death.",
  "Venus is the hottest planet in our solar system, even though Mercury is closer to the sun.",
  "A group of crows is called a 'murder'.",
  "The word ‘nerd’ was first coined by Dr. Seuss in 'If I Ran the Zoo'.",
  "The average person walks the equivalent of three times around the world in a lifetime.",
  "A single strand of spaghetti is called a 'spaghetto'.",
  "The Mona Lisa has no eyebrows. It was the fashion in Renaissance Florence to shave them off.",
  "Sloths can hold their breath for up to 40 minutes.",
  "The unicorn is Scotland’s national animal.",
  "Sharks can live up to 150 years.",
  "There are more fake flamingos than real ones.",
  "In South Korea, there is an emergency number (1339) for medical emergencies and 112 for the police.",
  "Horseshoe crabs have blue blood and are used to test the sterility of medical equipment."
];

module.exports = {
  name: 'randomfact',
  description: 'Sends a random fact with a bit of ASCII art',
  aliases: ['rf'],
  async execute(message) {
    // Get a random fact from the array
    const fact = facts[Math.floor(Math.random() * facts.length)];

    // Format the fact with ASCII art
    const factMessage = `
🌟 *Did you know?* 🌟
╔════════════════════╗
║ ${formatFact(fact)}
╚════════════════════╝
`;

    message.channel.send(factMessage);
  }
};

// Function to format the fact to fit within the ASCII box
function formatFact(fact) {
  const maxLength = 20; // Maximum length of a line in the box
  const lines = [];

  // Split the fact into lines of appropriate length
  while (fact.length > maxLength) {
    let part = fact.substring(0, maxLength);
    const lastSpace = part.lastIndexOf(' ');
    if (lastSpace > 0) {
      part = part.substring(0, lastSpace);
    }
    lines.push(part);
    fact = fact.substring(part.length).trim();
  }
  lines.push(fact);

  return lines.map(line => `║ ${line.padEnd(maxLength)} ║`).join('\n');
}
