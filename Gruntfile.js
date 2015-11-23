'use strict';
var config = {};

config.jshint = {
    options : {
        jshintrc: '.jshintrc'
    },
    all: [
        'Gruntfile.js',
        'src/**/*.js'
    ]
};

config.exec = {
    install_dependencies: {
        cmd: 'npm install'
    },
    clean_dist: {
        cmd: 'rm -rf dist/*'
    }
};

config.concat = {
    options: {
        separator: ';',
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("mm-dd-yyyy") %> */',
        process: function(src, path) {
                  return '\n/* Source: ' + path + ' */\n' + src;
                }
    },
    dist: {
          src: ['src/**/*.js', 'lib/**/*.js'],
          dest: 'dist/game.js'
        },
};

config.uglify = {
    options: {
        mangle: 'true'
    },
    minify: {
        files: {
            'dist/game.min.js': ['src/**/*.js', 'lib/**/*.js']
        }
    }
};

module.exports = function(grunt) {

   config.pkg = grunt.file.readJSON('package.json');
   grunt.initConfig(config);

   require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

   grunt.registerTask('default', 'build');
   grunt.registerTask('build', ['exec:install_dependencies', 'jshint', 'exec:clean_dist', 'concat', 'uglify:minify']);
   grunt.registerTask('serve', ['build']);

};