// 正整数验证
export const integerVerifyRule = { pattern: new RegExp(/^[+]{0,1}(\d+)$/g), message: '请填写正确的数字' }

// 数字校验规则
export const numberVerifyRule = { pattern: new RegExp(/^(0|([1-9]\d*))(\.\d+)?$/g), message: '请填写数字' }

export const numberDecimal2VerifyRule = {
	pattern: new RegExp(/^(0|([1-9]\d*))(\.\d{0,2})?$/g),
	message: '最多只能输入两位小数'
}
