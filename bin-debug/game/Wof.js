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
var Wof = (function (_super) {
    __extends(Wof, _super);
    function Wof(type, gameControl) {
        var _this = _super.call(this) || this;
        _this.walkSpeed = 120;
        _this.flySpeed = 60;
        _this.skinName = "wof";
        _this.type = type;
        _this.gameControl = gameControl;
        return _this;
    }
    Wof.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setWofState(0);
        this.x = -100;
        this.y = -60;
    };
    Wof.prototype.setInit = function () {
        this.setWofState(0);
        this.x = -100;
        this.y = -60;
        this.alpha = 1;
        this.autoMove();
    };
    Wof.prototype.setWofState = function (state) {
        if (state == this.stage) {
            return;
        }
        this.state = state;
        if (this.state == 0) {
            this.walk.visible = true;
            this.flyGroup.visible = false;
        }
        else if (this.state == 1) {
            this.walk.visible = false;
            this.flyGroup.visible = true;
        }
    };
    Wof.prototype.autoMove = function () {
        var _this = this;
        egret.Tween.removeTweens(this);
        var randomTop = Math.floor(Math.random() * 600) + 128;
        var topWalkTime = 1000 * randomTop / this.walkSpeed;
        var flyTime = 1000 * 650 / this.flySpeed;
        var bottomTime = 1000 * (1400 - randomTop) / this.walkSpeed;
        egret.Tween.get(this).to({ x: randomTop }, topWalkTime).call(function () {
            _this.setWofState(1);
        }).to({ y: 590 }, flyTime).call(function () {
            _this.setWofState(0);
        }).to({ x: 1400 }, bottomTime).call(function () {
            var findIndex = _this.gameControl.wofsArray.indexOf(_this);
            _this.gameControl.wofsArray.splice(findIndex, 1);
            if (_this.parent) {
                _this.parent.removeChild(_this);
                _this.gameControl.wofsPool.push(_this);
            }
        });
    };
    Wof.prototype.beHited = function () {
        var _this = this;
        egret.Tween.removeTweens(this);
        this.setWofState(0);
        var findIndex = this.gameControl.wofsArray.indexOf(this);
        this.gameControl.wofsArray.splice(findIndex, 1);
        egret.Tween.get(this).to({ y: 1000, alpha: 0 }, 3000).call(function () {
            _this.gameControl.wofsPool.push(_this);
            _this.parent.removeChild(_this);
        });
    };
    //狼向猪扔石头
    Wof.prototype.throwStone = function () {
    };
    return Wof;
}(eui.Component));
__reflect(Wof.prototype, "Wof");
//# sourceMappingURL=Wof.js.map