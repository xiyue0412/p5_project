function setup() {
  createCanvas(900, 600);
  background(255);
  noLoop();
}

function draw() {
  for (let x = 120; x < width - 120; x += 22) {
    for (let y = 120; y < height - 120; y += 22) {
      if (insideBow(x, y)) {
        drawSmallButterfly(x, y, random(8, 15));
      }
    }
  }

  // middle knot
  fill(120, 70, 220);
  noStroke();
  ellipse(width / 2, height / 2, 45, 70);
}

function insideBow(x, y) {
  let cx = width / 2;
  let cy = height / 2;

  let dx = x - cx;
  let dy = y - cy;

  // left triangle wing
  let leftWing =
    dx < -25 &&
    dx > -330 &&
    abs(dy) < map(dx, -330, -25, 120, 25);

  // right triangle wing
  let rightWing =
    dx > 25 &&
    dx < 330 &&
    abs(dy) < map(dx, 25, 330, 25, 120);

  // center knot area
  let center =
    abs(dx) < 35 &&
    abs(dy) < 55;

  return leftWing || rightWing || center;
}

function drawSmallButterfly(x, y, s) {
  push();
  translate(x, y);
  rotate(random(-0.25, 0.25));

  noStroke();

  let colors = [
    color(150, 80, 230),
    color(210, 70, 180),
    color(120, 100, 255),
    color(240, 90, 160)
  ];

  fill(random(colors));

  // left small triangle wing
  triangle(0, 0, -s, -s * 0.8, -s, s * 0.8);

  // right small triangle wing
  triangle(0, 0, s, -s * 0.8, s, s * 0.8);

  pop();
}