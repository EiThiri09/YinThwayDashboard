import { useEffect, useState, useContext } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Typography from '@mui/material/Typography';
import OverlayLoading from "./loading/OverlayLoading";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as moment from 'moment';
//components
import { Bar } from "react-chartjs-2";
import GlobalContext from "../../store/Global_Context";
import SingleDatePicker from './date-picker/Single_Date_Picker';
import _ from 'lodash';
import { FormatCustomerData, FormatTotalCount, FormatCustomerType, FormatCustomerCount } from '../../utils/Format_Attribute_Type';
import Colors from '../../assets/styles/js/Color';
import '../../assets/styles/scss/bar_chart.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function BarChart() {

    const { ChartTitle, BarChartLabel } = useContext(GlobalContext);
    const y_labels = BarChartLabel;
    const [openedOverlayLoading, setOpenedOverlayLoading] = useState(false);
    const [staticDateValue, setStaticDateValue] = useState({
        start: '2021-10-01T17:30:00Z',
        end: new Date()
    });
    const { TableApiLink } = useContext(GlobalContext);
    const [overallChartInfo, setOverallChartInfo] = useState({
        total_count: 0,
        count_list: [],
        percent_count_list: [],
    });
    //const [searchParams,setSearchParams] = useSearchParams();
    const TooltipBgColors = [Colors.NWTopBarBg, Colors.OPDTopBarBg, Colors.IPDTopBarBg, Colors.ERCTopBarBg, Colors.UndefinedTopBarBg]

    useEffect(() => {

        async function saveChartDataSet() {
            setOpenedOverlayLoading(true);
            const reponseData = await handleGetAllRegisterUserCount();
            const chartDataset = formatChartDataset(reponseData);
            setOverallChartInfo(chartDataset);
            setOpenedOverlayLoading(false);
        }
        saveChartDataSet();

    }, [staticDateValue]);

    const formatChartDataset = (response) => {
        let reponseData = response.data;
        let customerType = "";
        let customerCount = 0;
        let dailyTotalcount = 0;
        let dailyCustomerData = [];
        let totalCount = 0;
        let totalUser = [];

        if (reponseData.length !== 0) {
            reponseData.map((resp) => {

                let reponseInfo = resp;
                dailyTotalcount = FormatTotalCount(reponseInfo);

                totalCount += dailyTotalcount;

                dailyCustomerData = FormatCustomerData(reponseInfo);
                dailyCustomerData.map((ind, indInd) => {

                    customerType = FormatCustomerType(ind)
                    customerCount = FormatCustomerCount(ind);

                    y_labels.map((label, labInd) => {

                        if (totalUser[labInd] === undefined) {
                            totalUser[labInd] = 0;
                        }
                        if (label.split(' ')[0] === customerType) {
                            customerCount = FormatCustomerCount(ind);
                            customerCount += totalUser[labInd];
                            totalUser[labInd] = customerCount
                        }
                    })
                })

            })

        }

        let newTotalUser = [];

        if (totalUser.length !== 0) {
            newTotalUser = _.map(totalUser, (total) => {
                return ((total / totalCount) * 100).toFixed(0);
            })
        }

        return {
            total_count: totalCount,
            count_list: totalUser,
            percent_count_list: newTotalUser
        };

    }

    const handleGetAllRegisterUserCount = async () => {

        try {

            let startDate = staticDateValue.start;
            let endDate = staticDateValue.end;

            if (staticDateValue.start.$d) {
                startDate = staticDateValue.start.$d;
                endDate = staticDateValue.end.$d;
            }
            startDate = new Date(moment(startDate).utc().format('MM/DD/YYYY')).toISOString();
            endDate = new Date(moment(endDate).utc().format('MM/DD/YYYY')).toISOString();
            const response = await TableApiLink(0, 0, startDate, endDate)
            return response.data;

        } catch (error) {
            console.log("error", error)
        }
    }

    const dataSetDackgroundColor = (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        // if (!chartArea) {
        //     return;
        // }

        let all_dataset_color = [];
        // let yAxis = chart.scales["y-axis-0"];
        // let yBottom = yAxis.getPixelForValue(0);
        // let yTop = yAxis.getPixelForValue(v);

        let data_set_1 = ctx.createLinearGradient(0, 0, 0, 600);
        data_set_1.addColorStop(0, Colors.NWTopBarBg);
        data_set_1.addColorStop(1, Colors.NWBottomBarBg);
        let data_set_2 = ctx.createLinearGradient(0, 0, 0, 600);
        data_set_2.addColorStop(0, Colors.OPDTopBarBg);
        data_set_2.addColorStop(1, Colors.OPDBottomBarBg);
        let data_set_3 = ctx.createLinearGradient(0, 0, 0, 600);
        data_set_3.addColorStop(0, Colors.IPDTopBarBg);
        data_set_3.addColorStop(1, Colors.IPDBottomBarBg);
        let data_set_4 = ctx.createLinearGradient(0, 0, 0, 600);
        data_set_4.addColorStop(0, Colors.ERCBottomBarBg);
        data_set_4.addColorStop(1, Colors.ERCBottomBarBg);
        let data_set_5 = ctx.createLinearGradient(0, 0, 0, 600);
        data_set_5.addColorStop(0, Colors.UndefinedTopBarBg);
        data_set_5.addColorStop(1, Colors.UndefinedBottomBarBg);

        all_dataset_color = [data_set_1, data_set_2, data_set_3, data_set_4, data_set_5]
        return all_dataset_color;
    }




    const data = {
        labels: y_labels,
        datasets: [
            {
                data: overallChartInfo.percent_count_list,
                backgroundColor: dataSetDackgroundColor,
                barThickness: 25,
                borderRadius: 15,
                barPercentage: 0.1,
                minBarLength: 0.1
            },
        ],
    };


    const tooltipLable = (tooltipItems) => {
        let count = 0;
        let title = tooltipItems.label;
        if (title !== undefined) {
            title = title.toString().split(' ')[0]
        }
        let dailyCustomerData = overallChartInfo.count_list;

        if (dailyCustomerData.length !== 0) {

            count = dailyCustomerData[tooltipItems.dataIndex]

            return count.toLocaleString();
        }

    }

    const tooltipFooter = (tooltipItems) => {
        let label = '';
        let parsedYItem = tooltipItems[0].parsed.y;
        if (parsedYItem !== null) {
            parsedYItem = parsedYItem.toFixed(0)
        }

        label = '(' + parsedYItem + "%" + ')';
        return label;
    }

    const tooltipBackgroundColor = (tooltipItem) => {
        if (tooltipItem.tooltipItems[0]) {
            return tooltipItem.tooltip.labelColors[0].backgroundColor
        }
    }


    const options = {
        interaction: {
            mode: 'nearest'
        },
        includeInvisible: true,
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false,
                intersect: false,
                titleAlign: 'center',
                bodyAlign: 'center',
                footerAlign: 'center',
                yAlign: 'bottom',
                padding: 10,
                titleFont: {
                    size: 16
                },
                position: 'average',
                bodyFont: {
                    size: 15,
                    weight: 'bold'
                },
                displayColors: false,
                // backgroundColor: tooltipBackgroundColor,
                // callbacks: {
                //     label: tooltipLable,
                //     footer: tooltipFooter,
                // },
            },

        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    max: 100,
                    min: 0,
                    stepSize: 20,
                    precision: 10,
                    sampleSize: 10,
                    labelOffset: 10,
                    callback: function (value) {
                        return value + "%"
                    }
                },

                gird: {
                    // display: false,
                    drawBorder: false,
                    drawTicks: false,
                },
                border: {
                    dash: [5],
                    color: Colors.WhiteThemeColor,
                }
            },
            x: {
                gird: {
                    drawBorder: false,
                },
                border: {
                    display: false,
                }
            },


        },
        showAllTooltips: true,

    };

    const handleChangeDateValue = (newValue, type) => {
        setStaticDateValue(old => ({ ...old, [type]: newValue }))
    }


    return (
        <Box className="chart-component">
            <Box className="chart-header">
                <Typography className="chart-title">
                    Total {ChartTitle}(
                    {
                        overallChartInfo.total_count.toLocaleString()
                    })
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box className="date-range-container">
                        <Box className="date-range-label">
                            <Typography fontSize={'15px'}>
                                Start Date:
                            </Typography>
                            <SingleDatePicker staticDateValue={staticDateValue} handleChangeDateValue={handleChangeDateValue} dateType="start" />
                        </Box>
                        <Box className="date-range-label">
                            <Typography fontSize={'15px'}>
                                End Date:
                            </Typography>
                            <SingleDatePicker staticDateValue={staticDateValue} handleChangeDateValue={handleChangeDateValue} dateType="end" />
                        </Box>
                    </Box>
                </LocalizationProvider>

            </Box>
            <Box className="chart-container">
                <Box sx={{ display: 'flex', marginLeft: '2rem' }}>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        {
                            y_labels.length !== 0 && (
                                y_labels.map((label, labInd) =>
                                    overallChartInfo.count_list.length !== 0 && (
                                        <Box key={labInd} sx={{ display: 'flex', justifyContent: 'center', flex: '1' }}>
                                            <Box key={labInd} sx={{ color: Colors.WhiteThemeColor, display: 'flex', justifyContent: 'center', gap: '3px', backgroundColor: `${TooltipBgColors[labInd]}`, padding: '15px 15px', borderRadius: '10px' }}>
                                                <Typography fontSize={'14px'} fontWeight={'bold'}>
                                                    {(overallChartInfo.count_list[labInd]).toLocaleString()}
                                                </Typography>
                                                <Typography fontSize={'12px'} alignItems={'center'} display={'flex'}>
                                                    ({overallChartInfo.percent_count_list[labInd] + "%"})
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )
                                )
                            )
                        }
                    </Box>
                </Box>
                <Bar options={options} data={data} width={600} />
            </Box>
            {openedOverlayLoading && (<OverlayLoading />)}
        </Box>
    );
}

export default BarChart;
