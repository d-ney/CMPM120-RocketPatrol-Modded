class Play extends Phaser.Scene {

    constructor()
    {
        super("playScene");

        
    }

    preload()
    {
        //load images/tiles
        //this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/racetrack.png');
        this.load.image('wrench_sprite', './assets/wrench_sprite.png');
        this.load.image('tire_sprite', './assets/tire_sprite.png');

        //load explosion spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        
        //load car spritesheet
        this.load.spritesheet('car_1_sheet', './assets/car_1.png', {frameWidth: 83, frameHeight: 36, startFrame: 0, endFrame: 4});
        this.load.spritesheet('car_2_sheet', './assets/car_2.png', {frameWidth: 83, frameHeight: 36, startFrame: 0, endFrame: 4});
        this.load.spritesheet('car_3_sheet', './assets/car_3.png', {frameWidth: 83, frameHeight: 36, startFrame: 0, endFrame: 4});

        //load wrench spritesheet
        this.load.spritesheet('wrench_sheet', './assets/monkey_wrench.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('tire_sheet', './assets/Tire.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1});
    
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

        //defining keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        //config explosion anim
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        //config car_1 anim
        this.anims.create({
            key: 'car_1_anim',
            frames: this.anims.generateFrameNumbers('car_1_sheet', { start: 0, end: 4, first: 0}),
            frameRate: 5
        })

        //config car_2 anim
        this.anims.create({
            key: 'car_2_anim',
            frames: this.anims.generateFrameNumbers('car_2_sheet', { start: 0, end: 4, first: 0}),
            frameRate: 5
        })

         //config car_3 anim
         this.anims.create({
            key: 'car_3_anim',
            frames: this.anims.generateFrameNumbers('car_3_sheet', { start: 0, end: 4, first: 0}),
            frameRate: 5
        })

        //config weapon anims
        this.anims.create({
            key: 'wrench',
            frames: this.anims.generateFrameNumbers('wrench_sheet', {start: 0, end: 9, first: 0}) ,
            frameRate: 2
        })

        this.anims.create({
            key: 'tire',
            frames: this.anims.generateFrameNumbers('tire_sheet', {start: 0, end: 1, first: 0}) ,
            frameRate: 1
        })

         //add rocket
         this.p1Rocket = new Rocket(this, game.config.width/2, 400, 'wrench_sprite', 0).setOrigin(0, 0);


        //add spaceships x3
        this.ship01 = new Spaceship(this, game.config.width + 192, 120, 'car_3',  0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 190, 'car_2', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 275, 'car_1', 0, 10).setOrigin(0,0);

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

        //nyoooome tracking
         this.chkUp1 = false, this.chkUp2 = false, this.chkUp3 = false;

         //speed up tracking
         this.spedUp = false;
        
          this.weapon = 'rocket';
    }

    update()
    { 

        //display timer
        this.p1Timer -= 16.666667;
        this.p1TDisplay = this.p1Timer / 1000;
        
        
        if(this.p1Timer <= game.settings.gameTimer / 2 && !this.spedUp)
        {
            console.log("speed time");
            game.settings.spaceshipSpeed += 2;
            this.spedUp = true;
        }
        if(this.p1Timer <= 0) {
            this.p1TDisplay = 0;
            game.settings.spaceshipSpeed -= 2;
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

        console.log("weapon equals " + this.weapon + " out of loop");

        if (Phaser.Input.Keyboard.JustDown(keyX) && !this.p1Rocket.isFiring)
        {
            if(this.weapon == 'tire')
            {
                this.p1Rocket.destroy();
                this.p1Rocket = new Rocket(this, game.config.width/2, 400, 'wrench_sprite', 0).setOrigin(0, 0);
                this.weapon = 'rocket';
                this.p1Rocket.anims.play('wrench', true);
                console.log("weapon switched, now equals " + this.weapon);
                return;
            }
            
            if(this.weapon == 'rocket')
            {
                {
                    this.p1Rocket.destroy();
                    this.p1Rocket = new Tire(this, game.config.width/2, 400, 'tire_sprite', 0).setOrigin(0, 0);
                    this.weapon = 'tire';
                    this.p1Rocket.anims.play('tire', true);
                    console.log("weapon switched, now equals " + this.weapon);
                    return;
                }
            }
        }       
        
        

        //scroll background
        this.starfield.tilePositionX -= 4;
        if(!this.gameOver)
        {
            //update rocket
            this.p1Rocket.update();

            //update spaceship
            this.ship01.update();
            this.ship01.play('car_3_anim', true);
            this.ship02.update();
            this.ship02.play('car_2_anim', true);
            this.ship03.update();
            this.ship03.play('car_1_anim', true);
        }
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship01))
        { 
            if(this.weapon == 'rocket') 
                this.p1Rocket.reset();
            this.ship01.reset();
            console.log("booom 01");
        }

        if(this.checkCollision(this.p1Rocket, this.ship02))
        {
            if(this.weapon == 'rocket') 
                this.p1Rocket.reset();
            this.ship02.reset();
            console.log("booom 02");
        }

        if(this.checkCollision(this.p1Rocket, this.ship03))
        {
            if(this.weapon == 'rocket') 
                this.p1Rocket.reset();
            this.ship03.reset();
            console.log("booom 03");
        }

        //nyoooome sound check
        
        if(this.chkUp1 == true && this.chkUp2 == true && this.chkUp3 == true)
            this.chkUp1 = this.chkUp2 = this.chkUp3 = false;

        if(this.chkUp1 == false)
            this.chkUp1 = this.checkUp(this.p1Rocket, this.ship01, this.chkUp1);
        if(this.chkUp2 == false)
            this.chkUp2 = this.checkUp(this.p1Rocket, this.ship02, this.chkUp2);
        if(this.chkUp3 == false)
            this.chkUp3 = this.checkUp(this.p1Rocket, this.ship03, this.chkUp3);
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

    checkCollision(rocket, ship, chk)
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
    
    checkUp(rocket, ship)
    {
        if( rocket.x < ship.x + ship.width - 10 &&
            rocket.x + rocket.width + 10 > ship.x)
            {
                this.sound.play('sfx_zoom');
                console.log("passed over");
                return true;
            }

        return false;
            
    }

    

}