import { StrictMode } from 'react'
import router from './lib/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import React from 'react'
import '../src/css/main/main.css'



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
