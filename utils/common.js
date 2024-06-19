/**
* 显示消息提示框
* @param content 提示的标题
*/
export function toast(content) {
  uni.showToast({
    icon: 'none',
    title: content
  })
}

/**
* 显示模态弹窗
* @param content 提示的标题
*/
export function showConfirm(content) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: content,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        resolve(res)
      }
    })
  })
}

/**
* 参数处理
* @param params 参数
*/
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}


export function getFormatTime(timeStamp){
	var dateTime = new Date(timeStamp);
	var no1new = dateTime.valueOf();
	var year = dateTime.getFullYear();
	var month = dateTime.getMonth() + 1;
	var day = dateTime.getDate();
	var hour = dateTime.getHours();
	var minute = dateTime.getMinutes();
	var second = dateTime.getSeconds();
	var now = new Date();
	var now_new = now.valueOf();
	var milliseconds = 0;
	var timeSpanStr;

	milliseconds = now_new - no1new;

	if (milliseconds <= 1000 * 60 * 1) {
		timeSpanStr = '刚刚';
	}else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
		timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
	}else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
		timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
	}else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
		timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
	}else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
		// timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		timeSpanStr = year + '-' + month + '-' + day
	}else {
		// timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		timeSpanStr = year + '-' + month + '-' + day
	}
	
	return timeSpanStr;
	}