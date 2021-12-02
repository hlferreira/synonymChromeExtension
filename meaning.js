class Meaning extends Action{
    static element;
    static moreDiv;
    index = 0;

    constructor(){
        super();

        this.element = document.createElement("div");
        this.element.id = "meanBox";
        
        const h1 = document.createElement("h");
        h1.className = "wordTitle";
        h1.id = "meanTitle";
        h1.innerHTML = "Meaning";
        this.element.appendChild(h1);

        const d = document.createElement("div");
        d.id = "textContainer";
        this.element.appendChild(d);
        this.textContainer = d;
        
        this.moreDiv = document.createElement("div");
        this.moreDiv.id = "moreDiv";
        this.element.appendChild(this.moreDiv);

        var prev = document.createElement("h");
        prev.innerHTML = "previous definition";
        prev.id = "meanPrev";
        prev.addEventListener("click" , () => {
            this.index--;
            this.doStuff();
        })

        this.moreDiv.appendChild(prev);
        
        var post = document.createElement("h");
        post.innerHTML = "other definition";
        post.id = "meanPost";

        post.addEventListener("click" , () => {
            this.index++;
            this.doStuff();
        })
        
        this.moreDiv.appendChild(post);

        newbox.body.appendChild(this.element);
        this.doStuff();
    }

    async doStuff(){

        selectionChange()

        if(selection){
            if(this.data == null){
                this.data = await this.getMeaning(selection.word)
                this.setFootnote("Datamuse API", "skyblue")
                
                if(this.data === ""){
                    this.textContainer.className = this.textContainer.className.replace("active", "");
                    this.textContainer.innerHTML = "No word is selected";
                    return
                }
                
                if(this.data.length == 0){
                    this.textContainer.className = this.textContainer.className.replace("active", "");
                    this.textContainer.innerHTML = "We couldn't find any synonyms, check if it is in the correct language";
                    return
                }
            }
            
            if(this.data[0]["defs"] && this.index < this.data[0]["defs"].length){
                this.textContainer.innerHTML = "\"" + this.data[0]["defs"][this.index] + "\"";
                this.textContainer.className = "active";
                this.moreUpdate(this.index);
            }

        }

        selection.relocateBox();
    }
    
    async getMeaning(str){
        var processedStr = spaceReplace(str)
        
        if(processedStr == ""){
            return processedStr
        }
        
        var url = "https://api.datamuse.com/words?sp=" + processedStr + "&qe=sp" + "&md=d" //+ "&max=2"
    
        let response = await fetch(url)
        let data = await response.json();
        return data;
    }

    moreUpdate(i){
        let prev = this.moreDiv.querySelector("#meanPrev");
        let post = this.moreDiv.querySelector("#meanPost");

        if(i == 0){
            prev.hidden = true;
        }
        else if(i > 0){
            prev.hidden = false;
        }
        
        if(i == this.data[0]["defs"].length - 1){
            post.hidden = true;
        }
        else if(i < this.data[0]["defs"].length - 1){
            post.hidden = false;
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