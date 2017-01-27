module.exports = function(grunt) {
    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),

        clean: ['dist/*'],
        copy: {
            nonJs: {
                expand: true,
                src: ['index.html', 'poster.png'],
                dest: 'dist/',
                flatten: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['clean', 'copy']);
};