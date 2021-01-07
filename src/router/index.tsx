import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './config/index'

const Router: React.FC = () => {
	return (
		<Switch>
			{routes.map((item) => {
				// if (item.auth) {
				// 	return (
				// 		<Route
				// 			key={item.path}
				// 			render={() => {
				// 				const Comp = item.component
				// 				return <Comp />
				// 			}}
				// 		/>
				// 	)
				// }
				return <Route key={item.path} component={item.component} />
			})}
		</Switch>
	)
}

export default Router
