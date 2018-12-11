
let startWithAppRegex = new RegExp('^app-','i');
// document.addEventListener('dblclick',($event)=>{
document.addEventListener('onmouseover',($event)=>{

    let element = $event.target;
    while (!startWithAppRegex.test(element.tagName)){
        element = element.parentElement;
    }
    element.style.backgroundColor = 'red';
    sendNgTag(element.tagName);
});

function sendNgTag(tag) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("success");
        }
    };
    xhttp.open("GET", `http://localhost:11637/open?file=${tag}`, true);
    xhttp.send();
}
