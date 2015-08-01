module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          '_dist/css/main.css': '_assets/sass/main.scss',
        }
      }
    },
    uglify: {
      build: {
        src: ['_assets/js/libs/*.js', '_assets/js/global.js'],
        dest: '_dist/js/global.min.js'
      }
    },
    imagemin : {
      dynamic: {
        files: [{
          expand: true,
          cwd: '_assets/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '_dist/images/'
        }]
      }
    }, 
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    watch: {
      options: {
      livereload: true,
    },
    scripts: {
      files: ['_assets/js/*.js'],
      tasks: ['uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },
      images: {
        files: ['_assets/images/**/*.{png,jpg,gif}', '_assets/images/*.{png,jpg,gif,svg}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      },
      html:{
        files: ['**/*.html'],
        tasks: [],
        options: {
          spawn: false
        }
      }
    }
    
  });
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-connect');           
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'uglify', 'imagemin']);
  
  grunt.registerTask('dev', ['connect', 'watch']);
  
  
};