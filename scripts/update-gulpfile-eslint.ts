const eslint = require('gulp-eslint');

const updateGulpfile = (build: any): void => {
  console.log('here');

  // create the subtask
  const eslintSubTask = build.subTask('eslint', function (gulp: any) {
    return gulp.src(['src/**/*.{ts,tsx}'])
      .pipe(eslint('./config/eslint.json'))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });

  // register the task as part of the pre-build process
  build.rig.addPreBuildTask(build.task('eslint', eslintSubTask));
}

exports.updateGulpfile = updateGulpfile;
