var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Pig = (function (_super) {
    __extends(Pig, _super);
    function Pig() {
        return _super.call(this) || this;
    }
    Pig.prototype.setGameControl = function (gameControl) {
        this.gameControl = gameControl;
    };
    Pig.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.skinName = "pig";
        this.init();
    };
    //
    Pig.prototype.init = function () {
        //this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this);
    };
    Pig.prototype.touchMove = function (e) {
        this.y = e.stageY - this.height / 2;
        if (this.y > 460) {
            this.y = 460;
        }
        else if (this.y < 80) {
            this.y = 80;
        }
    };
    return Pig;
}(eui.Component));
__reflect(Pig.prototype, "Pig");
//# sourceMappingURL=Pig.js.map