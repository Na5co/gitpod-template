import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserBalance from '@wasp/queries/getUserBalance';
import getUserExpenses from '@wasp/queries/getUserExpenses';
import createExpense from '@wasp/actions/createExpense';

export function Dashboard() {
  const { data: balance, isLoading: balanceLoading, error: balanceError } = useQuery(getUserBalance);
  const { data: expenses, isLoading: expensesLoading, error: expensesError } = useQuery(getUserExpenses);
  const createExpenseFn = useAction(createExpense);
  const [newExpenseDescription, setNewExpenseDescription] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);

  if (balanceLoading || expensesLoading) return 'Loading...';
  if (balanceError || expensesError) return 'Error: ' + (balanceError || expensesError);

  const handleCreateExpense = () => {
    createExpenseFn({
      description: newExpenseDescription,
      amount: newExpenseAmount,
      date: new Date()
    });
    setNewExpenseDescription('');
    setNewExpenseAmount(0);
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold mb-2'>My Balance</h1>
        <p className='text-xl font-bold'>{balance}</p>
      </div>
      <div className='mb-4'>
        <h2 className='text-xl font-bold mb-2'>Add Expense</h2>
        <div className='flex gap-x-4 mb-2'>
          <input
            type='text'
            placeholder='Description'
            className='px-1 py-2 border rounded text-lg'
            value={newExpenseDescription}
            onChange={(e) => setNewExpenseDescription(e.target.value)}
          />
          <input
            type='number'
            step='0.01'
            placeholder='Amount'
            className='px-1 py-2 border rounded text-lg'
            value={newExpenseAmount}
            onChange={(e) => setNewExpenseAmount(parseFloat(e.target.value))}
          />
          <button
            onClick={handleCreateExpense}
            className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <h2 className='text-xl font-bold mb-2'>Weekly Expenses</h2>
        <div className='bg-gray-100 p-4 rounded-lg'>
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className='flex items-center justify-between mb-2'
            >
              <p>{expense.description}</p>
              <p>{expense.amount}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-4'>
        <Link to='/charts' className='text-blue-500'>View Expense Charts</Link>
      </div>
    </div>
  );
}