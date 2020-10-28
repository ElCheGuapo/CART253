class Player {
    constructor () {
        this.x = windowWidth / 2;
        this.y = windowHeight / 1.5;
        
        this.targetX = this.x;
        this.targetY = this.y - 100;
        this.size = windowWidth / 20;
        
        this.vx = 0;
        this.vy = 0;
        
        //create variable for what sprite to display
        this.currentSprite;
        //create sword using shapes
        this.swordIsActive = false;
        //set player health
        this.health = 100;
    }
    
    handleInput() {
        //If pressing left...
        if(keyIsDown(UP_ARROW)) {
            this.vy = -this.spd;
            this.y = this.y + this.vy;
        }
        else if(keyIsDown(DOWN_ARROW)) {
            this.vy = this.spd;
            this.y = this.y + this.vy;     
        }
        else {
            this.vy = 0;
        }

        //handle left and right movement
        if(keyIsDown(LEFT_ARROW)) {
            this.vx = this.spd;
            this.x = this.x + this.vx
        }
        else if(keyIsDown(DOWN_ARROW)) {
            this.vy = this.spd;
            this.y = this.y + this.vy;     
        }
        else {
            this.vx = 0;
        }
    }
    
    handleAttack() {
    //    let dSword = dist(this.x,this.y,
    }

}
    