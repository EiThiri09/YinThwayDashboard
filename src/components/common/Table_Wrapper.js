import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../assets/styles/scss/main.scss';
import Colors from '../../assets/styles/js/Color';
//import { useSearchParams } from 'react-router-dom';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '350px',
        color: Colors.BlackThemeColor,
        backgroundColor: Colors.WhiteThemeColor,
        '& .css-vcjdx3': {
            backgroundColor: `${Colors.MainThemeColor}  !important`
        },
        '&.css-1inm7gi': {
            backgroundColor: Colors.WhiteThemeColor
        },
        '&.css-cc8tf1': {
            fontWeight: 'bold',
            opacity: 0.7
        },
        // '& .css-yrdy0g-MuiDataGrid-columnHeaderRow': {
        //     backgroundColor: '#81d1d0  !important'
        // },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
            justifyContent: 'center',
        },
        '& .MuiDataGrid-cell': {
            justifyContent: 'center',
        },
        '& .MuiDataGrid-iconSeparator': {
            display: 'none',
        },
        '& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            opacity: '0.7'
        },
        '&.css-1kwdphh-MuiDataGrid-virtualScrollerContent': {
            backgroundColor: Colors.WhiteThemeColor
        },
        '&.css-17jjc08-MuiDataGrid-footerContainer': {
            backgroundColor: Colors.WhiteThemeColor
        }
    }
}));


function TableWrapper({ pageState, setPageState }) {

    // const [searchParams, setSearchParams] = useSearchParams();
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <DataGrid
                autoHeight
                rows={pageState.data}
                rowCount={pageState.total}
                loading={pageState.isLoading}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                page={pageState.page - 1}
                pageSize={pageState.pageSize}
                paginationMode="server"
                onPageChange={(newPage) => {
                    // searchParams.set("skip", pageState.pageSize * newPage);
                    // setSearchParams(searchParams);
                    setPageState(old => ({ ...old, page: newPage + 1, skip: pageState.pageSize * newPage }))
                }}
                onPageSizeChange={(newPageSize) => {
                    // searchParams.set("limit", newPageSize);
                    // setSearchParams(searchParams);
                    setPageState(old => ({ ...old, pageSize: newPageSize }))
                }}
                columns={pageState.columns}
                className={classes.root}
            />
        </ThemeProvider>
    );
}

export default TableWrapper;
