import { createContext, useReducer } from 'react';
import { IExpense, IExpenseInfo, INewExpense } from '../interfaces/types';
import { ActionType, ExpensesState } from './action-types/index';
import { Action } from './actions';

type ExpensesContextType = {
  expenses: IExpense[];
  addExpense: (newExpense: INewExpense) => void;
  setExpenses: (expenses: IExpense[]) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: IExpense) => void;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses: IExpense[]) => {},
  deleteExpense: (id) => {},
  updateExpense: ({ id, description, amount, date }) => {},
});

type ExpensesContextProviderType = {
  children?: React.ReactNode;
};

const expensesReducer = (state: ExpensesState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD:
      return [{ ...action.payload, id: action.payload.name }, ...state];
    case ActionType.SET:
      const inverted = action.payload.reverse();
      return inverted;
    case ActionType.UPDATE:
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case ActionType.DELETE:
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider: React.FC<ExpensesContextProviderType> = ({
  children,
}) => {
  const [ExpensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData: INewExpense) => {
    dispatch({ type: ActionType.ADD, payload: expenseData });
  };

  const setExpenses = (expenses: IExpense[]) => {
    dispatch({ type: ActionType.SET, payload: expenses });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: ActionType.DELETE, payload: id });
  };

  const updateExpense = (expenseData: IExpense) => {
    dispatch({ type: ActionType.UPDATE, payload: expenseData });
  };

  const value = {
    expenses: ExpensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
