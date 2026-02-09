
import React from "react";
import { Search, ChevronDown } from "lucide-react";

const Filters = ({
  categories,
  activeCategory,
  setActiveCategory,
  search,
  setSearch
}) => {
  return (
    <div className="flex flex-wrap gap-4 px-8 mt-6">
      {/* Category Dropdown */}
      <div className="relative">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="border rounded-lg px-4 py-2 pr-8 appearance-none bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>

      {/* Search Box */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search clubs..."
          className="border rounded-lg pl-10 pr-4 py-2"
        />
      </div>
    </div>
  );
};

export default Filters;
