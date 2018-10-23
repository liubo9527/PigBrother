class Wof extends eui.Component{
	walk:eui.Image;
	flyGroup:eui.Group;
	fly:eui.Image;
	ballute:eui.Image;
	state:0;//0 walk 1 air
	type;//1boss default 0 渣
	walkSpeed = 120;
	flySpeed = 60;
	gameControl:Game;
	randomLength:Number;
	public constructor(type, gameControl) {
		super();
		this.skinName = "wof";
		this.type = type;
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
		}).to({y:590} ,flyTime).call(()=>{
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
		this.setWofState(0);
		var findIndex = this.gameControl.wofsArray.indexOf(this);
		this.gameControl.wofsArray.splice(findIndex, 1);
		egret.Tween.get(this).to({y:1000, alpha:0} ,3000).call(()=>{
			this.gameControl.wofsPool.push(this);
			this.parent.removeChild(this);
		});
	}

	//狼向猪扔石头
	throwStone(){

	}
}