const { envConfig } = require("./envConfig");

const KEYS = ["AWS_CONFIG", "PINO_CONFIG"];

module.exports = envConfig(process.env, KEYS);
