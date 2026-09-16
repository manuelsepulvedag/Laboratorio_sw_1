import { api } from "./api";

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
  const { data } = await api.post("/transactions", payload);
  return data;
}

/**
 * Obtiene el historial de transacciones de una cuenta (como emisora o receptora).
 * @param {string} accountNumber
 * @returns {Promise<Transaction[]>}
 */
export async function getTransactionsByAccount(accountNumber) {
  const { data } = await api.get(`/transactions/${accountNumber}`);
  return data;
}
