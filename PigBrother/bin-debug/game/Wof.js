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
        _this.beKilled = false;
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
        this.beKilled = false;
        this.fly.visible = true;
        this.fall.visible = false;
        this.scaleY = 1;
        //
        var random = Math.round(Math.random() * 10);
        if (random <= 3) {
            this.type = 1;
            this.ballute = this.ballute1;
        }
        else if (random >= 7) {
            this.type = 2;
            this.ballute = this.ballute2;
        }
        else {
            this.type = 0;
            this.ballute = this.ballute0;
        }
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
            this.ballute0.visible = false;
            this.ballute1.visible = false;
            this.ballute2.visible = false;
            this.ballute.visible = true;
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
            if (_this.type != 0) {
                var time = Math.random() * flyTime;
                _this.timeoutTimer = setTimeout(function () {
                    _this.throwStone();
                }, time);
            }
        }).to({ y: 590 }, flyTime).call(function () {
            if (_this.type == 2) {
                clearInterval(_this.IntervalTimer);
            }
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
        clearInterval(this.IntervalTimer);
        clearTimeout(this.timeoutTimer);
        this.beKilled = true;
        var findIndex = this.gameControl.wofsArray.indexOf(this);
        this.gameControl.wofsArray.splice(findIndex, 1);
        //气球爆炸
        this.ballute.visible = false;
        this.fly.visible = false;
        this.fall.visible = true;
        egret.Tween.get(this).to({ scaleY: 1 }, 500).to({ scaleY: -1, y: this.y + 200 }, 0).to({ y: 1000, alpha: 0 }, 3000).call(function () {
            _this.gameControl.wofsPool.push(_this);
            _this.parent.removeChild(_this);
        });
        this.gameControl.scoreCount++;
        this.gameControl.updateScore();
        //t
    };
    //狼向猪扔石头
    Wof.prototype.throwStone = function () {
        var _this = this;
        if (this.type == 1) {
            this.throw();
        }
        else if (this.type == 2) {
            this.IntervalTimer = setInterval(function () {
                _this.throw();
            }, 500);
        }
    };
    Wof.prototype.throw = function () {
        if (!this.beKilled && this.gameControl.stonesPool.length > 0) {
            this.stone = this.gameControl.stonesPool.pop();
            var posStart = new egret.Point(this.x, this.y + 150);
            var random = Math.random() * 200 - 15;
            var posEnd = new egret.Point(this.gameControl.pig.x + 85, this.gameControl.pig.y + random);
            var tempX = (posStart.x + posEnd.x) / 2;
            var tempY = (posStart.y + posEnd.y) / 2 - 100;
            var posTemple = new egret.Point(tempX, tempY);
            this.stone.setPos(posStart, posTemple, posEnd, this.gameControl);
            this.parent.addChild(this.stone);
            this.stone.throw();
        }
    };
    return Wof;
}(eui.Component));
__reflect(Wof.prototype, "Wof");
//# sourceMappingURL=Wof.js.map