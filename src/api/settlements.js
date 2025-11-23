import { Axios } from './axios';

const settlements = '/api/settlement/';

export const settlementHistoryListAPI = params =>
  Axios.get(settlements, { params });
