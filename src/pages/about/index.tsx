import React, { useState } from 'react'
import { connect } from 'react-redux'
import { IDispatch } from '@/models/connect'
import { namespace, IDvaState } from '@/models/about'
import { Input, Button } from 'antd'
import styles from './style.module.scss'

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
		<div className={styles.about}>
			<h1>This is an about page</h1>
			<p>{info}</p>
			<Input placeholder="input something to change info..." onChange={handleInputChange}></Input>
			<Button type="primary" onClick={changeInfo}>
				change Info
			</Button>
		</div>
	)
}

const mapStateToProps = (models) => ({
	info: models[namespace].info
})
export default connect(mapStateToProps)(AboutPage)
