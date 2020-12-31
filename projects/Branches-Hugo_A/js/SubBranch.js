class SubBranch {

  constructor(x, y, X, Y) {
    this.origin = createVector(X, Y);
    this.position = createVector(X, Y);
    this.velocity = createVector(x, y);
  }
  
  //make branches grow by updating pos based on vel
  update() {
    this.position.add(this.velocity);
  }

  //return origin vector 
  giveOrigin() {
    let v = createVector(this.origin.x, this.origin.y);
    return v;
  }

  //return position vector
  givePosition() {
    let v = createVector(this.position.x, this.position.y);
    return v;
  }
  
  //return velocity vector
  giveVelocity() {
    let v = createVector(this.velocity.x, this.velocity.y);
    return v;
  }

  //display object
  show() {
    stroke(250);
    strokeWeight(2);
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
  }

}