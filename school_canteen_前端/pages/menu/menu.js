// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowsList:[],
    canteen:'新食堂',
    tier:'一楼',
    time:'时间段11:30-12:00',
    canteen_class:'',
    remainPosition:20,
    defaultShowIndex:1
  },
  canteen0:function(){
    this.setData({
      canteen:'新食堂',
      // canteen_class:'select-dini-downlist-new',
    })
  },
  canteen1:function(){
    this.setData({
      canteen:'旧食堂'
    })
  },
  floor0:function(){
    this.setData({
      tier:'一楼'
    })
  },
  floor1:function(){
    this.setData({
      tier:'二楼'
    })
  },
  floor2:function(){
    this.setData({
      tier:'三楼'
    })
  },
  select:function(e){
    wx.navigateTo({
      url: '/pages/orderitem/orderitem',
    })
  },
  period0:function(){
    this.setData({
      time:'时间段11:30-12:00'
    })
  },
  period1:function(){
    this.setData({
      time:'时间段12:00-12:30'
    })
  },

  period2:function(){
    this.setData({
      time:'时间段12:30-13:00'
    })
  },
  period3:function(){
    this.setData({
      time:'时间段13:00-13:30'
    })
  },
  period4:function(){
    this.setData({
      time:'时间段13:30-14:00'
    })
  },
  // 获取窗口列表
  getWindewsList(){
    let times;
    if(this.data.time=="时间段11:30-12:00"){
      times="1";
    }else if(this.data.time=="时间段12:00-12:30"){
      times="2";
    }else if(this.data.time=="时间段12:30-13:00"){
      times="3";
    }else if(this.data.time=="时间段13:00-13:30"){
      times="4";
    }else if(this.data.time=="时间段13:30-14:00"){
      times="5"
    }
    const that = this;
    wx.request({
      url: 'http://localhost:8888/canteen/visitor/windows',
      data: {
        canteen:this.data.canteen,
        tier:this.data.tier,
        time:times
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res){
        console.log(res);
        if(res.data.flag){
          that.setData({
            windowsList: res.data.objects,
            remainPosition:res.data.data,
          })
          getApp().globalData.time_id = res.data.errorMsg
        }
      }
    });
  },
getButtonWindewsList:function(){
  this.getWindewsList();
},
  windowsEat:function(){
    
  },
  popBaitiaoView(e){
    console.log(e)
    this.setData({
      defaultShowIndex:e.detail.activeIndex.showIndex
    })
    if(this.data.defaultShowIndex == 0){
      wx.reLaunch({
        url: '/pages/admin/admin',
      })
    }
    if(this.data.defaultShowIndex == 1){
      wx.switchTab({
        url: '/pages/menu/menu',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getWindewsList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})