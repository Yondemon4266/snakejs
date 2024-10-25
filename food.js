export default class Food {
  constructor(canvas, ctx, size, snakeBody, rowcolumnNumber) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size;
    this.rowcolumnNumber = rowcolumnNumber;
    this.snakeBody = snakeBody;
    this.position = this.generatePosition(this.snakeBody);
  }

  generatePosition(snakeBody) {
    let position;
    let isOnSnake;

    do {
      // Génère une position aléatoire pour la nourriture
      const x = Math.floor(Math.random() * this.rowcolumnNumber);
      const y = Math.floor(Math.random() * this.rowcolumnNumber);
      position = { x, y };

      // Vérifie si la position est déjà occupée par le corps du serpent
      isOnSnake = snakeBody.some(
        (segment) => segment.x === position.x && segment.y === position.y
      );
      // console.log(isOnSnake);
    } while (isOnSnake); // Tant que la position est sur le serpent, on continue de générer une nouvelle position

    return position;
  }

  draw(ctx, size) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x * size, this.position.y * size, size, size);
  }
}
