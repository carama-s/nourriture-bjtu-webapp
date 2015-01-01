module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      uglify: {
        options: {
          sourceMap: true,
          angular: true,
          mangle: false,
          compress: {
            angular: true,
            drop_console: false
          }
        },
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'www/',      // Src matches are relative to this path.
            src: ['scripts/**/*.js'], // Actual pattern(s) to match.
            dest: 'www/',   // Destination path prefix.
            ext: '.min.js',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          }
        ]
      }
    },
    less: {
      less: {
        options: {
          compress: true,
          optimization: 2,
        },
        files: {
          "www/styles/css/style.css": "www/styles/less/style.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['www/styles/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less', 'watch']);

  grunt.registerTask('deploy', ['less']);
};
