"use strict";
var eslint = require('gulp-eslint');
var updateGulpfile = function (build) {
    console.log('here');
    // create the subtask
    var eslintSubTask = build.subTask('eslint', function (gulp) {
        return gulp.src(['src/**/*.{ts,tsx}'])
            .pipe(eslint('./config/eslint.json'))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });
    // register the task as part of the pre-build process
    build.rig.addPreBuildTask(build.task('eslint', eslintSubTask));
};
exports.updateGulpfile = updateGulpfile;
