let video;
let pawButton;
let rainbowButton;
let clearButton;
let brightnessSlider;

let paws = [];
let bones = [];
let rainbowMode = false;

function setup() {
  createCanvas(800, 600);

  video = createCapture(VIDEO);
  video.size(800, 600);
  video.hide();

  pawButton = createButton("Add Paw Prints");
  pawButton.position(20, 620);
  pawButton.mousePressed(addPaws);

  rainbowButton = createButton("Rainbow Filter");
  rainbowButton.position(150, 620);
  rainbowButton.mousePressed(toggleRainbow);

  clearButton = createButton("Clear");
  clearButton.position(270, 620);
  clearButton.mousePressed(clearStickers);

  brightnessSlider = createSlider(50, 200, 100);
  brightnessSlider.position(340, 625);
}

function draw() {
  background(20);

  // mirror camera
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  let brightness = brightnessSlider.value();

  // brightness layer
  noStroke();
  fill(255, 255, 255, brightness - 100);
  rect(0, 0, width, height);

  // rainbow filter
  if (rainbowMode) {
    fill(255, 80, 120, 50);
    rect(0, 0, width, height / 3);

    fill(255, 220, 80, 50);
    rect(0, height / 3, width, height / 3);

    fill(80, 180, 255, 50);
    rect(0, height * 2 / 3, width, height / 3);
  }

  // dog face filter
  drawDogEars(width / 2, 100);
  drawDogNose(width / 2, 330);

  // moving paws
  for (let p of paws) {
    p.y += p.speed;
    p.angle += 0.02;

    push();
    translate(p.x, p.y);
    rotate(p.angle);
    scale(p.size);
    drawPaw(0, 0);
    pop();

    if (p.y > height + 50) {
      p.y = -50;
    }
  }

  // moving bones
  for (let b of bones) {
    b.x += b.speed;
    b.angle += 0.02;

    push();
    translate(b.x, b.y);
    rotate(b.angle);
    scale(b.size);
    drawBone(0, 0);
    pop();

    if (b.x > width + 80) {
      b.x = -80;
    }
  }

  // title
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(34);
  text("Dog Selfie Studio", width / 2, 45);

  textSize(15);
  text("Buttons + slider + webcam interaction", width / 2, 70);

  fill(255);
  textAlign(LEFT);
  textSize(14);
  text("Brightness", 500, 640);
}

function addPaws() {
  for (let i = 0; i < 12; i++) {
    paws.push({
      x: random(width),
      y: random(-300, height),
      size: random(0.5, 1.2),
      speed: random(0.5, 2),
      angle: random(TWO_PI)
    });
  }

  for (let i = 0; i < 6; i++) {
    bones.push({
      x: random(-300, width),
      y: random(120, height - 80),
      size: random(0.5, 1.1),
      speed: random(0.5, 1.8),
      angle: random(TWO_PI)
    });
  }
}

function toggleRainbow() {
  rainbowMode = !rainbowMode;
}

function clearStickers() {
  paws = [];
  bones = [];
}

function mousePressed() {
  paws.push({
    x: mouseX,
    y: mouseY,
    size: random(0.7, 1.4),
    speed: random(0.4, 1.5),
    angle: random(TWO_PI)
  });
}

function drawDogEars(x, y) {
  noStroke();

  fill(95, 55, 35);
  triangle(x - 120, y - 10, x - 210, y - 140, x - 55, y - 100);
  triangle(x + 120, y - 10, x + 210, y - 140, x + 55, y - 100);

  fill(170, 100, 75);
  triangle(x - 115, y - 15, x - 175, y - 110, x - 70, y - 90);
  triangle(x + 115, y - 15, x + 175, y - 110, x + 70, y - 90);
}

function drawDogNose(x, y) {
  noStroke();

  fill(30);
  ellipse(x, y, 70, 48);

  fill(255, 255, 255, 120);
  ellipse(x - 18, y - 10, 18, 10);

  stroke(30);
  strokeWeight(5);
  line(x, y + 22, x, y + 65);

  noFill();
  arc(x - 22, y + 65, 45, 30, 0, PI);
  arc(x + 22, y + 65, 45, 30, 0, PI);
}

function drawPaw(x, y) {
  noStroke();
  fill(255, 210, 230, 190);

  circle(x, y + 12, 34);
  circle(x - 24, y - 10, 18);
  circle(x - 8, y - 24, 18);
  circle(x + 10, y - 24, 18);
  circle(x + 26, y - 8, 18);
}

function drawBone(x, y) {
  noStroke();
  fill(255, 245, 220, 210);

  circle(x - 32, y - 12, 28);
  circle(x - 32, y + 12, 28);
  circle(x + 32, y - 12, 28);
  circle(x + 32, y + 12, 28);
  rect(x - 32, y - 12, 64, 24, 12);
}