const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

	const files =[
		'./dist/ng-bubble-elements/runtime.js',
		'./dist/ng-bubble-elements/polyfills.js',
		'./dist/ng-bubble-elements/scripts.js',
		'./dist/ng-bubble-elements/main.js',
	];

	try {
		await fs.ensureDir('public/assets/js')
	}catch (e) {
		console.log("couldn't find files");
	}

	await concat(files, 'public/assets/js/js-bubble.js')
	console.info('Elements created successfully!')

})()