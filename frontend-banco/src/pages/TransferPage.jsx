import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { createTransfer } from "../services/transactionService";

const initialForm = {
  senderAccountNumber: "",
  receiverAccountNumber: "",
  amount: "",
};

export default function TransferPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.senderAccountNumber.trim()) nextErrors.senderAccountNumber = "Requerido.";
    if (!form.receiverAccountNumber.trim()) nextErrors.receiverAccountNumber = "Requerido.";
    if (!form.amount || Number(form.amount) <= 0) nextErrors.amount = "Ingresa un monto válido.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await createTransfer({
        senderAccountNumber: form.senderAccountNumber.trim(),
        receiverAccountNumber: form.receiverAccountNumber.trim(),
        amount: Number(form.amount),
      });
      setFeedback({
        type: "success",
        message: `Transferencia de ${Number(form.amount).toLocaleString("es-CO")} realizada con éxito.`,
      });
      setForm(initialForm);
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Transferencias</h1>
        <p className="text-sm text-slate-500">Envía dinero entre dos cuentas.</p>
      </div>

      {feedback && (
        <Alert variant={feedback.type} onClose={() => setFeedback(null)}>
          {feedback.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-md border border-slate-200 p-6">
        <Input
          id="senderAccountNumber"
          label="Cuenta origen"
          placeholder="Ej: 1000000001"
          value={form.senderAccountNumber}
          onChange={(e) => handleChange("senderAccountNumber", e.target.value)}
          error={errors.senderAccountNumber}
        />
        <Input
          id="receiverAccountNumber"
          label="Cuenta destino"
          placeholder="Ej: 1000000002"
          value={form.receiverAccountNumber}
          onChange={(e) => handleChange("receiverAccountNumber", e.target.value)}
          error={errors.receiverAccountNumber}
        />
        <Input
          id="amount"
          label="Monto"
          type="number"
          min="0"
          step="0.01"
          placeholder="0"
          value={form.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          error={errors.amount}
        />
        <Button type="submit" disabled={submitting} className="mt-2">
          {submitting ? "Procesando..." : "Confirmar transferencia"}
        </Button>
      </form>
    </div>
  );
}
