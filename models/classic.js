//引入HTTP模块
import {
  HTTP
} from '../util/http.js'

class ClassicModel extends HTTP {
  // 获取最新的期刊数据
  getLatest(isCallback) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        isCallback(res)
        // 将最新的期刊号保存在本地存储，便于后面的判断
        let key = this._getKey(res.index.substr(1))
        wx.setStorageSync(key, res)
        this._setLatestIndex(res.index)
      }
    })
  }
  // 更新期刊数据
  _updateClassic(index, nextOrPrevious, isCallback) {
    // 缓存中寻找 or API 写入到缓存中
    // key 确定key 
    // 通过nextOrPrevious的值来判断生成的key的值是多少
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    // 缓存中寻找，没有就走http请求
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          isCallback(res)
          wx.setStorageSync(key, res)
        }
      })
    } else {
      // else表示缓存中有数据，直接从缓存中获取数据
      isCallback(classic)
    }
  }


  // 以下是期刊翻页的函数
  // 判断是否最旧期刊
  isFirst(index) {
    return index == 1 ? true : false
  }
  // 判断是否最新期刊
  isLatest(index) {
    // 获取本地存储的最新期刊号，判断是否获取服务器的期刊号和本地的是否相等，相等就是最新的期刊
    let LatestIndex = this._getLatestIndex()
    return LatestIndex == index ? true : false
  }
  // 本地存储
  // 保存最新期刊号
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  // 获取最新期刊号
  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }

  // 生成缓存的key名字
  _getKey(index) {
    let key = 'classic-' + index
    return key
  }


  getMyFavor(success){
    const params={
      url:'classic/favor',
      success:success
    }
    this.request(params)
  }
}
export {
  ClassicModel
}