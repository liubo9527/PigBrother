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
        _this.skinName = "gameComponent";
        _this.type = type;
        return _this;
    }
    Wof.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setState(0);
    };
    Wof.prototype.setState = function (state) {
        this.state = state;
        if (this.state == 0) {
            this.walk.visible = true;
            this.ballute.visible = false;
            this.fly.visible = false;
        }
        else if (this.state == 1) {
            this.walk.visible = false;
            this.ballute.visible = true;
            this.fly.visible = true;
        }
    };
    return Wof;
}(eui.Component));
__reflect(Wof.prototype, "Wof");
//# sourceMappingURL=Wof.js.map