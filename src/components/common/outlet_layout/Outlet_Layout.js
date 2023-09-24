//library
import Box from '@mui/material/Box';
//component
import BarChart from "../Bar_Chart";
import DateRangeTableWrapper from "../DateRange_Table_Wrapper";

function OutletLayout({ pageTitle }) {

  return (
    <div>
      <Box className="component-title">{pageTitle}</Box>
      <Box className="outlet-box">
        {
          pageTitle !== "Sale Transaction" && (
            <BarChart />
          )
        }
        <DateRangeTableWrapper />
      </Box>
    </div>

  );
}

export default OutletLayout;
