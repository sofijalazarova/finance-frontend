export const sortFunctions: Record<
  string,
  (a: TransactionModel, b: TransactionModel) => number
> = {
  oldest: (a, b) =>
    (a.transactionDate ? new Date(a.transactionDate).getTime() : 0) -
    (b.transactionDate ? new Date(b.transactionDate).getTime() : 0),

  newest: (a, b) =>
    (b.transactionDate ? new Date(b.transactionDate).getTime() : 0) -
    (a.transactionDate ? new Date(a.transactionDate).getTime() : 0),

  lowestAmount: (a, b) => Number(a.amount) - Number(b.amount),
  highestAmount: (a, b) => Number(b.amount) - Number(a.amount),

  incomeFirst: (a, b) => (a.type === "INCOME" && b.type === "EXPENSE" ? -1 : 1),
  expenseFirst: (a, b) =>
    a.type === "EXPENSE" && b.type === "INCOME" ? -1 : 1,

  nameAsc: (a, b) => a.name.localeCompare(b.name),
  nameDesc: (a, b) => b.name.localeCompare(a.name),

  default: () => 0,
};
