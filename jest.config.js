module.exports = {
  verbose: false,
  roots: ['./src'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  globals: {
    NODE_ENV: 'test',
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleDirectories: ['node_modules'],
};
