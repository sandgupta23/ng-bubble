import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageByExtension'
})
export class ImageByExtensionPipe implements PipeTransform {

  transform(fileName: string, args?: any): any {
    /*TODO: looks ugly, use switch case. also cache the files*/
    if (fileName.endsWith('.ts')) { return 'https://avatars0.githubusercontent.com/u/36300238?s=400&v=4'; }
    if (fileName.endsWith('.js')) { return 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg'; }
    if (fileName.endsWith('.html')) { return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/180px-HTML5_logo_and_wordmark.svg.png'; }
    if (fileName.endsWith('.css')) { return 'http://share.net-expression.com/538ce71699372/1'; }
    if (fileName.endsWith('.scss') || fileName.endsWith('sass')) { return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/330px-Sass_Logo_Color.svg.png'; }
    if (fileName.endsWith('.less')) { return 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LESS_Logo.svg/300px-LESS_Logo.svg.png'; }
    if (fileName.endsWith('.jsx')) { return 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'; }
    if (fileName.endsWith('.tsx')) { return 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'; }
    if (fileName.endsWith('.json')) { return 'https://upload.wikimedia.org/wikipedia/commons/c/c9/JSON_vector_logo.svg'; } else { return 'https://us.123rf.com/450wm/urfandadashov/urfandadashov1808/urfandadashov180817062/107901402-stock-vector-file-vector-icon-isolated-on-transparent-background-file-logo-concept.jpg?ver=6'; }
  }

}
