// 引入models组件
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
// 实例化ClassicModel类
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    latest: true,
    likeStatus: false,
    likeCount: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 获取最新的期刊数据
    classicModel.getLatest((res) => {
      res.index = res.index.toString().padStart(2, 0)
      this.setData({
        classic: res,
        // 获取点赞的数量和状态
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
      console.log(this.data)
    })
  },
  // 自定义事件被触发时触发的函数
  // 点赞
  onLike: function (event) {
    let behavior = event.detail.behavior; //获取自定义事件传递过来的值
    likeModel.getLike(behavior, this.data.classic.id, this.data.classic.type) //向服务器发送数据
  },
  // 下一期期刊
  onNext: function () {
    this.getClassic('next');
  },
  // 上一期期刊
  onPrevious: function () {
    this.getClassic('previous');
  },
  // 获取期刊数据
  getClassic: function (nextOrPrevious) {
    let index = this.data.classic.index //获取当前期刊号
    classicModel._updateClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      res.index = res.index.toString().padStart(2, 0)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  // 获取点赞数据
  _getLikeStatus: function (atr_id, type) {
    likeModel.getClassicLikeStatus(atr_id, type, (res) => {
      this.setData({
        // 修改点赞数据和状态
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
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