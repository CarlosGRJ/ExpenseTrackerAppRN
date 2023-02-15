import { INewExpense, IExpense } from '../../interfaces/types';

export enum ActionType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export type ExpensesState = IExpense[]

