class Selection{

    word;
    startPos;
    endPos;
    baseNode;
    activeElement;

    constructor(sel){
        this.activeElement = document.activeElement;
        var rng = sel.getRangeAt(0);

        this.word = sel.toString();
        this.startPos = rng.startOffset;
        this.endPos = rng.endOffset;
        this.baseNode = sel.baseNode;
        
        newbox.element.querySelector("#selectedWord").innerHTML = this.word

        var pos = rng.getBoundingClientRect();
        newbox.changePosition(pos.x, pos.y);
    }
}