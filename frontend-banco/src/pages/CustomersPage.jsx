import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Alert from "../components/ui/Alert";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerForm from "../components/customers/CustomerForm";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customerService";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState(null); // "create" | "edit" | null
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [feedback, setFeedback] = useState(null); // { type, message }

  async function loadCustomers() {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  function openCreateModal() {
    setSelectedCustomer(null);
    setModalMode("create");
  }

  function openEditModal(customer) {
    setSelectedCustomer(customer);
    setModalMode("edit");
  }

  function closeModal() {
    setModalMode(null);
    setSelectedCustomer(null);
  }

  async function handleSubmit(values) {
    try {
      if (modalMode === "edit") {
        await updateCustomer(selectedCustomer.id, values);
        setFeedback({ type: "success", message: "Cliente actualizado correctamente." });
      } else {
        await createCustomer(values);
        setFeedback({ type: "success", message: "Cliente creado correctamente." });
      }
      closeModal();
      loadCustomers();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    }
  }

  async function confirmDelete() {
    try {
      await deleteCustomer(customerToDelete.id);
      setFeedback({ type: "success", message: "Cliente eliminado correctamente." });
      setCustomerToDelete(null);
      loadCustomers();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Clientes</h1>
          <p className="text-sm text-slate-500">Consulta, crea, edita y elimina clientes.</p>
        </div>
        <Button onClick={openCreateModal}>Nuevo cliente</Button>
      </div>

      {feedback && (
        <Alert variant={feedback.type} onClose={() => setFeedback(null)}>
          {feedback.message}
        </Alert>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Cargando clientes...</p>
      ) : (
        <CustomerTable customers={customers} onEdit={openEditModal} onDelete={setCustomerToDelete} />
      )}

      <Modal
        open={modalMode !== null}
        title={modalMode === "edit" ? "Editar cliente" : "Nuevo cliente"}
        onClose={closeModal}
      >
        <CustomerForm
          initialValues={selectedCustomer}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitLabel={modalMode === "edit" ? "Guardar cambios" : "Crear cliente"}
        />
      </Modal>

      <Modal
        open={customerToDelete !== null}
        title="Eliminar cliente"
        onClose={() => setCustomerToDelete(null)}
      >
        <p className="text-sm text-slate-600">
          ¿Confirmas eliminar a {customerToDelete?.firstName} {customerToDelete?.lastName}? Esta
          acción no se puede deshacer.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setCustomerToDelete(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
