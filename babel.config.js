module.exports = function(config) {
  const plugins = [
    '@babel/transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-optional-chaining',
    '@babel/plugin-transform-react-inline-elements',
    'babel-plugin-macros',
    '@loadable/babel-plugin',
  ];

  if (!config.env('webpack')) {
    plugins.push('babel-plugin-css-modules-transform');
  }

  return {
    plugins,
    presets: [
      ['@babel/preset-env', {
        targets: { node: 'current' },
        exclude: ['transform-regenerator'],
      }],
      '@babel/preset-react',
    ],
  };
}
