var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        this.pig = new Pig();
        this.pig.x = 964;
        this.pig.y = 77;
        this.pig.setGameControl(this);
        this.addChild(this.pig);
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
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, game, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        GameConst.stage = this.stage;
                        game = new Game();
                        this.stage.addChild(game);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var config = {
    gameGroup: {},
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var GameConst = (function () {
    function GameConst() {
    }
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
var Pig = (function (_super) {
    __extends(Pig, _super);
    function Pig() {
        var _this = _super.call(this) || this;
        _this.arrowContainer = []; //猪的箭 活动的
        _this.arrowBag = []; //猪的箭袋 默认3只
        _this.arrowSpeed = 10;
        _this.maxArrow = 5;
        return _this;
    }
    Pig.prototype.setGameControl = function (gameControl) {
        this.gameControl = gameControl;
    };
    Pig.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.skinName = "pig";
        this.init();
    };
    //
    Pig.prototype.init = function () {
        //this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.attack, this);
        egret.startTick(this.startTick, this);
        //初始化弓箭
        var i = 0;
        while (i < 5) {
            var arrow = new egret.Bitmap(RES.getRes("arrow_png"));
            if (this.parent) {
                this.parent.addChild(arrow);
                arrow.x = this.x;
                arrow.scaleX = arrow.scaleY = 0.6;
                arrow.anchorOffsetY = arrow.height / 2;
                arrow.y = this.y + 130;
                this.arrowContainer.push(arrow);
            }
            i++;
        }
    };
    Pig.prototype.touchMove = function (e) {
        this.y = e.stageY - this.height / 2;
        if (this.y > 460) {
            this.y = 460;
        }
        else if (this.y < 80) {
            this.y = 80;
        }
        this.gameControl.updateString();
    };
    Pig.prototype.attack = function () {
        if (this.parent && this.arrowBag.length > 0) {
            var arrow = this.arrowBag.pop();
            arrow.x = this.x;
            arrow.y = this.y + 110;
            this.arrowContainer.push(arrow);
            this.parent.addChild(arrow);
        }
    };
    Pig.prototype.getArrows = function () {
        return this.arrowContainer;
    };
    Pig.prototype.startTick = function (dt) {
        var _this = this;
        this.arrowContainer.forEach(function (element) {
            var arrow = element;
            arrow.x -= _this.arrowSpeed;
            //箭矢回收
            if (arrow.x < -200) {
                _this.parent.removeChild(arrow);
                var findIndex = _this.arrowContainer.indexOf(arrow);
                _this.arrowContainer.splice(findIndex, 1);
                _this.arrowBag.push(arrow);
            }
        });
        //射中狼没有
        this.gameControl.wofsArray.forEach(function (element) {
            _this.hitWofTest(element);
        });
        return false;
    };
    Pig.prototype.hitWofTest = function (wof) {
        var _this = this;
        this.arrowContainer.forEach(function (element) {
            var arrow = element;
            var hitBallute = wof.ballute.hitTestPoint(arrow.x, arrow.y);
            var hitWof = wof.fly.hitTestPoint(arrow.x, arrow.y);
            if (hitBallute) {
                wof.beHited();
            }
            if (hitWof) {
                _this.hitWofBody(arrow);
            }
        });
    };
    Pig.prototype.hitWofBody = function (arrow) {
        var _this = this;
        var findIndex = this.arrowContainer.indexOf(arrow);
        this.arrowContainer.splice(findIndex, 1);
        egret.Tween.get(arrow).to({ rotation: -90 }, 100).to({ y: 1000, alpha: 0 }, 3000).call(function () {
            arrow.alpha = 1;
            arrow.rotation = 0;
            _this.arrowBag.push(arrow);
        });
    };
    Pig.prototype.beHited = function () {
        var _this = this;
        egret.stopTick(this.startTick, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.attack, this);
        egret.Tween.get(this).to({ y: 550, alpha: 1, rotation: 30 }, 1000).call(function () {
            _this.gameControl.gameOVer();
        });
    };
    return Pig;
}(eui.Component));
__reflect(Pig.prototype, "Pig");
var Stone = (function (_super) {
    __extends(Stone, _super);
    function Stone(s) {
        return _super.call(this, s) || this;
    }
    Object.defineProperty(Stone.prototype, "factor", {
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
    Stone.prototype.setPos = function (posStart, posTemple, posEnd, gameControl) {
        this.posStart = posStart;
        this.posTemple = posTemple;
        this.posEnd = posEnd;
        this.gameControl = gameControl;
    };
    Stone.prototype.throw = function () {
        var _this = this;
        egret.Tween.get(this).to({ factor: 2 }, 3000).call(function () {
            egret.Tween.removeTweens(_this);
            _this.parent.removeChild(_this);
            egret.stopTick(_this.start, _this);
            _this.gameControl.stonesPool.push(_this);
        });
        egret.startTick(this.start, this);
    };
    Stone.prototype.start = function (dt) {
        if (this.gameControl.pig.hitTestPoint(this.x, this.y)) {
            this.gameControl.pig.beHited();
        }
        return false;
    };
    return Stone;
}(egret.Bitmap));
__reflect(Stone.prototype, "Stone");
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
            _this.throwStone(flyTime);
        }).to({ y: 590 }, flyTime).call(function () {
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
        this.beKilled = true;
        this.setWofState(0);
        var findIndex = this.gameControl.wofsArray.indexOf(this);
        this.gameControl.wofsArray.splice(findIndex, 1);
        egret.Tween.get(this).to({ y: 1000, alpha: 0 }, 3000).call(function () {
            _this.gameControl.wofsPool.push(_this);
            _this.parent.removeChild(_this);
        });
        this.gameControl.scoreCount++;
        this.gameControl.updateScore();
    };
    //狼向猪扔石头
    Wof.prototype.throwStone = function (flyTime) {
        var _this = this;
        var time = Math.random() * flyTime;
        setTimeout(function () {
            if (!_this.beKilled && _this.gameControl.stonesPool.length > 0) {
                _this.stone = _this.gameControl.stonesPool.pop();
                var posStart = new egret.Point(_this.x, _this.y + 150);
                var posEnd = new egret.Point(_this.gameControl.pig.x + 85, _this.gameControl.pig.y + 85);
                var tempX = (posStart.x + posEnd.x) / 2;
                var tempY = (posStart.y + posEnd.y) / 2 - 100;
                var posTemple = new egret.Point(tempX, tempY);
                _this.stone.setPos(posStart, posTemple, posEnd, _this.gameControl);
                _this.parent.addChild(_this.stone);
                _this.stone.throw();
            }
        }, time);
    };
    return Wof;
}(eui.Component));
__reflect(Wof.prototype, "Wof");
var PhysicsTool = (function () {
    function PhysicsTool() {
    }
    PhysicsTool.convertToPhysicsPos = function (posX, posY) {
        return [posX / this.factor, (egret.MainContext.instance.stage.stageHeight - posY) / this.factor];
        //return [posX/this.factor, posY/this.factor]
    };
    PhysicsTool.convertToPhysicsLength = function (length) {
        return Math.floor(length / this.factor);
    };
    PhysicsTool.factor = 50;
    return PhysicsTool;
}());
__reflect(PhysicsTool.prototype, "PhysicsTool");
//# sourceMappingURL=main.min.js.map
;window.Main = Main;