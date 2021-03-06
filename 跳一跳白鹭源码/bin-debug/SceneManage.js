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
var SceneMange = (function (_super) {
    __extends(SceneMange, _super);
    function SceneMange() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    SceneMange.prototype.init = function () {
        // 实例化两个场景
        this.beginScene = new BeginScene();
        this.gameScene = new GameScene();
        this.publicScene = new PublicScene();
        // 默认添加开始场景
        this.beginScene.addChild(this.publicScene);
        this.addChild(this.beginScene);
        // this.addChild(this.publicScene);
    };
    // 实例化单例获取方法
    SceneMange.getInstance = function () {
        if (!SceneMange.instance) {
            SceneMange.instance = new SceneMange();
        }
        return SceneMange.instance;
    };
    // 切换场景
    SceneMange.prototype.changeScene = function (type) {
        // 移除所有显示列表中的对象
        this.removeChildren();
        // 添加下一个场景
        this[type].addChild(this.publicScene);
        this.addChild(this[type]);
        // 切换到gameScene时执行reset
        if (type == 'gameScene') {
            // 释放资源
            // this.beginScene.release();
            this.gameScene.reset();
            this.gameScene.blockPanel.touchEnabled = true;
            this.gameScene.life = bus.life;
            // bus.life = this.gameScene.life;
            // console.log(this.life);
            // if (this.life < 0) {
            // 	this.life = 0;
            // 	bus.life = 0;
            // }
            this.gameScene.lifeLabel.text = this.gameScene.life.toString();
            this.gameScene.blockPanel.touchEnabled = true;
            if (this.gameScene.life === 0)
                this.gameScene.relive.source = '3_png';
        }
        // 切换到beginScene时修改开始按钮图片
        if (type == 'beginScene') {
            this.beginScene.modiStartImg();
            this.beginScene.leftLifeLabel.text = '剩余生命值: ' + bus.life.toString();
        }
    };
    return SceneMange;
}(egret.Sprite));
__reflect(SceneMange.prototype, "SceneMange");
//# sourceMappingURL=SceneManage.js.map