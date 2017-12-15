module.exports = function (grunt) {
  grunt.initConfig({
    babel: {
      options: {
        presets: ['env']
      },
      dist: {
        files: {
          'dist/animate-scroll.js': 'src/index.js'
        }
      }
    },
    umd: {
      all: {
        options: {
          src: 'dist/animate-scroll.js',
          template: 'umd/template.hbs',
          globalAlias: 'AnimateScroll'
        }
      }
    },
    eslint: {
        options: {
            configFile: '.eslintrc.js'
        },
        target: [
            'src/**/*.js',
            'tests/**/*.js',
            '!tests/coverage/html/*.js'
        ]
    },
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        src: 'dist/animate-scroll.js',
        dest: 'dist/animate-scroll.min.js'
      }
    },
    karma: {
        options: {
            configFile: 'karma.conf.js'
        },
        'without-coverage': {},
        default: {
            reporters: ['progress', 'coverage', 'coveralls']
        }
    },
    copy: {
      main: {
        files: [
          {
            src: 'dist/animate-scroll.js',
            dest: 'docs/animate-scroll.js'
          },
        ],
      }
    },
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-umd');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'eslint',
    'babel',
    'umd',
    'uglify',
    'copy',
    'karma:without-coverage',
  ]);
};
