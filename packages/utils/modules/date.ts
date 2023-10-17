import 'dayjs/locale/zh-cn' // 导入中文本地化配置

import dayjs from 'dayjs'

// 设置本地化语言为中文
dayjs.locale('zh-cn')

export const formatDate = (date?: string | number | dayjs.Dayjs | Date, format = 'YYYY/MM/DD HH:mm:ss') =>
  dayjs(date).format(format)

const timeGreetings = ['早上好', '上午好', '中午好', '下午好', '晚上好']
export const getTimeGreeting = (hour = new Date().getHours()) => {
  let text = ''
  // 判断当前时间段
  if (hour >= 0 && hour < 9) {
    text = timeGreetings[0]
  } else if (hour >= 9 && hour < 11) {
    text = timeGreetings[1]
  } else if (hour >= 11 && hour < 13) {
    text = timeGreetings[2]
  } else if (hour >= 13 && hour < 18) {
    text = timeGreetings[3]
  } else if (hour >= 18 && hour < 24) {
    text = timeGreetings[4]
  }
  return text
}
