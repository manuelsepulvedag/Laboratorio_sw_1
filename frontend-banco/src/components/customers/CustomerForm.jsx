import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

/**
 * @param {{ initialValues?: any, onSubmit: (values: any) => void, onCancel: () => void, submitLabel?: string }} props
 */
export default function CustomerForm({ initialValues, onSubmit, onCancel, submitLabel = "Guardar" }) {
  const [values, setValues] = useState({
    firstName: initialValues?.firstName || "",
    lastName: initialValues?.lastName || "",
    accountNumber: initialValues?.accountNumber || "",
    balance: initialValues?.balance ?? "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!values.firstName.trim()) nextErrors.firstName = "Requerido.";
    if (!values.lastName.trim()) nextErrors.lastName = "Requerido.";
    if (!values.accountNumber.trim()) nextErrors.accountNumber = "Requerido.";
    if (values.balance === "" || Number(values.balance) < 0) {
      nextErrors.balance = "Ingresa un saldo válido.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...values, balance: Number(values.balance) });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="firstName"
        label="Nombre"
        value={values.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
        error={errors.firstName}
      />
      <Input
        id="lastName"
        label="Apellido"
        value={values.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
        error={errors.lastName}
      />
      <Input
        id="accountNumber"
        label="Número de cuenta"
        value={values.accountNumber}
        onChange={(e) => handleChange("accountNumber", e.target.value)}
        error={errors.accountNumber}
      />
      <Input
        id="balance"
        label="Saldo"
        type="number"
        min="0"
        step="0.01"
        value={values.balance}
        onChange={(e) => handleChange("balance", e.target.value)}
        error={errors.balance}
      />
      <div className="mt-2 flex justify-end gap-3">
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
