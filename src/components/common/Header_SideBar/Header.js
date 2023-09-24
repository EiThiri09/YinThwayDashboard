import { React } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import Colors from '../../../assets/styles/js/Color';
//css
import '../../../assets/styles/scss/appbar_sidemenu.scss';


const Header = (
    { open,
        handleDrawerOpen,
        anchorElNav,
        handleClose,
        handleLogout,
        loginUser,
        handleMenu
    }) => {

    const drawerWidth = 300;


    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    return (
        <AppBar position="fixed" open={open} sx={{ backgroundColor: Colors.MainThemeColor }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerOpen}
                    sx={{
                        mr: 2,
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <div className="sidenav__heading-logo"></div>
                    <h1 className="sidenav__heading-title">Yin Thway</h1>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <div className="user-img"></div>
                    </IconButton>
                    <Menu
                        sx={{ 
                            mt: '45px',
                            ml: '83%',
                            justifyContent: 'right',
                            left: '0px',
                            display: 'block'
                        }}
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        open={Boolean(anchorElNav)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>
                            <Typography textAlign="center">
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <LogoutIcon sx={{ color: Colors.GrayThemeColor }} />
                                </IconButton>
                                Logout
                            </Typography>
                        </MenuItem>
                    </Menu>
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                        {loginUser?.email}
                    </Typography>
                </Box>
            </Toolbar>
            
        </AppBar>
    );
};

export default Header;