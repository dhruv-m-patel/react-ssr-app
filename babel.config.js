module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: { node: 'current' },
      exclude: ['transform-regenerator'],
    }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-optional-chaining',
    'babel-plugin-css-modules-transform',
    '@babel/plugin-transform-react-inline-elements',
    'babel-plugin-macros',
  ],
};
