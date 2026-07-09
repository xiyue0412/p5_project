let video;
let faceMesh;
let faces = [];

let particles = [];
let musicStarted = false;
let osc;

function preload() {
  faceMesh = ml5.faceMesh();
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  faceMesh.detectStart(video, gotFaces);

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(2, 6),
      speed: random(0.3, 1.2)
    });
  }

  osc = new p5.Oscillator("sine");
  osc.freq(220);
  osc.amp(0);
  osc.start();
}

function draw() {
  background(15, 18, 30);

  drawBackground();

  push();

  // Mirror webcam and face effects
  translate(width, 0);
  scale(-1, 1);

  image(video, 0, 0, width, height);

  if (faces.length > 0) {
    let face = faces[0];

    let nose = face.keypoints[1];

    let upperLip = face.keypoints[13];
    let lowerLip = face.keypoints[14];

    let leftMouth = face.keypoints[61];
    let rightMouth = face.keypoints[291];

    let leftEyeTop = face.keypoints[159];
    let leftEyeBottom = face.keypoints[145];

    let rightEyeTop = face.keypoints[386];
    let rightEyeBottom = face.keypoints[374];

    let leftEyeCorner = face.keypoints[33];
    let rightEyeCorner = face.keypoints[263];

    let mouthOpen = 10;
    let mouthWidth = 40;
    let leftEyeOpen = 10;
    let rightEyeOpen = 10;
    let headTilt = 0;

    if (upperLip && lowerLip) {
      mouthOpen = dist(upperLip.x, upperLip.y, lowerLip.x, lowerLip.y);
    }

    if (leftMouth && rightMouth) {
      mouthWidth = dist(leftMouth.x, leftMouth.y, rightMouth.x, rightMouth.y);
    }

    if (leftEyeTop && leftEyeBottom) {
      leftEyeOpen = dist(leftEyeTop.x, leftEyeTop.y, leftEyeBottom.x, leftEyeBottom.y);
    }

    if (rightEyeTop && rightEyeBottom) {
      rightEyeOpen = dist(rightEyeTop.x, rightEyeTop.y, rightEyeBottom.x, rightEyeBottom.y);
    }

    if (leftEyeCorner && rightEyeCorner) {
      headTilt = atan2(
        rightEyeCorner.y - leftEyeCorner.y,
        rightEyeCorner.x - leftEyeCorner.x
      );
    }

    let leftBlink = leftEyeOpen < 8;
    let rightBlink = rightEyeOpen < 8;
    let mouthIsOpen = mouthOpen > 18;
    let smile = mouthWidth > 78 && mouthOpen < 18;
    let tilted = abs(headTilt) > 0.18;

    drawFlower(
      nose.x,
      nose.y,
      mouthOpen,
      leftBlink,
      rightBlink,
      smile,
      tilted,
      headTilt
    );

    updateMusic(mouthOpen, smile, tilted);
  }

  pop();

  drawInstruction();
}

function gotFaces(results) {
  faces = results;
}

function drawFlower(x, y, mouthOpen, leftBlink, rightBlink, smile, tilted, headTilt) {
  push();

  translate(x, y);

  let flowerSize = map(mouthOpen, 5, 35, 70, 150);
  flowerSize = constrain(flowerSize, 70, 150);

  let rotation = frameCount * 0.02;

  if (tilted) {
    rotate(headTilt * 2 + sin(frameCount * 0.05) * 0.4);
  } else {
    rotate(rotation);
  }

  noStroke();

  if (smile) {
    drawSunflower(flowerSize);
  } else if (leftBlink) {
    drawLongPetalFlower(flowerSize);
  } else if (rightBlink) {
    drawRoundFlower(flowerSize);
  } else if (mouthOpen > 18) {
    drawBlueLotus(flowerSize);
  } else if (tilted) {
    drawWindFlower(flowerSize);
  } else {
    drawNormalFlower(flowerSize);
  }

  pop();
}

function drawNormalFlower(size) {
  for (let i = 0; i < 12; i++) {
    rotate(TWO_PI / 12);
    fill(255, 170, 220, 180);
    ellipse(0, -size / 2, 25, 55);
  }

  fill(255, 220, 80);
  circle(0, 0, 35);
}

function drawBlueLotus(size) {
  for (let i = 0; i < 16; i++) {
    rotate(TWO_PI / 16);
    fill(120, 200, 255, 170);
    ellipse(0, -size / 2, 35, 75);
  }

  for (let i = 0; i < 8; i++) {
    rotate(TWO_PI / 8);
    fill(180, 230, 255, 160);
    ellipse(0, -size / 3, 25, 50);
  }

  fill(220, 245, 255);
  circle(0, 0, 35);
}

function drawLongPetalFlower(size) {
  for (let i = 0; i < 20; i++) {
    rotate(TWO_PI / 20);
    fill(190, 130, 255, 180);
    ellipse(0, -size / 2, 12, 85);
  }

  fill(240, 220, 255);
  circle(0, 0, 32);
}

function drawRoundFlower(size) {
  for (let i = 0; i < 8; i++) {
    rotate(TWO_PI / 8);
    fill(255, 170, 70, 180);
    ellipse(0, -size / 2, 50, 50);
  }

  fill(255, 230, 160);
  circle(0, 0, 38);
}

function drawSunflower(size) {
  for (let i = 0; i < 18; i++) {
    rotate(TWO_PI / 18);
    fill(255, 210, 60, 190);
    ellipse(0, -size / 2, 25, 70);
  }

  fill(120, 75, 35);
  circle(0, 0, 40);

  fill(80, 50, 25);
  for (let i = 0; i < 12; i++) {
    let a = TWO_PI / 12 * i;
    circle(cos(a) * 10, sin(a) * 10, 4);
  }
}

function drawWindFlower(size) {
  for (let i = 0; i < 10; i++) {
    rotate(TWO_PI / 10);
    fill(170, 255, 210, 160);
    ellipse(10, -size / 2, 20, 80);
  }

  fill(220, 255, 235);
  circle(0, 0, 35);
}

function drawBackground() {
  noStroke();

  for (let p of particles) {
    fill(255, 255, 255, 120);
    circle(p.x, p.y, p.size);

    p.y -= p.speed;

    if (p.y < 0) {
      p.y = height;
      p.x = random(width);
    }
  }
}

function drawInstruction() {
  fill(255);
  textSize(14);
  text("Emotion Bloom | Smile, open mouth, blink, or tilt your head", 20, height - 25);
  text("Click once to start soft background sound", 20, height - 45);
}

function mousePressed() {
  userStartAudio();
  musicStarted = true;
}

function updateMusic(mouthOpen, smile, tilted) {
  if (!musicStarted) {
    return;
  }

  let freq = 220;

  if (smile) {
    freq = 330;
  } else if (mouthOpen > 18) {
    freq = 440;
  } else if (tilted) {
    freq = 260;
  }

  osc.freq(freq, 0.2);
  osc.amp(0.08, 0.2);
}