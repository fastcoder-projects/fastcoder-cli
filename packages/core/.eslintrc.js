module.exports = {
  globals: {
    NodeJS: 'readonly',
  },
  extends: [
    '@fastcoder/eslint-config-ts',
  ],
  // cjs文件环境设置为node,一般都是作为配置文件
  overrides: [
    {
      files: ['*.cjs'],
      env: {
        node: true,
      },
    },
  ],
  rules: {
    // 临时关闭，可以手动增加判断环境变量，防止log带到线上环境
    'no-console': 'off',
  },
};
