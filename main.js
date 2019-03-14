/*The code was built on code from user Bornforcode on the youtube channel onClickOnLoad
Part 1: https://www.youtube.com/watch?v=o-epPPuDMKI Published on 5 Aug 2017
Part 2: https://www.youtube.com/watch?v=yISKJT21TC4&index=4&list=PLcOY6n5xoG1FctSV1-IhRx89YsoSj9Gf8 Published on 6 Aug 2017
Full code link https://jumpshare.com/v/fiVTQZzbHx2kDAYJRyJ4
Group 18 Malin Benson, Melika Ljutovic, Zakiya Pierre*/

// Parameters for obstacles (how tall, short, wide and length of gaps between obstacles)
minHeight = 20;
maxHeight = 100;
minWidth = 10;
maxWidth = 20;
minGap = 200;
maxGap = 500;
gap = randGap();

//Empty array for obstacles and the random colors they get assigned
let myObstacles = [];
let colors = [
  "#d37ec2",
  "#e1a3d4",
  "#ac68cc",
  "#c18eda",
  "#d6b4e7"
];

//Function for when the browser loads the page, that calls for the "gameArea" to start
function startGame() {
  gameArea.start();
}

//Function to make multiple obstacles
function everyinterval(n) {
  if (gameArea.frame % n == 0) return true;
  return false;
}

//Calls jump function
function jump() {
  player.speedY = -2;
}

//Randomizes the spaces between the obstacles
function randGap() {
  return Math.floor(minGap + Math.random() * (maxGap - minGap + 1));
}

//Creating the scoreboard
let scoreText = {
  x: 250,
  y: 85,
  update: function(text) {
    gameArea.context.fillStyle = "#70dbdb";
    gameArea.context.font = "1.5rem verdana";
    gameArea.context.fillText(text, this.x, this.y);
  }
};

//Creating the player (circle)
let player = {
  x: 400 / 2,
  y: 100 / 2,
  z: 25,
  speed: 0,
  update: function() {
    gameArea.context.beginPath();
    gameArea.context.arc(this.x, this.y, this.z, 0, 2 * Math.PI, false);
    gameArea.context.fillStyle = "#ff4040";
    gameArea.context.fill();
    gameArea.context.lineWidth = 5;
    gameArea.context.strokeStyle = "#ff4040";
  },
  //Set height for the jump,
  newPos: function() {
    if (this.y < 330) {
      this.speedY = 2;
    }
    this.y = this.y + this.speedY;
    if (this.speedY == 2 && this.y == 470) {
      this.speedY = 0;
    }
  },
  //Check if parameters for player are conflicting with those for the obstacle, if so = crash
  crashWith: function(obs) {
    if (
      this.x + 30 > obs.x &&
      this.x < obs.x + obs.width &&
      this.y + 30 > obs.y
    ) {
      return true;
    }
    return false;
  }
};

//Creates obstacles of random height and width as well color from previous array and draws rectangles
function obstacle() {
  this.height = Math.floor(
    minHeight + Math.random() * (maxHeight - minHeight + 1)
  );
  this.width = Math.floor(minWidth + Math.random() * (maxWidth - minWidth + 1));
  this.x = document.documentElement.clientWidth;
  this.y = gameArea.canvas.height - this.height;
  this.index = Math.floor(Math.random() * colors.length);
  this.color = colors[this.index];
  this.draw = function() {
    gameArea.context.fillStyle = this.color;
    gameArea.context.fillRect(this.x, this.y, this.width, this.height);
  };
}

//Draws canvas 1, starts the game and sets the score counting
let gameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.height = 500;
    this.canvas.width = document.documentElement.clientWidth;
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.context = this.canvas.getContext("2d");
	//Reseting and starting the frame
	this.frame = 0;
	//Scoreboard adding
    this.score = 0;
    scoreText.update("POINTS: 0");
    this.interval = setInterval(this.updateGameArea, 5);
    window.addEventListener("click", jump);
  },
  //Every time the player crashes with the obstacles the player will stop, and obstacle loop (condition inside loop)
  updateGameArea: function() {
    for (i = 0; i < myObstacles.length; i++) {
      if (player.crashWith(myObstacles[i])) {
        gameArea.stop();
        return;
      }
    }
    gameArea.clear();
    if (everyinterval(gap)) {
      //Pushes obstacles into empty array
      myObstacles.push(new obstacle());
      gap = randGap(); //Assigns random gap-parameters
      gameArea.frame = 0;
    }
    //Draw obstacles, and changes position of - x to give illusion of movement
    for (i = 0; i < myObstacles.length; i++) {
      myObstacles[i].x -= 1;
      myObstacles[i].draw();
    }
    //Checks positions and frames to update scoreboard??
    player.newPos();
    player.update();
    gameArea.frame += 1;
    gameArea.score += 0.01;
    scoreText.update("POINTS : " + Math.floor(gameArea.score));
  },//Clears canvas
  clear: function() {
    gameArea.context.clearRect(0, 0, this.canvas.width, this.canvas.width);
  },
  stop: function() {
    clearInterval(this.interval);
  }
};

// Following code was based on tutorial 5 by Peter Tolstrup Aagesen presented to us 6th of November 2018

//Setup canvas
const canvas = document.getElementById("graphics");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
const context = canvas.getContext("2d");

//Variables for particles and set amount of particles
let particles = [];
let particlesNum = 400;
//variable for background and particles color
let backgroundColor = 'rgba(0,0,0,1)'
let particleColor = '#ff4040'

//Creating particles and positioning them
function Particle() {
    //Set random position within canvas
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    //Set random size
    this.radius = Math.round(Math.random() * 1) + 0.5;

    //Set random velocity on particles
    this.velocityX = 2 - Math.random() * 4;
    this.velocityY = 2 - Math.random() * 4;
  }

  //gets canvas background from backgroundColor variable making it possibe to reach and change
    function draw() {
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

    //Create temporary particles to avoid array look ups
    let tempParticle1;
    let tempParticle2;

    //Iterate over every particle
    for (let i = 0; i < particles.length; i++) {
      //Set the first particle
      tempParticle1 = particles[i];

      //Variable to change size if particles are "aligning"
      let factor = 1;

      //Calculate the current velocity of the particle
      let velocity = Math.sqrt(
        tempParticle1.velocityX * tempParticle1.velocityX +
          tempParticle1.velocityY * tempParticle1.velocityY
      );

      //Iterate over every other particle
      for (let j = 0; j < particles.length; j++) {
        tempParticle2 = particles[j];

        //Get the distance between the two particles
        let distance = Math.sqrt(
          Math.pow(tempParticle2.x - tempParticle1.x, 2) +
            Math.pow(tempParticle2.y - tempParticle1.y, 2)
        );
      }
      //Draw particles
        context.fillStyle = particleColor;
        context.beginPath();
        context.arc(
        tempParticle1.x,
        tempParticle1.y,
        tempParticle1.radius,
        0,
        Math.PI * 2,
        true
      );
      context.fill();
      context.closePath();

      //Get the new velocity
      let newVelocity = Math.sqrt(
        tempParticle1.velocityX * tempParticle1.velocityX +
          tempParticle1.velocityY * tempParticle1.velocityY
      );

      //Set the velocity to what it was
      tempParticle1.velocityX =
        (tempParticle1.velocityX * velocity) / newVelocity;
      tempParticle1.velocityY =
        (tempParticle1.velocityY * velocity) / newVelocity;

      //Add velocity
      tempParticle1.x += tempParticle1.velocityX;
      tempParticle1.y += tempParticle1.velocityY;

      //Bound particles within canvas
      if (tempParticle1.x > canvas.width) {
        tempParticle1.x = 0;
      } else if (tempParticle1.x < 0) {
        tempParticle1.x = canvas.width;
      }
      if (tempParticle1.y > canvas.height) {
        tempParticle1.y = 0;
      } else if (tempParticle1.y < 0) {
        tempParticle1.y = canvas.height;
      }
    }
    //Starts draw
    window.requestAnimationFrame(draw);
  }
    function init() {
    particles = [];
    //Create some particles and add them to the array
    for (let i = 0; i < particlesNum; i++) {
      particles.push(new Particle());
    }
  }
  init();
  //Start animation
     window.requestAnimationFrame(draw);

     //Setting a defult value for the toggleTheme, and getting button refrences
let isTheme =  false;
let themeButton = document.getElementById("themeButton");
let refresh = document.getElementById('refresh');

//Changing apperance of particles, buttons and backgroundColor depending on true or false value of isTheme
//light mode = false, dark mode = true
function toggleTheme() {
  if (isTheme == true) {
    backgroundColor = '#000000'
    particleColor = '#ff4040'
    isTheme = false;
    themeButton.innerText = 'LIGHT';
    themeButton.style.color = "white";
    refresh.style.color = "white";
  } else {
    backgroundColor = '#ffffff'
    particleColor = '#70dbdb'
    isTheme=true;
    themeButton.innerText = 'DARK';
    themeButton.style.color = "black";
    refresh.style.color = "black";
  }
}
