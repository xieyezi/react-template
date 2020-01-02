import { message } from 'antd'
import { app as store } from '@/App'

const errorCode = {
  c10002: 10002,
  c10019: 10019,
  c10020: 10020,
  c330024: 330024
}
const errorMsg = '报告！服务器出了点小问题，稍后再试试...'
// const loginNoInDate = '您的登陆信息已经过期,请重新登陆'

function handleCommonError(err, config) {
  const { code } = err
  switch (code) {
    case errorCode.c10002:
    case errorCode.c10019:
    case errorCode.c10020: {
      // TODO:跳转到登陆页面
      store._store.dispatch({
        type: 'login/logout'
      })

      break
    }
    default: {
      if (!config.noErrorTip) {
        handleNoCommontError(err)
      }
    }
  }
}
function handleNoCommontError(err) {
  if (!err) {
    message.error(errorMsg)
  } else if (err.errorItems && err.errorItems.length > 0 && err.errorItems[0].message) {
    message.error(err.errorItems[0].message)
  } else if (err.message) {
    message.error(err.message)
  } else {
    message.error(err)
  }
}
export { handleCommonError, handleNoCommontError, errorMsg, errorCode }
