class Play extends Phaser.Scene {

    constructor()
    {
        super("playScene");

        
    }

    preload()
    {
        //load images/tiles
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');

        //load explosion spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create()
    {
        //place background tile
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        //white border rectangles
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);

        //green ui background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        //add rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket', 0).setOrigin(0, 0);
        
        //add spaceships x3
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship',  0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);
        

        //defining keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //config explosion anim
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })


        //score display
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.p1Timer = game.settings.gameTimer;
        console.log(this.p1Timer);
    
        this.timeLeft = this.add.text(469, 54, this.p1Timer, this.scoreConfig);

        // track score
        this.p1Score = 0;
        
        this.scoreLeft = this.add.text(69, 54, this.p1Score, this.scoreConfig);

        this.gameOver = false;

        this.scoreConfig.fixedWidth = 0;
    }

    update()
    { 

        //display timer
        this.p1Timer -= 16.666667;
        this.p1TDisplay = this.p1Timer / 1000;
            
        if(this.p1Timer <= 0) {
            this.p1TDisplay = 0;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }

        this.timeLeft.text = this.p1TDisplay.toFixed(2);
        
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLeft)) {
            this.scene.start("menuScene");
        }

        //scroll background
        this.starfield.tilePositionX -= 4;

        if(!this.gameOver)
        {
            //update rocket
            this.p1Rocket.update();

            //update spaceship
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship01))
        {  
            this.p1Rocket.reset();
            this.ship01.reset();
            console.log("booom 01");
        }

        if(this.checkCollision(this.p1Rocket, this.ship02))
        {
            this.p1Rocket.reset();
            this.ship02.reset();
            console.log("booom 02");
        }

        if(this.checkCollision(this.p1Rocket, this.ship03))
        {
            this.p1Rocket.reset();
            this.ship03.reset();
            console.log("booom 03");
        }
    }

    shipExplode(ship)
    {
        ship.alpha = 0;
        //create explode sprite at ship pos
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        //score/timer increment and repaint
        this.p1Timer += ship.points * 100;

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');

    }

    checkCollision(rocket, ship)
    {
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y &&
            rocket.height + rocket.y >  ship.y)
            {
                this.shipExplode(ship);
                return true;
            }
        else
            return false;
            
    }   

    

}