import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import App from './App.jsx'
import './index.css'
// Pages
import ErrorPage from './pages/error.jsx'
import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import Root from './pages/root.jsx'
import Home from './pages/home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <ErrorPage/>
  },
  {
    path: "login",
    element: <Login/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "home",
    element: <Home/>,
    errorElement: <ErrorPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
