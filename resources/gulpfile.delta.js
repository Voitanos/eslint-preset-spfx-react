// disable tslint
build.tslintCmd.enabled = false;
// add eslint
const eslintPrefix = require('@voitanos/eslint-preset-spfx-react');
eslintPrefix.updateGulpfile(build);

build.initialize(require('gulp'));