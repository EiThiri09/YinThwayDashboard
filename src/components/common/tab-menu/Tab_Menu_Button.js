import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
//css
import '../../../assets/styles/scss/tab_menu.scss';
import Colors from '../../../assets/styles/js/Color';


function TabMenu({ tabValue, handleChange }) {


    return (
        <Stack
            direction="row"
            className='tab-menu-container'
            divider={<Divider color={Colors.MainThemeColor} orientation="vertical" flexItem />}
        >
            <Button className={`tab-menu-item ${tabValue === "NW" ? 'active' : ''}`} value="NW" onClick={handleChange}>NW</Button>
            <Button className={`tab-menu-item ${tabValue === "OPD" ? 'active' : ''}`} value="OPD" onClick={handleChange}>OPD</Button>
            <Button className={`tab-menu-item ${tabValue === "ERC" ? 'active' : ''}`} value="ERC" onClick={handleChange}>ERC</Button>
            <Button className={`tab-menu-item ${tabValue === "IPD" ? 'active' : ''}`} value="IPD" onClick={handleChange}>IPD</Button>
        </Stack>
    );
}

export default TabMenu;
