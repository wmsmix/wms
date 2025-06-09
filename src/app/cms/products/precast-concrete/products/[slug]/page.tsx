"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

import type { PrecastProduct, PrecastProductFeature } from '~/types/cms';
import {
  getPrecastProductBySlugFromSupabase,
  savePrecastProductToSupabase,
  updatePrecastProductInSupabase
} from '~/data/precast-supabase';
import FileUploader from '~/components/cms/FileUploader';
import SpecificationTableEditor from '~/components/cms/SpecificationTableEditor';
import { getImagePublicUrl } from '~/utils/image';
import { refreshNavigationDelayed } from '~/utils/navigation';

export default function PrecastProductEditor() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const isNewProduct = slug === 'new';

  const [product, setProduct] = useState<PrecastProduct | null>(null);
  const [isLoading, setIsLoading] = useState(!isNewProduct);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Initialize new product
  useEffect(() => {
    if (isNewProduct) {
      const newProduct: PrecastProduct = {
        slug: '',
        title: '',
        description: '',
        images: [],
        features: [],
        specifications: [],
        variants: undefined,
        running_text: '',
        schematic_image: '',
        schematic_notes: undefined,
        is_published: false,
        sort_order: 0,
      };
      setProduct(newProduct);
      setIsLoading(false);
    }
  }, [isNewProduct]);

  // Load existing product
  useEffect(() => {
    if (!isNewProduct) {
      const loadProduct = async () => {
        try {
          const productData = await getPrecastProductBySlugFromSupabase(slug);
          if (productData) {
            setProduct(productData);
          } else {
            alert('Product not found');
            router.push('/cms/products/precast-concrete');
          }
          setIsLoading(false);
        } catch (error) {
          console.error('Error loading product:', error);
          setIsLoading(false);
        }
      };

      void loadProduct();
    }
  }, [isNewProduct, slug, router]);

  const handleSave = async () => {
    if (!product) {
      return;
    }

    // Validation
    if (!product.title.trim()) {
      alert('Please enter a product title');
      return;
    }
    if (!product.slug.trim()) {
      alert('Please enter a product slug');
      return;
    }

    setSaveStatus('saving');
    try {
      const success = isNewProduct
        ? await savePrecastProductToSupabase(product)
        : await updatePrecastProductInSupabase(product.id!, product);

      if (success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);

        // Refresh navigation to reflect changes
        refreshNavigationDelayed();

        if (isNewProduct) {
          // Redirect to edit mode after creating
          router.push(`/cms/products/precast-concrete/products/${product.slug}`);
        }
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setSaveStatus('error');
    }
  };

  const handleBasicFieldChange = (field: keyof PrecastProduct, value: string | boolean | number) => {
    if (!product) return;
    setProduct({ ...product, [field]: value });
  };

  const addImage = (url: string) => {
    if (!product) return;
    setProduct({ ...product, images: [...product.images, url] });
  };

  const removeImage = (index: number) => {
    if (!product) return;
    const newImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: newImages });
  };

  const addFeature = () => {
    if (!product) return;
    const newFeature: PrecastProductFeature = {
      icon: '',
      title: '',
      description: '',
    };
    setProduct({ ...product, features: [...product.features, newFeature] });
  };

  const updateFeature = (index: number, field: keyof PrecastProductFeature, value: string) => {
    if (!product) return;
    const newFeatures = [...product.features];
    newFeatures[index] = { ...newFeatures[index]!, [field]: value };
    setProduct({ ...product, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    if (!product) return;
    const newFeatures = product.features.filter((_, i) => i !== index);
    setProduct({ ...product, features: newFeatures });
  };

  const addVariantType = () => {
    if (!product) return;
    const currentVariants = product.variants ?? { title: 'Product Variants', types: [] };
    const newType = { label: 'New Variant', image: '' };
    setProduct({
      ...product,
      variants: {
        ...currentVariants,
        types: [...currentVariants.types, newType]
      }
    });
  };

  const updateVariantType = (index: number, field: 'label' | 'image', value: string) => {
    if (!product?.variants) return;
    const newTypes = [...product.variants.types];
    newTypes[index] = { ...newTypes[index]!, [field]: value };
    setProduct({
      ...product,
      variants: { ...product.variants, types: newTypes }
    });
  };

  const removeVariantType = (index: number) => {
    if (!product?.variants) return;
    const newTypes = product.variants.types.filter((_, i) => i !== index);
    if (newTypes.length === 0) {
      setProduct({ ...product, variants: undefined });
    } else {
      setProduct({
        ...product,
        variants: { ...product.variants, types: newTypes }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
          <span className="text-lg text-gray-600">Loading product...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {isNewProduct ? 'Add New Product' : `Edit: ${product.title}`}
            </h1>
            <p className="text-sm text-gray-600">
              {isNewProduct ? 'Create a new precast concrete product' : 'Edit product details and specifications'}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/cms/')}
              className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Back to List
            </button>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`rounded-md px-4 py-2 text-white transition ${
                saveStatus === 'saving'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : saveStatus === 'success'
                  ? 'bg-green-500 hover:bg-green-600'
                  : saveStatus === 'error'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {saveStatus === 'saving'
                ? 'Saving...'
                : saveStatus === 'success'
                ? 'Saved!'
                : saveStatus === 'error'
                ? 'Error Saving'
                : isNewProduct
                ? 'Create Product'
                : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Basic Information</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Title *
                </label>
                <input
                  type="text"
                  value={product.title}
                  onChange={(e) => handleBasicFieldChange('title', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter product title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  value={product.slug}
                  onChange={(e) => handleBasicFieldChange('slug', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="product-url-slug"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                value={product.description ?? ''}
                onChange={(e) => handleBasicFieldChange('description', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter product description"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={product.sort_order}
                  onChange={(e) => handleBasicFieldChange('sort_order', parseInt(e.target.value, 10) || 0)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={product.is_published}
                  onChange={(e) => handleBasicFieldChange('is_published', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="is_published" className="ml-2 text-sm font-medium text-gray-700">
                  Published
                </label>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Product Images</h3>

            {product.images.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No images uploaded yet. Add images below.
              </div>
            ) : (
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {product.images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={getImagePublicUrl(image)}
                      alt={`Product image ${index + 1}`}
                      width={128}
                      height={128}
                      className="h-32 w-full rounded-md object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <FileUploader
              currentImageUrl=""
              onImageUploaded={addImage}
              label="Add New Image"
              folderPath="precast/products"
            />
          </div>

          {/* Features */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Product Features</h3>
              <button
                onClick={addFeature}
                className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
              >
                Add Feature
              </button>
            </div>

            {product.features.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No features added yet. Click &quot;Add Feature&quot; to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">Feature {index + 1}</h4>
                      <button
                        onClick={() => removeFeature(index)}
                        className="rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div>
                        <FileUploader
                          currentImageUrl={feature.icon}
                          onImageUploaded={(url) => updateFeature(index, 'icon', url)}
                          label="Feature Icon"
                          folderPath="precast/features"
                        />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Title
                          </label>
                          <input
                            type="text"
                            value={feature.title}
                            onChange={(e) => updateFeature(index, 'title', e.target.value)}
                            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            value={feature.description}
                            onChange={(e) => updateFeature(index, 'description', e.target.value)}
                            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Specifications Table Editor */}
          <SpecificationTableEditor
            data={product.specifications}
            onChange={(specifications) => setProduct({ ...product, specifications })}
          />

          {/* Product Variants */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Product Variants (Optional)</h3>
              {!product.variants && (
                <button
                  onClick={() => setProduct({ ...product, variants: { title: 'Product Variants', types: [] } })}
                  className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                >
                  Add Variants Section
                </button>
              )}
            </div>

            {!product.variants ? (
              <div className="py-8 text-center text-gray-500">
                No variants section. This is optional for products that have different types or variations.
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Variants Section Title
                  </label>
                  <input
                    type="text"
                    value={product.variants.title}
                    onChange={(e) => setProduct({
                      ...product,
                      variants: { ...product.variants!, title: e.target.value }
                    })}
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Variant Types</h4>
                  <button
                    onClick={addVariantType}
                    className="rounded-md bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                  >
                    Add Variant Type
                  </button>
                </div>

                {product.variants.types.length === 0 ? (
                  <div className="py-4 text-center text-gray-500">
                    No variant types yet. Click &quot;Add Variant Type&quot; to add types.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {product.variants.types.map((variant, index) => (
                      <div key={index} className="rounded-lg border border-gray-200 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <h5 className="font-medium text-gray-900">Variant {index + 1}</h5>
                          <button
                            onClick={() => removeVariantType(index)}
                            className="rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                          <div>
                            <FileUploader
                              currentImageUrl={variant.image}
                              onImageUploaded={(url) => updateVariantType(index, 'image', url)}
                              label="Variant Image"
                              folderPath="precast/variants"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              Variant Label
                            </label>
                            <input
                              type="text"
                              value={variant.label}
                              onChange={(e) => updateVariantType(index, 'label', e.target.value)}
                              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              placeholder="e.g., Type A, Type B"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setProduct({ ...product, variants: undefined })}
                    className="rounded-md bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
                  >
                    Remove Variants Section
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Additional Information</h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Running Text / Additional Specifications
                </label>
                <textarea
                  rows={4}
                  value={product.running_text ?? ''}
                  onChange={(e) => handleBasicFieldChange('running_text', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Additional product specifications or notes"
                />
              </div>

              <div>
                <FileUploader
                  currentImageUrl={product.schematic_image ?? ''}
                  onImageUploaded={(url) => handleBasicFieldChange('schematic_image', url)}
                  label="Schematic Image (Optional)"
                  folderPath="precast/schematics"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end py-4">
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`rounded-md px-6 py-3 text-white transition ${
                saveStatus === 'saving'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : saveStatus === 'success'
                  ? 'bg-green-500 hover:bg-green-600'
                  : saveStatus === 'error'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {saveStatus === 'saving'
                ? 'Saving...'
                : saveStatus === 'success'
                ? 'Saved!'
                : saveStatus === 'error'
                ? 'Error Saving'
                : isNewProduct
                ? 'Create Product'
                : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
