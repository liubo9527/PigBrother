class GameConst {
    public static rect1:egret.Rectangle;
    public static rect2:egret.Rectangle;
	public static stage:egret.Stage;
	public static isWeiXin():boolean
    {
        var ua:string = navigator.userAgent.toString();
        var str:any = ua.match(/MicroMessenger/i);
        if(str == "MicroMessenger") {
             return true;
         } else {
               return false;
         }
    }

    public static crossTest(object1:egret.DisplayObject, object2:egret.DisplayObject){
        if(!this.rect1){
            this.rect1 = new egret.Rectangle();
        }
        if(!this.rect2){
            this.rect2 = new egret.Rectangle();
        }
        object1.getTransformedBounds(GameConst.stage, this.rect1);
        object2.getTransformedBounds(GameConst.stage, this.rect2);
        if(this.rect1.intersects(this.rect2)){
            return true;
        }else{
            return false;
        }
    }

}