// Simple timestamped logger
const format = (level, msg, ...meta) => {
  const ts = new Date().toISOString();
  return [`[${ts}] [${level}]`, msg, ...meta].join(" ");
};

module.exports = {
  info: (msg, ...meta) => console.log(format("INFO", msg, ...meta)),
  warn: (msg, ...meta) => console.warn(format("WARN", msg, ...meta)),
  error: (msg, ...meta) => console.error(format("ERROR", msg, ...meta)),
};
