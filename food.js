export default class Food {
  constructor(canvas, ctx, size) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size;
    this.position = this.generatePosition();
    console.log((this.canvas.width / this.size) * this.canvas.height);
  }

  generatePosition(snakeBody) {
    const x =
      Math.floor(Math.random() * (this.canvas.width / this.size)) * this.size;
    const y =
      Math.floor(Math.random() * (this.canvas.height / this.size)) * this.size;
    // snakeBody.forEach((el) => console.log(el));

    return { x, y };
  }

  draw() {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
