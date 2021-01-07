import React, { useState } from 'react'
import { Button } from 'antd'
import styles from './style.module.scss'

interface IProps {}

const HomePage: React.FC<IProps> = () => {
	const [count, setConunt] = useState(0)

	function addCount(val = 1) {
		setConunt(val)
	}

	return (
		<div className={styles.home}>
			<h1>Welcome to React + TypeScript</h1>
			<Button onClick={() => addCount(count + 1)}>{count}</Button>
		</div>
	)
}

export default HomePage
