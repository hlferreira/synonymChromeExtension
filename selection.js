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

        var pos = this.rng.getBoundingClientRect();
        newbox.changePosition(pos.x, pos.y - 5);
    }

    relocateBox(){
        var pos = this.rng.getBoundingClientRect();
        newbox.changePosition(pos.x, pos.y);
    }
}