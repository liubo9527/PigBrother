class Wof extends eui.Component{
	walk:eui.Image;
	flyGroup:eui.Group;
	ballute:eui.Image;
	state:0;//0 walk 1 air
	type;//1boss default 0 渣
	walkSpeed = 2;
	flySpeed = 1;
	allWofs:Array<any>;
	randomLength:Number;
	public constructor(type, array) {
		super();
		this.skinName = "wof";
		this.type = type;
		array.push(this);
		this.allWofs = array;
	}
	childrenCreated(){
		super.childrenCreated();
		this.setWofState(1);
		this.x = -100;
		this.y = - 60;
		this.x = this.y = 300;
		//this.autoMove();
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
		this.randomLength = Math.floor(Math.random()*600) + 128;
		egret.startTick(this.start, this);
	}

	start(dt){
		if(this.y == -60){
			this.x += this.walkSpeed;
			if(this.x >= this.randomLength){
				this.y += this.flySpeed;
			}
		}else if(this.y > -60 && this.y < 590){
			this.setWofState(1);
			this.y += this.flySpeed;
		}else if(this.y >= 590){
			this.setWofState(0);
			this.x += this.walkSpeed;
			if(this.x > 1400){
				var findIndex = this.allWofs.indexOf(this);
				this.allWofs.splice(findIndex, 1);
				if(this.parent){
					this.parent.removeChild(this);
				}
			}
		}
		return false;
	}
}