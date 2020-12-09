/**
 * Created by Lucas on 2020/8/6.
 */

/**
 * 播放器状态
 * */
export const playStatus = {
    "UNINITIALIZED": -1,         // 尚未初始化
    "INITIALIZED": 10,           // 已经初始未播放
    "ON_PLAY": 20,               // 正常播放
    "PAUSED": 30,                // 正常暂停
    "LOADING": 40,               // 加载中
    "ERROR": 50                  // 错误状态
};

/**
 * 播放器错误类型
 * */
export const playErrors = {
    "INCOMPLETE_PARAMETERS": 300, // 不完整参数，如：没有fileId
    "PLAY_FAIL": 400,             // 播放失败
    "BREAK_OFF": 500,             // 中断，如：视频链接中断
    "UNKNOWN": 600                // 未知错误
};
