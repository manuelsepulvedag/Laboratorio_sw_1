import { api } from "./api";

/**
 * Servicio de clientes.
 * Cada función ya tiene la llamada Axios real comentada justo debajo del mock,
 * lista para descomentar el día que exista el endpoint http://localhost:8080/api/customers.
 *
 * @typedef {import('../models/types').Customer} Customer
 */

/** @returns {Promise<Customer[]>} */
export async function getCustomers() {
  const { data } = await api.get("/customers");
  return data;
}

/**
 * @param {Omit<Customer, 'id'>} customer
 * @returns {Promise<Customer>}
 */
export async function createCustomer(customer) {
  const { data } = await api.post("/customers", customer);
  return data;
}

/**
 * @param {string} id
 * @param {Partial<Customer>} patch
 * @returns {Promise<Customer>}
 */
export async function updateCustomer(id, patch) {
  const { data } = await api.put(`/customers/${id}`, patch);
  return data;
}

/**
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteCustomer(id) {
  await api.delete(`/customers/${id}`);
}
