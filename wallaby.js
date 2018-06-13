module.exports = function (wallaby) {
  return {
    files: [
      { pattern: 'plugins/Q_sessionrecorder/**/*.js', load: false },
      { pattern: 'plugins/D_sessionrecorderworker/**/*.js', load: false },
      { pattern: '!plugins/Q_sessionrecorder/_old/**/*.js', load: false },
      { pattern: '!**/*.spec.js', load: false }
    ],
    tests: [
      { pattern: 'plugins/Q_sessionrecorder/**/*.spec.js', load: false },
      { pattern: 'plugins/D_sessionrecorderworker/**/*.spec.js', load: false },
      { pattern: '!plugins/Q_sessionrecorder/_old/**/*.spec.js', load: false }
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        plugins: [
          'add-module-exports',
          'transform-es2015-modules-commonjs',
          'transform-async-to-generator'
        ]
      })
    },
    postprocessor: require('wallabify-proxyquire-postprocessor')({
        debug: true,
        plugin: ['proxyquireify/plugin']
      },
      ['proxyquire']
    ),

    setup: function () {
      window.testFrameworkBasePath = '/';
      window.__moduleBundler.loadTests();
    },
    env: {
      kind: 'electron'
    },
    testFramework: 'jasmine'
  };
};