import React, { createContext } from 'react';


const GlobalContext = createContext({
  BarChartLabel: '',
  TableHeaders: '',
  csvColumnHeader: '',
  BarChartApiLink: '',
  TableApiLink: '',
  ChartTitle: '',
  CsvFileName: ''
});

export const GlobalContextProvider = (props) => {

  const { BarChartLabel,BarChartApiLink, TableApiLink, TableHeaders, csvColumnHeader,ChartTitle ,CsvFileName } = props.value;

  const contextValue = {
    BarChartLabel: BarChartLabel,
    TableHeaders: TableHeaders,
    csvColumnHeader: csvColumnHeader,
    BarChartApiLink: BarChartApiLink,
    TableApiLink: TableApiLink,
    ChartTitle: ChartTitle,
    CsvFileName: CsvFileName,
  };


  return (
    <GlobalContext.Provider value={contextValue}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;