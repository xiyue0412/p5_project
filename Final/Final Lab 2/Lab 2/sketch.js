let classifier;
let video;

let label = "Loading...";
let confidence = 0;

let birdSound;
let drumSound;
let waterSound;

let soundStarted = false;

// 用来确认手势是否稳定
let candidateLabel = "";
let candidateCount = 0;
let activeLabel = "No Gesture";

const modelURL =
  "https://teachablemachine.withgoogle.com/models/4ZzdfAHza/";

function preload() {
  classifier = ml5.imageClassifier(
    modelURL + "model.json"
  );

  birdSound = loadSound("bird.mp3");
  drumSound = loadSound("drum.mp3");
  waterSound = loadSound("water.mp3");
}

function setup() {
  createCanvas(640, 560);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  let button = createButton("START SOUND");
  button.position(270, 570);
  button.mousePressed(startSound);

  classifyVideo();
}

function startSound() {
  userStartAudio();

  soundStarted = true;
  activeLabel = "No Gesture";

  stopAllSounds();
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function gotResults(results) {
  if (results && results.length > 0) {
    label = results[0].label.trim();
    confidence = results[0].confidence;

    checkStableGesture();
  }

  classifyVideo();
}

function checkStableGesture() {
  // 识别率太低时不触发
  if (confidence < 0.8) {
    candidateCount = 0;
    return;
  }

  // 连续检测到同一个手势
  if (label === candidateLabel) {
    candidateCount++;
  } else {
    candidateLabel = label;
    candidateCount = 1;
  }

  // 连续检测到10次后，才确认手势
  if (
    candidateCount >= 10 &&
    candidateLabel !== activeLabel
  ) {
    activeLabel = candidateLabel;
    candidateCount = 0;

    if (soundStarted) {
      playGestureSound(activeLabel);
    }
  }
}

function playGestureSound(gesture) {
  // 每次先停止所有声音
  stopAllSounds();

  if (gesture === "Open Hand") {
    birdSound.play();
  } else if (gesture === "Fist") {
    drumSound.play();
  } else if (gesture === "Peace") {
    waterSound.play();
  }
  // No Gesture 不播放声音
}

function stopAllSounds() {
  if (birdSound && birdSound.isPlaying()) {
    birdSound.stop();
  }

  if (drumSound && drumSound.isPlaying()) {
    drumSound.stop();
  }

  if (waterSound && waterSound.isPlaying()) {
    waterSound.stop();
  }
}

function draw() {
  background(220);

  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, 640, 480);
  pop();

  fill(0);
  textAlign(CENTER);

  textSize(24);
  text(label, width / 2, 510);

  textSize(14);
  text(
    "Confidence: " +
      nf(confidence * 100, 0, 1) +
      "%",
    width / 2,
    535
  );
}