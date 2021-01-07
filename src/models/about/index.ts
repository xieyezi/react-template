export const namespace = 'about'

export interface IDvaState {
	info: string
}

const state: IDvaState = {
	info: 'welcome use dva-core model'
}
const aboutModel = {
	namespace,
	state,
	effects: {
		*chageInfo({ payload }, { put }) {
			try {
				const { val } = payload
				yield put({
					type: 'setState',
					payload: { info: val }
				})
			} catch (error) {}
		}
	},
	reducers: {
		setState(state, { payload }) {
			return { ...state, ...payload }
		}
	}
}

export default [aboutModel]
