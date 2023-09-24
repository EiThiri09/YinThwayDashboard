import { React } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
//components
import '../../../assets/styles/scss/appbar_sidemenu.scss';
import menus from '../../../const/Side_Bar_Menu_List';
import CUSTOM_ICON_PACK from '../../../const/Icon_packs';
import Colors from '../../../assets/styles/js/Color';

const SideBarDrawer = ({ 
    DrawerHeader ,
    handleDrawerClose ,
    open, 
}) => {

    const drawerWidth = 300;

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );

    const sidemenu_items = menus;
    const theme = useTheme();
    const location = (useLocation()).pathname;

    return (
        <Drawer variant="permanent" open={open} className="drawer-container">
            <Box>
                <DrawerHeader >
                    {/* <Typography sx={{ display: 'flex', alignItems: 'center', color: '#81d1d0', fontWeight: 'bold', fontSize: '1rem' }}>
                            Yin Thway
                        </Typography> */}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <List className={`list-menu-container ${open ? 'open' :''}`}>
                    
                    {sidemenu_items.map((text, index) => (
                        <ListItem key={index} className={`list-menu-item ${text.type === 'link' ? open ? 'open' : 'close' : ''} ${text.link === location ? 'active' : ''}`} disablePadding sx={{ display: 'block', fontWeight: 'bold', fontSize: '1rem' }}>
                            {
                                text.type === 'title' && (
                                    <Typography className={`list-item-muted-label ${!open ? 'close': ''}`}>
                                        {text.title}
                                    </Typography>
                                )
                            }
                            {
                                text.type === 'link' && (
                                    <Link to={text.link} className="list-item-link" >
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 20,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                    '&.css-1fqi8hc-MuiButtonBase-root-MuiListItemButton-root':{
                                                        color: Colors.GrayThemeColor,
                                                       
                                                    }
                                                }}

                                            >
                                               {CUSTOM_ICON_PACK[text.icon]}
                                            </ListItemIcon>
                                            <ListItemText primary={text.title} className={`list-item-text ${open ? 'open':''}`} />
                                        </ListItemButton>
                                    </Link>

                                )
                            }

                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default SideBarDrawer;