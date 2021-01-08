import React, { useState } from 'react'
import { Button } from 'antd'
import styles from './style.module.scss'
import logo from '../../logo.svg'

interface IProps {}

const HomePage: React.FC<IProps> = () => {
	const [count, setConunt] = useState(0)

	function addCount(val = 1) {
		setConunt(val)
	}

	return (
		<div className={styles.home}>
			<img src={logo} className="App-logo" alt="logo" />
			<h1>Welcome to React + TypeScript</h1>
			<Button size="large" onClick={() => addCount(count + 1)}>
				count is: {count}
			</Button>
		</div>
	)
}

export default HomePage
