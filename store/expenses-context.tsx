import { createContext, useReducer } from 'react';
import { IExpense, IExpenseInfo, INewExpense } from '../interfaces/types';
import { ActionType, ExpensesState } from './action-types/index';
import { Action } from './actions';

const DUMMY_EXPENSES: IExpense[] = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-12-01'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2023-01-02'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2023-01-12'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2023-01-14'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2023-01-16'),
  },
  {
    id: 'e6',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2023-01-02'),
  },
  {
    id: 'e7',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2023-01-12'),
  },
  {
    id: 'e8',
    description: 'A book',
    amount: 14.99,
    date: new Date('2023-01-14'),
  },
  {
    id: 'e9',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2023-12-01'),
  },
];

type ExpensesContextType = {
  expenses: IExpense[];
  addExpense: (newExpense: IExpenseInfo) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: IExpense) => void;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: ({ id, description, amount, date }) => {},
});

type ExpensesContextProviderType = {
  children?: React.ReactNode;
};

const expensesReducer = (state: ExpensesState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD:
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
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
  const [ExpensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData: INewExpense) => {
    dispatch({ type: ActionType.ADD, payload: expenseData });
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
