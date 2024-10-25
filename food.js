export default class Food {
  constructor(canvas, ctx, size, snakeBody) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size;
    this.snakeBody = snakeBody;
    this.position = this.generatePosition(this.snakeBody);
  }

  generatePosition(snakeBody) {
    let position;
    let isOnSnake;

    do {
      // Génère une position aléatoire pour la nourriture
      const x =
        Math.floor(Math.random() * (this.canvas.width / this.size)) * this.size;
      const y =
        Math.floor(Math.random() * (this.canvas.height / this.size)) *
        this.size;
      position = { x, y };

      // Vérifie si la position est déjà occupée par le corps du serpent
      isOnSnake = snakeBody.some(
        (segment) => segment.x === position.x && segment.y === position.y
      );
      // console.log(isOnSnake);
    } while (isOnSnake); // Tant que la position est sur le serpent, on continue de générer une nouvelle position

    return position;
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
