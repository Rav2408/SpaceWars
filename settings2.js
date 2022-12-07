
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576
c.fillRect(0,0,canvas.width, canvas.height)

settings = {
    bounds : {
        left: 0,
        right: 1024,
        top: 0,
        bottom: 576
    },
    keys : {
        left: 'a', 
        right: 'd', 
        up: 'w', 
        down: 's',
        spaceBar: ' ' 
    },
    pressedKeys :{        
    },
    howManyTimesHit: 0,
    level: 1,
    mode: 'MEDIUM',
    lives: 3,
    score: 0,
    enemy:{
        missleSpeed: 200000,
        speed: 30,
        shotPeriod: 1000,
        missles: 1,
        defaultMissle: "assets/Shot1/shot1_exp3.png"
    },
    ships:{
        one:{
            src: "./assets/Ship1/Ship1.png",
            offset: {
                x: 12,
                y: 12
            },
            width: 85,
            height: 36,
            rocket: {
                src: "assets/Shot1/shot1_exp3.png",
                offset: {
                    x: 16,
                    y: 10
                },
                width: 13,
                height: 13
            }

        },
        two:{
            src: "./assets/Ship2/Ship2.png",
            offset: {
                x: 100,
                y: 12
            },
            width: 85,
            height: 36,
            rocket: {
                src: "assets/Shot1/shot1_exp3.png",
                offset: {
                    x: 16,
                    y: 10
                },
                width: 13,
                height: 13
            }
        },
        three:{
            src: "./assets/Ship3/Ship3.png",
            offset: {
                x: 22,
                y: 45
            },
            width: 85,
            height: 36,
            rocket: {
                src: "assets/Shot1/shot1_exp3.png",
                offset: {
                    x: 16,
                    y: 10
                },
                width: 13,
                height: 13
            }
        },
        four:{
            src: "./assets/Ship4/Ship4.png",
            width: 85,
            height: 36,
            offset: {
                x: 22,
                y: 45
            },
            rocket: {
                src: "assets/Shot1/shot1_exp3.png",
                offset: {
                    x: 16,
                    y: 10
                },
                width: 13,
                height: 13
            }
        },
        five:{
            src: "./assets/Ship5/Ship5.png",
            width: 90,
            height: 47,
            offset: {
                x: 22,
                y: 47
            },
            rocket: {
                src: "assets/Shot1/shot1_exp3.png",
                offset: {
                    x: 16,
                    y: 10
                },
                width: 13,
                height: 13
            }
        },
        six:{
            src: "./assets/Ship6/Ship6.png",
            width: 115,
            height: 60,
            offset: {
                x: 6,
                y: 32
            },
            rocket: {
                src: "assets/Shot1/shot1_exp3.png",
                offset: {
                    x: 16,
                    y: 10
                },
                width: 13,
                height: 13
            }
        }
    },
    background:{
        blue: {
            one:{
                src: "./assets/Blue Nebula/Blue_Nebula_01-1024x1024.png"
            }
            
        },
        green:{
            one:{
                src: "./assets/Green Nebula/Green_Nebula_01-1024x1024.png"
            }
        }
    }
}
