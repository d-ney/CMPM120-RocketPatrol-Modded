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
    }

    update()
    {
        //scroll background
        this.starfield.tilePositionX -= 4;

        //update rocket
        this.p1Rocket.update();

        //update spaceship
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

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

    checkCollision(rocket, ship) {
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y &&
            rocket.height + rocket.y >  ship.y)
            {
                return true;
            }
        else
            return false;
            
        }   

}