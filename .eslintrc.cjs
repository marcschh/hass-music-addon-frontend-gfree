module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    semi: ['error', 'always'],
    'no-unused-vars': 1,
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    'vue/attribute-hyphenation': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-v-html': 0,
    'vue/no-v-text-v-html-on-component': 0,
    'object-curly-spacing': ['warn', 'always'],
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}
