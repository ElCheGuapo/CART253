/******************************************************

Game - Space Adventures
Hugo Agnola

you're a space ship in charge of exploring space, and discovering new planets

Includes: Physics-based movement, keyboard controls, random movement.

******************************************************/

// declare player class (position, size, velocity)
let ship = {

  x: 0,
  y: 250,

  width: 150,
  height: 150,

  image: undefined,
  velocity_x: 0,
  velocity_y: 0,

  speed: 25,
}
//declare enemy class (position, size, velocity)
let enemy = {

  x: 0,
  y: 250,

  width: 150,
  height: 150,

  image: undefined,
  velocity_x: 0,
  velocity_y: 0,

  speed: 25,
    maxspd: 45,
}
//declare planet class (position, size, velocity)
let planet = {

  x: 0,
  y: 250,

  width: 150,
  height: 150,

  image: undefined,
  velocity_x: 0,
  velocity_y: 0,

  speed: 25,
    maxspd: 40,
}
//declare images, variables and sounds
let sfx_1;
let title;
let backg;
let started = false;
let gameOver = false;
let score = 0;

function preload() {
  sfx_1 = loadSound('assets/sounds/death_sfx.mp3');
}
// Sets up the basic elements of the game
function setup() {
  createCanvas(600, 600);

  noStroke();

  setupImage();

  setupSound();

  setupEnemy();
}
//link asset paths
function setupImage() {
  ship.image = loadImage('assets/images/koom.gif');
  enemy.image = loadImage('assets/images/coom.gif');
  planet.image = loadImage('assets/images/qoom.png');
  title = loadImage('assets/images/title.png');
  backg = loadImage('assets/images/bg.jpg')
  imageMode(CENTER);
}
//initialize sound volume
function setupSound() {
  sfx_1.setVolume(0.5);
}
// Initialises player position
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
}

function setupEnemy() {
  enemy.x = random(0,width);
  enemy.y = random(0,width);
  enemy.width = width / 5;
  enemy.height = height / 2;
  enemy.velocity_x = -enemy.maxspd;
  enemy.velocity_y = enemy.maxspd;
}

function setupPlanet() {
  planet.x = random(0,600);
  planet.y = random(0,600);
  planet.width = width / 5;
  planet.height = height / 2;
  planet.velocity_x = -planet.maxspd;
  planet.velocity_y = planet.maxspd;
}

// While the game is active, checks input
// updates positions of prey and player,
// When the game is over, shows the game over screen.

function draw() {
    if (!started) {
      //display title screen
      //Click to play screen
      image(title, width/2, height/2);
    }
    else {
      //display background image
      image(backg, width/2, height/2);

    if (!gameOver) {
      handleInput();

      movePlayer();

        moveEnemy();
        movePlanet();

        checkDistance_Enemy();
        checkDistance_Planet();

    }
    else {
      showGameOver();
    }

//load images
    image(ship.image, ship.x, ship.y, ship.width, ship.height);
    image(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
    image(planet.image, planet.x, planet.y, planet.width, planet.height);
 }
}

function mousePressed() {
  started = true;
}
// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  ship.x = mouseX;
  ship.y = mouseY;
}

// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = ship.x;
  playerY = ship.y;
}

function moveEnemy() {
  enemy.x += 0.01;
  enemy.y += 0.01;
  // Change the enemy's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the enemy
  // will change direction on 5% of frames

  // Update prey position based on velocity
  enemy.x = enemy.x + enemy.velocity_x;
  enemy.y = enemy.y + enemy.velocity_y;

  // Screen wrapping
  if (enemy.x < 0) {
    enemy.x = enemy.x + width;
  }
  else if (enemy.x > width) {
    enemy.x = enemy.x - width;
  }

  if (enemy.y < 0) {
    enemy.y = enemy.y + height;
  }
  else if (enemy.y > height) {
    enemy.y = enemy.y - height;
  }
}

function movePlanet() {
  planet.x += 0.01;
  planet.y += 0.01;
  // Change the planet's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the planet
  // will change direction on 5% of frames

  // Update planet position based on velocity
  planet.x = planet.x + planet.velocity_x;
  planet.y = planet.y + planet.velocity_y;

  if (planet.x < 0) {
    planet.x = planet.x + width;
  }
  else if (planet.x > width) {
    planet.x = planet.x - width;
  }

  if (planet.y < 0) {
    planet.y = planet.y + height;
  }
  else if (planet.y > height) {
    planet.y = planet.y - height;
  }
}
// Check if the player overlaps the enemy
function checkDistance_Enemy() {
  // Get distance of player to enemy
  let Distance_1 = dist(ship.x, ship.y, enemy.x, enemy.y);
  // Check if it's an overlap
  if (Distance_1 < enemy.width / 2 + ship.width / 2) {
    gameOver = true;
  }
}
function checkDistance_Planet() {
  // Get distance of player to planet
  let Distance_2 = dist(ship.x, ship.y, planet.x, planet.y);
  // Check if it's an overlap
  if (Distance_2 < planet.width / 2 + ship.width / 2) {
    score = score + 1;
  }
}
// Display text about the game being over!
function showGameOver() {
  background(137,0,0);
  textFont("Impact");
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(255);
  // Set up the text to display
  let gameOverText = "Aye that's tough man \n You discovered\n";
  gameOverText = gameOverText + score + "new planets";
}
