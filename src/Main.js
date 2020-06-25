//create game config obj
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
};

//create main game obj
let game = new Phaser.Game(config);


//reserve keys for movement
let keyF;
let keyLeft;
let keyRight;