class GameData {
 	private static _instance;
	public static getInstance(){
		if(GameData._instance == null){
			GameData._instance = new GameData();
		}
		return GameData._instance;
	}

	user:null;//登录成功之后的用户信息
}