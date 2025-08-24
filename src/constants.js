// Centralized constants to reduce magic numbers/strings and improve reusability
module.exports = {
  DEFAULT_PREFIX: "$",
  COMMANDS_DIR: "instructions", // keep current folder name to avoid breaking existing commands
  UNKNOWN_COMMAND_MSG:
    "Unknown command. Use `$help` to see all available commands.",
  ERROR_EXECUTING_MSG: "There was an error executing that command.",

  // Spam command
  MAX_SPAM_AMOUNT: 100,

  // Purgeme
  PURGE_MAX: 100,
  PURGE_DELAY_MS: 100,
  PURGE_SUCCESS_DELETE_MS: 5000,

  // Bump
  DISBOARD_APP_ID: "302050872383242240",
  BUMP_MIN_INTERVAL_MS: 7_200_000, // 2 hours
  BUMP_MAX_INTERVAL_MS: 9_000_000, // 2.5 hours

  // Nuke
  NUKE_MAX_CHANNELS: 500,
  NUKE_PINGS_PER_CHANNEL: 20,
  NUKE_CREATE_INTERVAL_MS: 1000,
  NUKE_TIMEOUT_MS: 5 * 60 * 1000,
};
