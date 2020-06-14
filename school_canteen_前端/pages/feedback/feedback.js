// pages/aboutAs/aboutAs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:'nin'
  },
  bindTextAreaBlur: function(e) {
    console.log(e)
    this.data.word= e.detail.value
  },

  showok:function() {
    wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
    })
},

Tosay:function(){
  console.log(this.data.word)
  wx.request({
    url: 'http://localhost:8888/canteen/visitor/tosay',
    data: {
      word: this.data.word
    },
    method: 'POST',
    header: {
      //'content-type': 'application/json' // 默认值
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
    },
    fail: function (res) {
    }
  })
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