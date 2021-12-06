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
        newbox.body.appendChild(this.element);
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
            this.setFootnote('Datamuse API', 'skyblue');
            
            this.removeSynButtons();
            if(this.data === ""){
                this.createSynButton("No word selected", null);
                selection.relocateBox();
                return;
            }
            else if(this.data.length == 0){
                const button = this.createSynButton("We couldn't find any synonyms, check if it is in the correct language", null);
                selection.relocateBox();
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

        selection.relocateBox();
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
        const div = document.createElement("div");
        const b = document.createElement("button");
        div.className = "synButtonWrapper";
        div.appendChild(b);

        //b.id = "synText";
        b.className = "synBut";

        if(active){
            b.className += " active";
        }
        else if(active == null){
            b.className += " error text-left"
        }
        else{
            b.className.replace(" active", "");

            var svg = document.createElement("img");
            const cp = chrome.extension.getURL("copypaste.svg");
            svg.src = cp;
            svg.hidden = true;
            svg.id = "svg" + str;
            svg.style.width = "8px";
            svg.style.height = "8px";
            svg.className = "synButCopyPaste";
            
            div.appendChild(svg);
            div.addEventListener("mouseover", () => {
                div.querySelector("#svg" + str).hidden = false});

            div.addEventListener("mouseout", () => {
                div.querySelector("#svg" + str).hidden = true});
        }

        b.innerHTML = str;
        b.value = str;
        b.addEventListener("mousedown", (el) => {
            if(active){
                subText(el.target)
                newbox.removeBox(el.target)
            }
            else if(active == false){
                navigator.clipboard.writeText(el.target.value)
                newbox.removeBox(el.target)
            }
        })

        this.buttonContainer.appendChild(div);
        return b;
    }

    createPlusButton(){
        this.max += 5;
        const b = document.createElement("button");

        b.id = "plusButton";
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
        const pb = this.buttonContainer.querySelector("#plusButton");
        if(pb){
            this.buttonContainer.removeChild(pb);
        }
    }

    setFootnote(text, color){
        var footnoteCaption = document.getElementById("footnote" + text);

        if(footnoteCaption == null){
            footnoteCaption = document.createElement("div");
            footnoteCaption.id = "footnote" + text;
            footnoteCaption.className = "footnoteCaption";
            
            var footnoteCircle = document.createElement("div");
            footnoteCircle.id = "footnoteCircle" + text;
            footnoteCircle.className = "footnoteCircle";

            footnoteCircle.style.backgroundColor = color;
            footnoteCaption.appendChild(footnoteCircle);

            var footnoteText = document.createElement("h");
            footnoteText.id = "footnoteText";
            footnoteText.innerHTML = text;
            footnoteCaption.appendChild(footnoteText);

            newbox.footnote.appendChild(footnoteCaption);
        }
        else{
            document.getElementById("footnoteCircle" + text).style.backgroundColor = color;
        }
    }
}

