const pino = require("pino");
const env = require("./env");

module.exports = pino(env.PINO_CONFIG);
