import config from '../ingrid.config.js';

// Set default options
export default {
	paths: {
		src: config?.paths?.src || './src',
		dist: config?.paths?.dist || './dist',
	},
	ignorePattern: config?.ignorePattern || /^_/m,
	global: config?.global || {}
}