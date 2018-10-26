class Wellcome extends eui.Component {
	login:boolean = false;
	public constructor() {
		super();
		this.skinName = "wellcome";
	}

	childrenCreated(){
		super.childrenCreated();
		//调登录
		platform.login().then((res)=>{
			console.log("ergert:res"+JSON.stringify(res));
			if(res.errMsg == "getUserInfo:ok"){//已经登录成功
				this.login = true;
			}//登录失败doNoting
		});

		var startButton = new Button();
		startButton.Init("start_png", "", (param)=>{
			if(this.login){
				var game = new Game();
				this.parent.addChild(game);
				this.parent.removeChild(this);
			}
		},"start");
		startButton.x = 1336 / 2;
		startButton.y = 400;
		this.addChild(startButton);
	}
}