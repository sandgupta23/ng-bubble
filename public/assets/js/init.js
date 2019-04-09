// let intervalRef = setInterval(() => {
// 	console.log(window.ng);
// 	if(window.ng){
// 		clearInterval(intervalRef);
// 	window.ng = 1;
		let el = document.createElement('js-bubble');
		let src = document.createElement('script');
		src.setAttribute('src', 'http://localhost:11637/assets/js/js-bubble.js');
		let body = document.body;
		body.appendChild(src);
		body.appendChild(el);
		// window.ng1 = window.ng;
		window.ng = undefined;
	// }
// }, 1000);

