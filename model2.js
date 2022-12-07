
class Entity{
    constructor(x, y, velocity, object, offset={x:0,y:0}){
        this.x = x
        this.y = y
        this.velocity = velocity
        this.width = 1
        this.height = 1
        this.image = new Image()
        this.image.src = object.src
        this.offset = offset
    }

    moveEntity(direction, delta){
        switch (direction) {
            case 'left':
                this.x -= this.velocity*delta
                break
            case 'right':
                this.x += this.velocity*delta
                break
            case 'left-up':
                this.x -= this.velocity*delta
                this.y -= this.velocity*delta/2
                break
            case 'left-down':
                this.x -= this.velocity*delta
                this.y += this.velocity*delta/2
                break
            default:
                break
        }
        if(this.x < settings.bounds.left || this.x > settings.bounds.right
            || this.y > settings.bounds.bottom || this.y < settings.bounds.top){
                return false
            }
        return true
    }

    drawEntity(){
        //for debug purpose
        // c.fillStyle='red'
        // c.fillRect(this.x, this.y,this.width,this.height)
        c.drawImage(this.image, this.x - this.offset.x, this.y - this.offset.y)
    }

    isHit(entity) {
        if(entity.x <= this.x + this.width && entity.x >= this.x
            && entity.y <= this.y + this.height && entity.y + entity.height >= this.y){
            return true
        }

        return false
    }
}

class Enemy extends Entity{
    constructor(x, y, velocity, ship){
        super(x,y,velocity,ship, ship.offset)
        this.ship = ship
        this.width = ship.width
        this.height = ship.height
    }
    drawEntity(){
        // c.fillStyle='red'
        // c.fillRect(this.x, this.y,this.width,this.height)
        this.flipHorizontally(this.image,this.x- this.offset.x,this.y- this.offset.y)
    }
    flipHorizontally(img,x,y){
        c.translate(x+img.width,y);
        c.scale(-1,1);
        c.drawImage(img,0,0);
        c.setTransform(1,0,0,1,0,0);
    }
    shotHeight(){
        return this.y+this.ship.height/2-this.ship.rocket.height/2
    }
}

class Invader extends Enemy{
    constructor(x, y, velocity, ship){
        super(x,y,velocity,ship)
    }

    lastShot = 0
    author = 'enemy'
    shot(){
        
        rockets.push(new Rocket(this.x-1, this.shotHeight() , settings.enemy.missleSpeed, 'left',this.ship.rocket,'enemy'))
        this.lastShot = Date.now() 
        if(settings.enemy.missles == 1)
            return
        rockets.push(new Rocket(this.x-1, this.shotHeight(), settings.enemy.missleSpeed, 'left-up',this.ship.rocket,'enemy'))
        rockets.push(new Rocket(this.x-1, this.shotHeight(), settings.enemy.missleSpeed, 'left-down',this.ship.rocket,'enemy'))
        
    }
}


class Boss extends Invader{
    constructor(x, y, velocity,ship){
        super(x,y,velocity,ship)
    }
    shot(){
        rockets.push(new Rocket(this.x-1, this.shotHeight(), settings.enemy.missleSpeed, 'left',this.ship.rocket,'enemy'))
        rockets.push(new Rocket(this.x-1, this.shotHeight(), settings.enemy.missleSpeed, 'left-up',this.ship.rocket,'enemy'))
        rockets.push(new Rocket(this.x-1, this.shotHeight(), settings.enemy.missleSpeed, 'left-down',this.ship.rocket,'enemy'))
        this.lastShot = Date.now() 
    }
}

class Ship extends Entity{
    constructor(x, y, velocity,ship){
        super(x,y,velocity,ship, ship.offset)
        this.width = ship.width
        this.height = ship.height
    }
    author = 'user'
    lastShot = 0
}

class Rocket extends Entity{
    constructor(x, y, velocity, direction,object,author){
        super(x,y,velocity,object, object.offset)
        this.direction = direction 
        this.width = object.width
        this.height = object.height
        this.author = author
    }
}