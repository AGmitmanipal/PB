const path = require("path");

// Load .env for local development/runtime. In production, your platform should
// provide env vars directly (dotenv will simply not find a file, which is OK).
// We explicitly point to ../.env so it works regardless of the process CWD.
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

function required(name) {
  const value = process.env[name];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `Missing required environment variable ${name}. ` +
        `Create smart-parking-app-GoPerch-/parking-backend/.env (see .env.example) ` +
        `or set it on your deployment platform.`
    );
  }
  return value;
}

function optional(name, fallback) {
  const value = process.env[name];
  if (typeof value !== "string" || value.trim() === "") return fallback;
  return value;
}

function optionalInt(name, fallback) {
  const raw = optional(name, "");
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

const NODE_ENV = optional("NODE_ENV", "development");

module.exports = Object.freeze({
  NODE_ENV,
  MONGODB_URI: required("MONGODB_URI"),
  CORS_ORIGIN: optional("CORS_ORIGIN", ""),

  // Single backend server port (defaults to 5000 for local dev).
  PORT: optionalInt("PORT", 5000),
});


