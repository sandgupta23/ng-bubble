let program = require('commander');

export function commanderInit () {
  program
    .option('--ask', 'Ask for options')
    .option('-p, --port <port>', 'Port on which to listen to (defaults to 11637)', parseInt)
    .option('--ctrl <ctrl>', 'Enable click ctrl press along with double click')
    .option('--ide <ide>', 'ide to enable. defaults to VS code')
    .option('--options <option>', 'to make ng-bubble as you for options')
    .option('--options <option>', 'to make ng-bubble as you for options')
    .parse(process.argv);

  let port = program.port || 11637;
  let ctrl = program.ctrl || 'n';
  let options = program.ask;
  let ide_user_input = program.ide || 'vscode';
  if (!(ctrl === 'y' || ctrl === 'yes' || ctrl === 'n' || ctrl === 'no')) {
    throw "ERROR: ctrl can only have: y, yes, n, no";//todo
  }
  ctrl = ctrl === 'y' || ctrl === 'yes';

  return {
    port,
    ctrl,
    options,
    ide_user_input
  }

};