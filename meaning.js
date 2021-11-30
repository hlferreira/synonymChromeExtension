class Meaning extends Action{
    static element;

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

        newbox.element.appendChild(this.element);
        this.doStuff();
    }

    doStuff(){

        selectionChange()

        if(selection){
            this.getMeaning(selection.word).then((data) => {
                if(data == ""){
                    this.textContainer.innerHTML = "No word is selected";
                    return
                }
                
                if(data[0]["defs"]){
                    this.textContainer.innerHTML = data[0]["defs"][0];
                }
            });
        }
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
}