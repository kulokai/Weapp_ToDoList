//index.js
var listobj = require('../../utils/list.js')
//获取应用实例
var app = getApp();
var all = {};
var color = ['','gn','rd','bu','og'];
var color2= ['普通','绿色','红色','蓝色','橙色']
var word = ['全部','未完','已完'];
Page({
  data: {
    userInfo: {},
    list:{},
    left:0,
    xs:'',
    xs_index:0,
    xs2:'全部',
    xs2_index:0
  },
  //清单详情
  detail: function(e) {
    wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.dataset.id
    })
  },
  //删除数据
  del: function(e) {
    var temp = listobj.delDataById(all.list,e.currentTarget.dataset.id);
    all.list = temp;
    showList(this);
  },
  //置顶数据
  top: function(e) {
    all.list = listobj.topData(all.list,e.currentTarget.dataset.id);
    showList(this);
  },
  //标记为完成
  finish: function(e) {
    all.list = listobj.finishData(all.list,e.currentTarget.dataset.id);
    showList(this);
  },
  toAddPage:function(e) {
    wx.navigateTo({
      url: '../add/add'
    })
  },
  toSettings:function(e) {
    wx.navigateTo({
      url: '../settings/settings'
    })
  },
  toHelp:function(e) {
    wx.navigateTo({
      url: '../help/help'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var xs2_index = app.getOnShowFn();
    this.setData({
      xs2_index:xs2_index,
      xs2:word[xs2_index]
    });
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShow:function(){
    console.log('onShow')
    var firstData = {index:0,list:[
      {id:1,title:'欢迎您 使用简约云清单 ^_^',type:'gn'},
      {id:2,title:'向左划我,可以将我移除/置顶/完成',type:'bu'},
      {id:3,title:'点击我可以进入清单详情',type:'og'},
      {id:4,title:'我是已完成的记录',type:'rd',finish:'fn'},
      {id:5,title:'点击底部白色小圈可以筛选',type:''},
      {id:6,title:'点击底部【+】可以添加记录',type:''},
    ],time:0};
    var data = wx.getStorageSync('list') || firstData;
    all = data;
    showList(this);
  },
  onHide:function(){
    console.log('onHide')
    try {
      all.time = parseInt((new Date()).valueOf()/1000);
      wx.setStorageSync('list', all);
    } catch (e) {
      alert('保存失败：异常'); 
    }
  },
  xsPage:function(e){
    var xs_index = e.currentTarget.dataset.index + 1;
    xs_index = xs_index>=5?0:xs_index;
    this.setData({
      xs_index:xs_index,
      xs:color[xs_index]
    })
    showList(this);
    wx.showToast({title: color2[xs_index]+'·清单'})
  },
  xsPage2:function(e){
    var xs2_index = e.currentTarget.dataset.index + 1;
    xs2_index = xs2_index>=3?0:xs2_index;
    this.setData({
      xs2_index:xs2_index,
      xs2:word[xs2_index]
    })
    showList(this);
    wx.showToast({title: word[xs2_index]+'·清单'})
  }
})

function showList(instance){
    var arr = all.list;
    if(instance.data.xs!=''){
      arr = arr.filter(function (elem) {
        return (elem.type == instance.data.xs);
      });
    }

    if(instance.data.xs2_index==1){
      arr = arr.filter(function (elem) {
        return (elem.finish == null);
      });
    }
    if(instance.data.xs2_index==2){
      arr = arr.filter(function (elem) {
        return (elem.finish == 'fn');
      });
    }
    
    instance.setData({
      list:arr,
      left:0
    })
}

