import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import Table from "../components/ui/Table";
import { getTransactionsByAccount } from "../services/transactionService";

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeStyle: "short",
});

const columns = [
  { key: "id", header: "ID" },
  { key: "senderAccountNumber", header: "Cuenta origen" },
  { key: "receiverAccountNumber", header: "Cuenta destino" },
  {
    key: "amount",
    header: "Monto",
    render: (row) => currencyFormatter.format(row.amount),
  },
  {
    key: "timestamp",
    header: "Fecha",
    render: (row) => dateFormatter.format(new Date(row.timestamp)),
  },
];

export default function TransactionHistoryPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    setError(null);

    if (!accountNumber.trim()) {
      setError("Ingresa un número de cuenta.");
      return;
    }

    setLoading(true);
    try {
      const data = await getTransactionsByAccount(accountNumber.trim());
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Historial de transacciones</h1>
        <p className="text-sm text-slate-500">
          Ingresa el número de cuenta de un cliente para ver su histórico.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex items-end gap-3">
        <div className="flex-1">
          <Input
            id="accountNumber"
            label="Número de cuenta"
            placeholder="Ej: 1000000001"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            error={error}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Consultar"}
        </Button>
      </form>

      {transactions !== null && !error && transactions.length === 0 && (
        <Alert variant="error">Esta cuenta no tiene transacciones registradas.</Alert>
      )}

      {transactions !== null && transactions.length > 0 && (
        <Table columns={columns} rows={transactions} rowKey={(row) => row.id} />
      )}
    </div>
  );
}
