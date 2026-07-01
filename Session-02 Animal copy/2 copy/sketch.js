function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(245, 255, 240);

  // ground
  noStroke();
  fill(210, 240, 200);
  ellipse(250, 420, 360, 80);

  // body
  fill(255, 190, 120);
  ellipse(250, 280, 180, 170);

  // belly pattern
  fill(255, 230, 180);
  ellipse(250, 310, 100, 90);

  // head
  fill(255, 190, 120);
  circle(250, 180, 150);

  // ears
  fill(255, 170, 100);
  triangle(180, 140, 200, 70, 230, 130);
  triangle(270, 130, 300, 70, 320, 140);


  // eyes
  fill(40);
  circle(220, 170, 15);
  circle(280, 170, 15);

  fill(255);
  circle(224, 166, 5);
  circle(284, 166, 5);

  // nose
  fill(80, 50, 40);
  triangle(240, 195, 260, 195, 250, 208);

  // mouth
  stroke(80, 50, 40);
  strokeWeight(2);
  noFill();
  arc(240, 213, 20, 15, 0, PI);
  arc(260, 213, 20, 15, 0, PI);

  // whiskers
  line(215, 205, 170, 195);
  line(215, 215, 170, 220);
  line(285, 205, 330, 195);
  line(285, 215, 330, 220);

  // arms
  noStroke();
  fill(255, 170, 100);
  ellipse(170, 285, 50, 90);
  ellipse(330, 285, 50, 90);

  // feet
  ellipse(205, 370, 70, 40);
  ellipse(295, 370, 70, 40);

  // tail
  noFill();
  stroke(255, 170, 100);
  strokeWeight(22);
  arc(350, 270, 100, 100, -PI / 2, PI / 1.3);


  // cute blush
  fill(255, 120, 130, 120);
  circle(205, 195, 25);
  circle(295, 195, 25);
}