import HttpError from '@wasp/core/HttpError.js'

export const createExpense = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Expense.create({
    data: {
      description: args.description,
      amount: args.amount,
      date: args.date,
      userId: context.user.id
    }
  })
}

export const getUserExpenses = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Expense.findMany({
    where: {
      userId: context.user.id
    }
  })
}

export const getUserBalance = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const expenses = await context.entities.Expense.findMany({
    where: {
      userId: context.user.id
    }
  })

  const balance = expenses.reduce((total, expense) => total + expense.amount, 0)

  return balance
}