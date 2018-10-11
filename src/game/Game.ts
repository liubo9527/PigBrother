class Game extends eui.Component {
	collisionGroup:eui.Group;//碰撞层活动层
	public constructor() {
		super();
		this.skinName = "gameComponent";
	}
	childrenCreated(){
		super.childrenCreated();
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