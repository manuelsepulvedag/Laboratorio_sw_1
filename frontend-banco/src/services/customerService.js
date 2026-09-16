import { api, delay, USE_MOCKS } from "./api";
import { mockDb } from "./mockData";

/**
 * Servicio de clientes.
 * Cada función ya tiene la llamada Axios real comentada justo debajo del mock,
 * lista para descomentar el día que exista el endpoint http://localhost:8080/api/customers.
 *
 * @typedef {import('../models/types').Customer} Customer
 */

/** @returns {Promise<Customer[]>} */
export async function getCustomers() {
  if (USE_MOCKS) {
    await delay();
    return mockDb.getCustomers();
  }
  const { data } = await api.get("/customers");
  return data;
}

/**
 * @param {Omit<Customer, 'id'>} customer
 * @returns {Promise<Customer>}
 */
export async function createCustomer(customer) {
  if (USE_MOCKS) {
    await delay();
    return mockDb.addCustomer(customer);
  }
  const { data } = await api.post("/customers", customer);
  return data;
}

/**
 * @param {string} id
 * @param {Partial<Customer>} patch
 * @returns {Promise<Customer>}
 */
export async function updateCustomer(id, patch) {
  if (USE_MOCKS) {
    await delay();
    return mockDb.updateCustomer(id, patch);
  }
  const { data } = await api.put(`/customers/${id}`, patch);
  return data;
}

/**
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteCustomer(id) {
  if (USE_MOCKS) {
    await delay();
    mockDb.deleteCustomer(id);
    return;
  }
  await api.delete(`/customers/${id}`);
}
