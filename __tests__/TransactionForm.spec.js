// TransactionInputForm.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TransactionForm from '../components/TransactionForm';

test.skip('renders TransactionForm with input fields and a submit button', () => {
  const { getByPlaceholderText, getByText } = render(<TransactionForm />);

  const accountInput = getByPlaceholderText('Account');
  const amountInput = getByPlaceholderText('Amount');
  const submitButton = getByText('Submit');

  expect(accountInput).toBeInTheDocument();
  expect(amountInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test.skip('submits the form with the input values', () => {
  const onTransactionSubmit = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <TransactionInputForm onTransactionSubmit={onTransactionSubmit} />
  );

  const accountInput = getByPlaceholderText('Account');
  const amountInput = getByPlaceholderText('Amount');
  const submitButton = getByText('Submit');

  // Fill out the form
  fireEvent.change(accountInput, { target: { value: '30' } });
  fireEvent.change(amountInput, { target: { value: '30' } });

  // Submit the form
  fireEvent.click(submitButton);

  // Check if onTransactionSubmit was called with the correct values
  expect(onTransactionSubmit).toHaveBeenCalledWith({ account_id: '30', amount: '30' });
});
