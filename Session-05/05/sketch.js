let dogs = [];

function setup() {
  createCanvas(800, 600);
  textFont("Arial");
  background(245, 235, 220);
}

function draw() {
  background(245, 235, 220, 18);

  fill(40);
  noStroke();
  textSize(32);
  textAlign(CENTER);
  text("Dog Chaos Brush", width / 2, 55);

  textSize(15);
  text("Drag your mouse to draw chaotic dogs. Click for dog explosion. Press C to clear.", width / 2, 85);

  for (let dog of dogs) {
    dog.x += dog.vx;
    dog.y += dog.vy;
    dog.angle += dog.spin;
    dog.size *= 0.995;

    push();
    translate(dog.x, dog.y);
    rotate(dog.angle);
    scale(dog.size);

    drawDog(0, 0, dog.r, dog.g, dog.b);

    pop();
  }

  dogs = dogs.filter(dog => dog.size > 0.25);
}

function mouseDragged() {
  addDog(mouseX, mouseY);
}

function mousePressed() {
  for (let i = 0; i < 25; i++) {
    addDog(mouseX + random(-80, 80), mouseY + random(-80, 80));
  }
}

function keyPressed() {
  if (key === "c" || key === "C") {
    dogs = [];
    background(245, 235, 220);
  }
}

function addDog(x, y) {
  dogs.push({
    x: x,
    y: y,
    vx: random(-2, 2),
    vy: random(-2, 2),
    angle: random(TWO_PI),
    spin: random(-0.06, 0.06),
    size: random(0.5, 1.3),
    r: random(120, 230),
    g: random(80, 170),
    b: random(40, 120)
  });
}

function drawDog(x, y, r, g, b) {
  noStroke();

  // ears
  fill(r - 40, g - 30, b - 20);
  triangle(x - 35, y - 25, x - 60, y - 75, x - 15, y - 50);
  triangle(x + 35, y - 25, x + 60, y - 75, x + 15, y - 50);

  // face
  fill(r, g, b);
  ellipse(x, y, 90, 75);

  // muzzle
  fill(245, 220, 190);
  ellipse(x, y + 15, 42, 30);

  // eyes
  fill(30);
  circle(x - 20, y - 10, 8);
  circle(x + 20, y - 10, 8);

  // nose
  fill(20);
  ellipse(x, y + 10, 14, 10);

  // mouth
  stroke(30);
  strokeWeight(2);
  line(x, y + 15, x, y + 25);
  noFill();
  arc(x - 8, y + 25, 16, 12, 0, PI);
  arc(x + 8, y + 25, 16, 12, 0, PI);

  // tongue
  noStroke();
  fill(255, 120, 140);
  ellipse(x, y + 36, 18, 22);
}