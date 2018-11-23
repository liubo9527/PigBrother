class Wof extends eui.Component{
	walk:eui.Image;
	flyGroup:eui.Group;
	fly:eui.Image;
	fall:eui.Image;
	state:0;//0 walk 1 air
	type;//1boss default 0 渣
	walkSpeed = 120;
	flySpeed = 60;
	gameControl:Game;
	randomLength:Number;
	beKilled = false;
	stone:Stone;//石头
	ballute0:eui.Image;//不会攻击的狼
	ballute1:eui.Image;//偶尔攻击的狼
	ballute2:eui.Image;//一直攻击的狼
	ballute:eui.Image;//当前气球
	IntervalTimer;
	timeoutTimer;

	//状态机
	//wof WofFSM
	public get wofState(){
		return this.wofState;
	}

	public set wofState(state){
		this.wofState = state;
	}


	public constructor(state:WofFSM, gameControl) {
		super();
		this.skinName = "wof";
		this.wofState = state;
		this.gameControl = gameControl;
	}
	childrenCreated(){
		super.childrenCreated();
		this.setWofState(0);
		this.x = -100;
		this.y = - 60;
	}

	setInit(){
		this.setWofState(0);
		this.x = -100;
		this.y = - 60;
		this.alpha = 1;
		this.beKilled = false;
		this.fly.visible = true;
		this.fall.visible = false;
		this.scaleY = 1;
		//
		var random = Math.round(Math.random()*10);
		if(random <=3 ){//type1
			this.type = 1;
			this.ballute = this.ballute1;
		}else if(random >=7){//type2
			this.type = 2;
			this.ballute = this.ballute2;
		}else{//type0
			this.type = 0;
			this.ballute = this.ballute0;
		}
		this.autoMove();
	}

	setWofState(state){
		if(state == this.stage){
			return ;
		}
		this.state = state;
		if(this.state == 0){
			this.walk.visible = true;
			this.flyGroup.visible = false;
		}else if(this.state == 1){
			this.walk.visible = false;
			this.flyGroup.visible = true;
			this.ballute0.visible = false;
			this.ballute1.visible = false;
			this.ballute2.visible = false;
			this.ballute.visible = true;
		}
	}

	autoMove(){
		egret.Tween.removeTweens(this);
		var randomTop = Math.floor(Math.random()*600) + 128;
		var topWalkTime = 1000 * randomTop / this.walkSpeed;
		var flyTime =1000 * 650 / this.flySpeed;
		var bottomTime =1000 * (1400 - randomTop) / this.walkSpeed;
		egret.Tween.get(this).to({x:randomTop} ,topWalkTime).call(()=>{
			this.setWofState(1);
			if(this.type != 0){
				var time = Math.random()*flyTime;
				this.timeoutTimer = setTimeout(()=>{
					this.throwStone();
				}, time);
			}
		}).to({y:590} ,flyTime).call(()=>{
			if(this.type == 2){
				clearInterval(this.IntervalTimer);
			}	
			this.setWofState(0);
		}).to({x:1400}, bottomTime).call(()=>{
			var findIndex = this.gameControl.wofsArray.indexOf(this);
			this.gameControl.wofsArray.splice(findIndex, 1);
			if(this.parent){
				this.parent.removeChild(this);
				this.gameControl.wofsPool.push(this);
			}
		});
	}

	beHited(){
		egret.Tween.removeTweens(this);
		clearInterval(this.IntervalTimer);
		clearTimeout(this.timeoutTimer);
		this.beKilled = true;
		var findIndex = this.gameControl.wofsArray.indexOf(this);
		this.gameControl.wofsArray.splice(findIndex, 1);
		//气球爆炸
		this.ballute.visible = false;
		this.fly.visible = false;
		this.fall.visible = true;
		egret.Tween.get(this).to({scaleY:1}, 500).to({scaleY:-1, y:this.y + 200}, 0).to({y:1000, alpha:0} ,3000).call(()=>{
			this.gameControl.wofsPool.push(this);
			this.parent.removeChild(this);
		});
		this.gameControl.scoreCount++;
		this.gameControl.updateScore();
	}

	test(){
		console.log("aaa");
	}

	//狼向猪扔石头
	throwStone(){
		if(this.type == 1){
			this.throw();
		}else if(this.type == 2){
			this.IntervalTimer = setInterval(()=>{
				this.throw();
			}, 500);
		}
	}

	throw(){
		if(!this.beKilled && this.gameControl.stonesPool.length > 0){
			this.stone = this.gameControl.stonesPool.pop();
			var posStart = new egret.Point(this.x, this.y + 150);
			var random = Math.random()*200 - 15;
			var posEnd = new egret.Point(this.gameControl.pig.x + 85, this.gameControl.pig.y + random);
			var tempX = (posStart.x + posEnd.x) / 2;
			var tempY = (posStart.y + posEnd.y) / 2 -100;
			var posTemple = new egret.Point(tempX, tempY);
			this.stone.setPos(posStart, posTemple, posEnd, this.gameControl);
			this.parent.addChild(this.stone);
			this.stone.throw();
		}
	}
}

abstract class WofFSM{
	abstract handle(wof:Wof);
}

//攻击
class WofAttack extends WofFSM{
	handle(wof:Wof){
		
	}
}
//行走
class WofWalk extends WofFSM{
	handle(wof:Wof){
	}
}
//飞行
class WofFly extends WofFSM{
	handle(wof:Wof){

	}
}