/**
 * "Base de datos" en memoria para el laboratorio.
 * Se reinicia al recargar la página; es intencional: no hay backend real todavía.
 */

let customers = [
  {
    id: "c-001",
    firstName: "Laura",
    lastName: "Gómez",
    accountNumber: "1000000001",
    balance: 4520000,
  },
  {
    id: "c-002",
    firstName: "Andrés",
    lastName: "Ramírez",
    accountNumber: "1000000002",
    balance: 1875000,
  },
  {
    id: "c-003",
    firstName: "Camila",
    lastName: "Torres",
    accountNumber: "1000000003",
    balance: 9320500,
  },
];

let transactions = [
  {
    id: "t-001",
    senderAccountNumber: "1000000001",
    receiverAccountNumber: "1000000002",
    amount: 150000,
    timestamp: "2025-09-01T14:23:00Z",
  },
  {
    id: "t-002",
    senderAccountNumber: "1000000002",
    receiverAccountNumber: "1000000003",
    amount: 60000,
    timestamp: "2025-09-04T09:10:00Z",
  },
  {
    id: "t-003",
    senderAccountNumber: "1000000003",
    receiverAccountNumber: "1000000001",
    amount: 320000,
    timestamp: "2025-09-10T18:45:00Z",
  },
];

let nextCustomerId = 4;
let nextTransactionId = 4;

export const mockDb = {
  getCustomers: () => customers,
  setCustomers: (next) => {
    customers = next;
  },
  addCustomer: (customer) => {
    const newCustomer = { ...customer, id: `c-${String(nextCustomerId).padStart(3, "0")}` };
    nextCustomerId += 1;
    customers = [...customers, newCustomer];
    return newCustomer;
  },
  updateCustomer: (id, patch) => {
    customers = customers.map((c) => (c.id === id ? { ...c, ...patch } : c));
    return customers.find((c) => c.id === id) || null;
  },
  deleteCustomer: (id) => {
    customers = customers.filter((c) => c.id !== id);
  },
  getTransactions: () => transactions,
  addTransaction: (tx) => {
    const newTx = {
      ...tx,
      id: `t-${String(nextTransactionId).padStart(3, "0")}`,
      timestamp: new Date().toISOString(),
    };
    nextTransactionId += 1;
    transactions = [...transactions, newTx];
    return newTx;
  },
};
