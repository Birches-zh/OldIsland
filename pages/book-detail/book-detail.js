// 引入模块
import {
  BookModel
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js'
// 实例化类的对象
const likeModel = new LikeModel();
const bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    like: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.showLoading({
      title: '正在加载',
    })
    let id = options.bid
    this.data.book = await bookModel.getDetail(id) //获取书籍详情数据
    this.data.comments = await bookModel.getComments(id) //获取书籍短评数据
    this.data.like = await bookModel.getLikeState(id) //获取书籍点赞状态数据
    wx.hideLoading();
    this.setData({ //更新页面数据
      book: this.data.book,
      comments: this.data.comments.comments,
      likeStatus: this.data.like.like_status,
      likeCount: this.data.like.fav_nums
    })
  },
  // 点赞与取消点赞
  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.getLike(like_or_cancel, this.data.book.id, 400)
  },
  // 评论显示隐藏
  onFakePost() {
    console.log('aa')
    this.setData({
      posting: true
    })
  },
  onCancel() {
    this.setData({
      posting: false
    })
  },
  // 点击发送短评
  onPost(event) {
    const bid = this.data.book.id;
    const content = event.detail.text || event.detail.value;
    if(!content){//如果输入内容为空则退出
      return
    }
    if(content.trim().length >12 || content.trim().length <2){
      wx.showToast({
        title: '请输入2到12个字',
        icon:'none'
      })
      return
    }
    bookModel.postComment(bid,content)
    .then((res)=>{
      wx.showToast({
        title: '添加成功！',
        icon:"success"
      })
      this.data.comments.unshift({
        content:content,
        nums:1
      })
      this.setData({
        comments:this.data.comments,
        posting:false
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