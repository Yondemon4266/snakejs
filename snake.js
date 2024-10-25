export default class Snake {
  constructor(canvas, ctx, size, rowcolumnNumber) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.rowcolumnNumber = rowcolumnNumber;
    this.snakeBody = [{ x: 5, y: 5 }];
    this.size = size;
    this.direction = "ArrowRight";
    this.directions = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
    document.addEventListener("keydown", (e) => this.changeDirection(e));
  }
  //   Dessiner le snake sur le canvas
  draw(ctx, size) {
    // clear the snake before redrawing it
    this.snakeBody.forEach((segment) => {
      ctx.clearRect(segment.x, segment.y, size, size);
    });
    ctx.fillStyle = "rgb(81, 201, 91)";
    this.snakeBody.forEach((segment) => {
      ctx.fillRect(segment.x * size, segment.y * size, size, size);
    });
  }

  move() {
    const head = { ...this.snakeBody[0] };
    // console.log(this.snakeBody);

    // Faire un snake avec sa position x,y et longueur largeur?
    // Quand il avance sans manger, sa queue est supprimé,
    // donc longueur-- et sa position(x ou y) avance de +1
    // Si il mange il grandit de 1 en longueur
    // Pour dessiner le snake on peut faire ctx.fillRect(x,y,l,l)
    // en continu sur un loop
    switch (this.direction) {
      case "ArrowRight":
        head.x++;
        break;
      case "ArrowLeft":
        head.x--;
        break;
      case "ArrowUp":
        head.y--;
        break;
      case "ArrowDown":
        head.y++;
        break;
      default:
        break;
    }
    // SI AUX EXTREMITES TELEPORTE
    this.teleportSnake(head);
    //
    if (this.checkCollisionWithSelf(head)) {
      alert("game over!");
    }
    this.snakeBody.unshift(head);
    this.snakeBody.pop();
  }
  teleportSnake(head) {
    // Vérifie si le serpent dépasse les bords du canvas
    if (head.x < 0) {
      // Si la tête est à gauche du canvas, elle réapparaît à droite
      head.x = this.rowcolumnNumber;
    } else if (head.x >= this.rowcolumnNumber) {
      // Si la tête est à droite du canvas, elle réapparaît à gauche
      head.x = 0;
    }

    if (head.y < 0) {
      // Si la tête est en haut du canvas, elle réapparaît en bas
      head.y = this.rowcolumnNumber;
    } else if (head.y >= this.rowcolumnNumber) {
      // Si la tête est en bas du canvas, elle réapparaît en haut
      head.y = 0;
    }
  }
  checkCollisionWithSelf(head) {
    // Vérifie si la tête entre en collision avec une autre partie du corps
    for (let i = 1; i < this.snakeBody.length; i++) {
      if (head.x === this.snakeBody[i].x && head.y === this.snakeBody[i].y) {
        return true; // Collision détectée
      }
    }
    return false; // Pas de collision
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
  eatSound() {}
}
