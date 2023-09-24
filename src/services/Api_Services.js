import * as moment from 'moment';
import axios from 'axios';
import getAxiosConfig from '../configs/Axios_Config';

const yinThwayApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER + '/dashboard',
});

console.log('env', process.env.REACT_APP_SERVER);

export const GetDailyChildCustomer = (limit, skip, start, end) => {
  let url = `/patients/children`;

  let query = `?limit=${limit}&skip=${skip}`;

  if (start) {
    query += `&start=${moment.utc(start).format()}`;
  }

  if (end) {
    // query += `&end=${moment.utc(end).add(1, 'day').format()}`;
    query += `&end=${moment.utc(end).add(1, 'day').format()}`;
  }

  return yinThwayApi.get(`${url}${query}`, getAxiosConfig());
};
export const GetAllCustomersWithCount = () => {
  let url = `/patients/children/count`;

  return yinThwayApi.get(`${url}`, getAxiosConfig());
};
export const GetDailyChildRevenue = (limit, skip, start, end) => {
  let url = `patients/children/daily-revenue`;

  let query = `?limit=${limit}&skip=${skip}`;

  if (start) {
    query += `&start=${moment.utc(start).format()}`;
  }

  if (end) {
    query += `&end=${moment.utc(end).add(1, 'day').format()}`;
  }

  return yinThwayApi.get(`${url}${query}`, getAxiosConfig());
};

export const GetAllChildRevenue = () => {
  let url = `/patients/children/total-revenue`;

  return yinThwayApi.get(`${url}`, getAxiosConfig());
};

export const GetDailyChildPaymentTransaction = (
  limit,
  skip,
  start,
  end,
  customerType
) => {
  let url = `/patients/children/transactions`;

  let query = `?limit=${limit}&skip=${skip}&customer_type=${customerType}`;

  if (start) {
    query += `&start=${moment.utc(start).format()}`;
  }
  if (end) {
    query += `&end=${moment.utc(end).add(1, 'day').format()}`;
  }

  return yinThwayApi.get(`${url}${query}`, getAxiosConfig());
};
