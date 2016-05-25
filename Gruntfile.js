module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        meta: {
            banner: '/*! github.com/gillescochez/mucilage */'
        },
        concat: {
            full: {
                src: [
                    '<banner>',
                    'src/build/head.js',
                    'src/core.js',
                    'src/data.js',
                    'src/template.js',
                    'src/helper.js',
                    'src/build/foot.js'
                ],
                dest: 'dist/mucilage.js'
            },
            light: {
                src: [
                    '<banner>',
                    'src/build/head.js',
                    'src/coreLight.js',
                    'src/data.js',
                    'src/templateLight.js',
                    'src/helper.js',
                    'src/build/foot.js'
                ],
                dest: 'dist/mucilage.light.js'
            }
        },
        uglify: {
            full: {
                src: ['<banner>', 'dist/mucilage.js'],
                dest: 'dist/mucilage.min.js'
            },
            light: {
                src: ['<banner>', 'dist/mucilage.light.js'],
                dest: 'dist/mucilage.light.min.js'
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.registerTask('default', ["concat", "uglify"]);
};
