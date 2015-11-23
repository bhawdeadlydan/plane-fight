'use strict';

function Game() {
    this.enemies = 5;
    this.lives = 3;
    this.play = function () {
        console.log('playing games --- with' + this.lives + 'against' + this.enemies);
    };
}
var game = new Game();
game.play();