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
    '**/*.lock',
    '**/*.md',
    '**/*.log*',
    'LICENSE'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'prefer-const': 1,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 1,
  }
};