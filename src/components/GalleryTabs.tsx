import React from "react";

interface Category {
  id: string;
  label: string;
}

interface GalleryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const GalleryTabs: React.FC<GalleryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mb-8">
      <div className="border-b border-gray-300 flex items-start justify-start gap-2 md:gap-8 pb-4 w-full overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 text-sm md:text-base transition-colors duration-200
              ${
                activeCategory === category.id
                  ? "text-blue-primary"
                  : "text-black/50 hover:text-blue-primary"
              }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryTabs; 