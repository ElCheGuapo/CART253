var colr = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  colr = map(mouseX, 0, 600, 0, 255);
  background(colr);
  
  let xc = constrain(mouseX, 50, 550);
  
  noStroke();
  fill(colr + 150, 200, 100);
  ellipse(xc, mouseY, 75, 75);
  
  fill(colr + 250, 100, 200);
  ellipse(xc, mouseY, 50, 50);
  
  fill(colr + 150, 200, 300);
  ellipse(xc, mouseY, 25, 25);
}