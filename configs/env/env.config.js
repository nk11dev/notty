const path = require('path');
const dotenv = require('dotenv-defaults');
const colors = require('ansi-colors');

const config = dotenv.config({ defaults: path.resolve('./.env.defaults') }).parsed;
const { env } = process;

const envConfig = {
  NODE_ENV: env.NODE_ENV,
  // PORT env variable is passed for ability to use it, if PORT was setted by external service (for example, hosting or similar)
  PORT: env.PORT,
  ...Object.keys(config).reduce(
    (acc, key) => {
      acc[key] = env[key] || config[key];
      return acc;
    }, {}
  )
};

console.log(colors.yellow(`platform: "${process.platform}"`));
console.log(colors.yellow(`node version: "${process.versions.node}"`));
console.log(colors.cyan(`script: "${env.npm_lifecycle_script}"`));
console.log('\n--- envConfig:', envConfig, '\n');

module.exports = envConfig;