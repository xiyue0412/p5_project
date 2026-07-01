let dogs = [];
let loading = false;

function setup() {
  createCanvas(800, 700);
  textFont("Arial");
  getDog();
}

function draw() {
  background(8, 10, 30);

  noStroke();
  fill(255, 255, 255, 120);
  for (let i = 0; i < 80; i++) {
    circle((i * 97) % width, (i * 53) % height, 2);
  }

  fill(255);
  textAlign(CENTER);
  textSize(32);
  text("Interactive Dog Galaxy", width / 2, 55);

  textSize(15);
  fill(220);
  text("Click anywhere to call a new dog planet", width / 2, 85);

  for (let dog of dogs) {
    dog.angle += dog.speed;

    let orbitX = dog.x + cos(dog.angle) * dog.orbit;
    let orbitY = dog.y + sin(dog.angle) * dog.orbit;

    noFill();
    stroke(255, 255, 255, 40);
    ellipse(dog.x, dog.y, dog.orbit * 2);

    noStroke();
    fill(dog.r, dog.g, dog.b, 45);
    circle(orbitX, orbitY, dog.size + 45);

    fill(dog.r, dog.g, dog.b, 220);
    circle(orbitX, orbitY, dog.size);

    fill(255, 255, 255, 180);
    circle(orbitX + dog.size * 0.18, orbitY - dog.size * 0.18, dog.size * 0.25);

    noFill();
    stroke(255, 255, 255, 150);
    strokeWeight(2);
    ellipse(orbitX, orbitY, dog.size * 1.5, dog.size * 0.55);

    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(13);
    text(dog.name, orbitX, orbitY + dog.size / 2 + 22);
  }

  fill(255, 255, 255, 18);
  rect(30, 570, 740, 90, 20);

  fill(255);
  textAlign(LEFT);
  textSize(14);
  text("Data rules:", 55, 600);
  text("Breed name length controls planet size. Image URL length controls orbit speed.", 55, 625);
  text("API source: Dog CEO Dog API", 55, 650);

  if (loading) {
    textAlign(CENTER);
    fill(255);
    text("Loading a new dog...", width / 2, 530);
  }
}

function mousePressed() {
  getDog();
}

function getDog() {
  loading = true;

  let url = "https://dog.ceo/api/breeds/image/random";
  loadJSON(url, gotDogData);
}

function gotDogData(data) {
  loading = false;

  let imageURL = data.message;
  let breedName = getBreedName(imageURL);

  let nameLength = breedName.length;
  let urlLength = imageURL.length;

  let planetSize = map(nameLength, 4, 20, 40, 130);
  planetSize = constrain(planetSize, 40, 130);

  let speed = map(urlLength, 50, 140, 0.035, 0.008);
  speed = constrain(speed, 0.008, 0.035);

  let newDog = {
    name: breedName,
    x: random(180, width - 180),
    y: random(160, height - 190),
    size: planetSize,
    orbit: random(20, 70),
    angle: random(TWO_PI),
    speed: speed,
    r: map(nameLength, 4, 20, 120, 255),
    g: map(urlLength, 50, 140, 120, 230),
    b: random(150, 255)
  };

  dogs.push(newDog);

  if (dogs.length > 10) {
    dogs.shift();
  }
}

function getBreedName(url) {
  let parts = url.split("/");
  let breed = parts[4];

  breed = breed.replace("-", " ");
  return breed;
}