// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultShowIndex:0,
    currtab: 0,
    swipertab: [{
      name: '待收货',
      index: 0
    }, {
      name: '已完成',
      index: 1
    }],
    _opacity: 1,
    deviceH: 0,
    order_id: 0
  },

  showok: function () {
    wx.showToast({
      title: '取消成功',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.orderShow()
  },


  /**
   * @Explain：选项卡点击切换
   */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({
      currtab: e.detail.current
    })
    this.orderShow()
  },

  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.waitPayShow()
        break
      case 1:
        that.alreadyShow()
        break
    }
  },
  alreadyShow: function () {
    const that = this;
    wx.request({
      url: 'http://localhost:8888/canteen/admini/finishOrder',
      data: {},
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'cookie': wx.getStorageSync("sessionid"),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log("fin")
        console.log(res)
        var length1 = (res.data.objects.length) * 166 + 80;
        console.log("length" + length1)
        that.setData({
          deviceH: length1,
          alreadyOrder: res.data.objects
        })
      }
    });
  },

  select: function (e) {
    var that = this
    getApp().globalData.order_id = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '/pages/orderfood/orderfood',
    })
  },

  waitPayShow: function () {
    const that = this;
    wx.request({
      url: 'http://localhost:8888/canteen/admini/nofinishOrder',
      data: {},
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'cookie': wx.getStorageSync("sessionid"),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log("nofin")
        console.log(res)
        var length = (res.data.objects.length + 1) * 166 + 80;
        that.setData({
          deviceH: length,
          waitPayOrder: res.data.objects
        })
      }
    })
  },

  methods: {
    //手指按下事件，把透明度给它改成0.5，即一半透明，就是模糊一下，达到点击的效果
    _touchStart: function (e) {
      this.setData({
        _opacity: 0.5
      })
    },

    //手指抬起，透明度给它设置会1，天空又透彻明亮了有木有！
    //这里设置了一个定时器，手指抬起后0.2秒在把透明度设置回去，
    //因为快速点击效果不是很明显，根据自己的需求自己配置时间
    _touchEnd: function (e) {
      setTimeout(() => {
        this.setData({
          _opacity: 1
        })
      }, 200)
    },
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
      wx.navigateTo({
        url: '/pages/admin/admin',
      })
    }
  }
})