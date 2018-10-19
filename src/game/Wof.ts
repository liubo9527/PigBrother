class Wof extends eui.Component{
	walk:eui.Image;
	flyGroup:eui.Group;
	ballute:eui.Image;
	state:0;//0 walk 1 air
	type;//1boss default 0 渣
	wofSpeed = 3;
	public constructor(type) {
		super();
		this.skinName = "wof";
		this.type = type;
		this.setState(0);
	}
	childrenCreated(){
		super.childrenCreated();
		this.setState(0);
		this.x = -100;
		this.y = - 60;
		this.autoMove();
	}

	setState(state){
		this.state = state;
		if(this.state == 0){
			this.walk.visible = true;
			this.flyGroup.visible = false;
		}else if(this.state == 1){
			this.walk.visible = false;
			this.flyGroup.visible = true;
		}
		this.autoMove();
	}

	autoMove(){
		var randomLength = Math.floor(Math.random()*600) + 128;
		egret.Tween.get(this).to({x:randomLength}, 3000).call(()=>{
			this.setState(1);
			egret.startTick(this.start, this);
		});
	}

	start(dt){
		this.y += this.wofSpeed;
		return false; 
	}
}