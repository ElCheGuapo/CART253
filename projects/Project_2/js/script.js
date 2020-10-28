"use strict";

/**************************************************
Hack n' Slash
Hugo Agnola

Dungeon crawler rogue like game where the player has to kill 
**************************************************/

// setup()
//
// Description of setup() goes here.
let score = 0;
let Game_Start = false;
let gameIsOver = false;
let enemiesLeft = 0;

let player;
let minion;

let M_Sprite;
let P_Sprite;
let E_Sprite;
let BG_img;

function preload() {
    M_Sprite = loadImage('assets/images/minion.png');
    P_Sprite = loadImage('assets/images/player.png');
    E_Sprite = loadImage('assets/images/elite.png');
}

function setup() {
    createCanvas(windowWidth, windowheight);
    player = new Player();
}


// draw()
//
// Description of draw() goes here.
function draw() {
    if(player.health <= 0) {
        gameIsOver = true;
    }
    }
}

function handleGameplay() {
    
}

function mouseClicked() {
    if(Game_Start === false) {
        Game_Start = true;
    }
    else if(gameIsOver === true) {
        Game_Start = false;
        gameIsOver = false;
    }
    
}