import { getLocalStorage } from './storage'
import config from '@/config'
import Axios from 'axios'
import _ from 'lodash'
import { parse } from 'qs'
import { ActionType } from '@/pages/goods-manage/shopping-recommend/add/components/editable-table/editable-table'
/**
 * 根据文件base64
 */
export function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
}

interface Returned {
	[key: string]: any
}

/**
 * 将一个url字符串的查询部分解析成对象
 * @param str 字符串 ?xxx=111
 */
export function covertSearch2Obj(str: string): Returned {
	str = str.replace('?', '')
	const arrs = str.split('&')
	const temp = {}
	for (const q of arrs) {
		const t = q.split('=')
		temp[t[0]] = t[1]
	}
	return temp
}

/**
 * 求数组笛卡尔积
 *
 * @param {*} list
 * @returns
 */
export function descartes(list) {
	//parent上一级索引;count指针计数
	const point = {}
	const result = []
	let pIndex = null
	let tempCount = 0
	let temp = []
	//根据参数列生成指针对象
	for (const index in list) {
		if (typeof list[index] == 'object') {
			point[index] = { parent: pIndex, count: 0 }
			pIndex = index
		}
	}
	//单维度数据结构直接返回
	if (pIndex == null) {
		return list
	}
	//动态生成笛卡尔积
	for (;;) {
		// eslint-disable-next-line no-var
		for (var index in list) {
			tempCount = point[index]['count']
			temp.push(list[index][tempCount])
		}
		//压入结果数组
		result.push(temp)
		temp = []
		//检查指针最大值问题
		for (;;) {
			if (point[index]['count'] + 1 >= list[index].length) {
				point[index]['count'] = 0
				pIndex = point[index]['parent']
				if (pIndex == null) {
					return result
				}
				//赋值parent进行再次检查
				index = pIndex
			} else {
				point[index]['count']++
				break
			}
		}
	}
}
/**
 *
 * 列表转树结构
 * @param arr 列表
 * @param pid 父id
 */
export function arrayToTree(arr, pid) {
	const temp = []
	const treeArr = arr
	treeArr.forEach((item, index) => {
		if (item.pid === pid) {
			if (arrayToTree(treeArr, treeArr[index].id).length > 0) {
				treeArr[index].children = arrayToTree(treeArr, treeArr[index].id)
			}
			temp.push(treeArr[index])
		}
	})
	return temp
}
/**
 * 非空数组join with ' '
 * @param arrays 待join的字符串数组
 */
export function notEmptyArrayJoin(...arrays: string[]) {
	const blackList = [null, undefined, '']
	return arrays.filter((item) => !blackList.includes(item)).join(' ')
}

/**
 * 非空数组join with ' '
 * @param arrays 待join的字符串数组
 */
export function notEmptyArrayJoinWith(spliter, ...arrays: string[]) {
	const blackList = [null, undefined, '']
	return arrays.filter((item) => !blackList.includes(item)).join(spliter)
}

export async function uploadFile(url, file: Blob, body: any = {}) {
	// eslint-disable-next-line no-useless-catch
	try {
		// 创建form对象
		const param = new FormData()
		// 通过append向form对象添加数据
		Object.keys(body).forEach((key) => {
			param.append(key, body[key])
		})
		param.append('file', file)
		const requestConfig = {
			headers: {
				'Content-Type': 'multipart/form-data',
				[config.authKey]: getLocalStorage(config.authKey)
			}
		}
		const resp = Axios.post(url, param, requestConfig)
		return resp as Promise<any>
	} catch (e) {
		throw e
	}
}

/**
 * 根据子数组id查找完整id数组
 * @param list 列表
 * @param idArr 父id列表
 */
export function getParentIdList(list, idArr) {
	const tempArr = JSON.parse(JSON.stringify(idArr))
	const pid = idArr[0]
	const pObj = _.find(list, { id: pid })
	if (!pObj) {
		return false
	}
	if (pObj.pid !== '0') {
		tempArr.unshift(pObj.pid)
		return getParentIdList(list, tempArr)
	} else {
		return tempArr
	}
}
interface IObj {
	[key: string]: any
}

/**
 * 判断某个对象是否不含任何实际可用值
 * @param value 对象
 * @param whiteKeys 顶层对象的白名单key
 */
export function isEmptyValue(value, whiteKeys?: string[]) {
	for (const key of Object.getOwnPropertyNames(value)) {
		if (whiteKeys && whiteKeys.includes(key)) {
			continue
		}
		const item = value[key]
		if (Object.prototype.toString.call(item) === '[object Object]') {
			const itemEmpty = isEmptyValue(item)
			if (!itemEmpty) {
				return false
			}
		} else {
			if (item !== undefined && item !== '') {
				return false
			}
		}
	}
	return true
}

/**
 * 获取url参数
 */
export function getPageQuery() {
	return parse(window.location.href.split('?')[1])
}

export function execFunction(func) {
	if (typeof func === 'function') {
		return func()
	}
}
/**
 * 导出 流方式
 *
 * const sendData = {
 *    Authorization: this.state.Authorization,
 *  }
 *  exportFile('/api/admin/platform/downloadReceiptProfitTemplate.xls', sendData)
 */
export const exportFile = (url, params, removeTime = 4000) => {
	const urlParams = []
	for (const p of Object.keys(params)) {
		const key = p
		const value = params[p]
		if (value !== undefined && value !== null && value !== '') {
			urlParams.push({
				key,
				value
			})
		}
	}
	urlParams.push({ key: 'Authorization', value: getLocalStorage(config.authKey) })
	const exportForm = document.createElement('form')
	exportForm.method = 'get'
	exportForm.action = url
	exportForm.style.display = 'none'
	urlParams.forEach((v) => {
		const input = document.createElement('input')
		input.type = 'text'
		input.name = v.key
		input.value = v.value
		exportForm.appendChild(input)
	})

	document.body.appendChild(exportForm)

	exportForm.submit()

	setTimeout(() => {
		// 移除dom，避免越来越多
		document.body.removeChild(exportForm)
	}, removeTime)
}

/**
 * 字符串分割符拼接
 * @param brefore 第一个字符串
 * @param after 第二个字符串
 * @param spliter 分隔符
 */
export function renderWithSpliter(brefore = '', after = '', spliter = '/') {
	const useSpliter = !!brefore && !!after
	return `${brefore}${useSpliter ? spliter : ''}${after}`
}

/**
 * 根据操作类型，位移列表数据
 * @param list 列表
 * @param id 目标元素
 * @param type 操作类型
 */
export function shiftItem(list = [], targetId, type) {
	let newList = []
	const targetItem = list.find((e) => e.id === targetId)
	const targetItemIndex = list.findIndex((e) => e.id === targetId)
	newList = list.filter((e) => e.id !== targetId)
	switch (type) {
		case ActionType.Top:
			newList.splice(0, 0, targetItem)
			break
		case ActionType.Up:
			newList.splice(targetItemIndex - 1, 0, targetItem)
			break
		case ActionType.Down:
			newList.splice(targetItemIndex + 1, 0, targetItem)
			break
		default:
			break
	}
	return newList
}

export function executeCallback(callback) {
	// tslint:disable-next-line: no-unused-expression
	typeof callback === 'function' && callback()
}
