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
          src: ['src/**/*.js'],
          dest: 'dist/js/game.js'
        }
};

config.copy = {
    libs: {
        expand: true,
        src: ['lib/**'],
        dest: 'dist/js/'
    }
};

config.uglify = {
    options: {
        mangle: 'true'
    },
    minify: {
        files: {
            'dist/js/game.min.js': ['src/**/*.js', 'lib/**/*.js']
        }
    }
};

config.connect = {
    server: {
        options: {
            port: 3000,
            base: {
                path: '.',
                hostname: 'localhost'
            },
            keepalive: true
        }
    }
};

config.watch =  {
    options: {
        event: ['all']
    },
    src: {
        files: '../src/**/*.js',
        tasks: ['concat']
    }
};

config.open =  {
    all: {
        path: 'http://localhost:<%= connect.server.options.port%>/dist/index.html'
    }
};

module.exports = function(grunt) {

   config.pkg = grunt.file.readJSON('package.json');
   grunt.initConfig(config);

   require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

//   grunt.registerTask('build', ['exec:install_dependencies', 'jshint', 'exec:clean_dist', 'concat', 'uglify:minify']);
   grunt.registerTask('compile', ['jshint', 'concat']);
   grunt.registerTask('build', ['exec:install_dependencies', 'compile']);
   grunt.registerTask('default', 'build');
   grunt.registerTask('serve', ['build', 'open', 'connect']);

};