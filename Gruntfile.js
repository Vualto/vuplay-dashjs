module.exports = function(grunt) {
    grunt.initConfig({
        dist: "dist",

        pkg: grunt.file.readJSON("package.json"),

        clean: ["<%= dist %>/*"],

        concat: {
            options: {
                banner: "// <%= pkg.description %> \n",
            },
            dist: {
                src: ["src/<%= pkg.name %>.js"],
                dest: "dist/<%= pkg.name %>.js",
            },
        },

        copy: {
            all: {
                expand: true,
                src: ["index.html", "assets/vuplay_poster.png"],
                dest: "<%= dist %>/",
                flatten: true,
            },
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ["**/*.js", "./index.html"],
                tasks: ["build"],
                options: {
                    spawn: false,
                },
            },
        },

        connect: {
            server: {
                options: {
                    protocol: "https",
                    hostname: "localhost",
                    port: 14703,
                    base: "dist",
                    keepalive: true,
                },
            },
        },
        concurrent: {
            connectandwatch: {
                tasks: ["connect", "watch"],
                options: {
                    logConcurrentOutput: true,
                },
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-concurrent");

    grunt.registerTask("build", ["clean", "concat", "copy"]);
    grunt.registerTask("serve", ["build", "concurrent:connectandwatch"]);
};
