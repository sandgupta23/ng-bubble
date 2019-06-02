let coreTokens = ng.coreTokens;
let probe = ng.probe;
let ɵcompilerFacade = ng.ɵcompilerFacade;

let el = document.createElement('js-bubble');
let src = document.createElement('script');
let body = document.body;
body.appendChild(el);
body.appendChild(src);

var loadJS = function (url, implementationCode, location) {
	//url is URL of external file, implementationCode is the code
	//to be called from the file, location is the location to
	//insert the <script> element

	var scriptTag = document.createElement('script');
	scriptTag.src = url;

	scriptTag.onload = implementationCode;
	scriptTag.onreadystatechange = implementationCode;

	location.appendChild(scriptTag);
};
var yourCodeToBeCalled = function () {
	Object.assign(ng, {coreTokens,probe,ɵcompilerFacade});
}
loadJS('http://localhost:11637/assets/js/js-bubble.js', yourCodeToBeCalled, document.body);