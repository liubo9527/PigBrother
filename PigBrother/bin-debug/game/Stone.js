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
var Stone = (function (_super) {
    __extends(Stone, _super);
    function Stone(s) {
        var _this = _super.call(this, s) || this;
        _this.active = true;
        return _this;
    }
    Object.defineProperty(Stone.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (value) {
            this.x = (1 - value) * (1 - value) * this.posStart.x + 2 * value * (1 - value) * this.posTemple.x + value * value * this.posEnd.x;
            this.y = (1 - value) * (1 - value) * this.posStart.y + 2 * value * (1 - value) * this.posTemple.y + value * value * this.posEnd.y;
        },
        enumerable: true,
        configurable: true
    });
    Stone.prototype.setPos = function (posStart, posTemple, posEnd, gameControl) {
        this.posStart = posStart;
        this.posTemple = posTemple;
        this.posEnd = posEnd;
        this.gameControl = gameControl;
    };
    Stone.prototype.throw = function () {
        var _this = this;
        egret.Tween.get(this).to({ factor: 2 }, 3000).call(function () {
            egret.Tween.removeTweens(_this);
            _this.parent.removeChild(_this);
            egret.stopTick(_this.start, _this);
            _this.gameControl.stonesPool.push(_this);
        });
        egret.startTick(this.start, this);
    };
    Stone.prototype.hitTest = function () {
        var _this = this;
        if ((GameConst.crossTest(this.gameControl.pig.pigTop, this)
            || GameConst.crossTest(this.gameControl.pig.pigBottom, this)) && this.active) {
            egret.Tween.removeTweens(this);
            this.active = false;
            egret.Tween.get(this).to({ x: this.x - 50, y: this.y + 1000 }, 2000).call(function () {
                _this.parent.removeChild(_this);
                egret.stopTick(_this.start, _this);
                _this.active = true;
                _this.gameControl.stonesPool.push(_this);
            });
        }
        else if (GameConst.crossTest(this.gameControl.pig.pig, this) && this.active) {
            this.active = false;
            this.gameControl.pig.beHited();
        }
    };
    Stone.prototype.start = function (dt) {
        this.hitTest();
        return false;
    };
    return Stone;
}(egret.Bitmap));
__reflect(Stone.prototype, "Stone");
//# sourceMappingURL=Stone.js.map