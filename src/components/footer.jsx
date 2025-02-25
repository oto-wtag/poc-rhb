import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  trainIcon,
  houseIcon,
  homeIcon,
  alertIcon,
  maintenanceIcon,
} from "@/assets/icons/footer-icons";

const Footer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const footerMenu = [
    { id: 1, icon: trainIcon, path: "routes" },
    { id: 2, icon: houseIcon, path: "stations" },
    { id: 3, icon: homeIcon, path: "home" },
    { id: 4, icon: alertIcon, path: "incidents" },
    { id: 5, icon: maintenanceIcon, path: "maintenance" },
  ];
  const currentPath = searchParams.get("t");

  const handleNavigation = (path) => {
    setSearchParams({ t: path });
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white z-[999] flex justify-center shadow">
      <div className="max-w-4xl w-full h-full flex justify-between items-center mx-2">
        {footerMenu.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-center rounded-full w-16 h-10 cursor-pointer ${
              currentPath === item.path && "bg-[rgba(235,10,35,0.1)]"
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon && (
              <item.icon
                className={`h-6 w-6 ${
                  currentPath === item.path
                    ? "text-[#EB0A23]"
                    : "text-[#828282]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
