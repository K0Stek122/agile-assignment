import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { SidebarProvider } from './components/ui/sidebar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/membership" element={<div>Membership Page</div>} />
        </Routes>
      </SidebarProvider>
    </HashRouter>
  </React.StrictMode>,
)

// Only available when running inside Electron with preload bridge.
window.ipcRenderer?.on('main-process-message', (_event, message) => {
  console.log(message)
})
