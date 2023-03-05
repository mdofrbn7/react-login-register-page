import React ,{useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from './layouts/Login_Register_Admin/LoginPage'
import RegisterPage from './layouts/Login_Register_Admin/RegisterPage'
import HomePage from './layouts/Dashboard/HomePage'
import ErrorNotFound from './components/ErrorNotFound'
import AdminInfo from './layouts/Login_Register_Admin/AdminInfo'
import ShowMessagesLog from './layouts/Dashboard/ShowMessagesLog'
import EditPage from './layouts/Dashboard/EditPage'

import { ADD_ACC_PAGE, ADMIN_PAGE, BRANCHS, EDIT_PAGE, ERROR_PAGE, HOME_DASHBOARD, KEYS_PAGE, LOGIN_PAGE, LOG_PAGE } from './CONSTANTS/ROUTE_CONSTANTS'
import NavBar from './components/NavBar'
import keys from './layouts/Dashboard/keys'
import './App.css'
import AllBranch from './layouts/Dashboard/AllBranch'

function DefaultRoutes() {

    
    
    return (


        <Switch>
            {/* <Route exact path={HOME_DASHBOARD} component={ HomePage } /> */}
            <Route path={HOME_DASHBOARD} component={ HomePage } />
            <Route path={BRANCHS} component={ AllBranch } />
            <Route path={ADD_ACC_PAGE} component={ RegisterPage } />
            <Route path={EDIT_PAGE} component={ EditPage } />
            <Route path={KEYS_PAGE} component={ keys } />
            <Route path={LOG_PAGE} component={ ShowMessagesLog } />
            <Route path={ADMIN_PAGE} component={ AdminInfo } />
            <Route path={LOGIN_PAGE} component={ LoginPage } />
            <Route path={ERROR_PAGE} component={ ErrorNotFound } />
        </Switch>

    )
}

export default DefaultRoutes
