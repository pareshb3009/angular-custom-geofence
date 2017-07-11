var gulp = require('gulp');
var del = require('del');
var merge = require('merge-stream');
var glob = require('glob');
var plug = require('gulp-load-plugins')();
var paths = require('./gulp.config.json');
var plato = require('plato');
var colors = plug.util.colors;
var log = plug.util.log;
var connect = require('gulp-connect');

var serverPort = 8000;
var livereloadPort = 35777;
var mode = "default";

gulp.task('debugmode',function(){
    mode = "debug";
    paths.build = paths.client; 
});

gulp.task('default',['debugmode','connect'], function() {
    
    log('Debuggin the app');

    return gulp.src('').pipe(plug.notify({
        onLast: true,
        message: 'Deployed code!'
    }));
});

gulp.task('connect', function(){
    
    connect.server({
      root: paths.build,
      port: serverPort,
      livereload : true
    });
});

