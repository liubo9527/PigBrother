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
var Arrow = (function (_super) {
    __extends(Arrow, _super);
    function Arrow(type, pig) {
        var _this = _super.call(this) || this;
        _this.type = 0;
        _this.speed = 1;
        _this.skinName = 'arrow';
        _this.pig = pig;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        _this.anchorOffsetY = 100;
        _this.setType(type);
        return _this;
    }
    Arrow.prototype.setType = function (type) {
        if (this.type == type) {
            return;
        }
        this.type = type;
        if (this.type == 0) {
            this.boom.visible = false;
            this.bone.visible = false;
            this.arrow.visible = true;
        }
        else if (this.type == 1) {
            this.boom.visible = false;
            this.bone.visible = true;
            this.arrow.visible = false;
        }
        else if (this.type == 2) {
            this.boom.visible = true;
            this.bone.visible = false;
            this.arrow.visible = false;
        }
    };
    Arrow.prototype.onAdd = function (e) {
        egret.startTick(this.startTick, this);
    };
    Arrow.prototype.onRemove = function (e) {
        egret.stopTick(this.startTick, this);
    };
    Arrow.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Object.defineProperty(Arrow.prototype, "factor", {
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
    Arrow.prototype.setPos = function (posStart, posTemple, posEnd) {
        this.posStart = posStart;
        this.posTemple = posTemple;
        this.posEnd = posEnd;
    };
    Arrow.prototype.fire = function () {
        var _this = this;
        var x, y, distance, rotation;
        if (this.type == 0) {
            x = -300;
            distance = this.x - x;
            y = distance / 20 + this.y;
            rotation = -Math.atan(0.05) * 180 / 3.14;
        }
        else if (this.type == 1) {
            x = 200;
            distance = 1600;
            y = 750;
            rotation = -45;
        }
        var posStart = new egret.Point(this.x, this.y);
        var posEnd = new egret.Point(x, y);
        var tempX, tempY, factor;
        if (this.type == 0) {
            tempX = (posStart.x + posEnd.x) / 2;
            tempY = (posStart.y + posEnd.y) / 2 - 100;
            factor = 1;
        }
        else if (this.type == 1) {
            tempX = 100;
            tempY = 200;
            factor = 1;
        }
        var posTemple = new egret.Point(tempX, tempY);
        this.setPos(posStart, posTemple, posEnd);
        var time = distance / this.speed;
        if (this.type == 2) {
            egret.Tween.get(this).to({ x: -300 }, 10000).call(function () {
                _this.parent.removeChild(_this);
                _this.setType(0);
                _this.pig.arrowBag.push(_this);
            });
        }
        else {
            egret.Tween.get(this).to({ x: -300, y: y, rotation: rotation, factor: factor }, time).call(function () {
                //回收箭矢
                _this.rotation = 0;
                _this.parent.removeChild(_this);
                _this.setType(0);
                _this.pig.arrowBag.push(_this);
            });
        }
    };
    Arrow.prototype.startTick = function (dt) {
        //碰撞检测
        this.hitWofTest();
        return false;
    };
    Arrow.prototype.hitWofTest = function () {
        var _this = this;
        this.pig.gameControl.wofsArray.forEach(function (element) {
            var wof = element;
            if (_this.type == 0) {
                var hitBallute = wof.ballute.hitTestPoint(_this.x, _this.y);
                var hitWof = wof.fly.hitTestPoint(_this.x, _this.y);
                //var hitBallute = GameConst.crossTest(wof.ballute, this);
                //var hitWof = GameConst.crossTest(wof.fly, this);
                if (hitBallute) {
                    wof.beHited();
                }
                if (hitWof) {
                    _this.hitWofBody();
                }
            }
            else if (_this.type == 1) {
                if (GameConst.crossTest(wof, _this.arrow)) {
                    wof.beHited();
                }
            }
            else if (_this.type == 2) {
                if (GameConst.crossTest(wof, _this)) {
                    wof.beHited();
                }
            }
        });
    };
    Arrow.prototype.hitWofBody = function () {
        var _this = this;
        //停止碰撞检测
        egret.stopTick(this.startTick, this);
        egret.Tween.removeTweens(this);
        var findIndex = this.pig.arrowContainer.indexOf(this);
        this.pig.arrowContainer.splice(findIndex, 1);
        egret.Tween.get(this).to({ x: this.x + 5, y: this.y + 20, rotation: -30 }, 30).to({ x: this.x + 30, y: 1000, alpha: 0, rotation: -90 }, 1000).call(function () {
            _this.alpha = 1;
            _this.rotation = 0;
            _this.parent.removeChild(_this);
            _this.setType(0);
            _this.pig.arrowBag.push(_this);
        });
    };
    return Arrow;
}(eui.Component));
__reflect(Arrow.prototype, "Arrow");
//# sourceMappingURL=Arrow.js.map