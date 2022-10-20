import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
// We need BrowserRouter to wrap our app and have routing
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* BrowserRouter wrap our app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
