class Stone extends egret.Bitmap {
	posStart:egret.Point;
	posTemple:egret.Point;
	posEnd:egret.Point;
	gameControl:Game;
	active=true;
	public constructor(s) {
		super(s);
	}
	get factor(){
		return 0;
	}

	setPos(posStart, posTemple, posEnd, gameControl){
		this.posStart = posStart;
		this.posTemple = posTemple;
		this.posEnd = posEnd;
		this.gameControl = gameControl;
	}

	set factor(value:number){
		this.x = (1 - value) * (1 - value) * this.posStart.x + 2 * value * (1 - value) * this.posTemple.x + value * value * this.posEnd.x;
        this.y = (1 - value) * (1 - value) * this.posStart.y + 2 * value * (1 - value) * this.posTemple.y + value * value * this.posEnd.y;
	}

	throw(){
		egret.Tween.get(this).to({factor:2}, 3000).call(()=>{
			egret.Tween.removeTweens(this);
			this.parent.removeChild(this);
			egret.stopTick(this.start, this);
			this.gameControl.stonesPool.push(this);
		});
		egret.startTick(this.start, this);
	}

	hitTest(){
		if((GameConst.crossTest(this.gameControl.pig.pigTop, this) 
		|| GameConst.crossTest(this.gameControl.pig.pigBottom, this)) && this.active){
			egret.Tween.removeTweens(this);
			this.active = false;
			egret.Tween.get(this).to({x:this.x - 50, y:this.y + 1000}, 2000).call(()=>{
				this.parent.removeChild(this);
				egret.stopTick(this.start, this);
				this.active = true;
				this.gameControl.stonesPool.push(this);
			});

		}else if(GameConst.crossTest(this.gameControl.pig.pig, this) && this.active){
			this.active = false;
			this.gameControl.pig.beHited();
		}
	}

	start(dt){
		this.hitTest();
		return false;
	}
}