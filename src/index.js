'use strict';

function Game() {
    this.enemies = 5;
    this.lives = 3;
    this.play = function () {
        console.log('playing games --- with' + this.lives + 'against' + this.enemies);
    };
    this.initEnvironment = function() {
        var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
        $('body').append(renderer.view);

        var stage = new PIXI.Container();

        var texture = PIXI.Texture.fromImage('../assets/fighter-plane.png');

        var bunny = new PIXI.Sprite(texture);

        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        // move the sprite to the center of the screen
        bunny.position.x = 200;
        bunny.position.y = 150;

        stage.addChild(bunny);


        function animate() {
            requestAnimationFrame(animate);

            bunny.rotation += 0.1;

            // render the container
            renderer.render(stage);

            console.log('animating');
        }

        animate();
    };
}
var game = new Game();
game.play();
game.initEnvironment();