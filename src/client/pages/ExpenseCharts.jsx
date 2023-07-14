import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUserExpenses from '@wasp/queries/getUserExpenses';

export function ExpenseCharts() {
  const { data: expenses, isLoading, error } = useQuery(getUserExpenses);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div>
      <h1>Expense Charts</h1>
      {/* Add your charts here */}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <p>Description: {expense.description}</p>
            <p>Amount: {expense.amount}</p>
            <p>Date: {expense.date}</p>
            <p>User ID: {expense.userId}</p>
          </li>
        ))}
      </ul>
      <Link to='/'>Go to Dashboard</Link>
    </div>
  );
}