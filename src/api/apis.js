import { Axios } from "./axios";

const user = "/api/user";
const expense = "/api/expense";
const team = "/api/expense/team";

export const loginAPI = (payload) => Axios.post(user, payload);
export const expenseListAPI = (params) => Axios.get(expense, { params });
export const addExpenseAPI = (payload) => Axios.post(expense, payload);
export const totalTeamAPI = (params) => Axios.get(team, { params });
