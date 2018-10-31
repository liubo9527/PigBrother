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
        _this.arrowBag = []; //猪的箭袋 默认5支
        _this.maxArrow = 5;
        _this.skillType = 0;
        _this.alive = true;
        _this.skinName = "pig";
        return _this;
    }
    Pig.prototype.setGameControl = function (gameControl) {
        this.gameControl = gameControl;
    };
    Pig.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    //
    Pig.prototype.init = function () {
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.attack, this);
        //装填弓箭袋
        var i = 0;
        while (i < 5) {
            if (this.parent) {
                var arrow = new Arrow(0, this);
                this.arrowBag.push(arrow);
            }
            i++;
        }
    };
    Pig.prototype.setSkill = function (type) {
        this.skillType = type;
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
            arrow.setType(this.skillType);
            this.parent.addChild(arrow);
            arrow.x = this.x + 100;
            arrow.y = this.y + 120;
            arrow.fire();
            this.arrowContainer.push(arrow);
            this.skillType = 0;
        }
    };
    Pig.prototype.getArrows = function () {
        return this.arrowContainer;
    };
    Pig.prototype.beHited = function () {
        var _this = this;
        if (this.alive) {
            this.alive = false;
            GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.attack, this);
            var pigFall = new egret.Bitmap(RES.getRes("pigFall_png"));
            var pos = this.pig.localToGlobal(this.pig.x, this.pig.y);
            pigFall.x = pos.x - 50;
            pigFall.y = pos.y;
            this.parent.addChild(pigFall);
            this.pig.visible = false;
            egret.Tween.get(pigFall).to({ y: 550, x: this.x - 100 }, 1000).call(function () {
                _this.gameControl.gameOVer();
            });
        }
    };
    return Pig;
}(eui.Component));
__reflect(Pig.prototype, "Pig");
//# sourceMappingURL=Pig.js.map