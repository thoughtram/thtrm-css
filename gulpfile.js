var gulp = require('gulp');
var serve = require('browser-sync');
var postcss = require('gulp-postcss');
var nested = require('postcss-nested');
var autoprefixer = require('autoprefixer-core');
var customMedia = require('postcss-custom-media');
var cssvariables = require('postcss-css-variables');
var cssimport = require('postcss-import');
var csstyle = require('csstyle');

gulp.task('styles', function () {
  gulp.src('src/**/*.css')
    .pipe(postcss([
      cssimport({
        from: 'src/styles.css'
      }),
      autoprefixer(),
      nested(),
      cssvariables(),
      customMedia(),
      csstyle()
    ]))
    .pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {
  gulp.src('src/assets/*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['styles', 'assets', 'html'], function () {
  serve({
    port: process.env.PORT || 3000,
    open: false,
    files: [].concat(
      'src/**/*.css',
      'index.html'
    ),
    server: {
      baseDir: 'dist'
    },
  });
  gulp.watch('src/**/*.css', ['styles', serve.reload]);
  gulp.watch('index.html', ['html', serve.reload]);
});
