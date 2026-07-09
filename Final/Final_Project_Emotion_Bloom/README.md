# 🌸 Emotion Bloom

> **Every flower is an emotion. Every face tells a different story.**

Emotion Bloom is an interactive artwork that transforms facial expressions into blooming flowers. Different expressions create different flowers with different colors, shapes, and animations. The project explores how emotions can be expressed through generative art instead of words.

---

## 📖 Project Idea

Emotion Bloom is an interactive artwork that changes flowers based on facial expressions. Different emotions create different flowers with different colors and shapes. I wanted to show that emotions can be expressed in a visual and creative way instead of using words.

---

## 💡 Concept

People make small facial expressions every day without noticing them. A smile, a blink, or opening the mouth can all express different emotions. In this project, these small movements become blooming flowers. Every expression creates a different flower, making each interaction unique.

---

## 🌼 Inspiration

I was inspired by the idea that flowers can represent emotions. Different flowers have different meanings, just like different facial expressions. I wanted to combine machine learning with generative art to create a simple but playful interactive experience.

---

# 🎮 Interaction

The webcam tracks the user's face using **ml5.js FaceMesh**.

The flower follows the user's face and changes based on different facial expressions.

### 😊 Normal Face

- Pink flower

### 😮 Open Mouth

- Blue lotus
- Bigger flower

### 😉 Left Eye Blink

- Purple flower
- Long petals

### 😉 Right Eye Blink

- Orange flower
- Round petals

### 😄 Smile

- Yellow sunflower

### 🙂 Head Tilt

- Green wind flower
- Flower rotates with the head

---

# ✨ Background

The project also includes:

- Floating particle animation
- Dark background
- Soft background sound after clicking the screen

These elements make the artwork feel more immersive and relaxing.

---

# 🛠 Tools

- p5.js
- ml5.js FaceMesh
- p5.sound
- JavaScript
- VS Code

---

# ⚙️ Process

First, I learned how to use FaceMesh to detect facial landmarks.

Then I created a flower that follows the user's face.

After that, I added different facial interactions such as opening the mouth, blinking, smiling, and tilting the head.

Finally, I designed different flower styles for each expression and added particle effects and background sound to make the project feel more like an interactive artwork.

---

# ⚡ Challenges

The biggest challenge was making the flower stay in the correct position. At first, the flower moved in the opposite direction because the webcam image was mirrored.

Another challenge was finding the correct FaceMesh keypoints for the eyes and mouth. I tested different values many times before the interactions worked correctly.

I also spent time making every flower look different while keeping the animation smooth.

---

# 📚 Reflection

This project helped me understand how machine learning can be combined with creative coding and interaction design.

I learned how FaceMesh tracks facial landmarks and how facial expressions can control generative graphics in real time.

If I continue developing this project, I would like to add more flower styles, smoother animations, more facial expressions, and allow users to save their own flower artworks.

---

# ▶️ How to Run

1. Download or clone this repository.
2. Open the project in VS Code.
3. Start **Live Server**.
4. Allow webcam access.
5. Click once to enable the background sound.
6. Try smiling, blinking, opening your mouth, and tilting your head to see different flowers.

---

# 🚀 Future Improvements

- Add more flower species.
- Detect more facial expressions.
- Create smoother animations.
- Add seasonal and weather backgrounds.
- Allow users to save flower images.
- Add more background music and sound effects.

---

# 🎯 Learning Outcomes

Through this project I learned:

- How to use FaceMesh with ml5.js.
- How to create interactive artworks using p5.js.
- How to use facial expressions as interaction input.
- How to combine coding, design, and machine learning in one project.

---

# 📸 Screenshots

## Normal Face

![Normal](images/normal.png)

---

## Smile

![Smile](images/smile.png)

---

## Open Mouth

![Open Mouth](images/mouth.png)

---

## Left Eye Blink

![Left Blink](images/leftBlink.png)

---

## Right Eye Blink

![Right Blink](images/rightBlink.png)

---

## Head Tilt

![Head Tilt](images/tilt.png)

---


Emotion Bloom explores the relationship between facial expressions, emotions, and generative art. Every interaction creates a different flower, making each experience unique.