// pages/orderitem/orderitem.js
Page({

  /**
   * Page initial data
   */
  data: {
    dishes: [],
    windows_id: '',
    window_name: '',
  },
  // 获取列表
  getMenusList(id) {
    const that = this;
    wx.request({
      url: 'http://localhost:8888/canteen/visitor/orderfood',
      data: {
        order_id: id
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'cookie': wx.getStorageSync("sessionid"),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res);
        if (res.data.flag) {
          that.setData({
            dishes: res.data.objects,
            window_name: res.data.data,
          })
        }
      }
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getMenusList(getApp().globalData.order_id);
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})