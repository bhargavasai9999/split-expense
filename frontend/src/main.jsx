import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
    <ToastProvider>
    <App />
    </ToastProvider>
  
  </BrowserRouter>,
)
