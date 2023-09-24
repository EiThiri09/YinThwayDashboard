import { React, useState, useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
//components
import AuthContext from '../store/Auth-context';
import Header from './common/Header_SideBar/Header';
import SideBarDrawer from './common/Header_SideBar/Side_Bar_Drawer';


const HeaderSidebarContainer = ({ DrawerHeader }) => {

    const [open, setOpen] = useState(false);
    const [anchorElNav, setAnchorEl] = useState(null);
    

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const loginUser = authCtx.user;

    const handleLogout = () => {
        authCtx.logout();
        navigate("/");
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Header
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                anchorElNav={anchorElNav}
                handleClose={handleClose}
                handleLogout={handleLogout}
                loginUser={loginUser}
                handleMenu={handleMenu}
            />
            <SideBarDrawer
                open={open}
                DrawerHeader={DrawerHeader}
                handleDrawerClose={handleDrawerClose} />
        </div>
    );
};

export default HeaderSidebarContainer;