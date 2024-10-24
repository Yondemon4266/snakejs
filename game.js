import Snake from "./snake.js";
import Food from "./food.js";
class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.size = 30;
    this.snake = new Snake(this.canvas, this.ctx, this.size);
    this.food = new Food(this.canvas, this.ctx, this.size);
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
      head.x < this.food.position.x + this.food.size / 2 &&
      head.x + this.snake.size > this.food.position.x &&
      head.y < this.food.position.y + this.food.size / 2 &&
      head.y + this.snake.size > this.food.position.y
    ) {
      this.snake.grow();
      this.food.position = this.food.generatePosition(this.snake.snakeBody);
    }
  }
}

const game = new Game();
