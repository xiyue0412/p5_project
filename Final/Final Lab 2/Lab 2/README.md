# Lab 2

## Getting Started

Open `index.html` in your web browser and start editing `sketch.js`.

## Running Locally

For projects with media files, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"
```

## Resources

- [p5.js 2.0](https://beta.p5js.org/)
- [p5.js Reference](https://p5js.org/reference/)
- [Lab1](Lab1.png)
- [Lab2](Lab2.png)

## Reflection

During this lab, I learned how to use Teachable Machine with p5.js and ml5.js to create a gesture-controlled interactive experience. The biggest challenge was getting the sound and gesture recognition to work correctly. At first, the sounds did not play because of browser audio restrictions, and later all three sounds were triggered at the same time because the model switched between gestures too quickly. I solved these problems by checking the file names, adjusting the code, and adding more stable gesture detection. Through this process, I gained a better understanding of how machine learning models work in interactive projects and improved my debugging skills. This experience also showed me the importance of testing and making small changes step by step to find the source of a problem.