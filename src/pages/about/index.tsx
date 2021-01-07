import React, { useState } from 'react'
import { connect } from 'react-redux'
import { IDispatch } from '@/models/connect'
import { namespace, IDvaState } from '@/models/about'
import { Input, Button } from 'antd'

interface IProps extends IDvaState, IDispatch {}

const AboutPage: React.FC<IProps> = ({ dispatch, info }) => {
	const [aboutInfo, setAboutInfo] = useState('')

	function changeInfo() {
		dispatch({
			type: `${namespace}/chageInfo`,
			payload: {
				val: aboutInfo
			}
		})
	}
	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setAboutInfo(e.target.value)
	}

	return (
		<div>
			<h1>This is an about page</h1>
			<p>{info}</p>
			<Input onChange={handleInputChange}></Input>
			<Button onClick={changeInfo}></Button>
		</div>
	)
}

const mapStateToProps = (models) => ({
	info: models[namespace].info
})
export default connect(mapStateToProps)(AboutPage)
