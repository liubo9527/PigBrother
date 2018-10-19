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
        var _this = _super.call(this) || this;
        _this.arrowContainer = []; //猪的箭 活动的
        _this.arrowBag = []; //猪的箭袋 默认3只
        _this.arrowSpeed = 10;
        return _this;
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
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.attack, this);
        egret.startTick(this.startTick, this);
        //初始化弓箭
        var i = 0;
        while (i < 3) {
            var arrow = new egret.Bitmap(RES.getRes("arrow_png"));
            if (this.parent) {
                this.parent.addChild(arrow);
                arrow.x = this.x;
                arrow.y = this.y + 110;
                this.arrowContainer.push(arrow);
            }
            i++;
        }
    };
    Pig.prototype.touchMove = function (e) {
        this.y = e.stageY - this.height / 2;
        if (this.y > 460) {
            this.y = 460;
        }
        else if (this.y < 80) {
            this.y = 80;
        }
        this.gameControl.updateString();
    };
    Pig.prototype.attack = function () {
        if (this.parent && this.arrowBag.length > 0) {
            var arrow = this.arrowBag.pop();
            this.parent.addChild(arrow);
            arrow.x = this.x;
            arrow.y = this.y + 110;
            this.arrowContainer.push(arrow);
        }
    };
    Pig.prototype.getArrows = function () {
        return this.arrowContainer;
    };
    Pig.prototype.startTick = function (dt) {
        var _this = this;
        this.arrowContainer.forEach(function (element) {
            var arrow = element;
            arrow.x -= _this.arrowSpeed;
            //箭矢回收
            if (arrow.x < -200) {
                _this.parent.removeChild(arrow);
                var findIndex = _this.arrowContainer.indexOf(arrow);
                _this.arrowContainer.splice(findIndex, 1);
                _this.arrowBag.push(arrow);
            }
        });
        return false;
    };
    return Pig;
}(eui.Component));
__reflect(Pig.prototype, "Pig");
//# sourceMappingURL=Pig.js.map