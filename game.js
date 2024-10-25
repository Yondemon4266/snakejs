import Snake from "./snake.js";
import Food from "./food.js";
class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.calculateSizeOfCanvas();
    this.canvas.height = this.calculateSizeOfCanvas();

    this.rowcolumnNumber = 30;
    this.sound = new Audio("rengoku-umai.mp3");
    this.size = this.calculateSizeOfACell();
    this.snake = new Snake(
      this.canvas,
      this.ctx,
      this.size,
      this.rowcolumnNumber
    );
    this.food = new Food(
      this.canvas,
      this.ctx,
      this.size,
      this.snake.snakeBody,
      this.rowcolumnNumber
    );
    this.gameLoop = setInterval(() => this.update(), 100);
    console.log(`
      Food Position: ${this.food.position}
      Row/Column Number: ${this.rowcolumnNumber}
      Size: ${this.size}
      Canvas Width: ${this.canvas.width}
      Canvas Height: ${this.canvas.height}
    `);
    window.addEventListener("resize", () => this.resizeFunction());
  }

  resizeFunction() {
    this.canvas.width = this.calculateSizeOfCanvas();
    this.canvas.height = this.calculateSizeOfCanvas();
    this.size = this.calculateSizeOfACell();
    console.log(`
      Food Position: ${this.food.position}
      Row/Column Number: ${this.rowcolumnNumber}
      Size: ${this.size}
      Canvas Width: ${this.canvas.width}
      Canvas Height: ${this.canvas.height}
    `);
  }

  calculateSizeOfCanvas() {
    return (
      Math.floor(
        (Math.min(window.innerWidth, window.innerHeight) * 0.9) / 100
      ) * 100
    );
  }
  calculateSizeOfACell() {
    return Math.floor(this.canvas.width / this.rowcolumnNumber);
  }

  update() {
    this.snake.move();
    this.checkCollisions();
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.snake.draw(this.ctx, this.size);
    this.food.draw(this.ctx, this.size);
  }
  checkCollisions() {
    const head = this.snake.snakeBody[0];
    if (
      head.x < this.food.position.x + 1 &&
      head.x + 1 > this.food.position.x &&
      head.y < this.food.position.y + 1 &&
      head.y + 1 > this.food.position.y
    ) {
      this.snake.grow();
      this.sound.play().catch((error) => {
        console.error("Erreur lors de la lecture de l'audio :", error);
      });
      this.food.position = this.food.generatePosition(this.snake.snakeBody);
    }
  }
}

const game = new Game();
