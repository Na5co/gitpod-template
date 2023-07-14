import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createExpense from '@wasp/actions/createExpense';

export function AddExpense() {
  const createExpenseFn = useAction(createExpense);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const handleAddExpense = () => {
    createExpenseFn({ description, amount });
    setDescription('');
    setAmount(0);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Description"
        className="px-1 py-2 border rounded text-lg"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        className="px-1 py-2 border rounded text-lg"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button
        onClick={handleAddExpense}
        className="bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded"
      >
        Add Expense
      </button>
      <Link to="/dashboard" className="bg-red-500 hover:bg-red-700 px-2 py-2 text-white font-bold rounded ml-2">
        Go back to Dashboard
      </Link>
    </div>
  );
}