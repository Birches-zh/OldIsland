// 向服务器发送点赞和取消点赞
import {
  HTTP
} from '../util/http.js'

class LikeModel extends HTTP {
  // 发送点赞状态
  getLike(behavior, art_id, type) {
    const url = behavior == 'like' ? 'like' : 'like/cancel'
    this.request({
      method: "POST",
      url: url,
      data: {
        art_id: art_id,
        type: type
      }
    })
  }
  getClassicLikeStatus(atr_id, type, sCallback) {
    this.request({
      url: `classic/${type}/${atr_id}/favor`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
}

export {
  LikeModel
}