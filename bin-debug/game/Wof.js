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
    function Wof(type) {
        var _this = _super.call(this) || this;
        _this.wofSpeed = 3;
        _this.skinName = "wof";
        _this.type = type;
        _this.setState(0);
        return _this;
    }
    Wof.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setState(0);
        this.x = -100;
        this.y = -60;
        this.autoMove();
    };
    Wof.prototype.setState = function (state) {
        this.state = state;
        if (this.state == 0) {
            this.walk.visible = true;
            this.flyGroup.visible = false;
        }
        else if (this.state == 1) {
            this.walk.visible = false;
            this.flyGroup.visible = true;
        }
        this.autoMove();
    };
    Wof.prototype.autoMove = function () {
        var _this = this;
        var randomLength = Math.floor(Math.random() * 600) + 128;
        egret.Tween.get(this).to({ x: randomLength }, 3000).call(function () {
            _this.setState(1);
            egret.startTick(_this.start, _this);
        });
    };
    Wof.prototype.start = function (dt) {
        this.y += this.wofSpeed;
        return false;
    };
    return Wof;
}(eui.Component));
__reflect(Wof.prototype, "Wof");
//# sourceMappingURL=Wof.js.map