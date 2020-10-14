/******************************************************

Game - Space Adventures
Hugo Agnola

You're a lone soviet warrior who must fight in order to take out the fascists. Do it for the Motherland and bring glory back to mother Russia

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Player position, size, velocity
let ship = {

  x: 0,
  y: 250,

  width: 150,
  height: 150,

  image: undefined,
  velocity_x: 0,
  velocity_y: 0,

  speed: 25,
};

// Prey position, size, velocity
let enemy = {

  x: 0,
  y: 250,

  width: 150,
  height: 150,

  image: undefined,
  velocity_x: 0,
  velocity_y: 0,

  speed: 25,
    maxspd: 45;
};

let planet = {

  x: 0,
  y: 250,

  width: 150,
  height: 150,

  image: undefined,
  velocity_x: 0,
  velocity_y: 0,

  speed: 25,
    maxspd: 40;
};

//Images and Sounds
let sfx_1;
//Click to play screen
let title;
let backg;
let started = false;
// Track whether the game is over
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
  // We're using simple functions to separate code out
    setupEnemy();
}

function setupImage() {
  ship.image = loadImage('assets/images/koom.gif');
  enemy.image = loadImage('assets/images/coom.gif');
  planet.image = loadImage('assets/images/qoom.png');
  title = loadImage('assets/images/title.png');
  backg = loadImage('assets/images/bg.jpg')
  imageMode(CENTER);
}

function setupSound() {
  sfx_1.setVolume(0.5);
}
// setupPrey()
//
// Initialises enemy's movement

// Initialises player position
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
}

function setupEnemy() {
  enemy.x = random(0,1000);
  enemy.y = random(0,1000);
  enemy.width = width / 5;
  enemy.height = height / 2;
  enemy.velocity_x = -enemy.maxspd;
  enemy.velocity_y = enemy.maxspd;
}

function setupEnemy() {
  planet.x = random(0,1000);
  planet.y = random(0,1000);
  planet.width = width / 5;
  planet.height = height / 2;
  planet.velocity_x = -planet.maxspd;
  planet.velocity_y = planet.maxspd;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.

function draw() {
    if (!started) {
      image(title, width/2, height/2);
    }
    else {
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

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = ship.x;
  playerY = ship.y;
}

function moveEnemy() {
  enemy.x += 0.01;
  enemy.y += 0.01;
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames

  // Update prey position based on velocity
  enemy.width = enemy.width + enemy.velocity_x;
  enemy.height = enemy.height + enemy.velocity_y;

  // Screen wrapping
  if (enemy.width < 0) {
    enemy.width = enemy.width + width;
  }
  else if (enemy.width > width) {
    enemy.width = enemy.width - width;
  }

  if (enemy.height < 0) {
    enemy.height = enemy.height + height;
  }
  else if (enemy.height > height) {
    enemy.height = enemy.height - height;
  }
}

function movePlanet() {
  planet.x += 0.01;
  planet.y += 0.01;
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames

  // Update prey position based on velocity
  planet.width = planet.width + planet.velocity_x;
  planet.height = planet.height + planet.velocity_y;

  // Screen wrapping
  if (planet.width < 0) {
    planet.width = planet.width + width;
  }
  else if (planet.width > width) {
    planet.width = planet.width - width;
  }

  if (planet.height < 0) {
    planet.height = planet.height + height;
  }
  else if (planet.height > height) {
    planet.height = planet.height - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkDistance_Enemy() {
  // Get distance of player to prey
  let Distance_1 = dist(ship.x, ship.y, enemy.x, enemy.y);
  // Check if it's an overlap
  if (Distance_1 < enemy.width / 2 + ship.width / 2) {
    gameOver = true;
  }
}

function checkDistance_Planet() {
  // Get distance of player to prey
  let Distance_2 = dist(ship.x, ship.y, planet.x, planet.y);
  // Check if it's an overlap
  if (Distance_2 < planet.width / 2 + ship.width / 2) {
    score = score + 1;
  }
}


// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health

// showGameOver()
//
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
