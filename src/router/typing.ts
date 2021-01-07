export interface Ibreadcrumb {
	title: string
	path: string
}

export interface IRouteConfig {
	path: string
	exact?: boolean
	component: React.ComponentType<any>
	pageTitle?: string
	strict?: boolean
	auth?: boolean
}
