import { GetDailyChildRevenue, GetAllChildRevenue } from "../../services/Api_Services";
import { Revenue_Table_Header ,CSV_Revenue_Table_Header ,Revenue_Bar_Label } from '../../const/Table_Header_Menus';
import { GlobalContextProvider } from "../../store/Global_Context";
import OutletLayout from '../common/outlet_layout/Outlet_Layout';

function TotalRevenue() {

  return (
    <GlobalContextProvider value={{
      BarChartLabel: Revenue_Bar_Label,
      TableHeaders: Revenue_Table_Header,
      csvColumnHeader: CSV_Revenue_Table_Header,
      BarChartApiLink: GetAllChildRevenue,
      TableApiLink: GetDailyChildRevenue,
      ChartTitle: "Revenue",
      CsvFileName: "Total_Revenue_Report.csv"
    }}>
      <OutletLayout pageTitle={"Total Revenue"} />
    </GlobalContextProvider>
  );
}

export default TotalRevenue;
