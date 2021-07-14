#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// bail on postinstall if this is a build
if (process.env.IS_BUILD) {
    console.log('skipping POSTINSTALL script');
    process.exit(0);
}
var fs = require("fs");
var path = require("path");
var CURR_DIR = path.resolve(__dirname);
// split directory path (non-windows)
var nestedDirs = CURR_DIR.split("/");
// split directory path (windows)
if (nestedDirs.length <= 1) {
    nestedDirs = CURR_DIR.split("\\");
}
// verify path
if (nestedDirs.length === 0) {
    console.error('ERROR: unexpected install path.');
}
// find the node_modules folder
var nmIndex = nestedDirs.indexOf('node_modules');
// verify node_modules found & get the path to one level up...
//  this should be the project root
if (nmIndex === -1) {
    console.error('ERROR: expected folder \'node_modules\' not found.');
}
var nest = nestedDirs.slice(nmIndex);
if (!nest || nest.length === 0) {
    console.error('ERROR: unexpected install path.');
}
var paths = nest.map(function (m) { return ".."; });
var projectPath = path.resolve(path.join(__dirname, paths.join('/')));
/**
 *
 * STEP 1: ESLINT CONFIG FILE
 *
 */
console.log('ESLINT PRESET POSTINSTALL STEP 1 of 4...');
var CONFIG_FILENAME = 'eslint.json';
console.log("INFO: Adding ESLint configuration file to: ./config/" + CONFIG_FILENAME);
var configFilePath = path.resolve(path.join(projectPath, 'config', CONFIG_FILENAME));
// // check if config file present
// if (fs.existsSync(configFilePath)) {
//   console.log(`      .. ${CONFIG_FILENAME} exists! No changes required.`);
// } else {
//   // doesn't exist, so copy it in
//   console.log(`INFO: ${CONFIG_FILENAME} not found; creating it`);
//   // get path to sample file
//   const configTemplate = path.join(CURR_DIR, '..', 'resources', `${CONFIG_FILENAME}`);
//   // copy file in
//   fs.copyFileSync(configTemplate, configFilePath);
// }
/**
 *
 * STEP 2: ESLINT IGNORE FILE
 *
 */
console.log('ESLINT PRESET POSTINSTALL STEP 2 of 4...');
var IGNORE_FILENAME = '.eslintignore';
console.log("INFO: Adding ESLint ignore file to: ./" + IGNORE_FILENAME);
var ignoreFilePath = path.resolve(path.join(projectPath, IGNORE_FILENAME));
// check if file present
// if (fs.existsSync(ignoreFilePath)) {
//   console.log(`      .. ${IGNORE_FILENAME} exists! No changes required.`);
// } else {
//   // doesn't exist, so copy it in
//   console.log(`INFO: ${IGNORE_FILENAME} not found; creating it`);
//   // get path to sample file
//   const configTemplate = path.join(CURR_DIR, '..', 'resources', IGNORE_FILENAME);
//   // copy file in
//   fs.copyFileSync(configTemplate, ignoreFilePath);
// }
/**
 *
 * STEP 3: UPDATE GULPFILE.JS WITH ESLINT TASK
 *
 */
console.log('ESLINT PRESET POSTINSTALL STEP 3 of 4...');
var GULPFILE_FILENAME = 'gulpfile.js';
console.log("INFO: Updating ./" + GULPFILE_FILENAME + " add eslint task");
var gulpFileData = fs.readFileSync(GULPFILE_FILENAME, 'utf8');
// read in all data from the template file
var GULPDELTA_FILEPATH = path.join(CURR_DIR, '..', 'resources', 'gulpfile.delta.js');
var GULPDELTA_CONTENT = fs.readFileSync(GULPDELTA_FILEPATH, 'utf8');
// update file contents
var result = gulpFileData.replace(/build.initialize\(require\('gulp'\)\);/g, GULPDELTA_CONTENT);
console.log("new gulp file");
console.log(result);
fs.writeFileSync(GULPFILE_FILENAME, result);
