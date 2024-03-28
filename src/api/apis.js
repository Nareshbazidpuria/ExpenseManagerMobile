import { Axios } from "./axios";

const user = "/api/user";
const expense = "/api/expense";
const team = "/api/expense/team";
const own = "/api/expense/own";

export const loginAPI = (payload) => Axios.post(user, payload);
export const expenseListAPI = (params) => Axios.get(expense, { params });
export const addExpenseAPI = (payload) => Axios.post(expense, payload);
export const totalTeamAPI = (params) => Axios.get(team, { params });
export const totalOwnAPI = (params) => Axios.get(own, { params });
