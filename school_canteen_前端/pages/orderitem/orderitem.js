// pages/orderitem/orderitem.js
Page({

  /**
   * Page initial data
   */
  data: {
    dishes: [],
    windows_id: '',
    window_name: '',
    courseCount: 0,
    food_price: [],
    order_price: 0
  },
  // 获取窗口列表
  getMenusList(id) {
    this.setData({
      windows_id: id
    })
    const that = this;
    wx.request({
      url: 'http://localhost:8888/canteen/visitor/menu',
      data: {
        window_id: id
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'cookie': wx.getStorageSync("sessionid"),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res);
        var pricec = [];
        for (var i in res.data.objects) {
          pricec.push(0);
        }
        if (res.data.flag) {
          that.setData({
            dishes: res.data.objects,
            window_name: res.data.data,
            food_price: pricec
          })
        }
      }
    });
  },

  /**
   * 加一
   * @param {} options 
   */
  //数字加1
  addNum: function (e) {
    var index = e.currentTarget.dataset.indexs;
    var price = parseFloat(e.currentTarget.dataset.pricex);
    var arr = this.data.food_price;
    arr[index] = arr[index] + 1;
    var now = this.data.order_price + price
    this.setData({
      order_price: now,
      food_price: arr
    })
  },
  //数字减1
  minusNum: function (e) {
    var index = e.currentTarget.dataset.indexs;
    var price = parseFloat(e.currentTarget.dataset.pricex);
    var arr = this.data.food_price;
    if (arr[index] > 0) {
      arr[index] = arr[index] - 1;
      var now = this.data.order_price - price
    }
    this.setData({
      order_price: now,
      food_price: arr
    })

  },

  /**
   * 去结账
   * @param {} options 
   */
  ToPay: function () {
    var that = this;
    wx.showModal({
      title: '确定',
      content: '是否支付呢？',
      success(res) {
        if (res.confirm) {
          var flag = false;
          for (var i in that.data.food_price) {
            if (i != 0) {
              flag = true;
              break;
            }
          }
          if (flag) { //有条目被选中
            //表单提交
            var object = [];
            var arr = that.data.food_price;
            var menu = that.data.dishes;
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] != 0) {
                var food = {
                  "good_food_id": menu[i].food_id,
                  "good_num": arr[i]
                };
                object.push(food);
              }
            }
            that.ToSub(object)
          } else {
            console.log("你在玩我吗？没选菜")
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  ToSub: function (object) {
    object = JSON.stringify(object);
    const that = this;
    wx.request({
      url: 'http://localhost:8888/canteen/visitor/submit',
      data: {
        window_id: that.data.windows_id,
        price: that.data.order_price,
        about: '',
        object: object,
        time_id:getApp().globalData.time_id
      },
      method: 'POST',
      header: {
        // 'content-type': 'application/json' // 默认值,
        'cookie': wx.getStorageSync("sessionid"),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if(!res.data.flag){
          wx.showModal({
            title: res.data.data,
          })
        }
      }
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getMenusList(options.id);
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