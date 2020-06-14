// pages/enroll/enroll.js
Page({

  /**
   * Page initial data
   */
  data: {
    phonenumber: '',
    password: '',
  },
  // 将网页获取的值绑定到后台数据上
  phonenumberInput: function (e) {
    this.data.phonenumber = e.detail.value;
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value;
  },

  // 检查网页的值是否合法
  checklegal: function () {

  },

  // 登录按钮被点击后执行此函数
  registerbtn: function () {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    // console.log('登录按钮被点击');
    // console.log(this.data.phonenumber, this.data.password);
    var that = this;
    if (that.data.phonenumber == '') {
      wx.showModal({
        title: '提示！',
        content: '手机号未输入',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else {
            console.log('用户点击取消')
          }
        },
        showCancel:false,
      })
    }
    else if(that.data.password == ''){
      wx.showModal({
        title: '提示！',
        content: '密码未输入',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else {
            console.log('用户点击取消')
          }
        },
        showCancel:false,
      })
    }
    else{
      this.Getlogin();
    }
  },

  // 未有账号文本被点击后，执行此函数
  f0: function () {
    wx.navigateTo({
      url:'/pages/enroll/enroll'
    })
  },

  Getlogin: function () {
    wx.request({
      url: 'http://localhost:8888/canteen/visitor/login',
      data: {
        user_telephone: this.data.phonenumber,
        user_password: this.data.password
      },
      method: 'POST',
      header: {
        // 'content-type': 'application/json' // 默认值
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.header);
        console.log(res.data.errorMsg)
        if(!res.data.flag){
          //弹出res.data.errorMsg
          wx.showModal({
            title: '提示！',
            content: res.data.errorMsg,
            showCancel:false,
          })
        }else{
          //跳转到点餐主页
          wx.switchTab({
            url: '/pages/menu/menu',
          })
        }  
        wx.removeStorageSync('sessionid')
        wx.setStorageSync('sessionid', res.header["Set-Cookie"])
      },
      fail: function (res) {
        console.log(res.errorMsg+"-----");
      }
    })
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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