const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

	const files =[
		'./dist/ng-bubble-elements/runtime.js',
		'./dist/ng-bubble-elements/polyfills.js',
		'./dist/ng-bubble-elements/scripts.js',
		'./dist/ng-bubble-elements/main.js',
	];

	await fs.ensureDir('elements')

	await concat(files, 'elements/user-poll.js')
	console.info('Elements created successfully!')

})()