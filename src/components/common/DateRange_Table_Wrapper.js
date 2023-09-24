import { useEffect, useState, useContext, createRef } from "react";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import * as moment from 'moment';
//components
import DateRangeFilter from './date-picker/Date_Range_Filter';
import ExportCSV from './Export_CSV';
import TableWrapper from '../common/Table_Wrapper';
import GlobalContext from "../../store/Global_Context";
import TabMenu from '../common/tab-menu/Tab_Menu_Button';
import '../../assets/styles/scss/main.scss';
import { FormatCustomerData, FormatTotalCount, FormatCustomerType, FormatCustomerCount, FormatDate } from '../../utils/Format_Attribute_Type';


function DateRangeTableWrapper() {

    const [searchParams, setSearchParams] = useSearchParams();
    const { TableHeaders, TableApiLink } = useContext(GlobalContext);
    const [dateRangeValue, setDateRangeValue] = useState(
        {
            startDate: '',
            endDate: ''
        }
    );
    const [isClickFilter, setIsClickFilter] = useState(false);
    const [pageState, setPageState] = useState({
        isLoading: false,
        data: [],
        columns: TableHeaders,
        total: 0,
        page: 1,
        pageSize: 10,
        skip: 0,
    });
    const [tabValue, setTabValue] = useState('NW');
    const { pathname } = useLocation();
    const defaultLimit = 10;
    const defaultSkip = 0;
    const navigate = useNavigate();
    const [allReportsRow, setAllReportsRow] = useState([]);
    const csvLinkEl = createRef(null);

    const handleChange = (event) => {
        setTabValue(event.target.value);
    };

    useEffect(() => {

        setPageState(old => ({
            ...old,
            page: searchParams.get("skip") ? (parseInt(searchParams.get("skip")) / parseInt(searchParams.get("limit"))) + 1 : 1,
            pageSize: searchParams.get("limit") | 10,
            skip: searchParams.get("skip") | 0,
        }))

        if (searchParams.get("startDate")) {
            setDateRangeValue({
                startDate: searchParams.get("startDate"),
                endDate: searchParams.get("endDate")
            })
        }

    }, [])

    useEffect(() => {

        let startDate = '2019-10-01T17:30:00Z';
        let endDate = '2023-01-16T17:30:00Z';
        let customerType = tabValue;

        if (dateRangeValue.startDate !== '' && dateRangeValue.startDate !== null) {
            startDate = dateRangeValue.startDate;
            endDate = dateRangeValue.endDate;

        }
        if (searchParams.get("startDate") !== null) {
            startDate = searchParams.get("startDate");
            endDate = searchParams.get("endDate");
        }

        async function saveTableRows() {
            setPageState(old => ({ ...old, isLoading: true }))
            const reponseData = await handleGetRegisterUsersRows(pageState.pageSize, pageState.skip, startDate, endDate, customerType);
            let userRows = [];
            userRows = getFormattedUserRows(reponseData, pageState.columns);
            setPageState(old => ({ ...old, isLoading: false, data: userRows, total: reponseData.count }))
        }
        saveTableRows();

    }, [pageState.page, pageState.pageSize, isClickFilter, tabValue]);


    const handleGetRegisterUsersRows = async (limit, skip, startDate, endDate, customerType, buttonType = '') => {
        try {
            let startD = new Date(moment(startDate).utc()).toISOString();
            let endD = new Date(moment(endDate).utc()).toISOString();

            const response = await TableApiLink(limit, skip, startD, endD, customerType);
            return response.data;

        } catch (error) {
            alert("something went wrong !")
            navigate("/")
            console.log("error", error)
            console.error(error);
        }
    };

    const getFormattedUserRows = (reponseData, tableHeaders) => {

        let rowsData = reponseData.data;
        let columnD = tableHeaders;
        let rowList = [];
        let dateRow = '';
        let countNoRow = '';
        let customerTypeRow = '';
        let newRow = "";

        rowsData.map((row, rowInd) => {
            newRow = { id: rowInd }
            columnD.map((col) => {
                newRow[col.field] = 0
            })
            dateRow = FormatDate(row);
            dateRow = new Date(dateRow).toDateString()
            newRow.date = dateRow.split(" ")[2] + " " + dateRow.split(" ")[1] + " " + dateRow.split(" ")[3];
            newRow.total = FormatTotalCount(row);
            let customers = FormatCustomerData(row);

            customers.map((cus) => {
                countNoRow = FormatCustomerCount(cus);
                customerTypeRow = FormatCustomerType(cus);
                customerTypeRow !== undefined && customerTypeRow !== null && (
                    newRow[(customerTypeRow).toLowerCase()] = countNoRow
                )
            })
            rowList.push(newRow)
        })
        return rowList;
    }

    useEffect(() => {

        searchParams.set("limit", pageState.pageSize);
        searchParams.set("skip", pageState.skip);
        setSearchParams(searchParams);

    }, [pageState.page, pageState.pageSize])

    const handleDateRangeChange = (newValue) => {

        setDateRangeValue(newValue);

    }

    const handleClickFilter = () => {

        searchParams.set("limit", defaultLimit);
        searchParams.set("skip", defaultSkip);

        if (dateRangeValue.startDate !== null) {
            searchParams.set("startDate", dateRangeValue.startDate);
            searchParams.set("endDate", dateRangeValue.endDate);
        } else {
            searchParams.delete("startDate");
            searchParams.delete("endDate");
        }
        setPageState(old => (
            {
                ...old,
                pageSize: defaultLimit,
                skip: defaultSkip,
                page: (defaultSkip / defaultLimit) + 1

            }
        ))
        setSearchParams(searchParams)
        setIsClickFilter(!isClickFilter);
    }

    const downloadReport = async () => {
        let customerType = tabValue;
        if (dateRangeValue.startDate) {
            const reponseData = await handleGetRegisterUsersRows(0, 0, dateRangeValue.startDate, dateRangeValue.endDate, customerType, "download");
            let userRows = [];
            userRows = getFormattedUserRows(reponseData, pageState.columns);
            setAllReportsRow(userRows);

        } else {
            alert("Please select the date range to export");
        }
    }

    useEffect(() => {

        if(allReportsRow.length !== 0){
            csvLinkEl.current.link.click();
        }
        
    }, [allReportsRow])


    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    borderRadius: 1,
                }}
            >
                <Box>
                    {
                        pathname === '/child/sale-transaction' && (
                            <TabMenu tabValue={tabValue} handleChange={handleChange} />
                        )
                    }
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ marginRight: '10px' }}>
                        <ExportCSV pageState={allReportsRow} csvLinkEl={csvLinkEl} downloadReport={downloadReport} />
                    </Box>
                    <DateRangeFilter dateRangeValue={dateRangeValue} handleDateRangeChange={handleDateRangeChange} isClickFilter={isClickFilter} handleClickFilter={handleClickFilter} />
                </Box>
            </Box>
            <Box>
                <TableWrapper pageState={pageState} setPageState={setPageState} />
            </Box>
        </Box>
    );
}

export default DateRangeTableWrapper;
