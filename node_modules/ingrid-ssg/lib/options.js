const path = require('path');
const { cwd } = require('process');
const fs = require('fs-extra');

let cfgName = 'ingrid.config.js';
let pkgName = 'ingrid-ssg';
let userConfig = path.join(cwd(), cfgName);
let defaultConfig = path.join(cwd(), 'node_modules', pkgName, cfgName);

if (!fs.existsSync(userConfig)) {
	fs.copyFileSync(defaultConfig, userConfig);
	console.info('ingrid.config.js created');
	console.info('using default options');
}

const config = require(userConfig);

// Set default options
module.exports = {
	src: config?.src || defaults.src,
	dist: config?.dist || defaults.dist,
	ignorePattern: config?.ignorePattern || defaults.ignorePattern,
	global: config?.global || defaults.global
}