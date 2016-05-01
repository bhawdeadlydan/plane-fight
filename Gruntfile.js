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
    },
    build_binaries_ios: {
        cmd: 'cd planefight; cordova build ios; cd ..'
    },
    build_binaries_android: {
        cmd: 'cd planefight; cordova build android; cd ..'
    },
    open_emulator_ios: {
        cmd: 'cd planefight; cordova emulate ios; cd ..'
    },
    open_emulator_android: {
        cmd: 'cd planefight; cordova emulate android; cd ..'
    }
};

config.concat = {
    options: {
        separator: ";",
        process: function(src, path) {
                  if(path.endsWith(".js")) {
                    return "\n/* Source: " + path + " */\n" + src;
                    }
                  return src;
                }
    },
    start: {
          src: "src/index.html",
          dest:"dist/index.html"
        },
    code: {
        src: ["src/**/*.js"],
        dest: "dist/js/game.js"
    }
};

config.copy = {
    lib: {
        expand: true,
        src: ['lib/**'],
        dest: 'dist/'
    },
    assets: {
        expand: true,
        src: ['assets/**'],
        dest: 'dist/'
    },
    mobile_cordova: {
        expand: true,
        cwd: 'dist/',
        src: '**',
        dest: 'planefight/www/'
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

   var mobile_env = grunt.option('env') || 'android';

   require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

//   grunt.registerTask('build', ['exec:install_dependencies', 'jshint', 'exec:clean_dist', 'concat', 'uglify:minify']);
   grunt.registerTask('compile', ['jshint', 'exec:clean_dist', 'concat:start', 'concat:code', 'copy:lib', 'copy:assets', ]);
   grunt.registerTask('build', ['exec:install_dependencies', 'compile']);
   grunt.registerTask('default', 'build');
   grunt.registerTask('serve', ['build', 'open', 'connect']);
   grunt.registerTask('build_mobile', ['copy:mobile_cordova', 'exec:build_binaries_' + mobile_env]);
   grunt.registerTask('serve_mobile', ['exec:open_emulator_' + mobile_env]);

};