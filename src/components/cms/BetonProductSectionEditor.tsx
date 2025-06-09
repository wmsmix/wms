import React from 'react';
import type { BetonProductSection, BetonProduct } from '~/types/cms';

interface BetonProductSectionEditorProps {
  section: BetonProductSection;
  sectionTitle: string;
  onChange: (section: BetonProductSection) => void;
}

const BetonProductSectionEditor: React.FC<BetonProductSectionEditorProps> = ({
  section,
  sectionTitle,
  onChange,
}) => {
  const handleSectionChange = (field: keyof BetonProductSection, value: string) => {
    onChange({
      ...section,
      [field]: value,
    });
  };

  const handleProductChange = (index: number, field: keyof BetonProduct, value: string) => {
    const updatedProducts = [...section.products];
    const currentProduct = updatedProducts[index];
    if (currentProduct) {
      updatedProducts[index] = {
        ...currentProduct,
        [field]: value,
      };
      onChange({
        ...section,
        products: updatedProducts,
      });
    }
  };

  const addProduct = () => {
    const newProduct: BetonProduct = {
      title: '',
      subtitle: '',
      strength: '',
      description: '',
      imageSrc: '',
      buttonText: 'PILIH BETON INI',
      whatsappMessage: '',
      imagePosition: 'left',
      backgroundColor: 'bg-white-20',
      textColor: 'text-black',
    };

    onChange({
      ...section,
      products: [...section.products, newProduct],
    });
  };

  const removeProduct = (index: number) => {
    const updatedProducts = section.products.filter((_, i) => i !== index);
    onChange({
      ...section,
      products: updatedProducts,
    });
  };

  return (
    <div className="rounded-lg border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">{sectionTitle}</h3>

      <div className="space-y-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Section Title
          </label>
          <input
            type="text"
            value={section.title}
            onChange={(e) => handleSectionChange('title', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter section title"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Section Description
          </label>
          <textarea
            value={section.description}
            onChange={(e) => handleSectionChange('description', e.target.value)}
            rows={2}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter section description"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-800">Products</h4>
            <button
              onClick={addProduct}
              className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>

          {section.products.map((product, index) => (
            <div key={index} className="mb-4 rounded-md border border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h5 className="font-medium text-gray-700">Product {index + 1}</h5>
                <button
                  onClick={() => removeProduct(index)}
                  className="rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={product.title}
                    onChange={(e) => handleProductChange(index, 'title', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Beton Fc' 10"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={product.subtitle}
                    onChange={(e) => handleProductChange(index, 'subtitle', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="= K 150, 10 MPa"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Strength
                  </label>
                  <input
                    type="text"
                    value={product.strength}
                    onChange={(e) => handleProductChange(index, 'strength', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="10 MPa"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Image Source
                  </label>
                  <input
                    type="text"
                    value={product.imageSrc}
                    onChange={(e) => handleProductChange(index, 'imageSrc', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="/images/img-beton-product.png"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Image Position
                  </label>
                  <select
                    value={product.imagePosition}
                    onChange={(e) => handleProductChange(index, 'imagePosition', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Background Color
                  </label>
                  <select
                    value={product.backgroundColor}
                    onChange={(e) => handleProductChange(index, 'backgroundColor', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="bg-white-10">White 10</option>
                    <option value="bg-white-20">White 20</option>
                    <option value="bg-black">Black</option>
                    <option value="bg-blue-primary">Blue Primary</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Text Color
                  </label>
                  <select
                    value={product.textColor}
                    onChange={(e) => handleProductChange(index, 'textColor', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="text-black">Black</option>
                    <option value="text-white-10">White 10</option>
                    <option value="text-white-20">White 20</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={product.buttonText}
                    onChange={(e) => handleProductChange(index, 'buttonText', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="PILIH BETON INI"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter product description"
                />
              </div>

              <div className="mt-3">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  WhatsApp Message
                </label>
                <input
                  type="text"
                  value={product.whatsappMessage}
                  onChange={(e) => handleProductChange(index, 'whatsappMessage', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Beton Fc' 10 = K 150, 10 MPa"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BetonProductSectionEditor;
