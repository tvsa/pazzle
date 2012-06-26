//方向指定
var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var DIR_UP =  2;
var DIR_DOWN = 3;


enchant();
window.onload = function(){
	var game = new Game(1026, 1026);
	game.fps = 120;
	
	game.preload('http://blog-imgs-54.fc2.com/g/t/v/gtvsa/IMG.jpg' ,
				'http://blog-imgs-54.fc2.com/g/t/v/gtvsa/pazzle.jpg');
							
		game.onload = function() {
	//背景の生成
	var bg = new Sprite(1023, 1026);
	var maptip = game.assets['http://blog-imgs-54.fc2.com/g/t/v/gtvsa/pazzle.jpg'];
	var image = new Surface(960, 960);
	for (var j = 0; j < 960; j += 32) {
	for (var i = 0; i < 960; i += 32){
		image.draw(maptip, 0, 0, 32, 32, i , j, 32, 32);
		}
	}
	bg.image = image;
	game.rootScene.addChild(bg);
	//キャラクターの生成
	var mary = new Sprite(380, 370);
	mary.image =game.assets['http://blog-imgs-54.fc2.com/g/t/v/gtvsa/IMG.jpg'];
	mary.x 		= 160 - 16;
	mary.y 		= 160 - 16;
	mary.frame  = 7 ;
	mary.toX 	= mary.x;
	mary.toY 	= mary.y;
	mary.dir 		= DIR_DOWN;
	mary.anim	= [
			15, 16, 17, 16, //左
			24, 25, 26, 24, //右
			33, 34, 35, 34, //上
			6, 7,  8,  7]; //下
	game.rootScene.addChild(mary);
	mary.tick = 0 ;
	mary.addEventListener(Event.ENTER_FRAME, function() {
		//上へ移動
			if  (mary.y > mary.toY) {
				mary.dir =DIR_UP;
				if (Math.abs(mary.Y - mary.toY ) < 3) {
					mary.y=mary.toY;
				} else {
				mary.y -= 3;
				}
			}
	//下へ移動
	else if (mary.y < mary.toY) {
		mary.dir = DIR_DOWN;
		if ( Math.abs(mary.y - mary.toY) < 3) {
				mary.y = mary.toY;
			} else {
				mary.y += 3;
			}
		}
	//左へ移動
	if (mary.x > mary.toX) {
		mary.dir = DIR_LEFT;
		if ( Math.abs(mary.x - mary.toX) < 3 )  {
			mary.x = mary.toX ;
		}else {
			mary.x -= 3;
		}
	}
	//右へ移動
	else if (mary.x < mary.toX) {
		mary.dir = DIR_RIGHT;
		if ( Math.abs(mary.x - mary.toX) < 3)  {
			mary.x = mary.toX ;
		}else {
			mary.x += 3;
		}
	}
		//フレームの指定
		mary.tick++;
		if ( mary.x == mary.toX && mary.y == mary.toY) mary.tick = 1;
		mary.frame = mary.anim[mary.dir * 4 + (mary.tick % 4)];
	});


	//タッチ開始時に呼ばれる
	bg.addEventListener(Event.TOUCH_START, function(e) {
			mary.toX = e.x - 190;
			mary.toY = e.y - 190;
		});
		
	//タッチ移動時に呼ばれる
	bg.addEventListener(Event.TOUCH_MOVE, function(e) {
			mary.toX = e.x - 190 ;
			mary.toY = e.x - 190 ;
		});
	};

	game.start();
};