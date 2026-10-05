import React, { useState, useMemo } from 'react';
import { Download, ArrowUpDown, ArrowUp, ArrowDown, Search, Filter } from 'lucide-react';
import { DatasetColumn } from '../types/catalog';

interface DataGridProps {
  columns: DatasetColumn[];
  records: Record<string, any>[];
  initialQuery?: string;
  onFilterChange?: (query: string) => void;
}

export const DataGrid: React.FC<DataGridProps> = ({
  columns,
  records,
  initialQuery = '',
  onFilterChange
}) => {
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Handle sorting
  const handleSort = (colName: string) => {
    if (sortCol === colName) {
      if (sortDir === 'asc') setSortDir('desc');
      else setSortCol(null);
    } else {
      setSortCol(colName);
      setSortDir('asc');
    }
  };

  // Filtered & sorted records
  const processedRecords = useMemo(() => {
    let result = [...records];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(q)
        )
      );
    }

    if (sortCol) {
      result.sort((a, b) => {
        const valA = a[sortCol];
        const valB = b[sortCol];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDir === 'asc' ? valA - valB : valB - valA;
        }
        return sortDir === 'asc'
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return result;
  }, [records, search, sortCol, sortDir]);

  // Numeric column statistics
  const columnStats = useMemo(() => {
    const stats: Record<string, { sum: number; avg: number; min: number; max: number }> = {};
    columns.forEach((col) => {
      if (col.type === 'number') {
        const nums = processedRecords
          .map((r) => Number(r[col.name]))
          .filter((n) => !isNaN(n));
        if (nums.length > 0) {
          const sum = nums.reduce((a, b) => a + b, 0);
          stats[col.name] = {
            sum,
            avg: Number((sum / nums.length).toFixed(2)),
            min: Math.min(...nums),
            max: Math.max(...nums)
          };
        }
      }
    });
    return stats;
  }, [columns, processedRecords]);

  // Export CSV
  const exportCsv = () => {
    const header = columns.map((c) => c.name).join(',');
    const rows = processedRecords.map((r) =>
      columns
        .map((c) => {
          const val = r[c.name];
          if (typeof val === 'string' && val.includes(',')) {
            return `"${val}"`;
          }
          return val !== undefined ? val : '';
        })
        .join(',')
    );
    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dataset-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 rounded-lg border border-neutral-800 overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-3 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter records or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md pl-8 pr-3 py-1 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-blue-500/60"
            />
          </div>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-xs text-neutral-400 hover:text-neutral-200 underline"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <span className="font-mono tabular-nums">
            {processedRecords.length} of {records.length} records
          </span>
          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-md text-neutral-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 bg-neutral-900/95 backdrop-blur-sm z-10 border-b border-neutral-800">
            <tr>
              <th className="py-2.5 px-3 text-[11px] font-medium text-neutral-400 uppercase tracking-wider w-12 text-center">
                #
              </th>
              {columns.map((col) => {
                const isSorted = sortCol === col.name;
                const isNum = col.type === 'number';

                return (
                  <th
                    key={col.name}
                    onClick={() => handleSort(col.name)}
                    className={`py-2.5 px-3 text-[11px] font-medium text-neutral-300 uppercase tracking-wider cursor-pointer hover:bg-neutral-800/40 transition-colors select-none ${
                      isNum ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 ${
                        isNum ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span>{col.label || col.name}</span>
                      <span className="text-neutral-500">
                        {isSorted ? (
                          sortDir === 'asc' ? (
                            <ArrowUp className="w-3 h-3 text-blue-400" />
                          ) : (
                            <ArrowDown className="w-3 h-3 text-blue-400" />
                          )
                        ) : (
                          <ArrowUpDown className="w-2.5 h-2.5 opacity-40 hover:opacity-100" />
                        )}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {processedRecords.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-12 text-center text-xs text-neutral-500"
                >
                  No matching records found.
                </td>
              </tr>
            ) : (
              processedRecords.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-neutral-900/50 transition-colors group"
                >
                  <td className="py-2 px-3 text-center text-[11px] text-neutral-600 font-mono">
                    {idx + 1}
                  </td>
                  {columns.map((col) => {
                    const val = row[col.name];
                    const isNum = col.type === 'number';

                    return (
                      <td
                        key={col.name}
                        className={`py-2 px-3 text-neutral-300 font-normal ${
                          isNum ? 'text-right font-mono tabular-nums text-neutral-200' : 'text-left'
                        }`}
                      >
                        {isNum && typeof val === 'number'
                          ? val.toLocaleString()
                          : String(val !== undefined ? val : '—')}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Aggregate Column Metrics Footer */}
      {Object.keys(columnStats).length > 0 && (
        <div className="p-2.5 border-t border-neutral-800 bg-neutral-900/90 flex flex-wrap items-center gap-4 text-xs font-mono">
          <span className="text-neutral-500 text-[11px] font-sans">Column Aggregates:</span>
          {Object.entries(columnStats).map(([colName, stat]) => (
            <div key={colName} className="flex items-center gap-2 text-neutral-300 text-[11px]">
              <span className="text-neutral-400">{colName}:</span>
              <span>Avg {stat.avg.toLocaleString()}</span>
              <span className="text-neutral-600">·</span>
              <span>Sum {stat.sum.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
