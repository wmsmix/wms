import React from 'react';
import { Product } from '~/types/cms';
import FileUploader from './FileUploader';

interface ProductsEditorProps {
  data: Product[];
  onChange: (data: Product[]) => void;
}

const ProductsEditor: React.FC<ProductsEditorProps> = ({ data, onChange }) => {
  const handleProductChange = (index: number, field: keyof Product, value: string) => {
    const updatedProducts = [...data];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    } as Product;
    onChange(updatedProducts);
  };

  const handleImageUpload = (index: number, url: string) => {
    handleProductChange(index, 'imageSrc', url);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Products</h3>

      <div className="space-y-6">
        {data.map((product, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-700">Product {index + 1}</h4>
            </div>

            <div className="mb-4">
              <label
                htmlFor={`product-title-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id={`product-title-${index}`}
                value={product.title}
                onChange={(e) => handleProductChange(index, 'title', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`product-italicText-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Italic Text (Optional)
              </label>
              <input
                type="text"
                id={`product-italicText-${index}`}
                value={product.italicText ?? ''}
                onChange={(e) => handleProductChange(index, 'italicText', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`product-description-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id={`product-description-${index}`}
                rows={3}
                value={product.description}
                onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <FileUploader
              currentImageUrl={product.imageSrc}
              onImageUploaded={(url) => handleImageUpload(index, url)}
              label={`Product Image ${index + 1}`}
              folderPath="products"
            />

            <div className="mb-4">
              <label
                htmlFor={`product-href-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Product Link
              </label>
              <input
                type="text"
                id={`product-href-${index}`}
                value={product.href}
                onChange={(e) => handleProductChange(index, 'href', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <button
          type="button"
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          disabled
        >
          + Add Product (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default ProductsEditor;
