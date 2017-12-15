module.exports = function (config) {
  config.set({
    autoWatch: false,
    files: [
      // depends
      'node_modules/chai/chai.js',
      'tests/lib/chai.js',
      'node_modules/babel-polyfill/browser.js',
      'dist/animate-scroll.js',
      // hooks
      'tests/hooks/before.js',
      // tests
      'tests/methods/*.js',
      'tests/events/*.js',
      // fixtures
      'tests/fixtures/body.html'
    ],
    frameworks: ['mocha'],
    singleRun: true,
    browsers: ['PhantomJS'],
    preprocessors: {
      'tests/fixtures/*.html': ['html2js'],
      'dist/*.js': ['coverage']
    },
    logLevel: config.LOG_INFO,
    coverageReporter: {
      dir: 'tests/coverage',
      instrumenter: {
        'dist/*.js': ['istanbul']
      },
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'lcovonly', subdir: 'lcov'}
      ]
    }
  })
};
