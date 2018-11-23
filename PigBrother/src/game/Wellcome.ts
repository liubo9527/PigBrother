class Wellcome extends eui.Component {
	login:boolean = false;
	private _rankBit:egret.Bitmap;
	public constructor() {
		super();
		this.skinName = "wellcome";
	}

	childrenCreated(){
		super.childrenCreated();
		//调登录
		if(GameConst.isWeiXin()){
			platform.sendShareData({command:"load"});
			platform.login().then((res)=>{
				console.log("ergert:res"+JSON.stringify(res));
				if(res.errMsg == "getUserInfo:ok"){//已经登录成功
					this.login = true;
					//存储解析json
					var user = {
						code: res.code,
						encryptedData: res.encryptedData,
						iv: res.iv,
						nickName: res.userInfo.nickName,
						gender: res.userInfo.gender,
						city: res.userInfo.city,
						province: res.userInfo.Promise,
						country: res.country,
						avatarUrl: res.userInfo.avatarUrl
                    }
					GameData.getInstance().user = user;
					this.loadIM();
				}//登录失败doNoting
			});
		}else{
			this.login = true;
		}
		
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

		//
		var firendRank = new Button();
		firendRank.Init("friendRank_png", "", (param)=>{
			this.friendRank();
		}, "firendRank");
		firendRank.x =  1356 / 2;
		firendRank.y = 600;
		this.addChild(firendRank);
	}

	loadIM(){
		var imageLoader:egret.ImageLoader = new egret.ImageLoader();
		imageLoader.addEventListener(egret.Event.COMPLETE, this.loadComplete, this);
		imageLoader.load(GameData.getInstance().user.avatarUrl);
	}

	loadComplete(e:egret.Event){
		let texture = new egret.Texture();
		texture._setBitmapData((e.currentTarget as egret.ImageLoader).data);
		var bitmap = new egret.Bitmap(texture);
		this.addChild(bitmap);
	}

	private friendRank():void
	{
		//this._rankMask.visible=true;
		platform.sendShareData({command:"open",type:"friend"});
		this._rankBit = platform.openDataContext.createDisplayObject(null,1334, 750);
		this._rankBit.touchEnabled=true;
		this._rankBit.pixelHitTest=true;
		this.addChild(this._rankBit);
		//this._rankMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMask,this);
	}
}