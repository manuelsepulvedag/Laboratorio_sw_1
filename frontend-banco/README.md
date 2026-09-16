# banco — Frontend (laboratorio)

Frontend de una aplicación bancaria construido con React + Vite + Tailwind CSS.
No hay backend real conectado: los servicios usan datos mockeados en memoria,
pero ya están estructurados con Axios y listos para apuntar a
`http://localhost:8080/api` cuando el backend exista.

## Instalación

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## Cómo pasar de mocks a backend real

En `src/services/api.js`, cambia la constante `USE_MOCKS` a `false`.
Cada función de `customerService.js` y `transactionService.js` ya tiene la
llamada Axios real escrita, solo queda deshabilitado el mock.

## Estructura de carpetas

```
src/
├── components/
│   ├── layout/        # Navbar y Layout general
│   ├── ui/             # Button, Input, Table, Modal, Alert (reutilizables)
│   └── customers/      # CustomerTable, CustomerForm (específicos del dominio)
├── pages/
│   ├── CustomersPage.jsx           # CRUD de clientes
│   ├── TransferPage.jsx            # Formulario de transferencias
│   └── TransactionHistoryPage.jsx  # Historial por número de cuenta
├── services/
│   ├── api.js                 # Instancia de Axios + bandera USE_MOCKS
│   ├── mockData.js            # "Base de datos" en memoria
│   ├── customerService.js     # CRUD de clientes
│   └── transactionService.js  # Transferencias e historial
├── models/
│   └── types.js         # Definición de Customer, Transaction, TransferRequest (JSDoc)
├── App.jsx               # Enrutamiento (React Router)
├── main.jsx              # Punto de entrada
└── index.css              # Tailwind
```

## Diseño

Paleta restringida a azul de marca (`brand-*` en `tailwind.config.js`), blanco
y escala de grises/negro (`slate-*`). Sin colores adicionales, sin bordes
redondeados exagerados ni sombras decorativas: la interfaz prioriza la
legibilidad de la información financiera.
