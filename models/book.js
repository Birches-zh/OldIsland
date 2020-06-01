import {
  HTTP
} from '../util/httpp.js'

class BookModel extends HTTP {
  // 获取书籍列表的数据
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }
  // 获取书籍详情
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`,
    })
  }
  // 获取书籍短评
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`,
    })
  }
  // 获取书籍点赞状态
  getLikeState(bid) {
    return this.request({
      url: `book/${bid}/favor`,
    })
  }
  // 获取喜欢书籍的数量
  getMyBookCount(){
    return this.request({
      url:`/book/favor/count`
    })
  }
  // 发送短评
  postComment(bid, content) {
    return this.request({
      url: `book/add/short_comment`,
      method: "POST",
      data: {
        book_id: bid,
        content: content
      }
    })
  }
  // 搜索书籍
  search(start, q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q: q,
        start: start
      }
    })
  }
  

}

export {
  BookModel
}