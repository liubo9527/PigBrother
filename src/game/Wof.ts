class Wof extends eui.Component{
	walk:eui.Image;
	fly:eui.Image;
	ballute:eui.Image;
	group:eui.Group;
	state:0;//0 walk 1 air
	type;//1boss default 0 渣渣
	public constructor(type) {
		super();
		this.skinName = "wof";
		this.type = type;
	}
	childrenCreated(){
		super.childrenCreated();
		this.setState(0);
	}

	setState(state){
		this.state = state;
		if(this.state == 0){
			this.walk.visible = true;
			this.group.visible = false;
		}else if(this.state == 1){
			this.walk.visible = false;
			this.group.visible = true;
		}
	}
}