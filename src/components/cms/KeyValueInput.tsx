"use client";

import React from 'react';

interface KeyValueInputProps<T> {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  keyFieldName: keyof T;
  valueFieldName: keyof T;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
}

export default function KeyValueInput<T>({
  label,
  items,
  onChange,
  keyFieldName,
  valueFieldName,
  keyPlaceholder = "Enter key",
  valuePlaceholder = "Enter value"
}: KeyValueInputProps<T>) {
  const handleAddItem = () => {
    const newItem = { [keyFieldName]: '', [valueFieldName]: '' } as T;
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleItemChange = (index: number, field: keyof T, value: string) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange(newItems);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={String(item[keyFieldName] ?? '')}
              onChange={(e) => handleItemChange(index, keyFieldName, e.target.value)}
              placeholder={keyPlaceholder}
              className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="text"
              value={String(item[valueFieldName] ?? '')}
              onChange={(e) => handleItemChange(index, valueFieldName, e.target.value)}
              placeholder={valuePlaceholder}
              className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="px-3 py-2 text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-gray-500 text-sm italic">No items added yet.</p>
        )}

        <button
          type="button"
          onClick={handleAddItem}
          className="mt-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
        >
          Add {label.toLowerCase().replace(/s$/, '')}
        </button>
      </div>
    </div>
  );
}
