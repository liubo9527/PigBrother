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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.wofsArray = []; //所有的狼
        _this.skinName = "gameComponent";
        return _this;
    }
    Game.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.gameInit();
    };
    Game.prototype.gameInit = function () {
        this.pig.setGameControl(this);
        var wof = new Wof(0, this.wofsArray);
        this.collisionGroup.addChild(wof);
        //
        egret.startTick(this.startTic, this);
    };
    //更新绳子的长度
    Game.prototype.updateString = function () {
        var length = this.pig.y - this.pigString.y;
        this.pigString.height = length + 10;
    };
    //碰撞检测
    Game.prototype.startTic = function (dt) {
        var _this = this;
        this.wofsArray.forEach(function (element) {
            _this.pig.hitWofTest(element);
        });
        return false;
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map