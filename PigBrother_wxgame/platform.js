/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class WxgamePlatform {
    user = "";

    name = 'wxgame'

    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    wx.getSetting({
                        success(res){
                            if(res.authSetting['scope.userInfo']){
                                console.log("已经授权,直接调getUserInfo");
                                wx.getUserInfo({
                                    success:(res)=>{
                                        resolve(res);
                                        console.log("wx.getUserInfo数据"+JSON.stringify(res));
                                    }
                                })
                            }else{
                                console.log("没有授权，走wx.createUserInfoButton");
                                let button = wx.createUserInfoButton({
                                    type: "text",
                                    text: "登录授权",
                                    style: {
                                        left: 0,
                                        top: 0,
                                        width: 667,
                                        height: 375,
                                        lineHeight: 40,
                                        backgroundColor: '##00000000',
                                        color: '#00000000',
                                        textAlign: 'center',
                                        fontSize: 16,
                                        borderRadius: 4
                                    }
                                });
                                button.onTap((res)=>{
                                    if(res.errMsg == "getUserInfo:ok"){
                                        button.destroy();//登录成功
                                    }
                                    resolve(res);
                                });
                            }
                        }
                    });
                }
            })
        })
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    resolve(userInfo);
                }
            })
        })
    }

    openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

    createDisplayObject(type, width, height) {
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = height;

        if (egret.Capabilities.renderMode == "webgl") {
            const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
            const context = renderContext.context;
            ////需要用到最新的微信版本
            ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
            ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
            if (!context.wxBindCanvasTexture) {
                egret.startTick((timeStarmp) => {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                    bitmapdata.webGLTexture = null;
                    return false;
                }, this);
            }
        }
        return bitmap;
    }


    postMessage(data) {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(data);
    }
}


window.platform = new WxgamePlatform();