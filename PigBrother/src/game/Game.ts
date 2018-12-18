class Game extends eui.Component {
	collisionGroup:eui.Group;//碰撞层活动层
	pig:Pig;
	pigString:eui.Image;
	wofsArray = [];//所有的狼 活动的
	wofsPool = [];
	stonesPool = [];
	timer:egret.Timer;
	scoreGroup:eui.Group;
	score:eui.Label;
	scoreCount = 0;
	pigSkill:PigSkill;
	public constructor() {
		super();
		this.skinName = "gameComponent";
	}
	childrenCreated(){
		super.childrenCreated();
		this.gameInit();
	}

	gameInit(){
		for(var i =0; i < 10; i++){
			var wof:Wof = new Wof(new WofWalk(), this);
			this.wofsPool.push(wof);
			//初始化石头pool
			var stone:Stone = new Stone(RES.getRes("stone_png"));
			this.stonesPool.push(stone);
		}
		this.pig = new Pig();
		this.pig.x = 964;
		this.pig.y = 77;
		this.pig.setGameControl(this);
		this.collisionGroup.addChild(this.pig);
		//技能
		
		this.pigSkill = new PigSkill(this.pig);
		this.pigSkill.x = 1020;
		this.pigSkill.y = 90;
		this.collisionGroup.addChild(this.pigSkill);

		this.timer = new egret.Timer(2000, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.createWof, this);
		this.timer.start();

		var restartBt = new Button();
		restartBt.Init("start_png", "", (param)=>{
			this.scoreGroup.visible = false;
			this.reStart();
		}, 2);
		restartBt.x =300;
		restartBt.y = 300;
		restartBt.scaleX = restartBt.scaleY = 0.5;
		this.scoreGroup.addChild(restartBt);
	}

	createWof(dt){
		var wof:Wof;
		if(this.wofsPool.length > 0){
			wof = this.wofsPool.pop();
		}else{
			wof = new Wof(new WofWalk(), this);
		}
		wof.setInit();
		this.wofsArray.push(wof);	
		this.collisionGroup.addChild(wof);
	}

	//更新绳子的长度
	updateString(){
		var length = this.pig.y - this.pigString.y;
		this.pigString.height = length + 10;
	}

	updateScore(){
		this.score.text = "杀了"+ this.scoreCount+"匹狼";
	}

	gameOVer(){
		this.scoreGroup.visible = true;
	}

	reStart(){
		this.parent.addChild(new Game());
		this.parent.removeChild(this);	
		
		//========
	}
}
