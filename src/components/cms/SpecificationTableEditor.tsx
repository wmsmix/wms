"use client";

import React, { useState } from 'react';

import type { PrecastProductSpecification } from '~/types/cms';

interface SpecificationTableEditorProps {
  data: PrecastProductSpecification[];
  onChange: (data: PrecastProductSpecification[]) => void;
}

const SpecificationTableEditor: React.FC<SpecificationTableEditorProps> = ({ data, onChange }) => {
  const [activeTableIndex, setActiveTableIndex] = useState<number | null>(null);

  const addTable = () => {
    const newTable: PrecastProductSpecification = {
      title: 'New Specification Table',
      columns: [
        { key: 'type', header: 'Type' },
        { key: 'dimension', header: 'Dimension', unit: 'mm' }
      ],
      rows: [
        { type: '', dimension: '' }
      ]
    };
    onChange([...data, newTable]);
    setActiveTableIndex(data.length);
  };

  const removeTable = (index: number) => {
    if (confirm('Are you sure you want to delete this table?')) {
      const newData = data.filter((_, i) => i !== index);
      onChange(newData);
      if (activeTableIndex === index) {
        setActiveTableIndex(null);
      }
    }
  };

  const updateTableTitle = (index: number, title: string) => {
    const newData = [...data];
    const table = newData[index];
    if (!table) return;

    newData[index] = { ...table, title };
    onChange(newData);
  };

  const addColumn = (tableIndex: number) => {
    const newData = [...data];
    const table = newData[tableIndex];
    if (!table) return;

    const newColumnKey = `column_${Date.now()}`;
    table.columns.push({
      key: newColumnKey,
      header: 'New Column',
      unit: ''
    });

    // Add empty value to all existing rows
    table.rows.forEach(row => {
      row[newColumnKey] = '';
    });

    onChange(newData);
  };

  const removeColumn = (tableIndex: number, columnKey: string) => {
    const table = data[tableIndex];
    if (!table || table.columns.length <= 1) {
      alert('Table must have at least one column');
      return;
    }

    const newData = [...data];
    const updatedTable = newData[tableIndex];
    if (!updatedTable) return;

    // Remove column
    updatedTable.columns = updatedTable.columns.filter(col => col.key !== columnKey);

    // Remove column data from all rows
    updatedTable.rows.forEach(row => {
      delete row[columnKey];
    });

    onChange(newData);
  };

  const updateColumn = (tableIndex: number, columnKey: string, field: 'header' | 'unit', value: string) => {
    const newData = [...data];
    const table = newData[tableIndex];
    if (!table) return;

    const column = table.columns.find(col => col.key === columnKey);

    if (column) {
      if (field === 'unit') {
        column.unit = value;
      } else {
        column.header = value;
      }
    }

    onChange(newData);
  };

  const addRow = (tableIndex: number) => {
    const newData = [...data];
    const table = newData[tableIndex];
    if (!table) return;

    const newRow: Record<string, string | number> = {};
    table.columns.forEach(col => {
      newRow[col.key] = '';
    });

    table.rows.push(newRow);
    onChange(newData);
  };

  const removeRow = (tableIndex: number, rowIndex: number) => {
    const table = data[tableIndex];
    if (!table || table.rows.length <= 1) {
      alert('Table must have at least one row');
      return;
    }

    const newData = [...data];
    const updatedTable = newData[tableIndex];
    if (!updatedTable) return;

    updatedTable.rows = updatedTable.rows.filter((_, i) => i !== rowIndex);
    onChange(newData);
  };

  const updateCell = (tableIndex: number, rowIndex: number, columnKey: string, value: string) => {
    const newData = [...data];
    const table = newData[tableIndex];
    if (!table) return;

    const row = table.rows[rowIndex];
    if (!row) return;

    const numValue = Number(value);
    row[columnKey] = isNaN(numValue) ? value : numValue;
    onChange(newData);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Specification Tables</h3>
        <button
          onClick={addTable}
          className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        >
          Add Table
        </button>
      </div>

      {data.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          No specification tables yet. Click &quot;Add Table&quot; to create your first table.
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((table, tableIndex) => (
            <div key={tableIndex} className="rounded-lg border border-gray-300 p-4">
              <div className="mb-4 flex items-center justify-between">
                <input
                  type="text"
                  value={table.title}
                  onChange={(e) => updateTableTitle(tableIndex, e.target.value)}
                  className="text-lg font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-2 py-1"
                  placeholder="Table Title"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTableIndex(activeTableIndex === tableIndex ? null : tableIndex)}
                    className="rounded-md bg-gray-500 px-2 py-1 text-xs text-white hover:bg-gray-600"
                  >
                    {activeTableIndex === tableIndex ? 'Collapse' : 'Edit Structure'}
                  </button>
                  {data.length > 1 && (
                    <button
                      onClick={() => removeTable(tableIndex)}
                      className="rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                    >
                      Delete Table
                    </button>
                  )}
                </div>
              </div>

              {/* Column Management (only show when active) */}
              {activeTableIndex === tableIndex && (
                <div className="mb-4 rounded-md bg-gray-50 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700">Column Settings</h4>
                    <button
                      onClick={() => addColumn(tableIndex)}
                      className="rounded-md bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
                    >
                      Add Column
                    </button>
                  </div>
                  <div className="space-y-2">
                    {table.columns.map((column, _colIndex) => (
                      <div key={column.key} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={column.header}
                          onChange={(e) => updateColumn(tableIndex, column.key, 'header', e.target.value)}
                          placeholder="Column Header"
                          className="flex-1 rounded-md border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          value={column.unit ?? ''}
                          onChange={(e) => updateColumn(tableIndex, column.key, 'unit', e.target.value)}
                          placeholder="Unit (optional)"
                          className="w-24 rounded-md border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {table.columns.length > 1 && (
                          <button
                            onClick={() => removeColumn(tableIndex, column.key)}
                            className="rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      {table.columns.map((column) => (
                        <th key={column.key} className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                          {column.header}
                          {column.unit && <span className="text-xs text-gray-500"> ({column.unit})</span>}
                        </th>
                      ))}
                      <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700 w-20">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-gray-50">
                        {table.columns.map((column) => (
                          <td key={column.key} className="border border-gray-300 px-3 py-2">
                            <input
                              type="text"
                              value={String(row[column.key] ?? '')}
                              onChange={(e) => updateCell(tableIndex, rowIndex, column.key, e.target.value)}
                              className="w-full border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 py-1"
                              placeholder={`Enter ${column.header.toLowerCase()}`}
                            />
                          </td>
                        ))}
                        <td className="border border-gray-300 px-3 py-2 text-center">
                          {table.rows.length > 1 && (
                            <button
                              onClick={() => removeRow(tableIndex, rowIndex)}
                              className="rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                            >
                              ×
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 flex justify-start">
                <button
                  onClick={() => addRow(tableIndex)}
                  className="rounded-md bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                >
                  Add Row
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecificationTableEditor;
