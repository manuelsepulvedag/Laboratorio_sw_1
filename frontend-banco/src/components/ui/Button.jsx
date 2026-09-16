const VARIANTS = {
  primary: "bg-slate-900 text-white hover:bg-brand-700 disabled:bg-slate-300",
  secondary:
    "bg-white text-slate-900 border border-slate-300 hover:border-slate-900 disabled:text-slate-300 disabled:border-slate-200",
  ghost: "bg-transparent text-slate-600 hover:text-slate-900 disabled:text-slate-300",
  danger: "bg-white text-slate-900 border border-slate-300 hover:border-slate-900 hover:text-slate-900",
};

/**
 * Botón base de la aplicación. Solo tres variantes, sin colores fuera de la
 * escala azul/blanco/negro.
 */
export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
