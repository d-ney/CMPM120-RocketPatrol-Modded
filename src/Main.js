/*Rocket Patrol Modded by Dillon Ney (ID# 1705097)
Mods Added:
Implement the speed increase that happens after 30 seconds in the original game (10)
Create a new scrolling tile sprite for the background (10)
Display the time remaining (in seconds) on the screen (15)
Create a new animated sprite for the Spaceship enemies (15)
Implement a new timing/scoring mechanism that adds time to the clock for successful hits (25)
Create and implement a new weapon (w/ new behavior and graphics) (25)
Added 'nyoooooome' sound effect when spaceship (cars in this instance) pass over the player's
weapon (proposed 10 pts)

Total = 110 (100 without proposed mod)
Thank you very much!
*/

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
let keyX;

//define game settings
game.settings = {
    diff: 'easy',
    spaceshipSpeed: 3,
    gameTimer: 60000
}