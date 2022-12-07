
class Sprite {
    constructor(position, imageSrc){
        this.position = position
        this.width = 100
        this.height = 100
        this.image = new Image()
        this.image.src = imageSrc 
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){
        this.draw()
    }
}

function moveShip(ship,delta) {

    if (settings.pressedKeys[settings.keys.left]) {
        ship.x -= ship.velocity*delta
    }
    if (settings.pressedKeys[settings.keys.right]) {
        ship.x += ship.velocity*delta
    }
    if (settings.pressedKeys[settings.keys.up]) {
        ship.y -= ship.velocity*delta
    }
    if (settings.pressedKeys[settings.keys.down]) {
        ship.y += ship.velocity*delta
    }

    if (settings.pressedKeys[settings.keys.spaceBar]) {
        let now = Date.now()
        if(now - ship.lastShot > 200){
            createRocket()
            ship.lastShot = now
        }
    }

    //bounds
    // if (ship.x < settings.bounds.left) {
    //     ship.x = settings.bounds.left
    // }
    // if (ship.x + ship.width > settings.bounds.right) {
    //     ship.x = settings.bounds.right - ship.width
    // }
    // if (ship.y < settings.bounds.top) {
    //     ship.y = settings.bounds.top
    // }
    // if (ship.y + ship.height >= settings.bounds.bottom) {
    //     ship.y = settings.bounds.bottom - ship.height
    // }
}


const background = new Sprite(
    {
        x: 0,
        y: 0
    },
    "./assets/Blue Nebula/Blue_Nebula_01-1024x1024.png"
)

const ship = new Ship(1,1,100,"./assets/Ship3/Ship3.png") 


function animate(){

    let lastTimestamp = 0
    window.requestAnimationFrame(step)

    function step(timestamp) {
        // if(settings.lives - settings.howManyTimesHit <= 0){
        //     //gameOver()
        //     return
        // }
        delta = (timestamp - lastTimestamp) / 1000
        c.fillStyle = 'black'
        background.update()
        moveShip(ship,delta)
        ship.drawEntity()


        lastTimestamp = timestamp
        window.requestAnimationFrame(step)
        console.log("działa")
        
    }
}



animate()