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
					'www/css/style.css': 'scss/style.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'dist/jss/style.css': 'scss/style.scss'
				}
			}
		},

		jshint: {
			files: {
				src: ['www/js/*.js', 'www/js/**/*js',
					'!www/js/ie8-responsive-file-warning.js', '!www/js/ie10-viewport-bug-workaround.js', '!www/js/ie-emulation-modes-warning.js']
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
					src: ['font/*', 'img/*'],
					dest: 'dist/'
				}, {
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
			options: {
				hostname: 'localhost',
				livereload: 35729,
				keepalive: false,
				open: true
			},
			dev: {
				options: {
					port: 9999,
					base: 'www'
				}
			},
			dist: {
				options: {
					port: 9998,
					base: 'dist'
				}
			}
		},

		watch: {
			options: {
				livereload: 35729,
				debounceDelay: 1000
			},
			webdev: {
				files: [
					'www/*.*', 'www/**/*.*',
					'!www/css/*.*', '!www/css/*.css.map',
					'www/*.html', 'www/**/*.html',
					'www/*.js', 'www/**/*.js',
					'scss/*.scss', 'scss/**/*.scss'
				],
				tasks: [
					'jshint',
					'sass:dev'
				]
			},
			htmldev: {
				files: ['www/*.html', 'www/**/*.html'],
				tasks: []
			},
			jsdev: {
				files: ['www/*.js', 'www/**/*.js'],
				tasks: [
					'jshint'
				]
			},
			sassdev: {
				files: ['scss/*.scss', 'scss/**/*.scss'],
				tasks: [
					'sass:dev'
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
	grunt.registerTask('watch-dev', [
		'connect:dev',
		'watch:webdev'
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
	grunt.registerTask('shell', [
		'install',
		'watch-dev'
	]);
};
