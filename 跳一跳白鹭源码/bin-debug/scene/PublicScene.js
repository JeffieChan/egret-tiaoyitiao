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
var PublicScene = (function (_super) {
    __extends(PublicScene, _super);
    function PublicScene() {
        var _this = _super.call(this) || this;
        // rank列表是否刷新flag
        _this.isRefresh = 0;
        _this.rankFlag = true;
        // UI skin加载完毕后，调用自定义的init初始化方法
        // this.init();
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.init, _this);
        _this.skinName = "resource/scene/PublicScene.exml";
        return _this;
    }
    // protected partAdded(partName:string,instance:any):void
    // {
    // 	super.partAdded(partName,instance);
    // }
    PublicScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    PublicScene.prototype.init = function () {
        // this.foo.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
        // 	console.log('click foo');
        // }, this);
        // this.rankToPrev.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
        // 	this.rankPanel.visible = false;
        // 	this.overPanel.visible = true;
        // }, this);
        console.log('public scene');
        var mc1 = bus.getLoadingClip();
        var mc1Wra = new eui.Group();
        mc1Wra.width = 50;
        mc1Wra.height = 50;
        mc1Wra.left = "40%";
        mc1Wra.top = "25%";
        mc1Wra.visible = false;
        mc1Wra.name = 'rankLoadingMc';
        mc1Wra.addChild(mc1);
        this.rankScroller.addChild(mc1Wra);
        this.rankArrCollection = new eui.ArrayCollection();
        this.rankArrCollection.source = [];
        this.rankDataList.dataProvider = this.rankArrCollection;
        // 绑定rankScroller滑动刷新
        this.rankScroller.addEventListener(eui.UIEvent.CHANGE, this.onScrollerChangeHander, this);
        this.rankScroller.addEventListener(eui.UIEvent.CHANGE_END, this.onScrollerChangeEndHander, this);
        this.rankToPrev.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.rankPanel.visible = false;
        }, this);
    };
    // rank列表滚动时监听函数
    PublicScene.prototype.onScrollerChangeHander = function (e) {
        var myScroller = e.currentTarget;
        //  console.info("x:"+myScroller.viewport.scrollV);
        if (myScroller.viewport.scrollV < -100) {
            this.isRefresh = 1;
        }
        if (myScroller.viewport.scrollV > (this.rankArrCollection.length * 71 - this.rankDataList.height + 70)) {
            this.isRefresh = -1;
        }
    };
    // rank列表滚动结束时监听函数
    PublicScene.prototype.onScrollerChangeEndHander = function (e) {
        if (this.isRefresh != 0) {
            console.info("Refresh" + this.isRefresh);
            if (this.isRefresh == -1) {
                //这里是上拉加载更多逻辑
                this.rankAjax();
            }
            if (this.isRefresh == 1) {
                //这里是下拉刷新逻辑
            }
            this.isRefresh = 0;
        }
    };
    // 获取排行榜ajax
    PublicScene.prototype.rankAjax = function () {
        var rankLoadingMc = this.rankScroller.getChildByName('rankLoadingMc');
        rankLoadingMc.visible = true;
        this.rankScroller.bounces = false;
        var req = new egret.HttpRequest();
        // var params = "?curLife="+this.life;
        req.responseType = egret.HttpResponseType.TEXT;
        req.open("https://www.easy-mock.com/mock/5bf3a15a531b28495fc589d3/tyt/getRank", egret.HttpMethod.GET);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send();
        // 类似beforeSend, 发送前执行
        // this.loadingPop.visible = true;
        // this.relive.touchEnabled = false;
        req.addEventListener(egret.Event.COMPLETE, onSuccess, this);
        function onSuccess(event) {
            rankLoadingMc.visible = false;
            this.rankScroller.bounces = true;
            var request = event.currentTarget;
            var data = JSON.parse(request.response).data;
            var listData = bus.cloneAndRename(data, {
                order: 'rankOrder',
                name: 'rankName',
                point: 'rankPoint'
            });
            // console.log(listData,this.rankDataList);
            // 新增rankHead属性
            for (var i = 0; i < listData.length; i++) {
                Object.assign(listData[i], { rankHead: "rank_head_png" });
            }
            // var arrayCollection = new eui.ArrayCollection();
            // arrayCollection.source = listData;
            // this.rankDataList.dataProvider = arrayCollection
            // this.rankArrCollection.source = this.rankArrCollection.source.concat(listData);
            // this.rankArrCollection.refresh()
            for (var i = 0; i < listData.length; i++) {
                this.rankArrCollection.addItem(listData[i]);
            }
            console.log(listData, this.rankArrCollection);
        }
    };
    return PublicScene;
}(eui.Component));
__reflect(PublicScene.prototype, "PublicScene");
//# sourceMappingURL=PublicScene.js.map