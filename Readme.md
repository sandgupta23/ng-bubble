# ng-bubble

Opens your Angular component's source file in VS code, when double clicked on component in UI/browser.

### Usage

1. Install with npm: ```npm install -g angular-bubble```
2. Open your Angular project in VS code.
3. Run following command ```angular-bubble``` in terminal (command options are listed below).
4. Above command will give you a script file, copy and paste that into your index.html
5. Run your Angular project in another terminal (ex: ng serve) and on any double click on any component to open it into vscode.


### command options
1. ```--port```: ```<number>``` => You can provide any port. Defaults to ```11637```.
2. ```--ctrl```: ```<y or n>``` => If y, you will require to press y along with double click on component to open it in VS code. Defaults to ```n```.
3. ```--root```: ```<string>``` => You component prefix. Defaults to ```app```


### Notes
1. You need to have Angular version 2 or above. Angular 1 (Angularjs) is not supported.

### License
MIT
