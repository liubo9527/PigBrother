var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConst = (function () {
    function GameConst() {
    }
    GameConst.isWeiXin = function () {
        var ua = navigator.userAgent.toString();
        var str = ua.match(/MicroMessenger/i);
        if (str == "MicroMessenger") {
            return true;
        }
        else {
            return false;
        }
    };
    GameConst.crossTest = function (object1, object2) {
        if (!this.rect1) {
            this.rect1 = new egret.Rectangle();
        }
        if (!this.rect2) {
            this.rect2 = new egret.Rectangle();
        }
        object1.getTransformedBounds(GameConst.stage, this.rect1);
        object2.getTransformedBounds(GameConst.stage, this.rect2);
        if (this.rect1.intersects(this.rect2)) {
            return true;
        }
        else {
            return false;
        }
    };
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
//# sourceMappingURL=GameConst.js.map