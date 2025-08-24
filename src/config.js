const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { DEFAULT_PREFIX } = require("./constants");

const CONFIG_FILE = path.join(__dirname, "..", "config.json");

function loadConfig() {
  // defaults
  let cfg = {
    prefix: DEFAULT_PREFIX,
    llm_instructions: [
      {
        role: "system",
        content:
          "You are a helpful assistant that provides concise and accurate answers.",
      },
    ],
  };

  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const fileCfg = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
      cfg = { ...cfg, ...fileCfg };
    } catch (_e) {
      // Fallback to require for CJS if JSON parse fails for some reason
      try {
        cfg = { ...cfg, ...require(CONFIG_FILE) };
      } catch (_err) {
        // ignore: failed to require CONFIG_FILE; keep defaults merged above
        void 0; // no-op to satisfy no-empty
      }
    }
  }

  // Note: PREFIX is now only controlled via config.json to avoid duplication with .env

  return cfg;
}

module.exports = { loadConfig };
