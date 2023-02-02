import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { IExpense } from '../../interfaces/types';
import ExpenseItem from './ExpenseItem';

interface ExpensesListProps {
  expenses: IExpense[];
}

const recderExpenseItem: ListRenderItem<IExpense> = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={recderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
