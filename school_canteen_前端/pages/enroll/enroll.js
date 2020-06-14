// pages/enroll/enroll.js
var zhenzisms = require('../../utils/zhenzisms.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    username: '',
    phonenumber: '',
    password: '',
    passwrodack: '',
    hidden: true,
    code: '',
    codever: ''
  },
  // 将网页获取的值绑定到后台数据上
  usernameInput: function (e) {
    this.data.username = e.detail.value;
    // console.log(username);
  },

  phonenumberInput: function (e) {
    this.data.phonenumber = e.detail.value;
  },
  //手机号输入
  bindPhoneInput(e) {
    var val = e.detail.value;
    this.setData({
      phonenumber: val
    })
    if (val != '') {
      this.setData({
        hidden: false,
        btnValue: '获取验证码'
      })
    } else {
      this.setData({
        hidden: true
      })
    }
  },
  //验证码输入
  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.data.password = e.detail.value;
  },

  passwordInputAck: function (e) {
    this.data.passwrodack = e.detail.value;
  },
  // 检查网页的值是否合法
  checklegal: function () {

  },

  // 注册按钮被点击后执行此函数
  registerbtn: function () {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    // console.log('注册按钮被点击');
    // console.log(this.data.username, this.data.phonenumber, this.data.password, this.data.passwrodack);
    var that = this;
    if (that.data.username == '') {
      wx.showModal({
        title: '提示！',
        content: '用户名未输入',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else {
            console.log('用户点击取消')
          }
        },
        showCancel: false,
      })
    } else if (!myreg.test(that.data.phonenumber)) {
      wx.showModal({
        title: '提示！',
        content: '请输入正确的手机号码！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else {
            console.log('用户点击取消')
          }
        },
        showCancel: false,
      })
    } else if (that.data.password != that.data.passwrodack) {
      wx.showModal({
        title: '提示！',
        content: '两次输入密码不一致!',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else {
            console.log('用户点击取消')
          }
        },
        showCancel: false,
      })
    } else if (that.data.code != that.data.codever) {
      wx.showModal({
        title: '提示！',
        content: '验证码不正确!',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else {
            console.log('用户点击取消')
          }
        },
        showCancel: false,
      })
    } else {
      this.registtest();
    }
  },
  regist: function () {
    var that = this;
    if (that.data.username == '') {
      wx.showModal({
        title: '提示',
        content: '用户名未输入',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  // 已有账号文本被点击后，执行此函数
  f0: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  //获取短信验证码
  getCode(e) {
    console.log('获取验证码');
    var that = this;
    zhenzisms.client.init('https://sms_developer.zhenzikj.com', '105954', '1591f501-9b17-4087-86c3-af2e84aa2631');
    var params = {};
    params.number = that.data.phonenumber;
    params.templateId = '438';
    var code = zhenzisms.client.createCode(4, 60, params.number); //生成验证码
    var templateParams = [code, '5分钟'];
    params.templateParams = templateParams;
    // params.messageId = '1111111';
    // params.clientIp = '221.221.221.111';
    console.log(code);
    that.data.codever = code;
    zhenzisms.client.send(function (res) {
      wx.showToast({
        title: res.data.data,
        icon: 'none',
        duration: 2000
      })
    }, params);
  },
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second + '秒',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  //注册
  registtest: function () {
    console.log("用户名：" + this.data.username + "密码：" + this.data.password + "确认密码" + this.data.passwrodack)
    console.log("手机号" + this.data.phonenumber + "输入的验证码:" + this.data.code + "返回的验证码" + this.data.codever)
    if (this.data.codever != this.data.code) {
      alert("验证码不正确")
    } else {
      wx.request({
        url: 'http://localhost:8888/canteen/visitor/regist',
        data: {
          user_name: this.data.username,
          user_password: this.data.password,
          user_telephone: this.data.phonenumber
        },
        method: 'POST',
        header: {
          //'content-type': 'application/json' // 默认值
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.showModal({
            title: res.data.errorMsg,
          })
        },
        fail: function (res) {
          console.log(res.errorMsg);
        }
      })
    }
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