// 引入behavior
import {
  classicBeh
} from '../classic-beh.js'
// 实例化音频API
const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    //接收服务器传递过来的音频src
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlaying: false,
    pauseSrc: './images/player@pause.png',
    playSrc: './images/player@play.png'
  },
  // 生命周期，组件进入页面节点树时执行
  attached() {
    this._recoverStatus();
    this._monitorSwitch();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击播放暂停事件
    onPlay() {
      if (!this.data.isPlaying) { // 如果音乐没有播放，播放音乐
        this.setData({
          isPlaying: true
        })
        mMgr.src = this.properties.src
        mMgr.title = 'music'
      } else { //如果音乐播放了，暂停音乐
        this.setData({
          isPlaying: false
        })
        mMgr.pause();
      }
    },

    // 恢复播放按钮状态
    _recoverStatus() {
      // 没有音乐播放，isPlaying返回的是false
      if (mMgr.paused) {
        this.setData({
          isPlaying: false
        })
        return
      }
      // 播放了音乐的状态，如果音乐的src和properties的src相等，则给isPlaying设置成true
      if (mMgr.src == this.properties.src) {
        this.setData({
          isPlaying: true
        })
      }
    },

    // 监听音乐播放的状态
    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})