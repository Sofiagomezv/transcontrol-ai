type ExcelPreviewTableProps = {
  headers: string[];
  rows: Array<Array<string | number | boolean | Date | null>>;
};

export function ExcelPreviewTable({ headers, rows }: ExcelPreviewTableProps) {
  if (!headers.length) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-800 text-slate-400">
            {headers.map((header) => (
              <th key={header} className="whitespace-nowrap px-3 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.join("-")}-${index}`} className="border-b border-slate-800/70 text-slate-200 last:border-0">
              {headers.map((header, headerIndex) => {
                const value = row[headerIndex] ?? "";
                return (
                  <td key={`${header}-${headerIndex}`} className="max-w-[220px] truncate px-3 py-3">
                    {String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
