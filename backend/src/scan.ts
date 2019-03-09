import * as fs from 'fs';
import * as path from 'path';

const SCAN_EXCLUDED = [
	'.',
	'node_modules',
	'out-tsc',
	'dist',
	'!',
	'tmp'
];

module.exports = function scan(dir:any, alias:string){

	let walkRes =walk(dir, alias);
    // console.log(walkRes);
	return {
		name: alias,
		type: 'folder',
		path: alias,
		items: walkRes
	};

};


function walk(dir:any, prefix:any):any{

	prefix = prefix || '';

	if(!fs.existsSync(dir)){
		return [];
	}

	return fs.readdirSync(dir).filter(function(f:any){
		let x = SCAN_EXCLUDED.findIndex((e)=>{
           return e===f || e===f[0]
		}) === -1;
        return x;

	}).map(function(f:any){

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