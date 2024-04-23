//Credits:
//Button sample by Mellau via freesound.org
//Card press sample by NenadSimic via freesound.org
//Card snap sample by alparbalazs via freesound.org
//Background music sample by joshuaempyre via freesound.org
//Win jingle music sample by sonically_sound via freesound.org

let cards = [];
let font;
let buttonPress, cardPress, cardSnap, gameMusic, winJingle;
let Password, worst, secondWorst, secondBest, Best, passLock, lockedComp, lockedOut, Chip;
let PasswordImg, worstImg, secondWorstImg, secondBestImg, BestImg, passLockImg, LockedComputerImg, LockedOutImg;
let center1, center2, center3, center4;
let screen = 0;
let widthConstraint, heightConstraint;
let alphaValue = 0;
let fadeSpeed = 5;
let confirm = false;
let cancel = false;
let cardPressed = false;
let playOnce = true;
audio = true;

//start = 0
//instructions = 1
//game = 2
//restart = 3
//lose = 4

function setCardsoffScreen() { //moves images based on which screen is displayed
  secondBest.pos = { x: -100, y: -100 };
  secondWorst.pos = { x: -100, y: -100 };
  worst.pos = { x: -100, y: -100 };
  Best.pos = { x: -100, y: -100 };
  Password.pos = { x: -300, y: -300 };
  if (screen === 0) {
    passLock.scale = .00035 * width;
    passLock.pos = { x: width * .5, y: height * .5 };
  }
  else {
    passLock.pos = { x: -100000, y: -200 };
  } if (screen === 3) {
    lockedComp.pos = { x: width * .5, y: height * .5 };
  }
  else {
    lockedComp.pos = { x: -100000, y: -200 };
  }
  if (screen === 4) {
    lockedOut.pos = { x: width * .5, y: height * .5 };
  }
  else {
    lockedOut.pos = { x: -100000, y: -200 };
  }
}

function mousePressed() {

  if (screen === 0) { //on the start screen
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      showInstructionScreen();
      screen = 1;
    }
  }
  else if (screen === 1 || screen === 3 || screen === 4) {// if on the instructions/restart/lose screen
    //press begin button or restart button pressed
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      if (screen == 3) {
        winJingle.stop();
        gameMusic.loop();
      }
      screen = 2;
      worst.position = createVector(width * .2, height - 70);
      secondWorst.position = createVector(width * .3716, height - 70);
      secondBest.position = createVector(width * .56322, height - 70);
      Best.position = createVector(width * .775, height - 70);
      Password.pos = { x: width * .3, y: height / 2 - 10 };
      passLock.pos = { x: width / 2, y: 160 + 95 };
    }
  }
  else if (screen === 2 && confirm && !cancel) { //checks if user wins or loses from submit prompt
    if (mouseX > width / 2 + 20 && mouseX < width / 2 + 140 && mouseY > height - 80 && mouseY < height - 40) {
      buttonPress.play();
      if (
        dist(Best.x, Best.y, center1.x, center1.y) < 1 &&
        dist(secondBest.x, secondBest.y, center2.x, center2.y) < 1 &&
        dist(secondWorst.x, secondWorst.y, center3.x, center3.y) < 1 &&
        dist(worst.x, worst.y, center4.x, center4.y) < 1
      ) {
        console.log("you win!");
        showScreenWin();
        screen = 3;
        confirm = false;
      }
      else {
        console.log("you lose!");
        showScreenLose();
        screen = 4;
        confirm = false;
      }
    }
    else if (mouseX > width / 2 - 120 && mouseX < width / 2 && mouseY > height - 80 && mouseY < height - 40) { //cancel button
      buttonPress.play();
      confirm = false;
      cancel = true;
    }
  }

  //If on the game screen
  if (screen === 2) {
    cardPressed = true;
    // Check if the "Learn More" button is clicked
    if (mouseX > width - 150 && mouseX < width - 10 && mouseY > height - 55 && mouseY < height - 20) {
      buttonPress.play();
      // Display a link to a website for further learning
      window.open('https://www.cisa.gov/secure-our-world/use-strong-passwords');
    }
  }
}

function handleDragging(card) {
  if (card.mouse.dragging()) { //The card is constrained within the game window
    if (cardPressed) {
      cardPress.play();
      cardPressed = false;
    }
    cancel = false;
    confirm = false;
    widthConstraint = constrain(mouseX + card.mouse.x, card.width / 2, width - card.width / 2);
    heightConstraint = constrain(mouseY + card.mouse.y, card.height / 2, height - card.height / 2);
    card.position = createVector(widthConstraint, heightConstraint);
    card.rotationLock = true;
  } else {
    card.vel.x = 0;
    card.vel.y = 0;
    card.rotationLock = true;
  }
}

function snapToCenter(card) {
  // Snap into position and check if there is not already a card in the center position
  if (!mouseIsPressed) {
    let snapped = false;
    switch (true) {
      case dist(card.x, card.y, center1.x, center1.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center1.x, center1.y) < 40):
        if (card.x != center1.x && card.y != center1.y) {
          cardSnap.play();
        }
        card.position = center1;
        snapped = true;
        break;
      case dist(card.x, card.y, center2.x, center2.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center2.x, center2.y) < 40):
        if (card.x != center2.x && card.y != center2.y) {
          cardSnap.play();
        }
        card.position = center2;
        snapped = true;
        break;
      case dist(card.x, card.y, center3.x, center3.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center3.x, center3.y) < 40):
        if (card.x != center3.x && card.y != center3.y) {
          cardSnap.play();
        }
        card.position = center3;
        snapped = true;
        break;
      case dist(card.x, card.y, center4.x, center4.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center4.x, center4.y) < 40):
        if (card.x != center4.x && card.y != center4.y) {
          cardSnap.play();
        }
        card.position = center4;
        snapped = true;
        break;
      default:
        break;
    }

    if (!snapped) {
      // Return the card to its original position
      card.position = card.originalPosition;
    }
  }
}

function checkIfConfirm() { //submit screen appears if all 4 cards have been snapped to a position
  let numSnapped = 0;
  for (let card of cards) {
    if (
      dist(card.x, card.y, center1.x, center1.y) < 1 ||
      dist(card.x, card.y, center2.x, center2.y) < 1 ||
      dist(card.x, card.y, center3.x, center3.y) < 1 ||
      dist(card.x, card.y, center4.x, center4.y) < 1 
    ) {
        numSnapped++;
    }
  }
  if (numSnapped == 4) {
    confirm = true;
  }
}

function preload() { //loads fonts, images and sounds
  font = loadFont('assets/Password/1/MechaRx20Regular-j9Zy9.otf');
  PasswordImg = loadImage('assets/Password/1/Password.png');
  worstImg = loadImage('assets/Password/1/worst.png');
  secondWorstImg = loadImage('assets/Password/1/secondWorst.png');
  secondBestImg = loadImage('assets/Password/1/secondBest.png');
  BestImg = loadImage('assets/Password/1/Best.png');
  passLockImg = loadImage('assets/Password/1/passLock.png');
  LockedComputerImg = loadImage('assets/CyberLaws/1/lockedComputer.png');
  LockedOutImg = loadImage('assets/CyberLaws/1/lockedout.png');
  ChipImg = loadImage('assets/Password/1/Chip.png');
  buttonPress = loadSound('assets/Password/1/buttonPress.wav');
  cardPress = loadSound('assets/Password/1/cardPress.wav');
  cardSnap = loadSound('assets/Password/1/cardSnap.wav');
  gameMusic = loadSound('assets/Password/1/gameMusic.wav');
  winJingle = loadSound('assets/Password/1/winJingle.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  center1 = createVector(width * .7, height * .255);
  center2 = createVector(width * .7, height * .405);
  center3 = createVector(width * .7, height * .555);
  center4 = createVector(width * .7, height * .705);

  soundFormats('wav');
  gameMusic.loop();

  Password = new Sprite(width / 2, height / 2 - 10);
  Password.addImage(PasswordImg);
  Password.collider = 'k';
  Password.scale = .00035 * width;

  Chip = new Sprite(width / 2, height * .5);
  Chip.addImage(ChipImg);
  Chip.collider = 'k';

  cards = new Group();
  cards.collider = 'k';

  passLock = new Sprite(width * .505, height * .5);
  passLock.addImage(passLockImg);
  passLock.collider = 'k';
  passLockImg.scale = .00055 * width;

  lockedOut = new Sprite(width / 2, height * .5);
  lockedOut.addImage(LockedOutImg);
  lockedOut.collider = 'k';

  lockedComp = new Sprite(width / 2, height * .5);
  lockedComp.addImage(LockedComputerImg);
  lockedComp.collider = 'k';

  worst = new cards.Sprite(width * .2, height - 70);
  worst.addImage(worstImg);
  worst.scale = .00075 * width;
  cards[0] = worst;
  worst.originalPosition = createVector(width * .2, height - 70);

  secondWorst = new cards.Sprite(width * .3716, height - 70);
  secondWorst.addImage(secondWorstImg);
  secondWorst.scale = .00075 * width;
  cards[1] = secondWorst;
  secondWorst.originalPosition = createVector(width * .3716, height - 70);

  secondBest = new cards.Sprite(width * .56332, height - 70);
  secondBest.addImage(secondBestImg);
  secondBest.scale = .00072 * width;
  cards[2] = secondBest;
  secondBest.originalPosition = createVector(width * .56332, height - 70);

  Best = new cards.Sprite(width * .775, height - 45);
  Best.addImage(BestImg);
  Best.scale = .00066 * width;
  cards[3] = Best;
  Best.originalPosition = createVector(width * .775, height - 70);

  secondBest.pos = { x: -100, y: -100 };
  secondWorst.pos = { x: -100, y: -100 };
  worst.pos = { x: -100, y: -100 };
  Best.pos = { x: -100, y: -100 };
  Password.pos = { x: -200, y: -200 };
  passLock.pos = { x: -400, y: -400 };
  lockedComp.pos = { x: -400, y: -400 };
  lockedComp.pos = { x: -400, y: -400 };
  Chip.pos = { x: -400, y: -400 };
}


function draw() {
  // Set up the screen
  clear();
  background("white");

  if (screen === 0) {
    showStartScreen();
  }
  else if (screen === 1) {
    showInstructionScreen();
  }
  else if (screen === 2) {
    playOnce = true;
    const c = color(48, 116, 180);
    background(c);

    let imgX = 0;
    let imgY = 0;
    scale(.00016 * width);
    image(ChipImg, imgX, imgY);
    scale(1 / (.00016 * width));

    noStroke();
    strokeWeight(1);
    fill(255);
    rectMode(CENTER);
    rect(width / 2, 60, 1000, 100, 10);
    rectMode(CORNER);
    rect(200, 120, width - 400, height - 270, 10);
    // Define the text content
    // Set text properties
    // Display text content
    textSize(15);
    noStroke();
    fill(0);
    textAlign(CENTER, TOP); // Text alignment
    text("\nThis image shows some tips for what you should (green), and should not do (red) when creating your passwords. Using this information, place the given passwords in order of increasing security.", width / 2 - 500, 20, 1000, 360);

    // Learn More Button Border
    stroke(255);
    strokeWeight(2);
    fill(255);
    // Learn More Button
    noStroke();
    fill(255);
    rect(width - 150 + 1, height - 54, 138, 38, 10);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Learn More", width - 80, height - 35);  // Learn More Button Text

    stroke(c);
    strokeWeight(3);
    fill(255);
    rectMode(CENTER);
    rect(center1.x, center1.y, width * .115, height * .085);
    rect(center2.x, center2.y, width * .115, height * .085);
    rect(center3.x, center3.y, width * .115, height * .085);
    rect(center4.x, center4.y, width * .115, height * .085);
    rectMode(CORNER);

    noStroke();
    textSize(20);
    textAlign(CENTER);
    const r = color(195, 16, 16);
    fill(r);
    text("Weakest", center4.x - 1, center4.y + 2);
    const g = color(0, 179, 115);
    fill(g);
    text("Strongest", center1.x, center1.y + 2);

    strokeWeight(5);
    stroke(0);
    line(center1.x * .65, center1.y, center1.x * .85, center1.y);
    line(center1.x * .825, center1.y - 20, center1.x * .85, center1.y);
    line(center1.x * .825, center1.y + 20, center1.x * .85, center1.y);

    line(center2.x * .65, center2.y, center2.x * .85, center2.y);
    line(center2.x * .825, center2.y - 20, center2.x * .85, center2.y);
    line(center2.x * .825, center2.y + 20, center2.x * .85, center2.y);

    line(center3.x * .65, center3.y, center3.x * .85, center3.y);
    line(center3.x * .825, center3.y - 20, center3.x * .85, center3.y);
    line(center3.x * .825, center3.y + 20, center3.x * .85, center3.y);

    line(center4.x * .65, center4.y, center4.x * .85, center4.y);
    line(center4.x * .825, center4.y - 20, center4.x * .85, center4.y);
    line(center4.x * .825, center4.y + 20, center4.x * .85, center4.y);

    for (let card of cards) {
      handleDragging(card);
      snapToCenter(card);
    }
  }

  checkIfConfirm();
  //Check if we win!!!
  if (confirm && !cancel) {
    const c = color(0, 179, 115);
    fill(255);
    noStroke();
    rect(width / 2 - 140, height - 130, 300, 110, 10);
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text('Submit Answer?', width / 2 - 95, height - 105);
    fill(c);
    rect(width / 2 + 20, height - 80, 120, 40, 10);
    fill(255);
    textSize(17);
    text("Submit", width / 2 + 42, height - 60);
    const r = color(195, 16, 16);
    fill(r);
    rect(width / 2 - 120, height - 80, 120, 40, 10);
    fill(255);
    text("Cancel", width / 2 - 105, height - 60);
  }

  else if (screen === 3) {
    showScreenWin();
  }

  else if (screen === 4) {
    showScreenLose();
  }
}

function windowResized() { //Adjusts size of canvas and screen elements based on screen size 
  resizeCanvas(windowWidth, windowHeight);
  Password.scale = .00035 * width;
  Password.pos = { x: width * .3, y: height / 2 - 10 };
  secondWorst.scale = 0.00075 * width;
  secondWorst.originalPosition = createVector(width * .3716, height - 70);
  worst.scale = 0.00075 * width;
  worst.originalPosition = createVector(width * .2, height - 70);
  Best.scale = 0.00066 * width;
  Best.originalPosition = createVector(width * .775, height - 70);
  secondBest.scale = 0.00072 * width;
  secondBest.originalPosition = createVector(width * .56332, height - 70);
  center1 = createVector(width * .7, height * .255);
  center2 = createVector(width * .7, height * .405);
  center3 = createVector(width * .7, height * .555);
  center4 = createVector(width * .7, height * .705);
}

function showStartScreen() {
  setCardsoffScreen();
  const c = color(48, 116, 180);
  background(c);

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rectMode(CENTER);
  rect(width / 2, height / 8, 900, height / 10, 10);
  rectMode(CORNER);

  // Set text properties
  fill(0); // Black color
  textSize(60); // Font size
  textFont(font);
  textAlign(CENTER, CENTER); // Text alignment
  text("Password Security\n\n", width / 2, height / 4.5);

  // Instructions button
  fill(255);
  noStroke();
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Instructions", width / 2, height - 100);

  fill(255);
  rect(width * .395, height * .25, width * .21, height * .5, 10);
}

function showInstructionScreen() {
  setCardsoffScreen();
  background("white");

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(0);
  rectMode(CENTER);
  rect(width / 2, height / 3.25, 600, height / 10, 10);
  rectMode(CORNER);

  const c = color(48, 116, 180);
  // Set text properties
  fill(c); // Blue color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("Instructions\n\n", width / 2, height * .36);

  // Begin button
  fill(0);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(255);
  textSize(20);
  text("Begin", width / 2, height - 100);


  textSize(18); // Adjusted font size
  textAlign(CENTER, TOP); // Adjusted text alignment

  // Additional text
  fill(color(0));
  let textX = width / 2 - 280; // X position for the additional text
  let textY = height / 2 - 60; // Starting Y position for the additional text
  let textLeading = 24; // Line spacing
  let textWidth = 575; // Width of the text block
  let additionalText = "Your objective is to correctly place each card into its designated slot. To play, click and hold on a card, then drag it to the slot where you think it belongs. Release the mouse to drop the card into place.\n\nRemember, each card has a specific slot it must occupy. When all cards have been placed, you'll see an option to check your answers. If you're correct, you'll have the option to play again.";

  text(additionalText, textX, textY, textWidth, height - textY); // Display additional text with specified width and height
}

function showScreenWin() {
  if (playOnce) {
    gameMusic.stop();
    winJingle.loop();
  }
  playOnce = false;
  const c = color(0, 179, 115);
  background(c);
  //Move extra icons off screen when win page is up
  setCardsoffScreen();

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rect(width * .33, height * .33, width * .35, height * .48, 10);

  //Set text properties
  fill(255, alphaValue);
  rect(width * .34, height * .1, width * .33, height * .2, 10);
  fill(0, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win!\n\nThanks for playing!", width / 2, height * .2);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //Restart button
  fill(255);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height - 100);

  //display win image
  let imgX2 = lockedComp.width + 14;
  let imgY2 = lockedComp.height - 55;
  scale(.00095 * width);
  image(LockedComputerImg, imgX2, imgY2);
}

function showScreenLose() {
  setCardsoffScreen();
  const r = color(195, 16, 16);
  background(r);

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rect(width * .33, height * .33, width * .35, height * .48, 10);

  //Set text properties
  fill(255, alphaValue);
  rect(width * .4, height * .1, width * .2, height * .2, 10);
  fill(0, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Not Quite!\n\nTry again?", width / 2, height * .2);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //Restart button
  fill(255);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height - 100);

  //display lose image
  let imgX2 = lockedOut.width + 20;
  let imgY2 = lockedOut.height - 20;
  scale(.001 * width);
  image(LockedOutImg, imgX2, imgY2);
}
