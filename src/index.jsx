import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { isConnected, mountData } from './utils/connection'

import Navbar from './containers/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import User from './pages/User'
import SignIn from './pages/SignIn'
import NoMatch from './pages/NoMatch'
import './styles/main.css'

if (isConnected()) {
  mountData()
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user" element={<User />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
