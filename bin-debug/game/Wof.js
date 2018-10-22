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
    function Wof(type, array) {
        var _this = _super.call(this) || this;
        _this.walkSpeed = 2;
        _this.flySpeed = 1;
        _this.skinName = "wof";
        _this.type = type;
        array.push(_this);
        _this.allWofs = array;
        return _this;
    }
    Wof.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setWofState(1);
        this.x = -100;
        this.y = -60;
        this.x = this.y = 300;
        //this.autoMove();
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
        this.randomLength = Math.floor(Math.random() * 600) + 128;
        egret.startTick(this.start, this);
    };
    Wof.prototype.start = function (dt) {
        if (this.y == -60) {
            this.x += this.walkSpeed;
            if (this.x >= this.randomLength) {
                this.y += this.flySpeed;
            }
        }
        else if (this.y > -60 && this.y < 590) {
            this.setWofState(1);
            this.y += this.flySpeed;
        }
        else if (this.y >= 590) {
            this.setWofState(0);
            this.x += this.walkSpeed;
            if (this.x > 1400) {
                var findIndex = this.allWofs.indexOf(this);
                this.allWofs.splice(findIndex, 1);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }
        }
        return false;
    };
    return Wof;
}(eui.Component));
__reflect(Wof.prototype, "Wof");
//# sourceMappingURL=Wof.js.map