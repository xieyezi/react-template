import systemConfig from '@/config'
import { getLocalStorage } from '@/utils/storage'
import axios, { AxiosRequestConfig } from 'axios'
import { app as store } from '@/App'
import { errorCode, errorMsg, handleCommonError, handleNoCommontError } from './errorHandle'
import qs from 'qs'
type requestOptions = AxiosRequestConfig & {
	url: string
	noLoading?: boolean
	body?: any
	headers?: any
}
const { baseUrl, authKey } = systemConfig
axios.interceptors.response.use(
	(response: any) => {
		store._store.dispatch({
			type: 'global/setState',
			payload: {
				loading: false
			}
		})
		return response.data
	},
	(error) => {
		const { response } = error
		store._store.dispatch({
			type: 'global/setState',
			payload: {
				loading: false
			}
		})
		// 请求有响应
		if (response) {
			const { status, data, config } = response
			data.message = data.message || errorMsg
			const { code, message } = data
			if (status === 400 || status === 401) {
				handleCommonError(data, config)
				// TODO:当状态码为400时
				const errorObj = { code, message }
				if (data && data.code >= 240015 && data.code <= 240021) {
					return Promise.reject(new Error(JSON.stringify(errorObj)))
				}
				if (data && data.code === errorCode.c330024) {
					return Promise.reject(new Error(JSON.stringify(errorObj)))
				}
				return Promise.reject(message)
			}
			// 404 502 ..
			// const msg = errorMsg
			handleNoCommontError(errorMsg)
			return Promise.reject(errorMsg)
			// throw message;
		}
		// 请求超时
		if (error.code === 'ECONNABORTED') {
			// 请求超时
			const timeoutMsg = '请求超时，请稍后再试'
			handleNoCommontError(timeoutMsg)
			return Promise.reject(timeoutMsg)
		}
		const networkErrorMsg = '您的网络出现问题，请检查网络重试'
		handleNoCommontError(networkErrorMsg)
		return Promise.reject(networkErrorMsg)
	}
)
// TODO: 添加options 类型interface
export default async function request(options: requestOptions) {
	const { url } = options
	delete options.url
	// const hasApi = url.indexOf('api') !== -1 // true => no
	const Authorization = getLocalStorage(authKey)
	let headers = {}
	if (options) {
		headers = options.headers || {}
	}
	if (Authorization) {
		headers[authKey] = Authorization
	}
	const defaultOptions = {
		headers: {
			...headers
		},
		credentials: 'include',
		timeout: 10000,
		withCredentials: true,
		validateStatus(status: any) {
			return status >= 200 && status < 300 // default
		}
	}
	if (options) {
		delete options.headers
	}
	const newOptions: requestOptions = { ...defaultOptions, ...options }
	newOptions.data = newOptions.body
	if (newOptions.method === 'get') {
		newOptions.paramsSerializer = (params) => {
			return qs.stringify(params, { arrayFormat: 'repeat' })
		}
	}
	delete newOptions.body
	if (!newOptions.noLoading) {
		store._store.dispatch({
			type: 'global/setState',
			payload: {
				loading: true
			}
		})
	}
	const newUrl = baseUrl + url
	// const newUrl = hasApi ? baseUrl + url : url
	return axios(newUrl, newOptions)
}
