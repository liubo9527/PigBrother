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
        var _this = this;
        for (var i = 0; i < 10; i++) {
            var wof = new Wof(0, this);
            this.wofsPool.push(wof);
            //初始化石头pool
            var stone = new Stone(RES.getRes("stone_png"));
            this.stonesPool.push(stone);
        }
        this.pig = new Pig();
        this.pig.x = 964;
        this.pig.y = 77;
        this.pig.setGameControl(this);
        this.collisionGroup.addChild(this.pig);
        //技能
        this.pigSkill = new PigSkill(this.pig);
        this.pigSkill.x = 1020;
        this.pigSkill.y = 90;
        this.collisionGroup.addChild(this.pigSkill);
        this.timer = new egret.Timer(2000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.createWof, this);
        this.timer.start();
        var restartBt = new Button();
        restartBt.Init("start_png", "", function (param) {
            _this.scoreGroup.visible = false;
            _this.reStart();
        }, 2);
        restartBt.x = 300;
        restartBt.y = 300;
        restartBt.scaleX = restartBt.scaleY = 0.5;
        this.scoreGroup.addChild(restartBt);
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
    Game.prototype.reStart = function () {
        this.parent.addChild(new Game());
        this.parent.removeChild(this);
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map