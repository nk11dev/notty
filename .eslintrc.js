module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  settings: {
    'react': {
      'version': 'detect'
    }
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    'src/assets',
    '**/*.scss',
    '**/*.json',
    '**/*.html',
    '**/*.md',
    'LICENSE'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
  }
};