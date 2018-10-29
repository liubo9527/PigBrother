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
        _this.login = false;
        _this.skinName = "wellcome";
        return _this;
    }
    Wellcome.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        //调登录
        if (GameConst.isWeiXin()) {
            platform.login().then(function (res) {
                console.log("ergert:res" + JSON.stringify(res));
                if (res.errMsg == "getUserInfo:ok") {
                    _this.login = true;
                    //存储解析json
                    var user = {
                        code: res.code,
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                        nickName: res.userInfo.nickName,
                        gender: res.userInfo.gender,
                        city: res.userInfo.city,
                        province: res.userInfo.Promise,
                        country: res.country,
                        avatarUrl: res.userInfo.avatarUrl
                    };
                    GameData.getInstance().user = user;
                    _this.loadIM();
                } //登录失败doNoting
            });
        }
        else {
            this.login = true;
        }
        var startButton = new Button();
        startButton.Init("start_png", "", function (param) {
            if (_this.login) {
                var game = new Game();
                _this.parent.addChild(game);
                _this.parent.removeChild(_this);
            }
        }, "start");
        startButton.x = 1336 / 2;
        startButton.y = 400;
        this.addChild(startButton);
    };
    Wellcome.prototype.loadIM = function () {
        var imageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.loadComplete, this);
        imageLoader.load(GameData.getInstance().user.avatarUrl);
    };
    Wellcome.prototype.loadComplete = function (e) {
        var texture = new egret.Texture();
        texture._setBitmapData(e.currentTarget.data);
        var bitmap = new egret.Bitmap(texture);
        this.addChild(bitmap);
    };
    return Wellcome;
}(eui.Component));
__reflect(Wellcome.prototype, "Wellcome");
//# sourceMappingURL=Wellcome.js.map