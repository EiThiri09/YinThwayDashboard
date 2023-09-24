
import Button from '@mui/material/Button';
//components
import Colors from '../../../assets/styles/js/Color';

export default function DefaultButton({ btnTitle, clickAction }) {
    return (
        <Button sx={{
            backgroundColor: Colors.MainThemeColor,textTransform: 'capitalize', padding: '8px 16px', color: Colors.BlackThemeColor, opacity: '0.8', fontWeight: '500',
            '&:hover': {
                boxShadow: `6px ${Colors.MainThemeColor}`,
                backgroundColor: Colors.MainThemeColor
            },
        }}
            onClick={clickAction}>{btnTitle}</Button>
    );
}
