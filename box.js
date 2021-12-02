class Box{

    static element;
    static body;
    static footnote;

    constructor(){
        this.element = document.createElement("div");

        this.element.id = "newbox";
        this.element.style.left = window.innerWidth/2 + "px";
        this.element.style.top = window.innerHeight/2 + "px";
    
        const boxHeader = document.createElement("div");
        boxHeader.id = "boxHeader"
        this.element.appendChild(boxHeader);
    
        const h = document.createElement("h");
        h.className = "wordTitle";
        h.innerHTML = "Word";
        boxHeader.appendChild(h);
    
        const a = document.createElement("h");
        a.id = "selectedWord";
        a.className = "normalText";
        boxHeader.appendChild(a);

        const quit = document.createElement("h");
        quit.id = "quitButton";
        quit.innerHTML = "+";
        this.element.appendChild(quit);
        quit.addEventListener("click", () => {
            if(this.element)
                this.deleteBox();
        })

        this.body = document.createElement("div");
        this.body.id = "boxBody";
        this.element.appendChild(this.body);

        this.footnote = document.createElement("div");
        this.footnote.id = "footnote";

        this.element.appendChild(this.footnote);
    }

    removeBox(target){ //CHECKS IF IT SHOULD BE REMOVED
        const body = document.getElementsByName("body"); 

        var found = false;
        var firstEl = target;
        while(firstEl && firstEl != body){
            if(firstEl == this.element){
                found = true;
                break;
            }
            firstEl = firstEl.parentNode;
        }
        
        if(!(found || (selection && selection.baseNode == target))){ //maybe hide is smarter
            this.deleteBox()
        }
        
    }
    
    deleteBox(){ //ACTUALLY DELETES
        const setfalse = () => {syn = false; trsl = false; mean = false;}
        this.element.parentElement.removeChild(this.element);

        newbox = null;
        selection = null;
        action = null;
        setfalse;

        document.removeEventListener("selectionchange", setup)
    }

    changePosition(x, y){
        const nb = this.element ? this.element : document.querySelector("#newbox");
    
        var width = parseInt(nb.offsetWidth);
        var height = parseInt(nb.offsetHeight);
    
        var bWidth = parseInt(getComputedStyle(nb, null).getPropertyValue("border-left-width").slice(0,-2));
    
        nb.style.left = x - bWidth/2 + "px";
        nb.style.top = y - height - 15 + "px";
    }
}