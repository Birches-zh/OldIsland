import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'
const classicModel = new ClassicModel();
const bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
  },
  userAuthorized() {
    wx.getSetting({
      success: (res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                authorized: true,
                userInfo: res.userInfo
              })
            }
          })
        }
      })
    })
  },
  onGetUserInfo(event) {
    const userInfo = event.detail;
    this.setData({
      authorized: true
    })
  },
  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  async getMyBookCount() {
    let res = await bookModel.getMyBookCount()
    this.setData({
      bookCount: res.count
    })
  },
  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
      console.log(this.data.classics)
    })
  },
  onJumpToDetail(event) {
    const cid = event.detail.cid;
    const type = event.detail.type;
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}$type=${type}`,
    })
  },
  onReady: function () {
    this.getMyBookCount()
    this.getMyFavor()
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