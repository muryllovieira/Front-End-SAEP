import React from 'react'
import ReactDOM from 'react-dom/client'

// 1- configurando a router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from "./src/routes/Login";
import Turmas from "./src/routes/Turmas";
import Atividades from "./src/routes/Atividades";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  
  },
  {
    path: "turmas",
    element: <Turmas />,
  
  },
  {
    path: "atividades",
    element: <Atividades />,
  
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
