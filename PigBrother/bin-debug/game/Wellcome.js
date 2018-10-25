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
var Wellcome = (function (_super) {
    __extends(Wellcome, _super);
    function Wellcome() {
        var _this = _super.call(this) || this;
        _this.skinName = "wellcome";
        return _this;
    }
    Wellcome.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Wellcome;
}(eui.Component));
__reflect(Wellcome.prototype, "Wellcome");
//# sourceMappingURL=Wellcome.js.map