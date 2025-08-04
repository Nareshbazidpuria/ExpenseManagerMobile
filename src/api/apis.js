import { Axios } from './axios';

const expense = '/api/expense/';
const team = '/api/expense/team';
const own = '/api/expense/own';
const group = '/api/group';
const groupHome = '/api/group/home';
const uploadImage = '/api/generic/upload';
const uploadImages = '/api/generic/upload-images';

export const expenseListAPI = params => Axios.get(expense, { params });
export const addExpenseAPI = payload => Axios.post(expense, payload);
export const deleteExpenseAPI = id => Axios.delete(expense + id);
export const verifyExpenseAPI = id => Axios.patch(expense + id);
export const editExpenseAPI = (id, payload) => Axios.put(expense + id, payload);
export const totalTeamAPI = params => Axios.get(team, { params });
export const totalOwnAPI = params => Axios.get(own, { params });
export const groupListAPI = params => Axios.get(group, { params });
export const groupListHomeAPI = params => Axios.get(groupHome, { params });

export const uploadImageApi = data =>
  Axios.post(uploadImage, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const uploadImagesApi = data =>
  Axios.post(uploadImages, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
