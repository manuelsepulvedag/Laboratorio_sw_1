/**
 * Modelos de datos de banco.
 * Se documentan con JSDoc para tener autocompletado y chequeo de forma
 * sin necesidad de migrar el proyecto a TypeScript.
 */

/**
 * @typedef {Object} Customer
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} accountNumber
 * @property {number} balance
 */

/**
 * @typedef {Object} Transaction
 * @property {string} id
 * @property {string} senderAccountNumber
 * @property {string} receiverAccountNumber
 * @property {number} amount
 * @property {string} timestamp - ISO 8601
 */

/**
 * @typedef {Object} TransferRequest
 * @property {string} senderAccountNumber
 * @property {string} receiverAccountNumber
 * @property {number} amount
 */

export {};
