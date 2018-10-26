class GameConst {
	public static stage:egret.Stage;

	public static isWeiXin():boolean
    {
        var ua:string = navigator.userAgent.toString();
        var str:any = ua.match(/MicroMessenger/i);
        if(str=="MicroMessenger") {
             return true;
         } else {
               return false;
         }
 
    }
}