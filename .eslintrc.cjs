module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['*.cjs'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  rules: {
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        bracketSpacing: true,
        trailingComma: 'es5',
        arrowParens: 'always',
        semi: true,
        printWidth: 80,
        endOfLine: 'auto',
        plugins: ['prettier-plugin-svelte'],
      },
    ],
  },
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
};
