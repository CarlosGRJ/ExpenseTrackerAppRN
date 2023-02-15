import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import Input from './Input';
import { IExpense, IExpenseInfo, INewExpense } from '../../interfaces/types';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';

interface ExpenseFormProps {
  submitButtonLabel: string;
  onCancel: () => void;
  onSubmit: (expenseData: IExpenseInfo | INewExpense) => void;
  defaultValues?: IExpense;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount : '',
    date: defaultValues ? getFormattedDate(defaultValues.date) : '',
    description: defaultValues ? defaultValues.description : '',
  });

  const inputChangedHandler = (
    inputIdentifier: string,
    enteredValue?: string,
  ) => {
    console.log('enteredValue ', enteredValue);
    setInputValues((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const submitHandler = () => {
    const expenseData: IExpenseInfo = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert('Invalid input', 'Please check your input values');
      return;
    }

    onSubmit(expenseData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValues.amount.toString(),
          }}
        />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          //   autoCapitalize: 'none'
          //   autoCorrect: false, by default is true
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
