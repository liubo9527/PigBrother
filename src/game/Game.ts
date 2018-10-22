class Game extends eui.Component {
	collisionGroup:eui.Group;//碰撞层活动层
	pig:Pig;
	pigString:eui.Image;
	wofsArray = [];//所有的狼
	public constructor() {
		super();
		this.skinName = "gameComponent";
	}
	childrenCreated(){
		super.childrenCreated();
		this.gameInit();
	}

	gameInit(){
		this.pig.setGameControl(this);
		var wof:Wof = new Wof(0, this.wofsArray);
		this.collisionGroup.addChild(wof);

		//
		egret.startTick(this.startTic, this)
	}
	//更新绳子的长度
	updateString(){
		var length = this.pig.y - this.pigString.y;
		this.pigString.height = length + 10;
	}

	//碰撞检测
	startTic(dt){
		this.wofsArray.forEach(element => {
			this.pig.hitWofTest(element);
		});

		return false;
	}
}