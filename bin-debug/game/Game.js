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
        _this.wofsArray = []; //所有的狼 活动的
        _this.wofsPool = [];
        _this.stonesPool = [];
        _this.scoreCount = 0;
        _this.skinName = "gameComponent";
        return _this;
    }
    Game.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.gameInit();
    };
    Game.prototype.gameInit = function () {
        for (var i = 0; i < 10; i++) {
            var wof = new Wof(0, this);
            this.wofsPool.push(wof);
            //初始化石头pool
            var stone = new Stone(RES.getRes("stone_png"));
            this.stonesPool.push(stone);
        }
        this.pig.setGameControl(this);
        this.timer = new egret.Timer(2000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.createWof, this);
        this.timer.start();
    };
    Game.prototype.createWof = function (dt) {
        var wof;
        if (this.wofsPool.length > 0) {
            wof = this.wofsPool.pop();
        }
        else {
            wof = new Wof(0, this);
        }
        wof.setInit();
        this.wofsArray.push(wof);
        this.collisionGroup.addChild(wof);
    };
    //更新绳子的长度
    Game.prototype.updateString = function () {
        var length = this.pig.y - this.pigString.y;
        this.pigString.height = length + 10;
    };
    Game.prototype.updateScore = function () {
        this.score.text = "杀了" + this.scoreCount + "匹狼";
    };
    Game.prototype.gameOVer = function () {
        this.scoreGroup.visible = true;
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map