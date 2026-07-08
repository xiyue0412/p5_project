let video;
let faceMesh;
let faces = [];

function setup() {
  createCanvas(900, 500);

  video = createCapture(VIDEO);
  video.size(450, 500);
  video.hide();

  faceMesh = new FaceMesh({
    locateFile: function(file) {
      return "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/" + file;
    }
  });

  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });

  faceMesh.onResults(gotFaces);

  const camera = new Camera(video.elt, {
    onFrame: async function() {
      await faceMesh.send({ image: video.elt });
    },
    width: 450,
    height: 500
  });

  camera.start();

  textFont("Arial");
}

function gotFaces(results) {
  faces = results.multiFaceLandmarks || [];
}

function draw() {
  background(255);

  image(video, 0, 0, 450, 500);
  image(video, 450, 0, 450, 500);

  fill(255);
  noStroke();
  rect(0, 0, 450, 45);
  rect(450, 0, 450, 45);

  fill(0);
  textAlign(CENTER);
  textSize(20);
  text("Normal Camera", 225, 30);
  text("Face Tracking Effects", 675, 30);

  if (faces.length > 0) {
    let face = faces[0];

    let nose = getPoint(face[1]);
    let leftEye = getPoint(face[33]);
    let rightEye = getPoint(face[263]);

    let x = nose.x + 450;
    let y = nose.y;

    let d = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
    let s = d * 2.4;

    drawDogEars(x, y - s * 0.95, s);
    drawGlasses(x, y - s * 0.25, s);
    drawDogNose(x, y + s * 0.08, s);
    drawSparkles(x, y, s);
    drawMoodText(x, y - s * 1.25);
  } else {
    fill(255);
    textSize(24);
    textAlign(CENTER);
    text("Waiting for a face...", 675, 250);
  }
}

function getPoint(p) {
  return {
    x: p.x * 450,
    y: p.y * 500
  };
}

function drawDogEars(x, y, s) {
  noStroke();

  fill(95, 55, 35);
  triangle(x - s * 0.45, y, x - s * 0.9, y - s * 0.75, x - s * 0.15, y - s * 0.55);
  triangle(x + s * 0.45, y, x + s * 0.9, y - s * 0.75, x + s * 0.15, y - s * 0.55);

  fill(180, 105, 80);
  triangle(x - s * 0.42, y - s * 0.05, x - s * 0.7, y - s * 0.55, x - s * 0.2, y - s * 0.42);
  triangle(x + s * 0.42, y - s * 0.05, x + s * 0.7, y - s * 0.55, x + s * 0.2, y - s * 0.42);
}

function drawGlasses(x, y, s) {
  noFill();
  stroke(0);
  strokeWeight(5);

  ellipse(x - s * 0.25, y, s * 0.42, s * 0.28);
  ellipse(x + s * 0.25, y, s * 0.42, s * 0.28);
  line(x - s * 0.05, y, x + s * 0.05, y);
}

function drawDogNose(x, y, s) {
  noStroke();

  fill(20);
  ellipse(x, y, s * 0.22, s * 0.15);

  fill(255, 255, 255, 130);
  ellipse(x - s * 0.05, y - s * 0.03, s * 0.06, s * 0.03);

  stroke(20);
  strokeWeight(3);
  line(x, y + s * 0.08, x, y + s * 0.23);

  noFill();
  arc(x - s * 0.1, y + s * 0.23, s * 0.22, s * 0.13, 0, PI);
  arc(x + s * 0.1, y + s * 0.23, s * 0.22, s * 0.13, 0, PI);
}

function drawSparkles(x, y, s) {
  noStroke();

  for (let i = 0; i < 8; i++) {
    let a = frameCount * 0.04 + i;
    let px = x + cos(a) * s * 0.75;
    let py = y + sin(a) * s * 0.75;

    fill(255, 210, 60, 180);
    triangle(px, py - 10, px - 8, py + 8, px + 8, py + 8);

    fill(255, 80, 170, 160);
    circle(px, py, 8);
  }
}

function drawMoodText(x, y) {
  let moods = ["happy", "sleepy", "chaotic", "dog mode", "main character"];
  let index = floor(frameCount / 60) % moods.length;

  fill(255, 240, 120);
  noStroke();
  textAlign(CENTER);
  textSize(22);
  text(moods[index], x, y);
}