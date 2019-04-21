// const fs = require('fs');
import * as fs from 'fs';
var path = require('path');

function getTemplate(port: number, shouldUseMouseClick: boolean) {
  // let el = document.createElement('js-bubble');
  // let src = document.createElement('src');
  // src.setAttribute('src', `http://localhost:${port}/assets/js/js-bubble.js`);
  // let body = document.body;
  // body.appendChild(el);
  // body.appendChild(src);
  return (
    `
        let el = document.createElement('js-bubble');
        let src = document.createElement('script');
        src.setAttribute('src', 'http://localhost:${port}/assets/js/js-bubble.js');
        let body = document.body;
        body.appendChild(el);
        body.appendChild(src);
      `
  );
}

module.exports = function writeTemplate(port: number, shouldUseMouseClick: boolean) {
  try {
    fs.writeFileSync(path.join(__dirname, '../../../' ,'public/assets/js/init.js'), getTemplate(port, shouldUseMouseClick), {flag:'w'});
  } catch (e) {
    //console.error(e);
  }
};