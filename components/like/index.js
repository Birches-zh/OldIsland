// components/like/index.js
Component({
  properties: { //组件的属性列表
    like: {
      type: Boolean
    },
    count: {
      type: Number
    }
  },
  data: {
    // 数据绑定
    yesSrc: "./images/like.png",
    noSrc: "./images/like@dis.png"
  },
  methods: {
    onLike: function () {
      let like = this.properties.like;
      let count = this.properties.count;
      count = like?count-1:count+1;
      this.setData({
        like: !like,
        count: count
      })
      // 自定义事件-激活，behavior保存like的状态
      // 引入组件的页面在标签绑定了自定义事件，事件函数通过event接收，传过去的值在detail里
      //第一个是自定义事件名，第二个是传递的参数，第三个是配置，看文档
      let behavior = this.properties.like? 'like' : 'cancel'
      this.triggerEvent('like',{behavior:behavior},{})
    }
  }
})