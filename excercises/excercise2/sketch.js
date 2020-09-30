var colr = 0;

//Declaring objects and/or classes
let covid = {

  x: 0,
  y: 250,

  width: 150,
  height: 150,

  image: undefined,
  velocity_x: 0,
  velocity_y: 0,

  speed: 25,
};
let antibody = {
  x: 250,
  y: 250,

  width: 150,
  height: 150,

  image: undefined,
};

//Mouse movement for antibody
function mouseDragged() {

  antibody.x = mouseX;
  antibody.y = mouseY;
}

//Loading them assets
function preload() {

  covid.image = loadImage("assets/images/coom.png");
  antibody.image = loadImage("assets/images/koom.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  covid.y = random(0, height);
  covid.velocity_x = covid.speed;

  noCursor();
}

function draw() {

  background(colr);

  noStroke();

  covid.x += covid.velocity_x;
  covid.y += covid.velocity_y;

  if (covid.x > width) {
    covid.x = 0;
    covid.y = random(0, height);
  }

    //Declare Distance as the the dist attribute
  let Distance = dist(antibody.x, antibody.y
          , covid.x, covid.y);

    //Make the background a different color when an enemy is too close
  if (Distance < covid.width + antibody.width) {
    colr = 150;
  } else {
    colr = 0;
  }

    //End game upon collision with enemy
  if (Distance < covid.width / 2 + antibody.width / 2) {
    noLoop();
  }

  image(covid.image, covid.x, covid.y, covid.width, covid.height);
  image(antibody.image, antibody.x, antibody.y, antibody.width, antibody.height);
}
