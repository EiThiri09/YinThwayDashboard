import { createRef ,useContext } from "react";
import Box from '@mui/material/Box';
import { CSVLink } from "react-csv";
//component
import GlobalContext from "../../store/Global_Context";
import DefaultButton from '../common/button/Default_Btn';

function ExportCSV({ pageState ,downloadReport ,csvLinkEl }) {

    // const csvLinkEl = createRef(null);
    const tableData = pageState;
    const {csvColumnHeader ,CsvFileName} = useContext(GlobalContext);

    // const downloadReport = () => {
    //     csvLinkEl.current.link.click();
    // }

    return (
        <Box>
            <CSVLink
                headers={csvColumnHeader}
                filename={CsvFileName}
                data={tableData}
                ref={csvLinkEl}
            />
            <DefaultButton btnTitle="Export CSV" clickAction={downloadReport}/>
        </Box>
    );
}

export default ExportCSV;
