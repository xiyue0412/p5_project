// ==========================================
// Tethered Piano Birds
// Click a piano key to release a bird.
// White keys create white birds.
// Black keys create black birds.
// Every bird is tied to its piano key.
// ==========================================

let whiteKeys = [];
let blackKeys = [];
let birds = [];

let piano;
let pianoLoaded = false;
let audioStarted = false;

let pianoX;
let pianoY;
let whiteKeyW;
let whiteKeyH;

const WHITE_NOTES = [
  "C4", "D4", "E4", "F4", "G4", "A4", "B4",
  "C5", "D5", "E5", "F5", "G5", "A5", "B5"
];

// Which white key each black key appears after
const BLACK_KEY_DATA = [
  { after: 0, note: "C#4" },
  { after: 1, note: "D#4" },
  { after: 3, note: "F#4" },
  { after: 4, note: "G#4" },
  { after: 5, note: "A#4" },

  { after: 7, note: "C#5" },
  { after: 8, note: "D#5" },
  { after: 10, note: "F#5" },
  { after: 11, note: "G#5" },
  { after: 12, note: "A#5" }
];

// Computer keyboard controls
const KEYBOARD_MAP = {
  a: "C4",
  w: "C#4",
  s: "D4",
  e: "D#4",
  d: "E4",
  f: "F4",
  t: "F#4",
  g: "G4",
  y: "G#4",
  h: "A4",
  u: "A#4",
  j: "B4",

  k: "C5",
  o: "C#5",
  l: "D5",
  p: "D#5",
  ";": "E5",
  "'": "F5"
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  createPiano();
  createPianoSampler();

  textFont("Arial");
}

function createPianoSampler() {
  // Real piano audio samples
  piano = new Tone.Sampler({
    urls: {
      A0: "A0.mp3",
      C1: "C1.mp3",
      "D#1": "Ds1.mp3",
      "F#1": "Fs1.mp3",
      A1: "A1.mp3",
      C2: "C2.mp3",
      "D#2": "Ds2.mp3",
      "F#2": "Fs2.mp3",
      A2: "A2.mp3",
      C3: "C3.mp3",
      "D#3": "Ds3.mp3",
      "F#3": "Fs3.mp3",
      A3: "A3.mp3",
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
      C5: "C5.mp3",
      "D#5": "Ds5.mp3",
      "F#5": "Fs5.mp3",
      A5: "A5.mp3",
      C6: "C6.mp3"
    },

    release: 1.5,

    baseUrl: "https://tonejs.github.io/audio/salamander/",

    onload: function () {
      pianoLoaded = true;
      console.log("Piano samples loaded");
    }
  }).toDestination();

  piano.volume.value = -7;
}

function draw() {
  drawGradientBackground();
  drawSoftLight();

  updateBirds();
  drawBirds();

  drawPiano();
  drawInstructions();
}

function drawGradientBackground() {
  // Soft mint to deep blue gradient
  const topColor = color(171, 222, 212);
  const middleColor = color(108, 172, 203);
  const bottomColor = color(18, 81, 172);

  for (let y = 0; y < height; y++) {
    let c;

    if (y < height * 0.45) {
      let amount = map(y, 0, height * 0.45, 0, 1);
      c = lerpColor(topColor, middleColor, amount);
    } else {
      let amount = map(
        y,
        height * 0.45,
        height,
        0,
        1
      );

      c = lerpColor(middleColor, bottomColor, amount);
    }

    stroke(c);
    line(0, y, width, y);
  }
}

function drawSoftLight() {
  noStroke();

  for (let size = width * 0.9; size > 20; size -= 35) {
    let alpha = map(size, width * 0.9, 20, 0, 2.5);

    fill(255, 255, 255, alpha);
    ellipse(width / 2, height * 0.35, size, size * 0.45);
  }
}

function createPiano() {
  whiteKeys = [];
  blackKeys = [];

  whiteKeyW = min(width * 0.055, 56);
  whiteKeyH = min(height * 0.19, 190);

  const totalWidth = whiteKeyW * WHITE_NOTES.length;

  pianoX = width / 2 - totalWidth / 2;
  pianoY = height - whiteKeyH - max(55, height * 0.08);

  for (let i = 0; i < WHITE_NOTES.length; i++) {
    whiteKeys.push({
      x: pianoX + i * whiteKeyW,
      y: pianoY,
      w: whiteKeyW,
      h: whiteKeyH,
      note: WHITE_NOTES[i],
      isBlack: false,
      pressed: 0
    });
  }

  const blackW = whiteKeyW * 0.62;
  const blackH = whiteKeyH * 0.65;

  for (let data of BLACK_KEY_DATA) {
    blackKeys.push({
      x:
        pianoX +
        (data.after + 1) * whiteKeyW -
        blackW / 2,
      y: pianoY,
      w: blackW,
      h: blackH,
      note: data.note,
      isBlack: true,
      pressed: 0
    });
  }
}

function drawPiano() {
  // Piano shadow
  noStroke();
  fill(0, 35);
  rect(
    pianoX - 10,
    pianoY + 12,
    whiteKeyW * WHITE_NOTES.length + 20,
    whiteKeyH + 12,
    8
  );

  // White keys
  for (let key of whiteKeys) {
    let pressOffset = key.pressed > 0 ? 5 : 0;

    if (key.pressed > 0) {
      key.pressed -= 1;
    }

    stroke(175);
    strokeWeight(1.4);

    if (key.pressed > 0) {
      fill(205, 216, 225);
    } else {
      fill(250);
    }

    rect(
      key.x,
      key.y + pressOffset,
      key.w,
      key.h - pressOffset,
      0,
      0,
      4,
      4
    );
  }

  // Black keys are drawn after white keys
  for (let key of blackKeys) {
    let pressOffset = key.pressed > 0 ? 4 : 0;

    if (key.pressed > 0) {
      key.pressed -= 1;
    }

    noStroke();

    if (key.pressed > 0) {
      fill(65);
    } else {
      fill(25);
    }

    rect(
      key.x,
      key.y + pressOffset,
      key.w,
      key.h - pressOffset,
      0,
      0,
      5,
      5
    );

    // Small highlight on black keys
    fill(255, 20);
    rect(
      key.x + 4,
      key.y + 3 + pressOffset,
      key.w - 8,
      key.h * 0.75,
      2
    );
  }
}

function drawInstructions() {
  noStroke();
  textAlign(CENTER, CENTER);

  if (!audioStarted) {
    fill(255, 230);
    textSize(17);
    text(
      "Click a piano key to begin",
      width / 2,
      38
    );
  } else if (!pianoLoaded) {
    fill(255, 220);
    textSize(15);
    text(
      "Loading piano sound...",
      width / 2,
      38
    );
  } else {
    fill(255, 150);
    textSize(13);
    text(
      "Each note releases a bird, but the string will not let it escape.",
      width / 2,
      35
    );
  }
}

async function startAudio() {
  if (!audioStarted) {
    await Tone.start();
    audioStarted = true;
  }
}

function mousePressed() {
  startAudio();

  let selectedKey = getKeyAtPosition(mouseX, mouseY);

  if (selectedKey) {
    playPianoKey(selectedKey);
  }
}

function touchStarted() {
  startAudio();

  let selectedKey = getKeyAtPosition(mouseX, mouseY);

  if (selectedKey) {
    playPianoKey(selectedKey);
  }

  return false;
}

function getKeyAtPosition(px, py) {
  // Check black keys first because they are above white keys
  for (let key of blackKeys) {
    if (
      px >= key.x &&
      px <= key.x + key.w &&
      py >= key.y &&
      py <= key.y + key.h
    ) {
      return key;
    }
  }

  for (let key of whiteKeys) {
    if (
      px >= key.x &&
      px <= key.x + key.w &&
      py >= key.y &&
      py <= key.y + key.h
    ) {
      return key;
    }
  }

  return null;
}

function playPianoKey(key) {
  key.pressed = 8;

  if (pianoLoaded) {
    piano.triggerAttackRelease(
      key.note,
      1.8,
      Tone.now(),
      random(0.65, 0.95)
    );
  }

  releaseBird(key);
}

function releaseBird(key) {
  const anchorX = key.x + key.w / 2;
  const anchorY = key.y + 5;

  birds.push(
    new Bird(
      anchorX,
      anchorY,
      key.note,
      key.isBlack
    )
  );

  // Prevent too many birds from slowing the sketch
  if (birds.length > 45) {
    birds.splice(0, 1);
  }
}

function updateBirds() {
  for (let bird of birds) {
    bird.update();
  }
}

function drawBirds() {
  // First draw strings
  for (let bird of birds) {
    bird.drawString();
  }

  // Then draw birds over strings
  for (let bird of birds) {
    bird.display();
  }
}

class Bird {
  constructor(anchorX, anchorY, note, isBlack) {
    this.anchor = createVector(anchorX, anchorY);

    this.position = createVector(
      anchorX + random(-5, 5),
      anchorY - 10
    );

    this.velocity = createVector(
      random(-2.2, 2.2),
      random(-8.5, -5.8)
    );

    this.acceleration = createVector(0, 0);

    this.isBlack = isBlack;
    this.note = note;

    this.size = random(17, 28);
    this.ropeLength = random(
      height * 0.22,
      height * 0.48
    );

    this.angle = random(-0.4, 0.4);
    this.wingMovement = random(TWO_PI);

    this.windOffset = random(1000);
    this.life = 0;
  }

  update() {
    this.life++;

    // Small wind movement
    let wind =
      map(
        noise(this.windOffset, frameCount * 0.008),
        0,
        1,
        -0.035,
        0.035
      );

    this.applyForce(createVector(wind, 0));

    // Very weak gravity
    this.applyForce(createVector(0, 0.018));

    let ropeVector = p5.Vector.sub(
      this.position,
      this.anchor
    );

    let distanceFromAnchor = ropeVector.mag();

    // Rope only pulls once the bird reaches the maximum distance
    if (distanceFromAnchor > this.ropeLength) {
      ropeVector.normalize();

      let stretch =
        distanceFromAnchor - this.ropeLength;

      let pullForce = ropeVector.copy();
      pullForce.mult(-0.012 * stretch);

      this.applyForce(pullForce);

      // Reduce velocity moving away from the anchor
      let outwardSpeed =
        this.velocity.dot(ropeVector);

      if (outwardSpeed > 0) {
        let correction = ropeVector.copy();
        correction.mult(outwardSpeed * -0.04);
        this.velocity.add(correction);
      }
    }

    this.velocity.add(this.acceleration);
    this.velocity.mult(0.994);

    this.position.add(this.velocity);
    this.acceleration.mult(0);

    this.angle = lerp(
      this.angle,
      this.velocity.x * 0.09,
      0.08
    );

    this.wingMovement += 0.22;

    // Keep birds inside the sides of the canvas
    if (this.position.x < 20) {
      this.position.x = 20;
      this.velocity.x *= -0.7;
    }

    if (this.position.x > width - 20) {
      this.position.x = width - 20;
      this.velocity.x *= -0.7;
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  drawString() {
    let middleX =
      (this.anchor.x + this.position.x) / 2;

    let middleY =
      (this.anchor.y + this.position.y) / 2;

    let curveAmount =
      constrain(
        abs(this.position.x - this.anchor.x) * 0.16,
        5,
        35
      );

    noFill();

    if (this.isBlack) {
      stroke(20, 20, 25, 150);
    } else {
      stroke(255, 255, 255, 145);
    }

    strokeWeight(1.3);

    bezier(
      this.anchor.x,
      this.anchor.y,
      middleX - curveAmount,
      middleY + 25,
      middleX + curveAmount,
      middleY - 10,
      this.position.x,
      this.position.y
    );

    // Small knot connecting string to bird
    noStroke();

    if (this.isBlack) {
      fill(20);
    } else {
      fill(250);
    }

    circle(
      this.position.x,
      this.position.y + this.size * 0.2,
      3
    );
  }

  display() {
    push();

    translate(
      this.position.x,
      this.position.y
    );

    rotate(this.angle);

    let wing =
      sin(this.wingMovement) *
      this.size *
      0.23;

    if (this.isBlack) {
      fill(15, 18, 24);
      stroke(15, 18, 24);
    } else {
      fill(250, 253, 255);
      stroke(250, 253, 255);
    }

    strokeWeight(1);

    // Bird body
    beginShape();
    vertex(-this.size * 0.43, 0);
    vertex(-this.size * 0.06, -this.size * 0.18);
    vertex(this.size * 0.42, -this.size * 0.06);
    vertex(this.size * 0.15, this.size * 0.12);
    vertex(-this.size * 0.12, this.size * 0.18);
    endShape(CLOSE);

    // Upper wing
    beginShape();
    vertex(-this.size * 0.08, 0);
    vertex(-this.size * 0.03, -this.size * 0.72 - wing);
    vertex(this.size * 0.17, -this.size * 0.1);
    endShape(CLOSE);

    // Lower wing
    beginShape();
    vertex(-this.size * 0.08, 0);
    vertex(-this.size * 0.28, this.size * 0.55 + wing);
    vertex(this.size * 0.12, this.size * 0.13);
    endShape(CLOSE);

    // Tail
    triangle(
      -this.size * 0.35,
      0,
      -this.size * 0.62,
      -this.size * 0.18,
      -this.size * 0.52,
      this.size * 0.13
    );

    // Beak
    triangle(
      this.size * 0.38,
      -this.size * 0.06,
      this.size * 0.61,
      0,
      this.size * 0.38,
      this.size * 0.05
    );

    pop();

    this.drawMusicSymbol();
  }

  drawMusicSymbol() {
    // Occasionally display a floating music symbol
    if (this.life < 65 && this.life % 3 === 0) {
      return;
    }

    if (this.life < 90) {
      push();

      let alpha = map(
        this.life,
        0,
        90,
        210,
        0
      );

      noStroke();

      if (this.isBlack) {
        fill(20, alpha);
      } else {
        fill(255, alpha);
      }

      textAlign(CENTER);
      textSize(this.size * 0.65);

      text(
        random() > 0.5 ? "♪" : "♫",
        this.position.x + this.size,
        this.position.y - this.size
      );

      pop();
    }
  }
}

function keyPressed() {
  startAudio();

  let pressedCharacter = key.toLowerCase();
  let note = KEYBOARD_MAP[pressedCharacter];

  if (!note) {
    return;
  }

  let selectedKey = findKeyByNote(note);

  if (selectedKey) {
    playPianoKey(selectedKey);
  }
}

function findKeyByNote(note) {
  for (let key of blackKeys) {
    if (key.note === note) {
      return key;
    }
  }

  for (let key of whiteKeys) {
    if (key.note === note) {
      return key;
    }
  }

  return null;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createPiano();

  // Reconnect existing strings to their matching resized keys
  for (let bird of birds) {
    let key = findKeyByNote(bird.note);

    if (key) {
      bird.anchor.set(
        key.x + key.w / 2,
        key.y + 5
      );
    }
  }
}