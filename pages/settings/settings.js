var app = getApp();
Page({
  touchcount:0,
  data: {
    user:{},
    settings:{},
    rand:0,
  },
  switch1Change: function (e){
    this.data.settings.noShowFn = e.detail.value;
    this.setData({
      settings:this.data.settings
    })
    wx.showToast({
      title: '下次启动设置生效',
      icon: 'loading'
    })
  },
  switch2Change: function (e){
    this.data.settings.onUpload = e.detail.value;
    this.setData({
      settings:this.data.settings
    })
    wx.showToast({
      title: '下次启动设置生效',
      icon: 'loading'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        user:userInfo
      })
    })
    var data = wx.getStorageSync('set') || {};
    if(!data.hide){
      data.hide = 'none';
    }
    this.setData({
      settings:data,
      rand:parseInt(Math.random()*4)
    })
  },
  onUnload:function(){
    wx.setStorageSync('set',this.data.settings);
  },
  countTouch:function(){
    this.touchcount++;
    if(this.touchcount==9){
      wx.showToast({title: '点我干啥'})
    }
    if(this.touchcount==12){
      wx.showToast({title: '被你发现我了'});
      this.data.settings.hide = 'block';
      this.setData({
        settings:this.data.settings
      })
    }
  },
  clearData:function(){
    wx.setStorageSync('list',null);
    wx.showToast({title: '清除成功'});
    
    setTimeout(function(){
      wx.navigateBack();
    },800);
  }
})
