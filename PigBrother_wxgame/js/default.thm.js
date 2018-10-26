var egret = window.egret;
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {};generateEUI.paths['resource/mySkins/gameComponent.exml'] = window.gameComponent = (function (_super) {
	__extends(gameComponent, _super);
	function gameComponent() {
		_super.call(this);
		this.skinParts = ["one","two","image","pigString","collisionGroup","scoreGroup","score"];
		
		this.height = 750;
		this.width = 1334;
		this.one_i();
		this.two_i();
		this.elementsContent = [this.image_i(),this.collisionGroup_i(),this.scoreGroup_i(),this.score_i()];
		
		eui.Binding.$bindProperties(this, ["image"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"width");
		eui.Binding.$bindProperties(this, [1334],[],this._Object2,"width");
		eui.Binding.$bindProperties(this, ["hostComponent.image0"],[0],this._TweenItem2,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object3,"width");
		eui.Binding.$bindProperties(this, [90],[],this._Object4,"width");
		eui.Binding.$bindProperties(this, ["image"],[0],this._TweenItem3,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object5,"width");
		eui.Binding.$bindProperties(this, ["hostComponent.image0"],[0],this._TweenItem4,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object6,"width");
	}
	var _proto = gameComponent.prototype;

	_proto.one_i = function () {
		var t = new egret.tween.TweenGroup();
		this.one = t;
		t.items = [this._TweenItem1_i(),this._TweenItem2_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 2350;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto._TweenItem2_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem2 = t;
		t.paths = [this._Set2_i(),this._To2_i()];
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 2350;
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto.two_i = function () {
		var t = new egret.tween.TweenGroup();
		this.two = t;
		t.items = [this._TweenItem3_i(),this._TweenItem4_i()];
		return t;
	};
	_proto._TweenItem3_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem3 = t;
		t.paths = [this._Set3_i()];
		return t;
	};
	_proto._Set3_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object5_i();
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		this._Object5 = t;
		return t;
	};
	_proto._TweenItem4_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem4 = t;
		t.paths = [this._Set4_i()];
		return t;
	};
	_proto._Set4_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object6_i();
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		this._Object6 = t;
		return t;
	};
	_proto.image_i = function () {
		var t = new eui.Image();
		this.image = t;
		t.fillMode = "clip";
		t.height = 750;
		t.source = "background_png";
		t.width = 1334;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.collisionGroup_i = function () {
		var t = new eui.Group();
		this.collisionGroup = t;
		t.height = 750;
		t.width = 1334;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.pigString_i()];
		return t;
	};
	_proto.pigString_i = function () {
		var t = new eui.Image();
		this.pigString = t;
		t.fillMode = "repeat";
		t.source = "string_png";
		t.x = 1069.33;
		t.y = 65.35;
		return t;
	};
	_proto.scoreGroup_i = function () {
		var t = new eui.Group();
		this.scoreGroup = t;
		t.height = 400;
		t.visible = false;
		t.width = 600;
		t.x = 331;
		t.y = 206.52;
		t.elementsContent = [this._Rect1_i(),this._Label1_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffb7b7;
		t.height = 400;
		t.width = 600;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 50;
		t.text = "你死了";
		t.x = 226;
		t.y = 97.73;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.Label();
		this.score = t;
		t.anchorOffsetX = 59.09;
		t.anchorOffsetY = 25.76;
		t.size = 50;
		t.text = "杀了0匹狼";
		t.textColor = 0xFCEE02;
		t.x = 619.24;
		t.y = 425.76;
		return t;
	};
	return gameComponent;
})(eui.Skin);generateEUI.paths['resource/mySkins/pig.exml'] = window.pig = (function (_super) {
	__extends(pig, _super);
	function pig() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 170;
		this.width = 170;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = pig.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "pig_png";
		t.x = 0;
		t.y = 7;
		return t;
	};
	return pig;
})(eui.Skin);generateEUI.paths['resource/mySkins/wellcome.exml'] = window.wellcome = (function (_super) {
	__extends(wellcome, _super);
	function wellcome() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 750;
		this.width = 1334;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = wellcome.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "wellcome_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return wellcome;
})(eui.Skin);generateEUI.paths['resource/mySkins/wof.exml'] = window.wof = (function (_super) {
	__extends(wof, _super);
	function wof() {
		_super.call(this);
		this.skinParts = ["walk","fly","ballute","flyGroup"];
		
		this.height = 150;
		this.width = 150;
		this.elementsContent = [this.walk_i(),this.flyGroup_i()];
	}
	var _proto = wof.prototype;

	_proto.walk_i = function () {
		var t = new eui.Image();
		this.walk = t;
		t.source = "wolf1_png";
		t.x = 0;
		t.y = 74;
		return t;
	};
	_proto.flyGroup_i = function () {
		var t = new eui.Group();
		this.flyGroup = t;
		t.height = 150;
		t.visible = false;
		t.width = 150;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.fly_i(),this.ballute_i()];
		return t;
	};
	_proto.fly_i = function () {
		var t = new eui.Image();
		this.fly = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "wolf_png";
		t.x = 0;
		t.y = 74;
		return t;
	};
	_proto.ballute_i = function () {
		var t = new eui.Image();
		this.ballute = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ballute_png";
		t.x = 48;
		t.y = 22;
		return t;
	};
	return wof;
})(eui.Skin);