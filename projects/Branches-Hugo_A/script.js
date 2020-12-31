"use strict";
/**************************************************
BRANCHES
Hugo Agnola

A simplistic simulation where the user gets to plant nutrients that grow branches or accorns.
This simulation tries to copy nature to a certain extent by being random and following certain
patterns
**************************************************/

//create arrays to store all the objects
let branches = [];
let subbranches = [];
let nutrients = [];
let fibonaccis = [];
var bg_sfx;
var img_start;

//create vectors to check positions/ velocity/ and origin
let nPos_vect;
let bVel_vect;
let bPos_vect;
let bOri_vect;
let bPos_vect1;
let FPos_vect;

//boolean to create an acorn
let fibon;

//position and velocity vectors for colisions
let Col_pos;
let Col_pos_temp;
let Col_nvel1;
let Col_nvel2;

//mode = is sim running or no
var mode;

//let imgFibonacci;

//load images and sounds
function preload() {
  //imgFibonacci = loadImage('assets/images/fibonacci.PNG');
  img_start = loadImage('assets/images/startscreen.png');
  bg_sfx = loadSound('assets/sounds/wind.mp3');

}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  frameRate(5);

  bg_sfx.loop();
  bg_sfx.setVolume(2);

  //create starting branches
  createBranches(1.0, 0.0, 1.0, 0.0);
  createBranches(-1.0, 0.0, -1.0, 0.0);

  createBranches(0.0, 1.0, 0.0, 1.0);
  createBranches(0.0, -1.0, 0.0, -1.0);

  //initialize Col_ variables into vectors
  Col_nvel1 = createVector(0.0, 0.0);
  Col_nvel2 = createVector(0.0, 0.0);
  Col_pos = createVector(0.0, 0.0);
  Col_pos_temp = createVector(0.0, 0.0);

  //initialize fibon and mode
  fibon = false;
  mode = 0;
}

function draw() {

  //start screen
  if (mode === 0) {
    image(img_start, 0, 0, width, height);
  }

  //simulation is running
  if (mode === 1) {
    let rad_1 = 20;
    let rad_2 = 20;
    let rad_3 = rad_1 + rad_2;

    background(0);
    translate(width / 2, height / 2);

    handleBranches();
    handleSubBranches();
    handleNutrients();
    handleFibonacci();

    Col_pos_temp.copy(Col_pos);
    handleNColision();
    //handleBColision();
    if (Col_pos_temp != Col_pos) {
      if (fibon === true) {
        createFibonacci(Col_pos.x, Col_pos.y, 1);
        fibon = false;
      } else {
        createSubBranches(Col_nvel1.x, Col_nvel1.y, Col_pos.x, Col_pos.y);
        createSubBranches(Col_nvel2.x, Col_nvel2.y, Col_pos.x, Col_pos.y);
      }
    }
  }
}

//check is enter key is pressed to start sim
function keyPressed() {
  if (keyCode === ENTER) {
    mode = 1;
  }
}
//create branches from Branch class x1, y1 = velocity; x2, y2 = position
function createBranches(x1, y1, x2, y2) {
  let b = new Branch(x1, y1, x2, y2);
  branches.push(b);
}

//create branches from SubBranch class x1, y1 = velocity; x2, y2 = position
function createSubBranches(x1, y1, x2, y2) {
  let b = new SubBranch(x1, y1, x2, y2);
  subbranches.push(b);
}

//create accorns
function createFibonacci(x, y, s) {
  let f = new Fibonacci(x, y, s);
  f.getLocations();
  fibonaccis.push(f);
}

//handle accorns
function handleFibonacci() {
  for (i = 0; i < fibonaccis.length; i++) {
    fibonaccis[i].show();
    fibonaccis[i].move();

  }
}

//return the fibonacci number of n
function fib(n) {
  let n1 = 0;
  let n2 = 1;
  let n3 = n1 + n2;

  for (i = 0; i < n; i++) {
    n1 = n2;
    n2 = n3;
    n3 = n1 + n2;
  }
  return n1;
}

//create nutrients from Nutrient class with mouse click p5.js function
function mousePressed() {
  if (mode === 1) {
    if (nutrients.length < 5) {
      let n = new Nutrient(mouseX - 400, mouseY - 400, 2);
      nutrients.push(n);
    } else {

      nutrients.splice(0, 1);

      for (let i = 0; i < 4; i++) {
        nutrients[i] = nutrients[i++];
      }

      let n = new Nutrient(mouseX - 200, mouseY - 200, 2);
      nutrients.push(n);
    }
  }
}

//handle branches objects
function handleBranches() {
  for (var i = 0; i < branches.length; i++) {
    branches[i].show();
    branches[i].update();
  }
}

//handle subbranches objects
function handleSubBranches() {
  for (var i = 0; i < subbranches.length; i++) {
    subbranches[i].show();
    subbranches[i].update();
  }
}

//handle nutrients objects
function handleNutrients() {
  for (var i = 0; i < nutrients.length; i++) {
    nutrients[i].show();
    nutrients[i].move();
  }
}

function handleNColision() {
  let n_i;
  let b_j;
  //check if any of the branches are coliding with nutrients
  for (var i = 0; i < nutrients.length; i++) {
    n_i = nutrients[i];
    for (var j = 0; j < branches.length; j++) {
      b_j = branches[j];

      //
      nPos_vect = n_i.givePosition();
      bVel_vect = b_j.givePosition();
      bPos_vect = b_j.givePosition();

      let d = dist(nPos_vect.x, nPos_vect.y, bPos_vect.x, bPos_vect.y);

      if (d <= 5) {

        let indx = i;
        nutrients.splice(indx, 1);

        for (var y = indx; y < nutrients.length; y++) {
          nutrients[y] = nutrients[y++];
        }

        Col_pos = bPos_vect.copy();

        bVel_vect.normalize();

        bVel_vect.rotate(45);
        Col_nvel1 = bVel_vect.copy();

        bVel_vect.rotate(-90);
        Col_nvel2 = bVel_vect.copy();

        console.log(Col_nvel1 + "/" + Col_nvel2);


      }
    }
  }
  //check if any of the subbranches are coliding with nutrients
  for (var a = 0; a < nutrients.length; a++) {
    n_i = nutrients[a];
    for (var b = 0; b < subbranches.length; b++) {
      b_j = subbranches[b];

      nPos_vect = n_i.givePosition();
      bVel_vect = b_j.givePosition();
      bPos_vect = b_j.givePosition();

      let d = dist(nPos_vect.x, nPos_vect.y, bPos_vect.x, bPos_vect.y);

      if (d <= 5) {

        let indx = a;
        nutrients.splice(indx, 1);

        for (var c = indx; c < nutrients.length; c++) {
          nutrients[c] = nutrients[c++];
        }

        Col_pos = bPos_vect.copy();

        bVel_vect.normalize();
        r = random(0, 10);
        console.log(r);
        if (r > 9) {
          fibon = true;
        } else if (r > 5 && r < 9){
          bVel_vect.rotate(-20);
          Col_nvel1 = bVel_vect.copy();

          bVel_vect.rotate(30);
          Col_nvel2 = bVel_vect.copy();
        } else {
          //image(imgFibonacci, Col_pos.x, Col_pos.y-35, 50, 50);
          bVel_vect.rotate(60);
          Col_nvel1 = bVel_vect.copy();

          bVel_vect.rotate(-70);
          Col_nvel2 = bVel_vect.copy();
        }
        console.log(Col_nvel1 + "/" + Col_nvel2);


      }
    }
  }
}

// function handleBColision() {
//   let b_i;
//   let b_j;
//   let bColision = false;

//   for (var j = 0; j < branches.length; j++) {
//     b_j = branches[j];
//     bPos_vect = b_j.givePosition();
//     bOri_vect = b_j.giveOrigin();

//     for (var i = 0; i < subbranches.length; i++) {
//       b_i = subbranches[i];
//       bPos_vect1 = b_i.givePosition();

//       let d0 = dist(bOri_vect.x, bOri_vect.y, bPos_vect.x, bPos_vect.y);
//       let d1 = dist(bOri_vect.x, bOri_vect.y, bPos_vect1.x, bPos_vect1.y);
//       let d2 = dist(bPos_vect.x, bPos_vect.y, bPos_vect1.x, bPos_vect1.y);

//       if (d1 + d2 === d0) {
//         bColision = true;
//       }
//       if (bColision === true) {


//         bColision = false;
//       }
//       if (i === j) {
//         j++;
//       }
//     }
//   }
// }
