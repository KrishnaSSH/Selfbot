const Groq = require("groq-sdk");

function createGroq(apiKey = process.env.GROQ_API_KEY) {
  if (!apiKey) return null; // allow running without LLM
  return new Groq({ apiKey });
}

module.exports = { createGroq };
