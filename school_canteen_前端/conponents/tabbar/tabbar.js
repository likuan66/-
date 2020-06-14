// conponents/tabbar/tabbar.js
Component({
  /**
   * Component properties
   */
  properties: {
    defaultShowIndex:{
      type:Number,
      value:0
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    myTabbarEvent(e){
      console.log(e)
      var index = parseInt(e.currentTarget.dataset.index)
      this.setData({
        defaultShowIndex:index
      })
      var fatherData = {showIndex:index}
      this.triggerEvent('myTabbarEvent',{activeIndex:fatherData})
    }
  }
})
