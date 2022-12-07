const lives = document.getElementById("lives")
const score = document.getElementById("score")
const level = document.getElementById("level")
const endResult = document.getElementById("end-result")


function start() {
    toogleScreen('game-over', false)
    toogleScreen('start',false)
    toogleScreen('menu', true)
}

function playGame(level) {
    toogleScreen('menu', false)
    toogleScreen('game', true)
    settings.mode = level
    startGame()
}

function gameOver(){
    toogleScreen('game',false)
    toogleScreen('start', false)
    toogleScreen('game-over', true)
}

function updatePanel(){
    lives.innerText="Lives:  " + (settings.lives - settings.howManyTimesHit)
    score.innerText="Score:  " + settings.score
    level.innerText="Level:  " + settings.level
    endResult.innerText="YOUR SCORE: " + settings.score
    
    if(parseInt(settings.lives - settings.howManyTimesHit)<2){
        canvas.classList.add("oneLive");
        lives.classList.add("oneLive");
    }else{
        canvas.classList.remove("oneLive");
        lives.classList.remove("oneLive");
    }
}

function toogleScreen(id, toggle) {
    let element = document.getElementById(id)
    let display = (toggle) ? 'block' : 'none'
    element.style.display = display
}