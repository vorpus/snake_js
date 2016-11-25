const Board = require('./snake.js');

class View {
  constructor(game, $view) {
    this.game = game;
    this.$view = $view;
    this.board = new Board();
    this.makeGrid();
    this.render();
    $('body').on("keydown", (ev) => {
      this.handleKeyEvent(ev);
    });
    $('.snake').on("orientationchange", (ev) => {
      console.log('swiped');
      this.handleSwipeEvent(ev);
    });

    this.squareGrid();


    window.setInterval(() => {
      this.step();
      this.render();
      if (this.board.snakeBounds() || this.board.snakeSuicide()) {
        this.board.deadSnake();
      }

    }, 60);

  }

  squareGrid() {
    var mapElement = $("li");
    mapElement.css('height', mapElement.css('width'));

    window.addEventListener("resize", function(e) {
      var mapElement = $("li");
      mapElement.css('height', mapElement.css('width'));
    });
  }

  makeGrid() {
    this.board.grid.forEach( (el, i) => {
      let $gridRow = $('<ul class="group"></ul>');
      el.forEach( (_,j) => {
        $gridRow.append($('<li></li>'));
      });
      this.$view.append($gridRow);
    });
  }

  render() {
    let grid = this.board.grid;
    $('li').css('background','lightblue');
    // this.$view.each(() => {
    //   console.log(this);
    // });
    this.makeSnake();
    this.makeApple();
    // console.log()
  }

  makeSnake() {
    this.board.snake.segments.forEach((seg) => {
      $($($('ul')[seg.y]).children()[seg.x]).css('background','blue');
    });
  }

  makeApple() {
    this.board.apples.forEach( (apple) => {
      $($($('ul')[apple.y]).children()[apple.x]).css('background','red');
    });
  }

  handleKeyEvent(ev) {
    switch(String.fromCharCode(ev.which)) {
      case "&":
        this.board.snake.turn("N");
        break;
      case "'":
        this.board.snake.turn("E");
        break;
      case "%":
        this.board.snake.turn("W");
        break;
      case "(":
        this.board.snake.turn("S");
        break;
      default:
        console.log('invalid key');
    }
    // console.log(this.board.snake.direction);
  }

  handleSwipeEvent(ev) {
    console.log(ev);
    // switch(String.fromCharCode(ev.which)) {
    //   case "&":
    //     this.board.snake.turn("N");
    //     break;
    //   case "'":
    //     this.board.snake.turn("E");
    //     break;
    //   case "%":
    //     this.board.snake.turn("W");
    //     break;
    //   case "(":
    //     this.board.snake.turn("S");
    //     break;
    //   default:
    //     console.log('invalid key');
    // }
    // console.log(this.board.snake.direction);
  }

  step () {
    this.board.snake.move();
    this.board.snakeEating();
  }
}

module.exports = View;
