// const modalTemplate = `<!-- Trigger/Open The Modal -->
// <button id="myBtn">Open Modal</button>
// <script  src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.42.0/codemirror.min.js"></script>
// <!-- The Modal -->
// <div id="myModal" class="modal">
//
//   <!-- Modal content -->
//   <div class="modal-content">
// <textarea id="myTextarea"></textarea>
//     <span class="close">&times;</span>
//     <p>Some text in the Modal..</p>
//   </div>
//
// </div>`;

// document.body.innerHTML += modalTemplate;

let startWithAppRegex = new RegExp('^app-', 'i');
document.addEventListener('dblclick', ($event) => {
    let element = $event.target;
    while (!startWithAppRegex.test(element.tagName)) {
        element = element.parentElement;
    }
    sendNgTag(element.tagName);
});

function openModal() {
    // Get the modal
    let modal = document.getElementById('myModal');
    let myTextarea = document.getElementById('myTextarea');
    setTimeout(() => {
        var editor = CodeMirror.fromTextArea(myTextarea, {
            lineNumbers: true
        });
    }, 5000);
// Get the button that opens the modal
    let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
//     btn.onclick = function() {
    modal.style.display = "block";
    // }

// When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// openModal();
document.addEventListener('mouseover', ($event) => {
    if (!window.event.ctrlKey || !window.event.shiftKey) return;
    let element = $event.target;
    while (!startWithAppRegex.test(element.tagName)) {
        element = element.parentElement;
    }
    removeMark();
    let newMarkNode = createSpanNode(element.tagName);
    element && element.appendChild(newMarkNode);
    $event.stopPropagation();
});

function removeMark() {
    try {
        let oldMarkNode = document.getElementById('ng-bubble-mark');
        oldMarkNode.parentElement.removeChild(oldMarkNode);
    } catch (e) {
        console.log(e);
    }
}

function createSpanNode(text) {
    let span = document.createElement("p");
    let t = document.createTextNode(text);
    span.style.position = 'absolute';
    span.style.top = 0;
    span.style.left = 0;
    span.style.fontSize = '8px';
    span.id = 'ng-bubble-mark';
    span.appendChild(t);
    return span;
}

function sendNgTag(tag) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("success");
        }
    };
    xhttp.open("GET", `http://localhost:11637/open?file=${tag}`, true);
    xhttp.send();
}



