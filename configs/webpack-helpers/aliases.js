const path = require('path');

const SRC_PATH = path.resolve(__dirname, '../../src');

const aliases = {
  '@/app': 'client/app',
  '@/pages': 'client/pages',
  '@/widgets': 'client/widgets',
  '@/features': 'client/features',
  '@/shared': 'client/shared',
  '@/images': 'assets/images',
  '@/styles': 'assets/styles',
  '@/fonts': 'assets/fonts',
  '@/data': 'data',
  '@/server': 'server',
};

Object.keys(aliases).forEach(
  (key) => {
    aliases[key] = path.resolve(
      __dirname, `${SRC_PATH}/${aliases[key]}`
    );
  }
);

aliases['@/configs'] = path.resolve(__dirname, '..');

module.exports = aliases;