module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
  },
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
  }
};
