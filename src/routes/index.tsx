/**
 * template of routes
 */
// import React, { Component, Fragment } from 'react'
// import { Route } from 'react-router-dom'
// import Layout from '@/pages/layout'
// import { routerMenuMappings } from '@/router-menu-mapping'
// import { getAllRoutes } from '@/utils/tools/router-menu'
// import { asyncComponent } from '@/utils/tools/react'
// import AuthComponent from '@/pages/auth'
// import { IMenuProps } from '@/router-menu-mapping/typing'
// import { connect } from 'react-redux'
// import { namespace } from '@/models/global/login'
// interface IProps {
//   isLogin?: boolean
//   isPrint?: boolean
// }
// class Router extends Component<IProps> {
//   render() {
//     const routes: IMenuProps[] = []
//     getAllRoutes(routerMenuMappings, routes)
//     const { isLogin, isPrint } = this.props

//     if (isPrint) {
//       return (
//         <Fragment>
//           <Route path="/" exact component={() => <AuthComponent isNeedReplace={false} />} />
//           <>
//             <Route path="/print" exact component={asyncComponent(() => import('@/pages/print'))} />
//             <Route component={AuthComponent} />
//           </>
//         </Fragment>
//       )
//     }
//     return (
//       <Fragment>
//         <Route path="/" exact component={() => <AuthComponent isNeedReplace />} />

//         {isLogin ? (
//           routes.map((item, index) => {
//             const ChildComponent = asyncComponent(() => import(`@/pages${item.componentPath}`))
//             return (
//               <Route
//                 strict
//                 exact
//                 key={item.menuCode}
//                 path={item.routePath}
//                 component={() => (
//                   <AuthComponent>
//                     {item.noLayout ? (
//                       <ChildComponent />
//                     ) : (
//                       <Layout routes={routes}>
//                         <ChildComponent />
//                       </Layout>
//                     )}
//                   </AuthComponent>
//                 )}
//               />
//             )
//           })
//         ) : (
//           <>
//             <Route path="/login" exact component={asyncComponent(() => import('@/pages/login'))} />
//             <Route component={AuthComponent} />
//           </>
//         )}
//       </Fragment>
//     )
//   }
// }
// const mapStateToProps = models => {
//   return models[namespace]
// }
// export default connect(mapStateToProps)(Router)
