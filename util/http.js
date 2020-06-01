// 导入config的配置代码
import {
  config
} from '../config.js'

const tips = { //错误信息
  0: '发生了未知错误',
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',
  3000: '该期内容不存在'
}
// http请求类
class HTTP {
  // 封装http请求方法
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      method: params.method,
      header: { //通过请求头传递appkey
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) { //返回数据的状态码是否以2开头
          params.success && params.success(res.data) //成功获取到数据通过回调函数把数据传递出去
        } else {
          this._show_error(res.data.error_code)
        }
      },
      fail: (err) => { //fail是在网络中断才会执行
        this._show_error(0)
      }
    })
  }
  // 处理错误的情况,私有方法
  _show_error(error_code) {
    if (!error_code) {
      error_code = 0
    }
    const tips = tips[error_code];
    wx.showToast({
      title: tips ? tips[error_code] : 0,
      icon: 'none',
      duration: 1500
    })
  }
}
export {
  HTTP
}