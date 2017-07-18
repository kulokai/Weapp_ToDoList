//logs.js
var util = require('../../utils/util.js')
var color = ['','gn','rd','bu','og']
Page({
  data: {
    type:['普通','绿色','红色','蓝色','橙色'],
    type_name:'普通'
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      type_name:this.data.type[e.detail.value]
    })
  },
  formSubmit: function(e) {
    var data = wx.getStorageSync('list') || {index:0,list:[],time:0};
    var value = e.detail.value;
    if(value.title==''||value.title==null){
      wx.showToast({
        title: '标题不能为空',
        icon: 'loading'
      })
      return;
    }
    value.type = color[value.type];
    value.id = ++data.index;
    data.list.unshift(value);
    data.time = parseInt((new Date()).valueOf()/1000);
    try {
      wx.setStorageSync('list', data);
      wx.showToast({
        title: '保存成功'
      })
      setTimeout(function(){
        wx.navigateBack();
      },800);
    } catch (e) {
      wx.showToast({
        title: '保存失败：异常',
        icon: 'loading'
      })
    }
  },
  onLoad: function () {
    
  }
})
