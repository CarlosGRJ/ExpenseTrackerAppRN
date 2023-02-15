import React, { useLayoutEffect, useContext } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ExpensesContext } from '../store/expenses-context';
import { GlobalStyles } from '../constants/styles';
import {
  RootStackParamList,
  IExpenseInfo,
  INewExpense,
} from '../interfaces/types';
import Button from '../components/UI/Button';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/UI/IconButton';

interface ManageExpenseProps {
  route: RouteProp<RootStackParamList, 'ManageExpense'>;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ManageExpense',
    undefined
  >;
}

const ManageExpense: React.FC<ManageExpenseProps> = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId || '');
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData: IExpenseInfo) => {
    if (isEditing) {
      expensesCtx.updateExpense({
        id: editedExpenseId,
        ...expenseData,
      });
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
