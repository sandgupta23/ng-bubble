const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

	const files =[
		'./dist/ng-bubble-elements/runtime.js',
		'./dist/ng-bubble-elements/polyfills.js',
		'./dist/ng-bubble-elements/scripts.js',
		'./dist/ng-bubble-elements/main.js',
	];

	await fs.ensureDir('public/assets/js')

	await concat(files, 'public/assets/js/user-poll.js')
	console.info('Elements created successfully!')

})()