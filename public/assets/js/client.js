let startWithAppRegex = new RegExp('^app-','i');
document.addEventListener('dblclick',($event)=>{
    let element = $event.target;
    while (!startWithAppRegex.test(element.tagName)){
        element = element.parentElement;
    }
    sendNgTag(element.tagName);
});

document.addEventListener('mouseover', ($event)=>{
    if (!window.event.ctrlKey || !window.event.shiftKey ) return;
    let element = $event.target;
    while (!startWithAppRegex.test(element.tagName)){
        element = element.parentElement;
    }
    removeMark();
    let newMarkNode = createSpanNode(element.tagName);
    element && element.appendChild(newMarkNode);
    $event.stopPropagation();
});

function removeMark(){
    try {
        let oldMarkNode = document.getElementById('ng-bubble-mark');
        oldMarkNode.parentElement.removeChild(oldMarkNode);
    }catch (e) {
        console.log(e);
    }
}

function createSpanNode(text){
    var span = document.createElement("p");
    var t = document.createTextNode(text);
    span.style.position = 'absolute';
    span.style.top = 0;
    span.style.left = 0;
    span.style.fontSize = '8px';
    span.id = 'ng-bubble-mark';
    span.appendChild(t);
    return span;
}

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
