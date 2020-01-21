module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: ['> 1%', 'last 2 versions'],
      stage: 1,
    },
    cssnano: {
      discardUnused: true,
    },
  },
};
