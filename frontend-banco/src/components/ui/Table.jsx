/**
 * Tabla genérica y sobria.
 * @param {{ columns: {key: string, header: string, render?: (row: any) => React.ReactNode}[], rows: any[], emptyMessage?: string, rowKey: (row: any) => string }} props
 */
export default function Table({ columns, rows, emptyMessage = "No hay información para mostrar.", rowKey }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-md border border-slate-200 py-10 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-slate-200">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium text-slate-600">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-slate-800">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
