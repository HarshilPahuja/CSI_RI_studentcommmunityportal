import React from "react";

const Tabs = () => {
  return (
    <div className="flex gap-8 border-b mb-8">
      <h1 className="bg-slate-900 text-slate-200 p-10"></h1>
      <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2">
        Interested Clubs
      </button>

      <button className="text-gray-500 pb-2">
        All Clubs
      </button>

      <div className="ml-auto text-blue-600 cursor-pointer">
        Manage list
      </div>
    </div>
  );
};

export default Tabs;
