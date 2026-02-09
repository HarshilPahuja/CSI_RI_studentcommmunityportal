import React from "react";
import { Settings, Bell } from "lucide-react";
//universal dashboard on top
const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b">
      <h1 className="text-xl font-bold">Socio</h1>
      <div className="flex items-center gap-4">
        <Settings className="cursor-pointer" />
        <Bell className="cursor-pointer" />
        <img
          src="https://csspicker.dev/api/image/?q=portrait+man&image_type=photo"
          alt="profile"
          className="w-9 h-9 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
