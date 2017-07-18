
var listobj = require('../../utils/list.js')
var color = ['','gn','rd','bu','og']
var all = {};
Page({
  data: {
    type:['普通','绿色','红色','蓝色','橙色'],
    type_name:'普通',
    id:null,
    index:0,
    thelist:{}
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      type_name:this.data.type[e.detail.value]
    })
  },
  del:function(){
    all.list = listobj.delDataById(all.list,this.data.id);
    try {
      wx.setStorageSync('list', all);
      wx.showToast({
        title: '删除成功'
      })
      setTimeout(function(){
        wx.navigateBack();
      },1000);
    } catch (e) {
      wx.showToast({
        title: '删除失败：异常',
        icon: 'loading'
      })
    }
  },
  formSubmit: function(e) {
    var value = e.detail.value;
    if(value.title==''||value.title==null){
      wx.showToast({
        title: '标题不能为空',
        icon: 'loading'
      })
      return;
    }
    value.type = color[value.type];
    value.id = this.data.id;
    all.list = listobj.delDataById(all.list,this.data.id);
    all.list.unshift(value);
    all.time = parseInt((new Date()).valueOf()/1000);
    console.log(all);
    try {
      wx.setStorageSync('list', all);
      wx.showToast({
        title: '保存成功'
      })
      setTimeout(function(){
        wx.navigateBack();
      },1000);
    } catch (e) {
      wx.showToast({
        title: '保存失败：异常',
        icon: 'loading'
      })
    }
  },
  onLoad: function (option) {
    all = wx.getStorageSync('list') || [];
    if(all.list==[]){
      wx.showToast({
        title: '不存在的清单',
        icon: 'loading'
      })
      wx.navigateBack();
    }
    var arr = all.list.filter(function (elem) {
      return (elem.id == option.id);
    });
    if(arr==[]){
      wx.showToast({
        title: '不存在的清单',
        icon: 'loading'
      })
      wx.navigateBack();
    }
    var temp = color.indexOf(arr[0].type);
    temp = temp<0?0:temp;
    console.log(arr[0]);
    this.setData({
      id:option.id,
      index:temp,
      type_name:this.data.type[temp],
      thelist:arr[0]
    });
  }
})

