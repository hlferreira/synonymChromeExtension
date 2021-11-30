class Synonym extends Action{

    static element;
    static buttonContainer;
    static data;
    max = 5;

    constructor(){
        super()
        //synonym div
        this.element = document.createElement("div");
        this.element.id = "synBox";

        const h1 = document.createElement("h");
        h1.className = "wordTitle";
        h1.id = "synTitle";
        h1.innerHTML = "Synonyms";
        this.element.appendChild(h1);

        const d = document.createElement("div");
        d.id = "buttonContainer";
        this.element.appendChild(d);
        this.buttonContainer = d;

        //newbox global variable
        newbox.element.appendChild(this.element);
        this.doStuff();
    }

    doStuff(){
        selectionChange()
        
        this.removeSynButtons();
        if(selection)
            this.getMeansLike(selection.word);
    }
    
    async getMeansLike(str){
        if(this.data == null){
            //const promise = new Promise((res, rej) => {res(this.requestMeansLike(str));})
            this.data = await this.requestMeansLike(str);
            if(this.data == ""){
                this.removeSynButtons();
                this.createSynButton("No word selected", false);
                return;
            }
        }

        var bool = isEditable(selection);
        
        var maxIndex = this.data.length < this.max ? this.data.length : this.max;
        var minIndex = (Math.floor(maxIndex/5)-1)*5;

        for(var i = minIndex; i < maxIndex; i++){
            this.createSynButton(this.data[i]['word'], bool);
        }
        
        if(this.data.length > maxIndex){
            this.createPlusButton();
        }

    }

    async requestMeansLike(str){
        var processedStr = spaceReplace(str)
        
        if(processedStr == ""){
            return processedStr
        }
    
        var url = "https://api.datamuse.com/words?ml=" + processedStr
    
        let response = await fetch(url)
        let data = await response.json();
        return data;
    }

    createSynButton(str, active){
        const b = document.createElement("button");
        
        //b.id = "synText";
        b.className = "synBut";
        active ? b.className += " active" : b.className = b.className.replace(" active", "");

        b.innerHTML = str;
        b.value = str;
        b.addEventListener("mousedown", (el) => {
            if(active){
                subText(el.target)
            }
            newbox.removeBox(el.target)
        })

        this.buttonContainer.appendChild(b);
    }

    createPlusButton(){
        this.max += 5;
        const b = document.createElement("button");

        b.id = "plusBut";
        b.innerHTML = "+";

        b.addEventListener("mousedown", (el) => {
            this.removePlusButton();
            this.getMeansLike();
        })

        this.buttonContainer.appendChild(b);
    }

    removeSynButtons(){
        this.buttonContainer.querySelectorAll(".synBut").forEach((el) => {this.buttonContainer.removeChild(el)})
    }

    removePlusButton(){
        const pb = this.buttonContainer.querySelector("#plusBut");
        if(pb){
            this.buttonContainer.removeChild(pb);
        }
    }
}

