module.exports = function(grunt) {

  grunt.initConfig({
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
    min: {
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

  grunt.registerTask('default', 'concat min');
};
