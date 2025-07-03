import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/flight-attendant-alarm/sw.js')
      .then(registration => {
        console.log('Service Worker înregistrat:', registration)
      })
      .catch(error => {
        console.log('Eroare Service Worker:', error)
      })
  })
}