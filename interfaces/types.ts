export type RootStackParamList = {
  AllExpenses: undefined;
  ExpensesOverview: undefined;
  ManageExpense: { expenseId: string } | undefined;
  RecentExpenses: undefined;
};

export interface IExpense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export interface INewExpense {
  id?: string;
  description: string;
  amount: number;
  date: Date;
}

export interface IExpenseInfo {
  description: string;
  amount: number;
  date: Date;
}
