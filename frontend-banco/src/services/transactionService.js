import { api, delay, USE_MOCKS } from "./api";
import { mockDb } from "./mockData";

/**
 * Servicio de transferencias y transacciones.
 *
 * @typedef {import('../models/types').Transaction} Transaction
 * @typedef {import('../models/types').TransferRequest} TransferRequest
 */

/**
 * Ejecuta una transferencia entre dos cuentas.
 * @param {TransferRequest} payload
 * @returns {Promise<Transaction>}
 */
export async function createTransfer(payload) {
  if (USE_MOCKS) {
    await delay(600);

    const customers = mockDb.getCustomers();
    const sender = customers.find((c) => c.accountNumber === payload.senderAccountNumber);
    const receiver = customers.find((c) => c.accountNumber === payload.receiverAccountNumber);

    if (!sender) throw { message: "La cuenta origen no existe." };
    if (!receiver) throw { message: "La cuenta destino no existe." };
    if (sender.accountNumber === receiver.accountNumber) {
      throw { message: "La cuenta origen y destino no pueden ser la misma." };
    }
    if (payload.amount <= 0) throw { message: "El monto debe ser mayor a cero." };
    if (sender.balance < payload.amount) throw { message: "Saldo insuficiente en la cuenta origen." };

    mockDb.updateCustomer(sender.id, { balance: sender.balance - payload.amount });
    mockDb.updateCustomer(receiver.id, { balance: receiver.balance + payload.amount });

    return mockDb.addTransaction(payload);
  }
  const { data } = await api.post("/transactions/transfer", payload);
  return data;
}

/**
 * Obtiene el historial de transacciones de una cuenta (como emisora o receptora).
 * @param {string} accountNumber
 * @returns {Promise<Transaction[]>}
 */
export async function getTransactionsByAccount(accountNumber) {
  if (USE_MOCKS) {
    await delay();
    return mockDb
      .getTransactions()
      .filter(
        (t) =>
          t.senderAccountNumber === accountNumber || t.receiverAccountNumber === accountNumber
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
  const { data } = await api.get(`/transactions/account/${accountNumber}`);
  return data;
}
