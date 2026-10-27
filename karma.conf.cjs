/** Karma + Jasmine + Webpack + cobertura Istanbul (React JSX). */
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    files: [{pattern: 'tests/index.js', watched: false}],
    preprocessors: {'tests/index.js': ['webpack']},
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {test: /\.[jt]sx?$/, exclude: /node_modules/, use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', ['@babel/preset-react', {runtime: 'automatic'}]],
              plugins: [['istanbul', {exclude: [
                '**/tests/**', '**/*.spec.js', '**/*.spec.jsx',
                '**/src/main.jsx', '**/src/assets/**'
              ]}]]
            }
          }},
          {test: /\.css$/, use: 'null-loader'},
          {test: /\.(png|jpe?g|gif|svg|webp)$/i, type: 'asset/resource'}
        ]
      },
      resolve: {extensions: ['.js', '.jsx', '.json']}
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'lcovonly', subdir: '.', file: 'lcov.info'},
        {type: 'text-summary'}
      ]
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    browserNoActivityTimeout: 60000,
    client: {clearContext: false}
  });
};
