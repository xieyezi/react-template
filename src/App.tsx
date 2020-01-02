import React from 'react'
import logo from './logo.svg'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App

/**
 * template of App.tsx
 */
// import { hot } from 'react-hot-loader/root'
// import React from 'react'
// import Router from '@/routes'

// import dva from '@/utils/dva/index'
// import models from '@/models'

// import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
// import { I18NContextWrapper } from './i18n/context'

// import { ConfigProvider } from 'antd'
// import zhCN from 'antd/lib/locale-provider/zh_CN'
// import moment from 'moment'
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn')

// const createHistory = require('history').createBrowserHistory
// export const history = createHistory()
// export const routerReducer = connectRouter(history)
// export const routerMiddlewareForDispatch = routerMiddleware(history)

// export const app = dva({
//   models,
//   initState: {},
//   extraReducers: { router: routerReducer },
//   onAction: [routerMiddlewareForDispatch]
// })

// const f: React.FC = app.start(
//   <ConnectedRouter history={history}>
//     <I18NContextWrapper>
//       <ConfigProvider locale={zhCN}>
//         <Router />
//       </ConfigProvider>
//     </I18NContextWrapper>
//   </ConnectedRouter>
// )
// export default process.env.NODE_ENV === 'development' ? hot(f) : f