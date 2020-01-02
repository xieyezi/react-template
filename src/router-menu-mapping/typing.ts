export interface IMenuProps {
  /**
   * 是不是路由,true为是路由，false为不是
   *- 主要用来标注存在子菜单/子路由时，当前菜单也包是一个路由
   */
  isRoute?: boolean
  /**
   * 需不需要要layout布局，true为不需要，false为需要
   * - 因为有些页面不需要layout布局，纯粹的单独路由页面
   */
  noLayout?: boolean
  /**
   * 是不是菜单，true为不是菜单，false为菜单
   * - 因为路由不是菜单，所以需要单独标记
   */
  noMenu?: boolean
  /**
   * 父级menuCode
   */
  upMenuCode: string
  /**
   * 菜单Scope
   */
  menuScope?: string
  /**
   * 菜单Code
   */
  menuCode: string
  /**
   * menu名称
   */
  menuName: string
  /**
   * menu图标
   */
  menuIcon?: any
  /**
   * menu对应的Route路径
   */
  routePath?: string
  /**
   * menu对应的Component路径
   */
  componentPath?: string
}
export interface IRouterMenuMapping {
  [key: string]: IRouteMenuMap
}
export interface IRouteMenuMap {
  /**
   * 子菜单
   */
  menuChildren: IRouterMenuMapping
  /**
   * 菜单属性
   */
  menuProps: IMenuProps
}
