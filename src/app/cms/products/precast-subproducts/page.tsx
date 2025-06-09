"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { PrecastProduct } from '~/types/cms';
import {
  getPrecastProductsFromSupabase,
  deletePrecastProductFromSupabase
} from '~/data/precast-supabase';
import { getImagePublicUrl } from '~/utils/image';
import { refreshNavigationDelayed } from '~/utils/navigation';

export default function PrecastSubproductsPage() {
  const [products, setProducts] = useState<PrecastProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products on page load
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const precastProducts = await getPrecastProductsFromSupabase();
        setProducts(precastProducts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading precast products:', error);
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const success = await deletePrecastProductFromSupabase(productId);
      if (success) {
        setProducts(products.filter(p => p.id !== productId));
        // Refresh navigation to reflect changes
        refreshNavigationDelayed();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  const refreshProducts = async () => {
    try {
      const precastProducts = await getPrecastProductsFromSupabase();
      setProducts(precastProducts);
    } catch (error) {
      console.error('Error refreshing products:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
          <span className="text-lg text-gray-600">Loading precast products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Precast Subproducts</h1>
          <div className="flex space-x-3">
            <button
              onClick={refreshProducts}
              className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Refresh
            </button>
            <Link
              href="/cms/products/precast-concrete/products/new"
              className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Add New Product
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          {products.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No products found. Click &quot;Add New Product&quot; to create your first product.
            </div>
          ) : (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Sort Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {product.images[0] && (
                            <Image
                              className="h-10 w-10 rounded-md object-cover"
                              src={getImagePublicUrl(product.images[0])}
                              alt={product.title}
                              width={40}
                              height={40}
                            />
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                            <div className="text-sm text-gray-500">/{product.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            product.is_published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.is_published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{product.sort_order}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {product.updated_at ? new Date(product.updated_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            href={`/products/precast-concrete/${product.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </Link>
                          <Link
                            href={`/cms/products/precast-concrete/products/${product.slug}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product.id ?? '')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
