import axios from "axios";

/**
 * Cliente Axios centralizado.
 * Todos los servicios llaman al backend real en esta instancia.
 */
export const api = axios.create({
  baseURL: "http://localhost:8080/api/",
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

