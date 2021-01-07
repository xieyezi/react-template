// 单个文件上传结果校验
export function checkUploadResult() {
	return {
		validator(_, value) {
			const file = value && value[0] ? value[0] : { size: 0 }
			if (file.status === 'error') {
				return Promise.reject('上传图片失败，请重新上传')
			} else if (file.size > 1024 * 1024 * 5) {
				return Promise.reject('图片不得大于5MB！')
			}
			return Promise.resolve()
		}
	}
}

// 多个文件上传结果校验
export function checkMultiUploadResult() {
	return {
		validator(_, values) {
			if (!values) {
				return Promise.resolve()
			}
			for (const file of values) {
				if (file.status === 'error') {
					return Promise.reject('上传图片失败，请重新上传')
				} else if (file.size > 1024 * 1024 * 5) {
					return Promise.reject('图片不得大于5MB！')
				}
			}
			return Promise.resolve()
		}
	}
}
