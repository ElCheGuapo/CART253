class Nutrient {

  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  //return pos vect of object
  givePosition() {
    let v = createVector(this.x, this.y);
    return v;
  }

  //shake object as if there is wind
  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  //display object
  show() {
    stroke(255);
    strokeWeight(3);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
}
