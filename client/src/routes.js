import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

// pages
import LinksPage from './pages/LinksPage'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import AuthPage from './pages/AuthPage'

// layout components
import Navbar from './components/Navbar'

export const useRoutes = isAuthenticated => {

    if (isAuthenticated) {
        return (
            <div className="container">
                <Navbar />

                <Switch>
                    <Route path="/links" exact>
                        <LinksPage />
                    </Route>
                    <Route path="/create" exact>
                        <CreatePage />
                    </Route>
                    <Route path="/detail/:id">
                        <DetailPage />
                    </Route>
                    <Redirect to="/create" />
                </Switch>
            </div>
                
                
        )
    }

    return (
        <Switch>
            <Route path="/auth" exact>
                <AuthPage />
            </Route>
            <Redirect to="/auth" />
        </Switch>
    )
}