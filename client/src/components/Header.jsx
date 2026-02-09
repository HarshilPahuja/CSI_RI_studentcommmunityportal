import React from "react";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b">
      <h1 className="text-xl font-bold">Socio</h1>

      <div className="flex items-center gap-4">
        <Settings className="cursor-pointer" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
