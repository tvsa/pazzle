//定数化
var IMG = "iMG.jpg";
var DIV = 4; //divide
var GAME_WIDTH = 320;
var GAME_HEIGHT = 320;
var TILE_WIDTH = GAME_WIDTH / DIV; //タイル一枚の横幅
var TILE_HEIGHT = GAME_HEIGHT / DIV; //タイル一枚の縦幅
var sel = -2
Array.prototype.shuffle = function () {
    var i = this.length;
    while (i) {
        var j = Math.floor(Math.random() * i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}
fc = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
fc.shuffle();

enchant();
var tile = new Array(DIV);
for (var i = 0; i < DIV; i++) {
    tile[i] = new Array(DIV);
}
//スプライトの定数化/
var Girl = enchant.Class.create(enchant.Sprite, {
    initialize: function (_X, _Y, _img, _fc) {
        enchant.Sprite.call(this,TILE_WIDTH , TILE_HEIGHT);
        this.image = _img;
        this.id = _fc;
        this.x = TILE_WIDTH * _X; this.y = TILE_HEIGHT * _Y;
        this.frame = _fc;
    }
});

window.onload = function () {
    var game = new Game(320, 320);
    game.fps = 16;
    game.time = 0;
    game.preload(IMG); //, 'start.png', 'end.png');
    //Sprite一枚一枚に振ったID

    game.onload = function () {
        console.log(fc);
        //ここから描画
        for (var y = 0; y < DIV; y++) {
            for (var x = 0; x < DIV; x++) {
                if (y == DIV - 1 && x == DIV - 1) {
                    tile[y][x] = -1; //空白
                } else {
                    tile[y][x] = fc[y * DIV + x];

                    var girl = new Girl(x, y, game.assets[IMG], tile[y][x]);
                    game.rootScene.addChild(girl);
                    girl.addEventListener(Event.TOUCH_START, function () {
                        var i = this.y / TILE_HEIGHT;
                        var j = this.x / TILE_WIDTH;
                        if (j < DIV - 1 && tile[i][j + 1] == -1) {
                            tile[i][j + 1] = this.id;
                            this.x += TILE_WIDTH;
                            tile[i][j] = -1;
                        } else if (0 < j && tile[i][j - 1] == -1) {
                            tile[i][j - 1] = this.id;
                            this.x -= TILE_WIDTH;
                            tile[i][j] = -1;
                        } else if (i < DIV - 1 && tile[i + 1][j] == -1) {
                            tile[i + 1][j] = this.id;
                            this.y += TILE_HEIGHT;
                            tile[i][j] = -1;
                        } else if (0 < i && tile[i - 1][j] == -1) {
                            tile[i - 1][j] = this.id;
                            this.y -= TILE_HEIGHT;
                            tile[i][j] = -1;
                        }
                        //ゲームクリアなのか判定
                        for (var i = 0; i < DIV; i++) {
                            for (var j = 0; j < DIV; j++) {
                                var index = i * DIV + j;
                                if (index /*!= tile[i][j]*/ && fc[fc.length - 1] != tile[i][j]) {
                                    return;
                                }
                            }
                        }
                        game.end(1000000 - game.time, (game.time / game.fps).toFixed(2) + "秒でクリア！");

                        console.log(fc);

                    });

                }
            }
        }



    };
    game.start();
};
