export default class Walls {
  constructor(canvas, ctx, size) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size;
  }

  generate() {}
  checkCollision(x, y) {
    // Vérifie si une position (x, y) est sur un mur
    return this.walls.some((wall) => wall.x === x && wall.y === y);
  }
}
