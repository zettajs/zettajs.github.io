var gulp = require('gulp')
  , less = require('gulp-less-sourcemap')
  , path = require('path')
  , minifyCSS = require('gulp-minify-css')
  , concat = require('gulp-concat')
  , stripDebug = require('gulp-strip-debug')
  , jshint = require('gulp-jshint')
  , uglify = require('gulp-uglify')
  , prefix = require('gulp-autoprefixer')
  , sourcemaps = require('gulp-sourcemaps');

gulp.task('jshint', function() {
  gulp.src('./dev/js/zetta.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  gulp.src(["./dev/js/jquery-1.11.1.min.js",
            "./dev/js/prism.js",
            "./dev/js/zetta.js"])
    .pipe(sourcemaps.init())
      .pipe(concat('scripts.js'))
  /*  .pipe(stripDebug()) */
      .pipe(uglify({mangle:false}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('../scripts'))
});

gulp.task('styles',['css'], function() {
  gulp.src('./dev/styles/styles.less')
    .pipe(less({
      generateSourceMap: false, 
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./dev/styles'));
  
});

gulp.task('css', function() {
  gulp.src(['./dev/styles/pure.css',
            './dev/styles/grids-responsive-min.css', 
            './dev/styles/animate.min.css', 
            './dev/styles/prism.css', 
            './dev/styles/styles.css'])
    /*.pipe(sourcemaps.init()) */
      /*.pipe(prefix("last 2 version", "> 5%", "ie 9"))*/
      .pipe(concat('styles.css'))
      .pipe(minifyCSS({noAdvanced:true, keepSpecialComments: 0}))
    /*.pipe(sourcemaps.write('./')) */
    .pipe(gulp.dest('../styles'));
});
  

gulp.task('default', ['jshint','scripts', 'styles'], function(){
  gulp.watch('./dev/js/*.js', ['jshint', 'scripts']);
  gulp.watch('./dev/styles/*.*', ['styles']);
});


