module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['@nuxtjs', 'plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    lintOnSave: false
  },
  plugins: ['prettier'],
  rules: {
    'no-undef': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'vue/multi-word-component-names': 'off'
  }
}
