//定数化
var IMG = "IMG.jpg";
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
/*enchant.effect = {sprite };
/**ある対象ノードに対してフレームごとの処理をする仕組み*/
//enchant.effect.Action = enchant.Class.create({
    /*フレームごとの処理
    ＊@param {Node} targetNode 対象となるノード
    ＊@param {function} tickFunc フレームごとに実行される関数
    */
    /*initialize: funciton(targetNode, tickFunc){
        this.targetNode = targetNode;
        this.tickFunc = tickFunc;
        this.frame = 0;

        if(! targetNode.queue){
        //対象となるノードにキューがなければ作る
            targetNode.queue = [];
            targertNode.addEventListener('enterframe', function(){
            //フレームごとの処理
            if(taragetNode.queue &&0 < targetNode.queue.length){
                //キューが空でなければ最初のアクションを実行
                targetNode.queue[0].tick();
            }else{
                //キューが空ならフレームごとの処理を終了
                targetNode.removeEventListener('enterframe', arguments.callee);
                delete targetNode.queue;
                }
    });
    }
    //キューに自身を登録する
    targetNode.queue.push(this);
    },
    /*　フレームごとの処理*/
    /*tick: function(){
        this.tickFunc(this);
        this.frame++;
        }
    });*/
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
    game.preload(IMG);
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

                    /*$('.piece').click(function () {
                    });

                    var piece = new Sprite();
                    piece.addEventListener(TOUCH_START, function () {
                        var no = fc;
                        if ()
                    });*/

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
                        //} else if(array = ){
                        
                        }
                    });
                }
            }
        }
       
    };
    game.start();
};
