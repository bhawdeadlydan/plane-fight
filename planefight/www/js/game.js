/*! plane-fight - v1.0.0 - 11-28-2015 */
/* Source: src/index.js */
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

        var player = new PIXI.Sprite(texture);

        player.anchor.x = 0.5;
        player.anchor.y = 1;

        // move the player to the center of the screen
        player.position.x = 400;
        player.position.y = 600;

        stage.addChild(player);


        function animate() {
            requestAnimationFrame(animate);

//            player.rotation += 0.1;

//             render the container
            renderer.render(stage);

            console.log('animating');
        }

        animate();
    };
}
var game = new Game();
game.play();
game.initEnvironment();