module.exports = function (grunt) {
    var dashjsUrls = {
        release: {
            min: "http://cdn.dashjs.org/latest/dash.all.min.js",
            debug: "http://cdn.dashjs.org/latest/dash.all.debug.js"
        }
    };

    grunt.initConfig({
        dist: "dist",
        package: grunt.file.readJSON("package.json"),

        clean: ["<%= dist %>/*"],
        copy: {
            all: {
                expand: true,
                src: ["index.html", "poster.png"],
                dest: "<%= dist %>/",
                flatten: true
            }
        },
        concat: {
            options: {},
            dist: {
                src: ["src/OverrideKeySystemWidevine.js", "src/vuplay.js"],
                dest: "dist/vuplay.js",
            },
        },
        "string-replace": {
            dist: {
                files: [
                    {
                        src: "dist/index.html",
                        dest: "dist/index.html"
                    }
                ],
                options: {
                    replacements: [
                        {
                            pattern: "{dashjs}",
                            replacement: grunt.option("debug") ? dashjsUrls.release.debug : dashjsUrls.release.min
                        }
                    ]
                }
            }
        },

        connect: {
            server: {
                options: {
                    protocol: "http",
                    hostname: "dashjs.vuplay.local.drm.technology",
                    port: 14703,
                    base: "dist",
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-string-replace");
    grunt.loadNpmTasks("grunt-contrib-connect");

    grunt.registerTask("build", ["clean", "copy", "concat", "string-replace"]);
    grunt.registerTask("serve", ["build", "connect"]);
};