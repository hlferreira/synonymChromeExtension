const button = document.querySelector("#b")
button.addEventListener("click", onclick, false)

function onclick(){
    chrome.tabs.query({currentWindow: true, active:true}, (tabs) => {
        //alert(tabs[0].id)
        chrome.tabs.sendMessage(tabs[0].id, 'sup', supbrosky)
        }
    )
}

function supbrosky(res){
    button.innerHTML = res.message
}