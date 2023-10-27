// TransactionHistory.test.js
import React from 'react';
import { render } from '@testing-library/react';
import TransactionHistory from '../components/TransactionHistory';

// Sample transactions data
const transactions = [
  {transaction_id: '1a7b419b-9e70-4c1f-a960-00ac9365bd7e', account_id: '7b7b7b7b-7b7b-4b7b-bb7b-7b7b7b7b7b7b', amount: 12, created_at: '2023-10-26T22:11:02.618992+00:00'},
  {transaction_id: '8d004142-8f92-49f0-bdd3-35bd6d920600', account_id: '7b7b7b7b-7b7b-4b7b-bb7b-7b7b7b7b7b7b', amount: 12, created_at: '2023-10-26T21:40:01.554382+00:00'}
];

test.skip('renders the TransactionHistory component', () => {
  const { getByText } = render(<TransactionHistory transactions={transactions} />);

  // Check if the component renders the title and transaction details
  const titleElement = getByText('Transaction History');
  expect(titleElement).toBeInTheDocument();

  transactions.forEach((transaction) => {
    const dateElement = getByText(transaction.account_id);
    const descriptionElement = getByText(transaction.amount);
   const amountElement = getByText(transaction.amount.toString());

    expect(dateElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
   expect(amountElement).toBeInTheDocument();
  });
});
