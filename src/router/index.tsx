import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './config/index'

const Router: React.FC = () => {
	return (
		<Switch>
			{routes.map((item) => {
				return <Route exact={item.exact} key={item.path} path={item.path} component={item.component} />
			})}
		</Switch>
	)
}
export default Router
