var gulp = require('gulp');
var watch = require('gulp-watch');
var jspm = require('gulp-jspm');
var rename = require('gulp-rename');
var taskListing = require('gulp-task-listing');
var stylus = require('gulp-stylus');

var conf = {
  GLOB_COMPONENTS_JS: './dev/js/components/**/*.js',
  GLOB_COMPONENTS_STYLUS: './dev/js/components/**/*.styl'
};

// incremental changes - https://github.com/gulpjs/gulp/blob/master/docs/recipes/incremental-builds-with-concatenate.md
// jspm plugins - https://github.com/systemjs/systemjs#plugins

// == Tasks ====================================================================

gulp.task('jspm:global', function(){
  var filename = 'global.min.js';
  var stream = gulp.src([
      './dev/js/global/global.js'
    ])
    .pipe(jspm({
      selfExecutingBundle: true, // bundle-sfx
      minify: true,
      skipSourceMaps: true
    }))
    .pipe(rename(filename))
    .pipe(gulp.dest('./public/js/'));
  
  stream.on('end', function(){
    console.log('[ DONE ]', 'File `'+ filename +'` written successfully.');
  });
});
gulp.task('jspm:components', function(){
  var newPath = '';
  var stream = gulp.src(conf.GLOB_COMPONENTS_JS)
    .pipe(jspm({
      selfExecutingBundle: true, // bundle-sfx
      minify: true,
      //format: 'amd',
      //mangle: false,
      skipSourceMaps: true
    }))
    .pipe(rename(function(path){
      var oldPath = path.dirname +'/'+ path.basename + path.extname;
      path.basename = path.dirname;
      path.dirname = '';
      path.extname = '.min'+ path.extname;
      newPath = path.basename + path.extname;
      
      console.log('[ CHANGE ]', 'Path from `'+ oldPath +'` to `'+ newPath +'`');
      
      return path;
    }))
    .pipe(gulp.dest('./public/js/'));
  
  stream.on('end', function(){
    console.log('[ DONE ]', 'File `'+ newPath +'` written successfully.');
  });
});
gulp.task('jspm', ['jspm:global', 'jspm:components', 'watch:jspm']);

gulp.task('stylus:components', function(){
  var stream = gulp.src(conf.GLOB_COMPONENTS_STYLUS)
    .pipe(stylus())
    .pipe(gulp.dest('./dev/js/components'));
  
  stream.on('end', function(){
    console.log(stream);
    //console.log('[ DONE ]', 'File `'+ filename +'` written successfully.');
  });
});
gulp.task('stylus', ['stylus:components']);

gulp.task('watch:jspm', function(){
  //gulp.watch('./dev/js/global/**/*.js', ['jspm:global']);
  //gulp.watch(conf.GLOB_COMPONENTS_STYLUS, ['stylus:components']);
  //gulp.watch([
  //    './dev/js/components/**/*.js',
  //    './dev/js/components/**/*.css',
  //    './dev/js/components/**/*.hbs'
  //  ], ['jspm:components']);
});
gulp.task('watch', ['watch:jspm']);

gulp.task('help', taskListing);

gulp.task('default', ['help']);