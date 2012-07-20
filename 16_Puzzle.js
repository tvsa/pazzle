enchant();
var IMG = "IMG.jpg";
var test = new Array(4);
for(var i = 0; i < 4 ; i++) {
	test[i] = new Array(4);
}


var Girl = enchant.Class.create(enchant.Sprite, {
    initialize: function (root,  _X, _Y, _img, _fc) {
        enchant.Sprite.call(this, 80, 80);
        this.image = _img;
        this.id = _fc;
        test[_X][_Y] = _fc;
        this.x = 80 *_X; this.y = 80 * _Y;
        this.frame = _fc;
        this.addEventListener(Event.TOUCH_START, function() {
        	var j = this.x / 80;
        	var i = this.y / 80;
        });
        root.addChild(this);
        }
       });
        window.onload = function(){
        	var game = new Game(320, 320);
        	game.fps = 16;
        	game.preload(IMG);
        	var fc = 0;
        	game.onload = function(){
        	for(var i = 0; i< 4; i++){
        		for(var j = 0; j < 4; j++){
        			new Girl(game.rootScene, j , i , game.assets[IMG],fc);        
        	fc++;
        		}
        		}
        	}
        game.start();
        };
        
        