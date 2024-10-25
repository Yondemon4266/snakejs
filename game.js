import Snake from "./snake.js";
import Food from "./food.js";
import Walls from "./walls.js";
class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = Math.min(window.innerWidth, window.innerHeight) * 0.9;
    this.canvas.height = Math.min(window.innerWidth, window.innerHeight) * 0.9;
    this.sound = new Audio("rengoku-umai.mp3");
    this.walls = new Walls(this.canvas, this.ctx, this.size);
    this.size = 30;
    this.snake = new Snake(this.canvas, this.ctx, this.size);
    this.food = new Food(
      this.canvas,
      this.ctx,
      this.size,
      this.snake.snakeBody
    );
    this.gameLoop = setInterval(() => this.update(), 100);
  }

  update() {
    this.snake.move();
    this.checkCollisions();
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.snake.draw();
    this.food.draw();
  }
  checkCollisions() {
    const head = this.snake.snakeBody[0];
    if (
      head.x < this.food.position.x + this.food.size &&
      head.x + this.snake.size > this.food.position.x &&
      head.y < this.food.position.y + this.food.size &&
      head.y + this.snake.size > this.food.position.y
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
