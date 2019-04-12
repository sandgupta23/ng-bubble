var fs = require('fs');
var path = require('path');

const SCAN_EXCLUDED = [
	'.',
	'node_modules',
	'out-tsc',
	'dist',
	'!',
	'tmp',
	"documentation"
];

module.exports = function scan(dir, alias){

	let walkRes =walk(dir, alias);
    // 
	return {
		name: alias,
		type: 'folder',
		path: alias,
		items: walkRes
	};

};


function walk(dir, prefix){

	prefix = prefix || '';

	if(!fs.existsSync(dir)){
		return [];
	}

	return fs.readdirSync(dir).filter(function(f){
		let x = SCAN_EXCLUDED.findIndex((e)=>{
           return e===f || e===f[0]
		}) === -1;
        return x;

	}).map(function(f){

		var p = (dir + '/' + f).replace('./', ''),
			stat = fs.statSync(p);
        var complatePath = path.join(prefix, p);

		if(stat.isDirectory()){

			return {
				name: f,
				type: 'folder',
				path: prefix + '/' + p,
				items: walk(p, prefix)
			};

		}

		return {
			name: f,
			type: 'file',
			path: complatePath,
			size: stat.size
		}

	});

};