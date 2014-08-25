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
  gulp.src('./src/js/zetta.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  gulp.src(["src/js/prism.js", 
            "src/js/skrollr.min.js", 
            "src/js/jquery-1.11.1.min.js", 
            "src/js/zetta.js"])
    .pipe(sourcemaps.init())
      .pipe(concat('scripts.js'))
  /*  .pipe(stripDebug()) */
      .pipe(uglify({mangle:false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js'))
});

gulp.task('styles',['css'], function() {
  gulp.src('./src/styles/styles.less')
    .pipe(less({
      generateSourceMap: false, 
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
/*  .pipe(minifyCSS({keepBreaks:true})) */
    .pipe(gulp.dest('./src/styles'));
  
});

gulp.task('css', function() {
  gulp.src(['src/styles/pure-min.css', 
            'src/styles/grids-responsive-min.css', 
            'src/styles/animate.min.css', 'prism.css', 
            'src/styles/prism.css', 
            'src/styles/styles.css'])
    .pipe(sourcemaps.init())
      .pipe(prefix("last 2 version", "> 5%", "ie 9"))
      .pipe(concat('styles.css'))
      .pipe(minifyCSS({noAdvanced:true, keepSpecialComments: 0}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
});
  

gulp.task('default', ['jshint','scripts', 'styles'], function(){
  gulp.watch('./src/js/*.js', ['jshint', 'scripts']);
  gulp.watch('./src/styles/*.*', ['styles']);
});


