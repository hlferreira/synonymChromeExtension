var selection = null;
var syn = false;
var trsl = false;
var mean = false;

var newbox;
var action;


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { //Does not do anything
    //const newbox = createBox();
    const newbox = new Box();
    const body = document.querySelector("body");

    body.appendChild(newbox.element);
    sendResponse({"message": "not much sup with u"});
})

function setup(){
    var sel = window.getSelection();
    if(action && sel.toString() != ""){
        action.doStuff();
    }
    else if(selection && sel.baseNode == selection.baseNode && sel.toString() == ""){ //in case it clicks the text area again, this removes the box
        newbox.deleteBox()
    }
}


//---------------- Text functions -----------------------
function selectionChange(){
    if(document.querySelector("#newbox")){
        var sel = window.getSelection();

        if(sel.toString() != ""){
            selection = new Selection(sel);
        }
    }
}

function selectInput(){
    if(selection != null){
        /* const mdown = new MouseEvent("mousedown");
        selection.baseNode.dispatchEvent(mdown);
        console.log(selection.baseNode) */
        
        var w = window.getSelection();
        
        //const range = document.createRange();
        //range.selectNodeContents(temp1);
        //selection.removeAllRanges();
        //selection.addRange(range);
        
        var r = new Range();
        r.setStart(selection.baseNode, selection.startPos);
        r.setEnd(selection.baseNode, selection.endPos);
        w.removeAllRanges();
        
        w.addRange(r);
        
        /* const mup = new MouseEvent("mouseup");
        selection.baseNode.dispatchEvent(mup); */
        
        selection.baseNode = null;
    }
}

//rework this
function isEditable(sel){
    const inputTypes = ['text', 'textarea', 'input', 'email', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week']

    //|| inputTypes.includes(sel.baseNode.nodeName.replace("#", ""))
    if(sel.activeElement.contentEditable == "true" || inputTypes.includes(sel.activeElement.tagName.toLowerCase())){
        return true
    }
    else
        return false
}

function spaceReplace(str){
    if(str.endsWith(" ")){
        str = str.slice(0,-1)
    }
    var l = str.split(" ")
    var processedStr = ""
    while(l.length > 1){
        processedStr += l.shift() + "+"
    }
    processedStr += l.shift()
    return processedStr
}

function subText(el){
    selectInput()

    const t = new window.InputEvent("beforeinput",{
        bubbles: !0,
        cancelable: !0,
        inputType: "insertText",
        data: el.value
    });

    var words = el.value.split(" ") 
    words.forEach((element, index) => { //for some reason did not work when it was more than one word
        document.execCommand("insertText", !1, element) //deprecated navigator.clipboard

        if(words.length - 1 != index){
            document.execCommand("insertText", !1, " ") //deprecated navigator.clipboard
        }
    });

}

//----------------- Triggers/Actions --------------------
//maybe should be elsewhere
document.addEventListener("keydown", (event) => {
    if((event.code == "KeyS" && event.altKey) || (event.code == "KeyT" && event.altKey && event.ctrlKey) || (event.code == "KeyB" && event.ctrlKey)){ // fast code REDO
        if(!newbox){
            document.addEventListener("selectionchange", setup)
            const body = document.querySelector("body");
            
            newbox = new Box();
            //newbox = createBox();
            body.appendChild(newbox.element);
        }
    }

    if(event.code == "KeyS" && event.altKey){
        action = new Synonym();
    }

    if(event.code == "KeyT" && event.altKey && event.ctrlKey){
        //action = new Translate();
    }
    
    if(event.code == "KeyB" && event.ctrlKey){
        action = new Meaning();
    }
});

document.addEventListener("click", (event) => {
    if(newbox){
        newbox.removeBox(event.target)
    }
})