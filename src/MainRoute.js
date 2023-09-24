import {
    BrowserRouter as Router,
    Navigate
} from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import { React, useContext } from 'react';
//com
import Dashboard from './components/Dashboard'
import RegisterUser from './components/child/Register_User';
import Layout from './Layout';
import TotalRevenue from './components/child/Total_Revenue';
import LoginForm from './pages/Login_Form';
import SaleTransaction from './components/child/Sale_Transaction';
import ErrorPage from './pages/Error_Page';
import AuthContext from './store/Auth-context';


function MainRoute() {

    const authCtx = useContext(AuthContext);

    const PublicRoute = ({ children }) => {

        let isLogged = authCtx.isLoggedIn;

        if (isLogged) {
            return <Navigate to="/dashboard" />;
        }
        return children;
    };

    const ProtectedRoute = ({ children }) => {

        let isLogged = authCtx.isLoggedIn;

        if (!isLogged) {
            return <Navigate to="/" />;
        }
        return children;
    };

    return (
        <Routes>
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>} >
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/child/users' element={<RegisterUser />}></Route>
                <Route path='/child/total-revenue' element={<TotalRevenue />}></Route>
                <Route path='/child/sale-transaction' element={<SaleTransaction />}></Route>
            </Route>
            <Route path='/' element={<PublicRoute><LoginForm /></PublicRoute>}></Route>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}

export default MainRoute