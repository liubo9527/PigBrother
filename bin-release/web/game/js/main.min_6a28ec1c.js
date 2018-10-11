var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))(function(o,r){function s(t){try{h(n.next(t))}catch(e){r(e)}}function a(t){try{h(n["throw"](t))}catch(e){r(e)}}function h(t){t.done?o(t.value):new i(function(e){e(t.value)}).then(s,a)}h((n=n.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return n([t,e])}}function n(i){if(o)throw new TypeError("Generator is already executing.");for(;h;)try{if(o=1,r&&(s=r[2&i[0]?"return":i[0]?"throw":"next"])&&!(s=s.call(r,i[1])).done)return s;switch(r=0,s&&(i=[0,s.value]),i[0]){case 0:case 1:s=i;break;case 4:return h.label++,{value:i[1],done:!1};case 5:h.label++,r=i[1],i=[0];continue;case 7:i=h.ops.pop(),h.trys.pop();continue;default:if(s=h.trys,!(s=s.length>0&&s[s.length-1])&&(6===i[0]||2===i[0])){h=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){h.label=i[1];break}if(6===i[0]&&h.label<s[1]){h.label=s[1],s=i;break}if(s&&h.label<s[2]){h.label=s[2],h.ops.push(i);break}s[2]&&h.ops.pop(),h.trys.pop();continue}i=e.call(t,h)}catch(n){i=[6,n],r=0}finally{o=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var o,r,s,a,h={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},config={gameGroup:{PLAYER:Math.pow(2,1),ENEMY:Math.pow(2,2),GROUND:Math.pow(2,3)}},AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,i){function n(n){e.call(i,n,t)}if(RES.hasRes(t)){var o=RES.getRes(t);o?n(o):RES.getResAsync(t,n,this)}else RES.getResByUrl(t,n,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var Main=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e,i;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,4,,5]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),[4,this.loadTheme()];case 2:return n.sent(),[4,RES.loadGroup("preload",0,t)];case 3:return n.sent(),this.stage.removeChild(t),GameConst.stage=this.stage,e=new Game,this.stage.addChild(e),[3,5];case 4:return i=n.sent(),console.error(i),[3,5];case 5:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,i){var n=new eui.Theme("resource/default.thm.json",t.stage);n.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,i,n){function o(t){e.call(n,t)}function r(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),i.call(n))}var s=this;if("undefined"!=typeof generateEUI)egret.callLater(function(){e.call(n,generateEUI)},this);else if("undefined"!=typeof generateEUI2)RES.getResByUrl("resource/gameEui.json",function(t,i){window.JSONParseClass.setData(t),egret.callLater(function(){e.call(n,generateEUI2)},s)},this,RES.ResourceItem.TYPE_JSON);else if("undefined"!=typeof generateJSON)if(t.indexOf(".exml")>-1){var a=t.split("/");a.pop();var h=a.join("/")+"_EUI.json";generateJSON.paths[t]?egret.callLater(function(){e.call(n,generateJSON.paths[t])},this):RES.getResByUrl(h,function(i){window.JSONParseClass.setData(i),egret.callLater(function(){e.call(n,generateJSON.paths[t])},s)},this,RES.ResourceItem.TYPE_JSON)}else egret.callLater(function(){e.call(n,generateJSON)},this);else RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),RES.getResByUrl(t,o,this,RES.ResourceItem.TYPE_TEXT)},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Game=function(t){function e(){var e=t.call(this)||this;return e.time=0,e.skinName="gameComponent",e}return __extends(e,t),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.worldInit()},e.prototype.playAnimation=function(t,e){if(e)for(var i in t.items)t.items[i].props={loop:!0};t.play()},e.prototype.worldInit=function(){var t=this;this.material1=new p2.Material(1),this.material2=new p2.Material(2);var e=50,i=new p2.World({gravity:[0,-1]}),n=new p2.ContactMaterial(this.material1,this.material2);n.friction=1,n.restitution=.1,i.addContactMaterial(n),this.createGround(i,this.bgGroup,1,0,1334,1,"",667,0),this.createGround(i,this.bgGroup,2,0,302,29,"step1_png",145,675),this.createGround(i,this.bgGroup,3,0,302,29,"step1_png",1183,675),this.createGround(i,this,4,0,121,29,"step2_png",667,250),this.createGround(i,this,5,0,121,29,"step2_png",467,400),this.createGround(i,this,6,0,121,29,"step2_png",867,400),this.createGround(i,this.bgGroup,11,0,1,750,"",0,375),this.createGround(i,this.bgGroup,12,0,1,750,"",1334,375),this.createGround(i,this.bgGroup,13,0,1500,1,"",667,730),egret.startTick(function(n){var o=n,r=t.time,s=o-r;if(t.time=o,!(10>s||s>1e3)){i.step(s/1e3);for(var a=egret.MainContext.instance.stage.stageHeight,h=i.bodies.length,c=0;h>c;c++){var l=i.bodies[c];if(l.displays){var u=l.displays[0];u&&(u.x=l.position[0]*e,u.y=a-l.position[1]*e,u.rotation=360-180*(l.angle+l.shapes[0].angle)/Math.PI,l.sleepState==p2.Body.SLEEPING?u.alpha=.5:u.alpha=1),l.type!=p2.Body.STATIC&&l instanceof Role&&l.onEnterFrame(n)}}return!1}},this),this.hero=new Role(this.collisionGroup,375,600,1,1),i.addBody(this.hero),this.hero.shapes[0].material=this.material2;var o=new Role(this.collisionGroup,200,600,0,1,this.hero);i.addBody(o);var o=new Role(this.collisionGroup,200,100,0,1,this.hero);i.addBody(o);var o=new Role(this.collisionGroup,200,400,0,1,this.hero);i.addBody(o),this.vj=new VirtualJoystick,this.vj.addEventListener("vj_start",this.onStart,this),this.vj.addEventListener("vj_move",this.onChange,this),this.vj.addEventListener("vj_end",this.onEnd,this),this.vj.start()},e.prototype.onStart=function(){},e.prototype.onChange=function(t){var e=t.data,i=10*Math.cos(e),n=10*Math.sin(e),o=p2.vec2.fromValues(i,-n);this.hero.applyForce(o,[0,0])},e.prototype.onEnd=function(){},e.prototype.createGround=function(t,e,i,n,o,r,s,a,h){var c=new p2.Body({mass:1,fixedRotation:!0,position:PhysicsTool.convertToPhysicsPos(a,h),type:p2.Body.STATIC,velocity:[n,0]});c.id=i,console.log("位置：",c.position),t.addBody(c);var l=new p2.Box({width:PhysicsTool.convertToPhysicsLength(o),height:PhysicsTool.convertToPhysicsLength(r)});if(c.addShape(l),s){var u=this.createBitmapByName(s);u.width=o,u.height=r,u.anchorOffsetX=o/2,u.anchorOffsetY=r/2,c.displays=[u],e.addChild(u)}return l.material=this.material1,c},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e},e.prototype.createBall=function(t){var e=new egret.Shape;return e.graphics.beginFill(16773120),e.graphics.drawCircle(0,0,t),e.graphics.endFill(),e},e}(eui.Component);__reflect(Game.prototype,"Game");var GameConst=function(){function t(){}return t}();__reflect(GameConst.prototype,"GameConst");var Role=function(t){function e(e,i,n,o,r,s){void 0===s&&(s=null);var a=t.call(this,{mass:1,fixedRotation:!0})||this;return a.hero=s,a.roleType=o,a.container=e,a.balloonCount=r,a.position=PhysicsTool.convertToPhysicsPos(i,n),a.createShape(),a}return __extends(e,t),e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e},e.prototype.createShape=function(){var t,e=this;0==this.roleType?(t="enemy_png",this.group=config.gameGroup.ENEMY):1==this.roleType&&(t="role_png",this.group=config.gameGroup.PLAYER);var i=this.createBitmapByName(t),n=new p2.Box({width:PhysicsTool.convertToPhysicsLength(i.width),height:PhysicsTool.convertToPhysicsLength(i.height)});this.addShape(n),this.displays=[i],this.container.addChild(i),i.anchorOffsetX=i.width/2,i.anchorOffsetY=i.height/2,0==this.roleType&&setInterval(function(){e.autoAttack()},100)},e.prototype.onEnterFrame=function(t){this.velocity[0]>0?this.displays[0].scaleX=-1:this.velocity[0]<0&&(this.displays[0].scaleX=1)},e.prototype.autoAttack=function(){if(this.position[1]<2){var t=100*Math.random()+50,e=p2.vec2.fromValues(0,t);this.applyForce(e,[0,0])}else{var i=this.hero.position[0]-this.position[0],n=this.hero.position[1]-this.position[1],o=Math.sqrt(i*i+n*n),r=10,e=p2.vec2.fromValues(r*i/o,r*n/o);this.applyForce(e,[0,0]),console.log(""+i/o+n/o)}},e}(p2.Body);__reflect(Role.prototype,"Role");var VirtualJoystick=function(t){function e(){var e=t.call(this)||this;return e.circleRadius=0,e.ballRadius=0,e.centerX=0,e.centerY=0,e.p1=new egret.Point,e.p2=new egret.Point,e.skinName="VirtualJoystickSkin",e}return __extends(e,t),e.prototype.childrenCreated=function(){this.circleRadius=this.circle.height/2,this.ballRadius=this.ball.height/2,this.centerX=this.circleRadius,this.centerY=this.circleRadius,this.anchorOffsetX=this.circleRadius,this.anchorOffsetY=this.circleRadius,this.ball.x=this.centerX,this.ball.y=this.centerY},e.prototype.start=function(){GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this),GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this),GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this)},e.prototype.stop=function(){GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this),GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this),GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this)},e.prototype.onTouchBegin=function(t){this.parent||(this.touchID=t.touchPointID,this.x=t.stageX,this.y=t.stageY,this.ball.x=this.centerX,this.ball.y=this.centerY,GameConst.stage.addChild(this),this.dispatchEvent(new egret.Event("vj_start")))},e.prototype.onTouchEnd=function(t){this.touchID==t.touchPointID&&(this.hide(),this.dispatchEvent(new egret.Event("vj_end")))},e.prototype.onTouchMove=function(t){if(this.touchID==t.touchPointID){this.p1.x=this.x,this.p1.y=this.y,this.p2.x=t.stageX,this.p2.y=t.stageY;var e=egret.Point.distance(this.p1,this.p2),i=Math.atan2(t.stageY-this.y,t.stageX-this.x);e<=this.circleRadius-this.ballRadius?(this.ball.x=this.centerX+t.stageX-this.x,this.ball.y=this.centerY+t.stageY-this.y):(this.ball.x=Math.cos(i)*(this.circleRadius-this.ballRadius)+this.centerX,this.ball.y=Math.sin(i)*(this.circleRadius-this.ballRadius)+this.centerY),this.dispatchEventWith("vj_move",!1,i)}},e.prototype.hide=function(){this.parent&&this.parent.removeChild(this)},e}(eui.Component);__reflect(VirtualJoystick.prototype,"VirtualJoystick");var PhysicsTool=function(){function t(){}return t.convertToPhysicsPos=function(t,e){return[t/this.factor,(egret.MainContext.instance.stage.stageHeight-e)/this.factor]},t.convertToPhysicsLength=function(t){return Math.floor(t/this.factor)},t.factor=50,t}();__reflect(PhysicsTool.prototype,"PhysicsTool");