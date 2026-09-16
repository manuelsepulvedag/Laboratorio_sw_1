import axios from "axios";

/**
 * Cliente Axios centralizado.
 * Cuando el backend esté disponible en http://localhost:8080/api,
 * los servicios de customerService.js y transactionService.js
 * dejarán de usar sus mocks y llamarán directamente a esta instancia.
 */
export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request: aquí se agregaría el token de autenticación real.
api.interceptors.request.use((config) => {
  return config;
});

// Interceptor de response: normaliza errores para que los componentes
// siempre reciban un objeto { message } predecible.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Ocurrió un error de comunicación con el servidor.";
    return Promise.reject({ message, original: error });
  }
);

/**
 * Simula la latencia de una llamada de red real.
 * @param {number} ms
 */
export const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Bandera única para activar el backend real en el futuro.
 * Cuando el endpoint exista, cambiar a true (o eliminar los mocks).
 */
export const USE_MOCKS = true;
