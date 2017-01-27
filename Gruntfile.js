module.exports = function(grunt) {
    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),

        clean: ['dist/*']
    });

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean']);
};