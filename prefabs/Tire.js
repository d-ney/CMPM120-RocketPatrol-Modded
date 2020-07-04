class Tire extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.isFiring = false;
        this.bounceMax = 80;
        this.currBounce = 5;
        this.bounceDir = -1;
        
        this.sfxTire = scene.sound.add('sfx_rocket'); //rocket sfx
        
    }


    update()
    {
        function onEvent() {
            
        }
        //left/right movement
        if(!this.isFiring)
        {
            if(keyLeft.isDown && this.x >= 47)
            {
                this.x -= 2;
            }
            else if(keyRight.isDown && this.x <= 578)
            {
                this.x += 2;
            }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring)
        {
            this.isFiring = true;
            this.sfxTire.play(); //play sfx
            this.anims.play('tire', true);
        }
        // if fired, move up
        if(this.isFiring && this.y >= 108) 
        {
            this.y -= 3;

            if(this.currBounce <= this.bounceMax)
            {
                this.x += (2 * this.bounceDir);
                this.currBounce += 2;
                
            }
            else
            {
                this.currBounce = 2;
                this.bounceDir *= -1;
            }
        }
        //reset on miss
        if(this.y <= 108)
        {
            this.isFiring = false;
            this.y = 400;
            this.x =game.config.width/2;
            this.anims.stop();

        }
    }

    reset()
    {
        this.isFiring = false;
        this.y = 400;
        this.x =game.config.width/2;
    }


}