"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define TypeScript interfaces for the product structure
interface Specification {
  title: string;
  columns: {
    header: string;
    key: string;
    unit?: string;
  }[];
  rows: Record<string, any>[];
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface VariantType {
  image: string;
  label: string;
}

interface Variants {
  title: string;
  types: VariantType[];
}

interface SchematicNotes {
  [key: string]: {
    label: string;
    size?: string;
  };
}

interface PrecastProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  features: Feature[];
  specifications: Specification[];
  running_text: string;
  schematic_image: string;
  schematic_notes?: SchematicNotes;
  variants?: Variants;
  created_at: string;
  updated_at: string;
}

export default function PrecastConcreteDetail({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<PrecastProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/cms/precast-concrete/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);

          // Set first image as active if images exist
          if (data.product.images && data.product.images.length > 0) {
            setActiveImage(data.product.images[0]);
          }
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch product details');
        }
      } catch (err) {
        setError('An error occurred while fetching the product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error || 'Product not found'}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <Link
          href="/cms/precast-concrete"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Precast Concrete Products
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Images */}
          <div>
            <div className="relative h-80 mb-4 rounded-lg overflow-hidden">
              {activeImage ? (
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnail images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`relative h-16 w-16 cursor-pointer rounded border-2 ${
                      activeImage === img ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    onClick={() => setActiveImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 mb-4">{product.description || 'No description available.'}</p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Features</h2>
                <div className="space-y-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 mt-1 mr-2 flex-shrink-0">
                        <Image
                          src={feature.icon || '/svgs/icon-check.svg'}
                          alt=""
                          width={24}
                          height={24}
                          unoptimized
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schematic Image */}
            {product.schematic_image && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Schematic</h2>
                <div className="relative h-60 w-full">
                  <Image
                    src={product.schematic_image}
                    alt={`${product.title} Schematic`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                {/* Schematic Notes */}
                {product.schematic_notes && Object.keys(product.schematic_notes).length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    {Object.entries(product.schematic_notes).map(([key, note]) => (
                      <div key={key} className="flex gap-2">
                        <span className="font-medium">{note.label}:</span>
                        <span>{note.size || '-'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Variants section (if it exists) */}
        {product.variants && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">{product.variants.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.variants.types.map((type, index) => (
                <div key={index} className="text-center">
                  <div className="relative h-32 w-full mb-2">
                    <Image
                      src={type.image}
                      alt={type.label}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <p className="font-medium">{type.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specifications Tabs */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Specifications</h2>

            {/* Tab headers */}
            {product.specifications.length > 1 && (
              <div className="flex border-b border-gray-200 mb-4">
                {product.specifications.map((spec, index) => (
                  <button
                    key={index}
                    className={`py-2 px-4 mr-2 ${
                      activeTab === index
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {spec.title}
                  </button>
                ))}
              </div>
            )}

            {/* Active specification table */}
            {product.specifications && activeTab < product.specifications.length && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {product.specifications[activeTab].columns.map((column, idx) => (
                        <th
                          key={idx}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column.header}
                          {column.unit && <span className="text-gray-400 ml-1">({column.unit})</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {product.specifications[activeTab].rows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-gray-50">
                        {product.specifications[activeTab].columns.map((column, colIdx) => (
                          <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row[column.key] !== undefined ? row[column.key].toString() : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Running text for specifications */}
            {product.running_text && (
              <div className="mt-4 p-3 bg-gray-50 text-sm text-gray-600 rounded">
                {product.running_text}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
