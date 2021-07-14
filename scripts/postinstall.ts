#!/usr/bin/env node

// bail on postinstall if this is a build
if (process.env.IS_BUILD) {
  console.log('skipping POSTINSTALL script');
  process.exit(0);
}

import * as fs from 'fs';
import * as path from 'path';

const CURR_DIR = path.resolve(__dirname);
// split directory path (non-windows)
let nestedDirs = CURR_DIR.split("/");
// split directory path (windows)
if (nestedDirs.length <= 1) {
  nestedDirs = CURR_DIR.split("\\");
}

// verify path
if (nestedDirs.length === 0) {
  console.error('ERROR: unexpected install path.')
}
// find the node_modules folder
const nmIndex = nestedDirs.indexOf('node_modules');
// verify node_modules found & get the path to one level up...
//  this should be the project root
if (nmIndex === -1) {
  console.error('ERROR: expected folder \'node_modules\' not found.');
}
const nest = nestedDirs.slice(nmIndex);
if (!nest || nest.length === 0) {
  console.error('ERROR: unexpected install path.')
}
const paths = nest.map(m => "..");
const projectPath = path.resolve(path.join(__dirname, paths.join('/')));

/**
 *
 * STEP 1: ESLINT CONFIG FILE
 *
 */
console.log('ESLINT PRESET POSTINSTALL STEP 1 of 4...')
const CONFIG_FILENAME = 'eslint.json';
console.log(`INFO: Adding ESLint configuration file to: ./config/${CONFIG_FILENAME}`);

const configFilePath = path.resolve(path.join(projectPath, 'config', CONFIG_FILENAME));
// check if config file present
if (fs.existsSync(configFilePath)) {
  console.log(`      .. ${CONFIG_FILENAME} exists! No changes required.`);
} else {
  // doesn't exist, so copy it in
  console.log(`INFO: ${CONFIG_FILENAME} not found; creating it`);

  // get path to sample file
  const configTemplate = path.join(CURR_DIR, '..', 'resources', `${CONFIG_FILENAME}`);
  // copy file in
  fs.copyFileSync(configTemplate, configFilePath);
}

/**
 *
 * STEP 2: ESLINT IGNORE FILE
 *
 */
console.log('ESLINT PRESET POSTINSTALL STEP 2 of 4...')
const IGNORE_FILENAME = '.eslintignore';
console.log(`INFO: Adding ESLint ignore file to: ./${IGNORE_FILENAME}`);

const ignoreFilePath = path.resolve(path.join(projectPath, IGNORE_FILENAME));
// check if file present
if (fs.existsSync(ignoreFilePath)) {
  console.log(`      .. ${IGNORE_FILENAME} exists! No changes required.`);
} else {
  // doesn't exist, so copy it in
  console.log(`INFO: ${IGNORE_FILENAME} not found; creating it`);

  // get path to sample file
  const configTemplate = path.join(CURR_DIR, '..', 'resources', IGNORE_FILENAME);
  // copy file in
  fs.copyFileSync(configTemplate, ignoreFilePath);
}

/**
 *
 * STEP 3: UPDATE GULPFILE.JS WITH ESLINT TASK
 *
 */
console.log('ESLINT PRESET POSTINSTALL STEP 3 of 4...')
console.log(`INFO: Updating gulpfile.js add eslint task`);

const GULPFILE_FILEPATH = path.resolve(path.join(projectPath, 'gulpfile.js'));

let gulpFileData = fs.readFileSync(GULPFILE_FILEPATH, 'utf8');
// read in all data from the template file
const GULPDELTA_FILEPATH = path.join(CURR_DIR, '..', 'resources', 'gulpfile.delta.js');
const GULPDELTA_CONTENT = fs.readFileSync(GULPDELTA_FILEPATH, 'utf8');

// update file contents
fs.writeFileSync(GULPFILE_FILEPATH, gulpFileData.replace(/build.initialize\(require\('gulp'\)\);/g, GULPDELTA_CONTENT));

/**
 *
 * STEP 4: DELETE TSLINT.JSON
 *
 */
 console.log('ESLINT PRESET POSTINSTALL STEP 4 of 4...')
 console.log(`INFO: Deleting tslint.info unnecessary file`);

 const TSLINT_FILEPATH = path.resolve(path.join(projectPath, 'tslint.json'));

 // delete file
 fs.unlinkSync(TSLINT_FILEPATH);