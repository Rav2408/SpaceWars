let invaders = new Array
let rockets = new Array
const ship = new Ship(1,1,200,settings.ships.three) 
const background = new Entity(0,0,0,settings.background.blue.one)

function createInvaders(level) {
    for(let i=0;i<level;i++){
        if(settings.level == 5){
            invaders.push(new Boss(settings.bounds.right-1,
                random(settings.bounds.top, settings.bounds.bottom-10),settings.enemy.speed,settings.ships.six))
        }else if(settings.level>5){
            if(i%2==0){
                invaders.push(new Boss(settings.bounds.right-1,
                    random(settings.bounds.top, settings.bounds.bottom-10),settings.enemy.speed,settings.ships.six))
            }else{
                invaders.push(new Invader(settings.bounds.right-1,
                    random(settings.bounds.top, settings.bounds.bottom-10),settings.enemy.speed,settings.ships.five))
            }

        }
        else{
            invaders.push(new Invader(settings.bounds.right-1,
                random(settings.bounds.top, settings.bounds.bottom-10),settings.enemy.speed,settings.ships.five))
        }
        
    }
}   

function drawInvaders() {
    for (let i = 0; i<invaders.length; i++){
        invaders[i].drawEntity()
    }
}

function moveInvaders(delta){

    for (let i = 0; i<invaders.length; i++){
        invaders[i].moveEntity('left', delta) 
        let now = Date.now()
        if(now - invaders[i].lastShot > settings.enemy.shotPeriod){
            if(random(1,3) == 3){
                invaders[i].shot()
                
            }
            invaders[i].lastShot = now
        }
        if(invaders[i].x < settings.bounds.left){
            invaders.splice(i,1)
        }
        
             
    }
}

function createRocket() {
    rockets.push(new Rocket(ship.x+ship.width-3, ship.y+23, 250, 'right',settings.ships.three.rocket,'user'))
}

function drawRockets() {
    for (let i = 0; i<rockets.length; i++){
        rockets[i].drawEntity()
    }
}

function moveRockets(delta){
    for (let i = 0; i<rockets.length; i++){
        if(!rockets[i].moveEntity(rockets[i].direction, delta)){
            rockets.splice(i,1)
        }    
    }
}
function entityHit(victim, attackers) {
    for (let i = 0; i < attackers.length; i++) {
        if (victim.isHit(attackers[i]) && attackers[i].author != victim.author) {
            attackers.splice(i, 1)
            return true
        }
    }
    return false
}

function moveShip(ship,delta) {

    if (settings.pressedKeys[settings.keys.left]) {
        ship.x -= ship.velocity*delta
    }
    if (settings.pressedKeys[settings.keys.right]) {
        ship.x += ship.velocity*delta
    }
    if (settings.pressedKeys[settings.keys.up]) {
        ship.y -= ship.velocity*delta/2
    }
    if (settings.pressedKeys[settings.keys.down]) {
        ship.y += ship.velocity*delta/2
    }

    if (settings.pressedKeys[settings.keys.spaceBar]) {
        let now = Date.now()
        if(now - ship.lastShot > 200){
            createRocket()
            ship.lastShot = now
        }
    }

    //bounds
    if (ship.x < settings.bounds.left) {
        ship.x = settings.bounds.left
    }
    if (ship.x + ship.width > settings.bounds.right) {
        ship.x = settings.bounds.right - ship.width
    }
    if (ship.y < settings.bounds.top) {
        ship.y = settings.bounds.top
    }
    if (ship.y + ship.height >= settings.bounds.bottom) {
        ship.y = settings.bounds.bottom - ship.height
    }
}

function wasShipHit(){
    if(entityHit(ship,rockets)){
        settings.howManyTimesHit++

        canvas.classList.remove("hit");
        lives.classList.remove("hit-lives")
        void canvas.offsetWidth;
        canvas.classList.add("hit");        
        lives.classList.add("hit-lives");
        updatePanel()
    }
}

function wasInvaderHit() {
    for(let i=0; i< invaders.length; i++){
        if(entityHit(invaders[i],rockets)){
            invaders.splice(i,1)
            settings.score++
            updatePanel()
        }
    }
}

function wasRocketHit() {
    for(let i=0; i< rockets.length; i++){
        if(entityHit(rockets[i],rockets)){
            rockets.splice(i,1)
        }
    }
}

function nextLevel(){
    if(settings.score % 10 == 1){
        settings.level++
        settings.score++
        settings.lives++
        if(settings.level==3 && settings.mode !== 'EASY'){
            settings.enemy.missles=3
        }
        updatePanel()
        createInvaders(settings.level)
    }else if(invaders.length === 0){
        createInvaders(settings.level)
        console.log('emptyGeneration')
    }else if(random(1,50) == 10){
        createInvaders(settings.level-invaders.length)
        console.log('randomGeneration')
    }
}


function clear(){
    c.fillStyle="black"
    c.fillRect(0,0,canvas.width,canvas.height)
}

function update(delta) {
    moveShip(ship,delta)
    wasRocketHit()
    wasShipHit()

    moveRockets(delta)
    wasInvaderHit()
    wasShipHit()

    moveInvaders(delta)
    wasInvaderHit()
    wasShipHit()

    clear()
    background.drawEntity()
    ship.drawEntity()
    drawRockets()
    drawInvaders()
    nextLevel()
}

function reset(){
    switch (settings.mode) {
        case 'EASY':
            settings.lives = 10
            settings.enemy.missleSpeed = 200
            settings.enemy.speed = 100
            settings.enemy.shotPeriod = 1000
            break;
        case 'MEDIUM':
            settings.lives = 5
            settings.enemy.missleSpeed = 250
            settings.enemy.speed = 100
            settings.enemy.shotPeriod = 600
            break;
        case 'HARD':
            settings.lives = 3
            settings.enemy.missleSpeed = 350
            settings.enemy.speed = 120
            settings.enemy.shotPeriod = 300
            break;
    }
    settings.howManyTimesHit = 0
    settings.level = 1
    settings.score = 0
    settings.enemy.missles = 1
    invaders=[]
    rockets=[]
    updatePanel()
}


function startGame(){
    
    let lastTimestamp = 0
    clear()
    reset()

    createInvaders(settings.level)

    window.requestAnimationFrame(step)

    function step(timestamp) {
        if(settings.lives - settings.howManyTimesHit <= 0){
            gameOver()
            return
        }
        delta = (timestamp - lastTimestamp) / 1000
        update(delta)

        lastTimestamp = timestamp
        window.requestAnimationFrame(step)
    }
}

clear()

