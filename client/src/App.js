import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import { useAuth } from './hooks/auth.hook';

import {AuthContext} from './context/AuthContext'

const App = () => {
  const {token, userId, login, logout} = useAuth()
  const isAuthenticated = !!token

  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated
    }}>
    <Router>
      <section className="mt-5">  
        <div className="container">
          {routes}      
        </div>
      </section>
    </Router>
    </AuthContext.Provider>
  )
}

export default App