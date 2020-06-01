import {HTTP} from '../util/httpp.js'
class KeywordModel extends HTTP{
  key = "p"
  maxLength = 10
  // 保存缓存数据
  getHistory() {
    if(!wx.getStorageSync(this.key)){
      return []
    }
    return wx.getStorageSync(this.key)
     
  }
  // 存储缓存数据
  addToHistory(keyword) {
    // 先从缓存中获取数据
    let word = this.getHistory()
    // 如果缓存中没有传进来的数据就继续，有则return终止
    if (!word.includes(keyword)) {
      // 对缓存中的数据做判断，大于10则删掉最后的，数据从数组前面添加
      let length = word.length;
      if(length>=this.maxLength){
        word.pop()//删除最后的数据
      }
      word.unshift(keyword)//数据从头开始添加
      wx.setStorageSync(this.key, word)//保存在本地缓存
    }
  }
  getHot() {
   return this.request({
      url:'book/hot_keyword'
    })
  }
}
export {
  KeywordModel
}