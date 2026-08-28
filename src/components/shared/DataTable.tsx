import React, { useState } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: string, dir: 'asc' | 'desc') => void;
  bulkSelect?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  getId?: (item: T) => string;
  emptyMessage?: string;
  loading?: boolean;
}

export default function DataTable<T extends Record<string, any>>({
  columns, data, total = 0, page = 1, pageSize = 10,
  onPageChange, onSort, bulkSelect = false, selectedIds = [],
  onSelectionChange, getId, emptyMessage = 'No data available', loading = false,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const totalPages = Math.ceil(total / pageSize);

  const handleSort = (key: string) => {
    const newDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDir(newDir);
    onSort?.(key, newDir);
  };

  const toggleAll = () => {
    if (!getId || !onSelectionChange) return;
    if (selectedIds.length === data.length) onSelectionChange([]);
    else onSelectionChange(data.map(getId));
  };

  const toggleOne = (id: string) => {
    if (!onSelectionChange) return;
    onSelectionChange(
      selectedIds.includes(id) ? selectedIds.filter(x => x !== id) : [...selectedIds, id]
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-neutral">
        <div className="animate-spin h-8 w-8 border-4 border-wu-maroon border-t-transparent rounded-full mx-auto mb-3" />
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {bulkSelect && selectedIds.length > 0 && (
        <div className="bg-wu-maroon-50 px-4 py-2 text-sm text-wu-maroon font-medium border-b">
          {selectedIds.length} selected
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {bulkSelect && (
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" checked={selectedIds.length === data.length && data.length > 0} onChange={toggleAll} className="rounded" />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left font-medium text-neutral ${col.sortable ? 'cursor-pointer hover:text-wu-ink' : ''} ${col.className || ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortKey === col.key && (
                      <span className="text-wu-maroon">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (bulkSelect ? 1 : 0)} className="px-4 py-12 text-center text-neutral">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, idx) => {
                const id = getId?.(item) || String(idx);
                return (
                  <tr key={id} className="hover:bg-gray-50/50">
                    {bulkSelect && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(id)}
                          onChange={() => toggleOne(id)}
                          className="rounded"
                        />
                      </td>
                    )}
                    {columns.map(col => (
                      <td key={col.key} className={`px-4 py-3 ${col.className || ''}`}>
                        {col.render ? col.render(item) : item[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50/50">
          <span className="text-sm text-neutral">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
          </span>
          <div className="flex gap-1">
            <button
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
              className="px-3 py-1 text-sm rounded border border-gray-200 disabled:opacity-40 hover:bg-white"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
              return (
                <button
                  key={p}
                  onClick={() => onPageChange?.(p)}
                  className={`px-3 py-1 text-sm rounded border ${
                    p === page ? 'bg-wu-maroon text-white border-wu-maroon' : 'border-gray-200 hover:bg-white'
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
              className="px-3 py-1 text-sm rounded border border-gray-200 disabled:opacity-40 hover:bg-white"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
