class Pig extends eui.Component{
	gameControl:Game;
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
	}
	private touchMove(e:egret.TouchEvent){
		this.y = e.stageY - this.height / 2;
		if(this.y > 460){
			this.y = 460;
		}else if(this.y < 80){
			this.y = 80;
		}
	}
}