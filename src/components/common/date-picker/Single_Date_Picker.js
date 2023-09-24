import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function SingleDatePicker({ staticDateValue, handleChangeDateValue ,dateType }) {


    return (
        <DatePicker
            id="date-picker"
            label="For desktop"
            value={staticDateValue[dateType]}
            className="chart-date-range-picker"
            minDate={dayjs('2017-01-01')}
            maxDate={new Date()}
            disableMaskedInput={true}
            onChange={(newValue) => handleChangeDateValue(newValue,dateType)}
            renderInput={(params) => <TextField {...params} label="" inputProps={{ ...params.inputProps, readOnly: true }} />}
            inputFormat="ll"
        />
    );
}

export default SingleDatePicker;
