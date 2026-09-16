import Table from "../ui/Table";
import Button from "../ui/Button";

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

/**
 * @param {{ customers: any[], onEdit: (c: any) => void, onDelete: (c: any) => void }} props
 */
export default function CustomerTable({ customers, onEdit, onDelete }) {
  const columns = [
    { key: "id", header: "ID" },
    { key: "firstName", header: "Nombre" },
    { key: "lastName", header: "Apellido" },
    { key: "accountNumber", header: "Número de cuenta" },
    {
      key: "balance",
      header: "Saldo",
      render: (row) => currencyFormatter.format(row.balance),
    },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => onEdit(row)}>
            Editar
          </Button>
          <Button variant="danger" onClick={() => onDelete(row)}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rows={customers}
      rowKey={(row) => row.id}
      emptyMessage="Todavía no hay clientes registrados."
    />
  );
}
