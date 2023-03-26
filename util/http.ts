import axios from 'axios';
import { IExpenseInfo, IExpense, INewExpense } from '../interfaces/types';

const BACKEND_URL =
  'https://react-native-course-9cad1-default-rtdb.firebaseio.com';

export const storeExpense = async (expenseData: IExpenseInfo) => {
  const response = await axios.post<INewExpense>(
    `${BACKEND_URL}/expenses.json`,
    expenseData,
  );
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get<IExpense[]>(`${BACKEND_URL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = (id: string, expenseData: IExpenseInfo) => {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id: string) => {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
};
