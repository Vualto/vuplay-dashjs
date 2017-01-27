module.exports = function(grunt) {
    grunt.initConfig({
        dist: 'dist',
        package: grunt.file.readJSON('package.json'),

        clean: ['<%= dist %>/*'],
        copy: {
            other: {
                expand: true,
                src: ['index.html', 'poster.png'],
                dest: '<%= dist %>/',
                flatten: true
            }
        },

        connect: {
            server: {
                options: {
                    protocol: 'http',
                    hostname: 'dashjs.vuplay.local.drm.technology',
                    port: 14703,
                    base: 'dist',
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', ['clean', 'copy']);
    grunt.registerTask('serve', ['build', 'connect']);
};