class Fibonacci {
  constructor (X, Y, S) {

    this.x = X;
    this.y = Y;
    this.side = S;
    this

  }

  //offset the accorn
  getLocations() {
    this.x = this.x + (this.side*3 + this.side*21);
    this.y = this.y - (this.side*1 + this.side*5);
  }

  //make the object shake with wind
  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  //display object
  show() {
    push();
    let rad_1 = this.side;
    let rad_2 = this.side;
    let rad_3 = rad_1 + rad_2;

    noFill();
    stroke(250);
    strokeWeight(2);


    arc(this.x + this.side*1, this.y, rad_2, rad_2, HALF_PI, PI);
    //square(this.x, this.y, this.side*1);

    //this.x = this.x + this.side*1;
    arc(this.x  + this.side*1, this.y, rad_2, rad_2, 0, HALF_PI);
    //square(this.x, this.y, this.side*1);

    rad_3 = rad_1 + rad_2;
    rad_1 = rad_2;
    rad_2 = rad_3;
    arc(this.x, this.y, rad_3, rad_3, -HALF_PI, 0);
    //square(this.x, this.y, this.side*2);

    rad_3 = rad_1 + rad_2;
    arc(this.x, this.y + this.side*1, rad_3, rad_3, PI, -HALF_PI);
    //square(this.x, this.y, this.side*3);

    rad_1 = rad_2;
    rad_2 = rad_3;
    rad_3 = rad_1 + rad_2;
    arc(this.x + this.side*2, this.y + this.side*1, rad_3, rad_3, HALF_PI, PI);
    //square(this.x, this.y, this.side*5);

    rad_1 = rad_2;
    rad_2 = rad_3;
    rad_3 = rad_1 + rad_2;
    arc(this.x + this.side*2, this.y - this.side*2, rad_3, rad_3,  0, HALF_PI);
    //square(this.x, this.y, this.side*8);

    rad_1 = rad_2;
    rad_2 = rad_3;
    rad_3 = rad_1 + rad_2;
    arc(this.x - this.side*3, this.y - this.side*2, rad_3, rad_3, -HALF_PI, 0);
    //square(this.x, this.y, this.side*13);

    rad_1 = rad_2;
    rad_2 = rad_3;
    rad_3 = rad_1 + rad_2;
    arc(this.x - this.side*3, this.y + this.side*6, rad_3, rad_3, PI, -HALF_PI);
    //square(this.x, this.y, this.side*21);
    //square(this.x, this.y, side*21);
    pop();
  }
}
