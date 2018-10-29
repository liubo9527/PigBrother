class PigSkill extends eui.Component{
	skillOpen = false;
	pig:Pig;
	stone:eui.Image;
	boom:eui.Image;
	currentSkill = 0;
	public constructor(pig:Pig) {
		super();
		this.skinName = "pigSkill";
		this.pig = pig;
	}

	childrenCreated(){
		super.childrenCreated();
		setInterval(()=>{	
			this.createSkill();
		}, 5000);
	}

	createSkill(){
		this.skillOpen = true;
		this.stone.visible = true;
		var randSkill = Math.round(Math.random() + 1);
		if(randSkill == 1){
			this.stone.visible = true;
			this.boom.visible = false;
		}else{
			this.boom.visible = true;
			this.stone.visible = false;
		}
		this.currentSkill = randSkill;
		egret.startTick(this.startTic, this);
	}

	startTic(dt){
		if(this.pig.hitTestPoint(this.x, this.y)){
			egret.stopTick(this.startTic, this);
			this.pig.setSkill(this.currentSkill);
			this.boom.visible = false;
			this.stone.visible = false;
		}
		return false;
	}

}