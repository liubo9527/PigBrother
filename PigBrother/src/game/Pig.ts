class Pig extends eui.Component{
	gameControl:Game;
	arrowContainer = [];//猪的箭 活动的
	arrowBag:Array<Arrow> = [];//猪的箭袋 默认5支
	maxArrow = 5;
	skillType = 0;
	pigTop:eui.Image;
	pigBottom:eui.Image;
	pig:eui.Image;
	alive = true;
	public constructor() {
		super();
		this.skinName = "pig";	
	}

	setGameControl(gameControl:Game){
		this.gameControl = gameControl;
	}

	childrenCreated(){
		super.childrenCreated();
		this.init();
	}

	//
	public init(){
		GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.attack, this);
		//装填弓箭袋
		var i = 0
		while(i < 5){
			if(this.parent){
				var arrow = new Arrow(0, this);
				this.arrowBag.push(arrow);
			}	
			i++;
		}
	}

	setSkill(type){
		this.skillType = type;
	}

	private touchMove(e:egret.TouchEvent){
		this.y = e.stageY - this.height / 2;
		if(this.y > 460){
			this.y = 460;
		}else if(this.y < 80){
			this.y = 80;
		}
		this.gameControl.updateString();
	}

	private attack(){
		if(this.parent && this.arrowBag.length > 0){
			var arrow = this.arrowBag.pop();
			arrow.setType(this.skillType);
			this.parent.addChild(arrow);
			arrow.x = this.x + 100;
			arrow.y = this.y + 120;
			arrow.fire();
			this.arrowContainer.push(arrow);
			this.skillType = 0;
		}
	}

	getArrows(){
		return this.arrowContainer;
	}


	beHited(){
		if(this.alive){
			this.alive = false;
			GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
			GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.attack, this);
			var pigFall = new egret.Bitmap(RES.getRes("pigFall_png"));
			var pos = this.pig.localToGlobal(this.pig.x, this.pig.y);
			pigFall.x = pos.x - 50;
			pigFall.y = pos.y;
			this.parent.addChild(pigFall);
			this.pig.visible = false;
			egret.Tween.get(pigFall).to({y:550, x:this.x - 100}, 1000).call(()=>{
				this.gameControl.gameOVer();
			});
		}
	}	
}