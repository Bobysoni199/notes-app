import React from 'react';

const Sidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="w-64 bg-gray-100 p-4 md:w-48 lg:w-64">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category} className="mb-2">
            <button
              className={`w-full text-left p-2 rounded ${
                selectedCategory === category ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
              }`}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
