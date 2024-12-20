import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"

import { Context, stores } from '../context'

import router from "./router"
import "./styles/index.css"




const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)





root.render(
  <Context.Provider value={ stores }>
    <RouterProvider router={ router } />
  </Context.Provider>
)
