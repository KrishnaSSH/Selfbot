const fs = require("fs");
const path = require("path");

function listCategories(root) {
  const cats = [];
  const entries = fs.readdirSync(root, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) cats.push(e.name);
  }
  return cats.sort();
}

function collectCommandsByCategory(root) {
  const result = {};
  const categories = listCategories(root);
  for (const cat of categories) {
    const dir = path.join(root, cat);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".js"));
    const names = [];
    for (const f of files) {
      try {
        const mod = require(path.join(dir, f));
        const name = mod && mod.name ? mod.name : path.basename(f, ".js");
        names.push(name);
        if (Array.isArray(mod.aliases)) names.push(...mod.aliases);
      } catch (_e) {
        // ignore broken module
      }
    }
    result[cat] = Array.from(new Set(names)).sort((a, b) => a.localeCompare(b));
  }
  return result;
}

function chunkAndSend(message, text) {
  const MAX = 1900; // safety under discord limit
  if (text.length <= MAX) return message.channel.send(text);
  let i = 0;
  while (i < text.length) {
    const part = text.slice(i, i + MAX);

    message.channel.send(part);
    i += MAX;
  }
}

module.exports = {
  name: "help",
  async execute(message, args, config, _groq, _client) {
    const root = path.join(process.cwd(), "instructions");
    const exists = fs.existsSync(root);
    if (!exists) {
      return message.channel.send("help: commands directory not found");
    }

    // Subcommands: help, help categories, help <category>, help <command>
    const sub = (args[0] || "").toLowerCase();

    // Build index once
    const byCat = collectCommandsByCategory(root);
    const cats = Object.keys(byCat).sort();

    if (sub === "categories") {
      const lines = [
        "Categories:",
        ...cats.map((c) => `- ${c} (${byCat[c].length})`),
        `\nUsage: ${config.prefix}help <category> | ${config.prefix}help <command>`,
      ];
      return chunkAndSend(message, "```\n" + lines.join("\n") + "\n```");
    }

    if (sub && cats.includes(sub)) {
      const names = byCat[sub];
      const header = `${sub} (${names.length})`;
      const list = names.join(", ");
      return chunkAndSend(message, "```\n" + header + "\n" + list + "\n```");
    }

    if (sub) {
      // Lookup specific command across categories
      let found = null;
      let foundCat = null;
      for (const c of cats) {
        if (byCat[c].includes(sub)) {
          found = sub;
          foundCat = c;
          break;
        }
      }
      if (found) {
        const usage = `${config.prefix}${found}`; // keep minimal to remain short
        const lines = [
          `Command: ${found}`,
          `Category: ${foundCat}`,
          `Usage: ${usage}`,
          `Tip: ${config.prefix}help ${foundCat} for related commands`,
        ];
        return message.channel.send("```\n" + lines.join("\n") + "\n```");
      }
    }

    // Default: concise overview
    const overview = [];
    overview.push("Help");
    overview.push(`Prefix: ${config.prefix}`);
    overview.push("");
    overview.push("Categories (count):");
    cats.forEach((c) => overview.push(`- ${c} (${byCat[c].length})`));
    overview.push("");
    overview.push(
      `Usage: ${config.prefix}help categories | ${config.prefix}help <category> | ${config.prefix}help <command>`,
    );
    return chunkAndSend(message, "```\n" + overview.join("\n") + "\n```");
  },
};
