const fs = require("fs");
const path = require("path");
const { COMMANDS_DIR } = require("./constants");
const { error, info } = require("./logger");

function collectCommandFiles(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectCommandFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      out.push(full);
    }
  }
  return out;
}

function loadCommands(baseDir = process.cwd()) {
  const commandsPath = path.join(baseDir, COMMANDS_DIR);
  const commands = new Map();
  if (!fs.existsSync(commandsPath)) {
    info(`Commands directory not found: ${commandsPath}`);
    return commands;
  }

  const files = collectCommandFiles(commandsPath);
  for (const filePath of files) {
    const file = path.relative(commandsPath, filePath);
    try {
      const command = require(filePath);
      if (!command || !command.name || typeof command.execute !== "function") {
        info(`Skipping invalid command module: ${file}`);
        continue;
      }
      commands.set(command.name, command);
      if (command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach((alias) => commands.set(alias, command));
      }
    } catch (e) {
      error(`Error loading command ${file}:`, e);
    }
  }
  info(
    `Loaded ${commands.size} command keys from ${COMMANDS_DIR}/ (recursive)`,
  );
  return commands;
}

module.exports = { loadCommands };
