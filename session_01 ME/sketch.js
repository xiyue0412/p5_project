function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(245, 238, 225);

  // background aura
  noStroke();
  fill(255, 210, 210, 90);
  circle(300, 260, 360);

  fill(210, 230, 255, 80);
  ellipse(300, 310, 420, 300);

  // decorative lines
  stroke(120, 90, 80, 70);
  strokeWeight(2);
  line(90, 120, 180, 180);
  line(510, 120, 420, 180);
  line(80, 470, 180, 410);
  line(520, 470, 420, 410);

  // neck
  noStroke();
  fill(238, 190, 160);
  rect(260, 340, 80, 90, 30);

  // shirt
  fill(75, 100, 130);
  triangle(180, 580, 300, 390, 420, 580);
  fill(245, 238, 225);
  triangle(260, 410, 300, 500, 340, 410);

  // long hair back
  fill(45, 30, 25);
  ellipse(300, 250, 240, 270);
  rect(185, 210, 70, 250, 40);
  rect(345, 210, 70, 250, 40);

  // face
  fill(238, 190, 160);
  ellipse(300, 280, 175, 215);

  // middle-part hair shape
  fill(45, 30, 25);
  arc(270, 190, 130, 110, PI, TWO_PI);
  arc(330, 190, 130, 110, PI, TWO_PI);

  stroke(80, 55, 45);
  strokeWeight(3);

  // side hair
  noStroke();
  fill(45, 30, 25);
  ellipse(225, 285, 45, 170);
  ellipse(375, 285, 45, 170);

  // earrings
  fill(180, 80, 120);
  circle(205, 300, 16);
  circle(395, 300, 16);

  // eyes
  stroke(35);
  strokeWeight(4);
  line(255, 260, 285, 260);
  line(315, 260, 345, 260);

  // blush
  noStroke();
  fill(255, 120, 140, 80);
  ellipse(250, 300, 45, 25);
  ellipse(350, 300, 45, 25);

  // nose
  stroke(160, 110, 95);
  strokeWeight(2);
  line(300, 270, 292, 315);
  line(292, 315, 307, 315);

  // mouth
  noFill();
  stroke(120, 60, 70);
  strokeWeight(3);
  arc(300, 330, 55, 35, 0, PI);

  // glasses / artistic frame
  noFill();
  stroke(90, 70, 60);
  strokeWeight(3);
  ellipse(270, 265, 55, 45);
  ellipse(330, 265, 55, 45);
  line(298, 265, 302, 265);

  // small stars
  noStroke();
  fill(255, 190, 80);
  triangle(120, 250, 135, 280, 105, 280);
  triangle(120, 290, 135, 260, 105, 260);

  fill(120, 150, 200);
  circle(470, 250, 18);
  circle(455, 265, 10);
  circle(485, 265, 10);

  // signature
  fill(80);
  noStroke();
  textSize(18);
}