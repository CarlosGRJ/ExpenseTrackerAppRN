import { INewExpense, IExpense } from '../../interfaces/types';
import { ActionType } from '../action-types/index';

interface AddExpenseAction {
  type: ActionType.ADD;
  payload: INewExpense;
}

interface UpdateExpenseAction {
  type: ActionType.UPDATE;
  payload: IExpense;
}

interface DeleteExpenseAction {
  type: ActionType.DELETE;
  payload: string;
}

export type Action =
  | AddExpenseAction
  | UpdateExpenseAction
  | DeleteExpenseAction;
