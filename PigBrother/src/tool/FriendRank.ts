class FriendRank extends egret.Sprite{
	private bitmap:egret.Bitmap;
	public constructor() {
		super();
	}

	public Init():void
	{
		const bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        this.bitmap = new egret.Bitmap(texture);
        this.bitmap.width = 1334;
        this.bitmap.height = 750;
        this.addChild(this.bitmap);

        egret.startTick((timeStarmp: number) => {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
        }, this);
	}
}