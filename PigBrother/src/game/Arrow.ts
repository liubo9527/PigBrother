class Arrow extends eui.Component {
	private pig:Pig;
	posStart:egret.Point;
	posTemple:egret.Point;
	posEnd:egret.Point;
	bone:eui.Image;
	arrow:eui.Image;
	boom:eui.Image;
	type = 0;
	speed = 1;
	public constructor(type, pig:Pig) {
		super();
		this.skinName = 'arrow';
		this.pig = pig;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		this.anchorOffsetY = 100;
		this.setType(type);
	}

	setType(type){
		if(this.type == type){
			return;
		}
		this.type = type;
		if(this.type == 0){
			this.boom.visible = false;
			this.bone.visible = false;
			this.arrow.visible = true;
		}else if(this.type == 1){
			this.boom.visible = false;
			this.bone.visible = true;
			this.arrow.visible = false;
		}else if(this.type == 2){
			this.boom.visible = true;
			this.bone.visible = false;
			this.arrow.visible = false;
		}
	}

	private onAdd(e){	
		egret.startTick(this.startTick, this);
	}
	
	private onRemove(e){
		egret.stopTick(this.startTick, this);
	}

	childrenCreated(){
		super.childrenCreated();
	}

	setPos(posStart, posTemple, posEnd){
		this.posStart = posStart;
		this.posTemple = posTemple;
		this.posEnd = posEnd;
	}

	set factor(value:number){
		this.x = (1 - value) * (1 - value) * this.posStart.x + 2 * value * (1 - value) * this.posTemple.x + value * value * this.posEnd.x;
        this.y = (1 - value) * (1 - value) * this.posStart.y + 2 * value * (1 - value) * this.posTemple.y + value * value * this.posEnd.y;
	}

	fire(){
		var x,y,distance,rotation;
		if(this.type == 0){
			x = -300;
			distance = this.x - x;
			y = distance / 20 + this.y;
			rotation = -Math.atan(0.05)*180 / 3.14;
		}else if(this.type == 1){
			x = 200;
			distance = 1600;
			y = 750;
			rotation = -45;
		}
		var posStart = new egret.Point(this.x, this.y);
		var posEnd = new egret.Point(x, y);
		var tempX,tempY,factor;
		if(this.type == 0){
			tempX = (posStart.x + posEnd.x) / 2;
			tempY = (posStart.y + posEnd.y) / 2 - 100;
			factor = 1;
		}else if(this.type == 1){
			tempX = 100;
			tempY = 200;
			factor = 1;
		}
		var posTemple = new egret.Point(tempX, tempY);
		this.setPos(posStart, posTemple, posEnd);
		var time = distance / this.speed;
		if(this.type == 2){
			egret.Tween.get(this).to({x:-300}, 10000).call(()=>{
				this.parent.removeChild(this);
				this.setType(0);
				this.pig.arrowBag.push(this);
			});
		}else{
			egret.Tween.get(this).to({x:-300, y:y, rotation:rotation, factor:factor}, time).call(()=>{
				//回收箭矢
				this.rotation = 0;
				this.parent.removeChild(this);
				this.setType(0);
				this.pig.arrowBag.push(this);
			});
		}
	}

	startTick(dt){
		//碰撞检测
		this.hitWofTest();
		return false;
	}

	hitWofTest(){
		this.pig.gameControl.wofsArray.forEach(element => {
			var wof:Wof = element;
			if(this.type == 0){//普通的弓箭
				var hitBallute = wof.ballute.hitTestPoint(this.x, this.y);
				var hitWof = wof.fly.hitTestPoint(this.x, this.y);
				//var hitBallute = GameConst.crossTest(wof.ballute, this);
				//var hitWof = GameConst.crossTest(wof.fly, this);
				if(hitBallute){//射中气球了
					wof.beHited();
				}
				if(hitWof){
					this.hitWofBody();
				}
			}else if(this.type == 1){//绑了石头的弓箭 或者是炮弹
				if(GameConst.crossTest(wof, this.arrow)){
					wof.beHited();
				}
			}else if(this.type == 2){
				if(GameConst.crossTest(wof, this)){
					wof.beHited();
				}
			}
		});
	}

	hitWofBody(){
		//停止碰撞检测
		egret.stopTick(this.startTick, this);
		egret.Tween.removeTweens(this);
		var findIndex = this.pig.arrowContainer.indexOf(this);
		this.pig.arrowContainer.splice(findIndex, 1);
		egret.Tween.get(this).to({x:this.x + 5, y:this.y + 20, rotation:-30}, 30).to({x:this.x + 30, y:1000, alpha:0, rotation:-90} ,1000).call(()=>{
			this.alpha = 1;
			this.rotation = 0;
			this.parent.removeChild(this);
			this.setType(0);
			this.pig.arrowBag.push(this);
		});
	}
}