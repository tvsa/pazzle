//方向指定
var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var DIR_UP =  2;
var DIR_DOWN = 3;


enchant();

Square = Class.create(Sprite, {
 initialize:function(x, y){
  enchant.Sprite.call(this, 125, 125);
  //this.image = game.assets[]
  this.x = x;
  this.y = y;
  }
  });
  
window.onload = function(){
	var game = new Game(1000, 1000);
	game.fps = 16;

	game.preload('http://blog-imgs-54.fc2.com/g/t/v/gtvsa/IMG.jpg' ,
				'http://blog-imgs-54.fc2.com/g/t/v/gtvsa/pazzle.jpg');
				
	game.onload = function() {
	
	
	
	//背景の生成
	var bg = new Sprite(1000, 1000);
	bg.image = game.assets['http://blog-imgs-54.fc2.com/g/t/v/gtvsa/pazzle.jpg'];
	/*var image = new Surface(1026, 1026);
	for (var j = 0; j < 960; j += 32) {
	for (var i = 0; i < 960; i += 32){
		image.draw(maptip);
		}
	}
	bg.image = image;*/
	game.rootScene.addChild(bg);

		//サーフェイスの色指定メソッドの追加
	Surface.prototype.setColor = function(color) {
		this.context.strokeStyle = color;
		this.context.fillStyle 	 = color;
	};
	
	//サーフェイスに四角形の描画メソッドの追加
	Surface.prototype.drawRect = function(x, y, w, h) {
		this.context.beginPath();
		this.context.rect(x, y, w, h);
		this.context.stroke();
	};
	
	//サーフェイスの追加
	game.addSurface = function(type, color, x, y) {
		//サーフェイスの生成
		var surface = new Surface(1000, 1000);
		
		surface.setColor(color);
		if(type ==0) surface.drawRect(0, 0, 940, 940);
	
		//スプライトの作成
		var square = new Square (1000, 1000);
		square.image=surface;
		square.x = x;
		square.y = y;
		game.rootScene.addChild(square);
	};
	game.addSurface(0, "black", 50, 50 ); 
	
	//キャラクターの生成
	var mary = new Sprite(250, 250);
	mary.image =game.assets['http://blog-imgs-54.fc2.com/g/t/v/gtvsa/IMG.jpg'];
	mary.x 		= 500 - 125;
	mary.y 		= 500 - 125;
	mary.frame  = 7 ;
	mary.toX 	= mary.x;
	mary.toY 	= mary.y;
	mary.dir 		= DIR_DOWN;
	/*mary.anim	= [
			15, 16, 17, 16, //左
			24, 25, 26, 24, //右
			33, 34, 35, 34, //上
			6, 7,  8,  7]; //下*/
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
		mary.frame = mary.dir * 4 + (mary.tick % 4);
	});


	//タッチ開始時に呼ばれる
	game.addEventListener(Event.TOUCH_START, function(e) {
			mary.toX = e.x - 125;
			mary.toY = e.y - 125;
		});
		
	//タッチ移動時に呼ばれる
	game.addEventListener(Event.TOUCH_MOVE, function(e) {
			mary.toX = e.x - 125 ;
			mary.toY = e.x - 125 ;
		});
	};
		
	game.start();
};