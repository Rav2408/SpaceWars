function random(a,b){
    return Math.floor(Math.random() * b)+ a
}

function visitCounter() {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "https://api.countapi.xyz/hit/rav2408.github.ioSpaceWarsASCII/dev")
    xhr.responseType = "json"
    xhr.onload = function() {
        //visitCounterHtml.innerHTML=`This website has been visited ${this.response.value} times!`
    }
    xhr.send()
}