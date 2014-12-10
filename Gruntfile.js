// Gruntfile.js
module.exports = function (grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        bower: {
            install: {
                options: {
                    layout: 'byType',
                    targetDir: 'www/lib'
                }
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'wwww/css/main.css': 'wwww/scss/main.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/jss/main.css': 'wwww/scss/main.scss'
                }
            }
        },

        jshint: {
            files: {
                src: ['www/js/*.js', 'www/js/**/*js']
            }
        },

        uglify: {
            files: {
                'dist/js/main.min.js': 'www/js/main.js',
                'dist/js/bundle.min.js': [
                    'www/lib/jquery/jquery.js',
                    'www/lib/bootstrap/bootstrap.js'
                ]
            }
        },

        htmlbuild: {
            dist: {
                src: 'index.html',
                dest: 'dist/',
                options: {
                    beautify: true,
                    prefix: '//some-cdn',
                    relative: true,
                    scripts: {
                        bundle: [
                            'dist/js/bundle.min.js'
                        ],
                        main: 'dist/js/main.min.js'
                    },
                    styles: {
                        bundle: [
                            'dist/css/libs.min.css'
                        ],
                        main: 'dist/css/style.min.css'
                    },
                    sections: {},
                    data: {}
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        },

        copy: {
            bootstrap: {
                files: [{
                    expand: true,
                    src: ['www/lib/bootstrap/glyphicons-*'],
                    dest: 'www/font',
                    filter: 'isFile',
                    flatten: true
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'www/',
                    src: ['font/*','img/*'],
                    dest: 'dist/'
                },{
                    expand: true,
                    cwd: 'www/lib/modernizr/',
                    src: ['modernizr.js'],
                    dest: 'dist/js',
                    filter: 'isFile'
                }]
            }
        },

        clean: {
            dist: ['dist/']
        },

        connect: {
            dev: {
                host: 'localhost',
                port: 9999,
                base: 'www',
                liverreload: true
            },
            dist: {
                host: 'localhost',
                port: 9998,
                base: 'dist',
                keepalive: true
            }
        },

        watch: {
            options: {
                spawn: false
            },
            dev: {
                files: ['www/*'],
                tasks: [
                    'jshint',
                    'sass:dev',
                    'connect:dev'
                ]
            }
        }
    });

    grunt.registerTask('default', []);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('install', [
        'bower:install',
        'copy:bootstrap'
    ]);
    grunt.registerTask('build', [
        'test',
        //'sass:dist',
        'uglify',
        'htmlbuild',
        'htmlmin',
        'copy:dist',
        //'connect:dist'
    ]);
};