import { GetDailyChildCustomer, GetAllCustomersWithCount } from "../../services/Api_Services";
//context
import { GlobalContextProvider } from "../../store/Global_Context";
//const
import { Register_Table_Header, CSV_Register_User_Table_Header, User_Bar_Label } from '../../const/Table_Header_Menus';
import OutletLayout from '../common/outlet_layout/Outlet_Layout';

function RegisterUser() {

  return (
    <GlobalContextProvider value={{
      BarChartLabel: User_Bar_Label,
      TableHeaders: Register_Table_Header,
      csvColumnHeader: CSV_Register_User_Table_Header,
      BarChartApiLink: GetAllCustomersWithCount,
      TableApiLink: GetDailyChildCustomer,
      ChartTitle: "Users",
      CsvFileName: "Register_User_Report.csv"
    }}>
      <OutletLayout pageTitle={"Register User"} />
    </GlobalContextProvider>

  );
}

export default RegisterUser;
