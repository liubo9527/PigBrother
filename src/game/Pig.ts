class Pig extends eui.Component{
	time:number;
	gameControl:Game;
	arrowContainer = [];//猪的箭 活动的
	arrowBag:Array<egret.Bitmap> = [];//猪的箭袋 默认3只
	arrowSpeed = 10;
	public constructor() {
		super();	
	}

	setGameControl(gameControl:Game){
		this.gameControl = gameControl;
	}

	childrenCreated(){
		super.childrenCreated();
		this.skinName = "pig";
		this.init();
	}

	//
	private init(){
		//this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		//this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.attack, this);

		egret.startTick(this.startTick, this);
		//初始化弓箭
		var i = 0
		while(i < 3){
			var arrow = new egret.Bitmap(RES.getRes("arrow_png"));
			if(this.parent){
				this.parent.addChild(arrow);
				arrow.x = this.x;
				arrow.y = this.y + 110;
				this.arrowContainer.push(arrow);
			}	
			i++;
		}
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
			this.parent.addChild(arrow);
			arrow.x = this.x;
			arrow.y = this.y + 110;
			this.arrowContainer.push(arrow);
		}
	}

	getArrows(){
		return this.arrowContainer;
	}

	startTick(dt){
		this.arrowContainer.forEach(element => {
			var arrow:eui.Image = element;
			arrow.x -= this.arrowSpeed;
			//箭矢回收
			if(arrow.x < - 200){
				this.parent.removeChild(arrow);
				var findIndex = this.arrowContainer.indexOf(arrow);
				this.arrowContainer.splice(findIndex, 1);
				this.arrowBag.push(arrow);
			}
		});
		return false;
	}

	hitWofTest(wof:Wof){
		this.arrowContainer.forEach(element => {
			var arrow:egret.Bitmap = element;
			var point:egret.Point = wof.ballute.globalToLocal(arrow.x,  arrow.y);
			var flag = wof.ballute.hitTestPoint(point.x, point.y);
			console.log(flag+"x:"+point.x+"y:"+point.y);
		});
	}

}