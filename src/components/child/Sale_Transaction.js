//api
import { GetDailyChildPaymentTransaction, GetAllChildRevenue } from "../../services/Api_Services";
//const
import { Sale_Transaction_Table_Header, CSV_Sale_Transaction_Table_Header } from '../../const/Table_Header_Menus';
//context
import { GlobalContextProvider } from "../../store/Global_Context";
//com
import OutletLayout from '../common/outlet_layout/Outlet_Layout';


function SaleTransaction() {

  return (
    <GlobalContextProvider value={{
      TableHeaders: Sale_Transaction_Table_Header,
      csvColumnHeader: CSV_Sale_Transaction_Table_Header,
      BarChartApiLink: GetAllChildRevenue,
      TableApiLink: GetDailyChildPaymentTransaction,
      ChartTitle: "",
      CsvFileName: "Sale_Transaction_Report.csv"
    }}>
      <OutletLayout pageTitle={"Sale Transaction"} />
    </GlobalContextProvider>
  )
}

export default SaleTransaction