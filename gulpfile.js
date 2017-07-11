var gulp = require('gulp');
var plug = require('gulp-load-plugins')();
var prompt = require('gulp-prompt');
var git = require('gulp-git');
var runSequence = require('run-sequence');
var injectTemplates = require('angular-inject-templates');

gulp.task('git', function(){
  return runSequence('js:build','gulp:add', 'gulp:commit', 'gulp:push', 'gulp:done');
});

gulp.task('js:build', function () {
    return gulp.src(['geofence.js'])
        .pipe(injectTemplates())
        .pipe(plug.concat('geofence.min.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('gulp:add', function(){
  console.log("git add add add add")
  return gulp.src([ './README.md', 'gulpfile.js', './geofence.min.js','geofence.js', 'geofence.html', './geofence.css', './.gitignore', 'package.json', 'bower.json'])
    .pipe(git.add());
});

// git commit task with gulp prompt
gulp.task('gulp:commit', function(){
  // just source anything here - we just wan't to call the prompt for now
  return gulp.src('./*')
  .pipe(prompt.prompt({
    type: 'input',
    name: 'commit',
    message: 'Please enter commit message...'
  }, function(res){
    // now add all files that should be committed
    // but make sure to exclude the .gitignored ones, since gulp-git tries to commit them, too
    return gulp.src([ './README.md', 'gulpfile.js', './geofence.min.js', 'geofence.js', 'geofence.html', './geofence.css', './.gitignore', 'package.json', 'bower.json'])
    .pipe(git.commit(res.commit));
   }));
});

// Run git push, remote is the remote repo, branch is the remote branch to push to
gulp.task('gulp:push', ['gulp:commit'], function(cb){
  console.log("git push start")
  return git.push('origin', 'master', cb, function(err){
    if (err) throw err;
  });
});

// # task completed notification with green color!
gulp.task('gulp:done', ['gulp:push'], function(done){
  console.log('git done done done done');
  gutil.log(gutil.colors.green('************** Git push is done! **************'));
  console.log('');
  done();
});