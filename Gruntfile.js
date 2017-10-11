module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ["js/query.js", "js/plot.js"],
                dest: "dist/funcs.js"
            }
        },
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
            },
            build: {
                src: "dist/funcs.js",
                dest: "dist/funcs.min.js"
            }
        },
        jshint: {
            all: ["js/*.js"],
            options: JSON.parse(require("fs").readFileSync("./.jshintrc"))
        },
        eslint: {
            src: ["js/*.js"],
            options: {
                config: ".eslintrc.yml"
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-eslint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-includes');
    grunt.registerTask("default", ["concat", "uglify"]);
    grunt.registerTask("lint", ["jshint"]);
};
