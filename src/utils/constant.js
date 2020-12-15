/**
 * Created by Lucas on 2020/8/6.
 */

/**
 * 播放器状态
 * */
export const playStatus = {
    "UNINITIALIZED": "UNINITIALIZED",   // 尚未初始化
    "INITIALIZED": "INITIALIZED",       // 已经初始未播放
    "ON_PLAY": "ON_PLAY",               // 正常播放
    "PAUSED": "PAUSED",                 // 正常暂停
    "LOADING": "LOADING",               // 加载中
    "ERROR": "ERROR"                    // 错误状态
};

/**
 * 播放器错误类型
 * */
export const playErrors = {
    "PLAY_FAIL": "PLAY_FAIL",             // 播放失败
    "UNKNOWN": "UNKNOWN"                  // 未知错误
};
