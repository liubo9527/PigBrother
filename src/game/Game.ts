class Game extends eui.Component {
	collisionGroup:eui.Group;//碰撞层活动层
	pig:Pig;
	pigString:eui.Image;
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
		var wof:Wof = new Wof(0);
		this.collisionGroup.addChild(wof);
	}
	//更新绳子的长度
	updateString(){
		var length = this.pig.y - this.pigString.y;
		this.pigString.height = length + 10;
	}

	
 	playAnimation(target:egret.tween.TweenGroup,isLoop:boolean):void
	{
		if(isLoop)
		{
			for(var key in target.items)
			{
				target.items[key].props = {loop:true};
			}
		}
		target.play();
	}
	
}