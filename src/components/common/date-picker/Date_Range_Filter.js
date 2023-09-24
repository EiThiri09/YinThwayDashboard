import Box from '@mui/material/Box';
import '../../../assets/styles/scss/main.scss';
import DefaultButton from '../button/Default_Btn';
import Datepicker from "react-tailwindcss-datepicker";
import Colors from '../../../assets/styles/js/Color';
// import dayjs from 'dayjs';


function DateRangeFilter({ dateRangeValue , handleDateRangeChange , handleClickFilter }) {

    return (
        <Box sx={{ display: 'flex' }}>
            <Datepicker
                value={dateRangeValue}
                onChange={handleDateRangeChange}
                placeholder="pick a date range"
                inputClassName={"react-date-range-picker"}
                containerClassName={"react-date-picker-container"}
                primaryColor={Colors.WhiteThemeColor}
                //startFrom={new Date('2023-01-01')} 
                //maxDate={new Date()}
                //minDate={dayjs('2017-01-01')}
                //useRange={true}
                //displayFormat={"DD/MM/YYYY"} 
                //minDate={}
                //readOnly={true}
            />
            <DefaultButton btnTitle="Filter" clickAction={handleClickFilter}/>
        </Box>
    );
}

export default DateRangeFilter;
