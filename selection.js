class Selection{

    word;
    rng;
    startPos;
    endPos;
    baseNode;
    activeElement;

    constructor(sel){
        this.activeElement = document.activeElement;
        this.rng = sel.getRangeAt(0);

        this.word = sel.toString();
        this.startPos = this.rng.startOffset;
        this.endPos = this.rng.endOffset;
        this.baseNode = sel.baseNode;
        
        newbox.element.querySelector("#selectedWord").innerHTML = this.word

        this.relocateBox();
    }

    relocateBox(){
        if(isEditableComponent(this.activeElement)){
            var pos = this.activeElement.getBoundingClientRect();
        }
        else{
            var pos = this.rng.getBoundingClientRect();
        }
            
        newbox.changePosition(pos.x, pos.y - 5);
    }
}