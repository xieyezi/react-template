interface IConfig {
  authKey: string
  baseUrl: string
  /**
   * token最小剩余时间，小于该值，就默认失效了，需要重新登录
   */
  tokenMinRemainTimeStamp: number
  orderClientName: 'web' | 'ios' | 'android'
}
const config: IConfig = {
  baseUrl: '',
  authKey: 'Authorization',
  tokenMinRemainTimeStamp: 1 * 60 * 1000,
  orderClientName: 'web'
}
const env = process.env.REACT_APP_CONFIG_ENV || 'prod'
const envConfig = require(`./config.${env}`).default || {}
export default Object.assign({}, config, envConfig) as IConfig
