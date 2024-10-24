export default class Snake {
  constructor(canvas, ctx, size) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.snakeBody = [{ x: 50, y: 50 }];
    this.size = size;
    this.direction = "ArrowRight";
    this.directions = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
    document.addEventListener("keydown", (e) => this.changeDirection(e));
  }
  //   Dessiner le snake sur le canvas
  draw() {
    // clear the snake before redrawing it
    this.snakeBody.forEach((segment) => {
      this.ctx.clearRect(segment.x, segment.y, this.size, this.size);
    });
    this.ctx.fillStyle = "red";
    this.snakeBody.forEach((segment) => {
      this.ctx.fillRect(segment.x, segment.y, this.size, this.size);
    });
  }

  move() {
    const head = { ...this.snakeBody[0] };
    // Faire un snake avec sa position x,y et longueur largeur?
    // Quand il avance sans manger, sa queue est supprimé,
    // donc longueur-- et sa position(x ou y) avance de +1
    // Si il mange il grandit de 1 en longueur
    // Pour dessiner le snake on peut faire ctx.fillRect(x,y,l,l)
    // en continu sur un loop
    switch (this.direction) {
      case "ArrowRight":
        head.x += this.size;
        break;
      case "ArrowLeft":
        head.x -= this.size;
        break;
      case "ArrowUp":
        head.y -= this.size;
        break;
      case "ArrowDown":
        head.y += this.size;
        break;
      default:
        break;
    }
    // Vérifie si le serpent dépasse les bords du canvas
    if (head.x < 0) {
      // Si la tête est à gauche du canvas, elle réapparaît à droite
      head.x = this.canvas.width - this.size;
    } else if (head.x >= this.canvas.width) {
      // Si la tête est à droite du canvas, elle réapparaît à gauche
      head.x = 0;
    }

    if (head.y < 0) {
      // Si la tête est en haut du canvas, elle réapparaît en bas
      head.y = this.canvas.height - this.size;
    } else if (head.y >= this.canvas.height) {
      // Si la tête est en bas du canvas, elle réapparaît en haut
      head.y = 0;
    }

    this.snakeBody.unshift(head);
    this.snakeBody.pop();
  }
  grow() {
    const head = { ...this.snakeBody[0] };
    this.snakeBody.unshift(head); // Add new head to the front
  }
  changeDirection(e) {
    if (this.direction === "ArrowUp" && e.key === "ArrowDown") return;
    if (this.direction === "ArrowDown" && e.key === "ArrowUp") return;
    if (this.direction === "ArrowLeft" && e.key === "ArrowRight") return;
    if (this.direction === "ArrowRight" && e.key === "ArrowLeft") return;
    if (!this.directions.includes(e.key)) return;
    this.direction = e.key;
  }
}
