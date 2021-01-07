import { IRouteConfig } from '../../typing'
import AboutPage from '@/pages/about'
import { ABOUT } from './path'

const routes: IRouteConfig[] = [
	{
		path: ABOUT,
		component: AboutPage,
		exact: true,
		pageTitle: '关于'
	}
]

export default routes
