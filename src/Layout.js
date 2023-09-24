import {
  BrowserRouter as Router,
  Outlet
} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { styled} from '@mui/material/styles';
import React from "react";
import HeaderSidebarContainer from './components/Header_Sidebar_Container';


function Layout() {

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

  return (
    <Box className='layout-container'>
      <CssBaseline/>
      <HeaderSidebarContainer DrawerHeader={DrawerHeader} />
      <Box component="main" className='main-container'>
        <DrawerHeader/>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout