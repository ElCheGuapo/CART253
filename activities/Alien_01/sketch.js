function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(255, 100, 100);
  noStroke();
  
  //Body
  fill(125);
  ellipse(320, 480, 300, 200);
  
  //Head
  fill(100);
  ellipse(320, 240, 250, 400);
  
  //Eyes
  fill(0)
  ellipse(250, 240, 80, 250);
  ellipse(390, 240, 80, 250);
  
  //Nose
  ellipse(305, 360, 10, 10);
  ellipse(335, 360, 10, 10);
  
  //Mouth
  stroke(200, 0 , 0);
  strokeWeight(10);
  rectMode(CENTER);
  rect(320, 400, 180, 35);
}