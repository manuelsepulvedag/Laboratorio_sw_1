const VARIANTS = {
  success: "border-brand-600 bg-brand-50 text-brand-900",
  error: "border-slate-900 bg-slate-50 text-slate-900",
};

/**
 * Alerta inline. "success" usa azul de marca, "error" usa escala de negro/gris,
 * respetando la paleta permitida.
 */
export default function Alert({ variant = "success", children, onClose }) {
  return (
    <div className={`flex items-start justify-between rounded-md border px-4 py-3 text-sm ${VARIANTS[variant]}`}>
      <span>{children}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-current opacity-60 hover:opacity-100">
          ✕
        </button>
      )}
    </div>
  );
}
