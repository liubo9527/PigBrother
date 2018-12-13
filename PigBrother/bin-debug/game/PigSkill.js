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
var PigSkill = (function (_super) {
    __extends(PigSkill, _super);
    function PigSkill(pig) {
        var _this = _super.call(this) || this;
        _this.skillOpen = false;
        _this.currentSkill = 0;
        _this.skinName = "pigSkill";
        _this.pig = pig;
        return _this;
    }
    PigSkill.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        setInterval(function () {
            _this.createSkill();
        }, 5000);
    };
    PigSkill.prototype.createSkill = function () {
        this.skillOpen = true;
        this.bone.visible = true;
        var randSkill = Math.round(Math.random() + 1);
        if (randSkill == 1) {
            this.bone.visible = true;
            this.boom.visible = false;
        }
        else {
            this.boom.visible = true;
            this.bone.visible = false;
        }
        this.currentSkill = randSkill;
        egret.startTick(this.startTic, this);
    };
    PigSkill.prototype.startTic = function (dt) {
        if (this.pig.hitTestPoint(this.x, this.y)) {
            egret.stopTick(this.startTic, this);
            this.pig.setSkill(this.currentSkill);
            this.boom.visible = false;
            this.bone.visible = false;
        }
        return false;
    };
    return PigSkill;
}(eui.Component));
__reflect(PigSkill.prototype, "PigSkill");
//# sourceMappingURL=PigSkill.js.map