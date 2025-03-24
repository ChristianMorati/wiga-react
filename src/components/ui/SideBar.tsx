import { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", link: "#" },
    { name: "Como eles me veem", link: "#" },
    { name: "Minha Loja", link: "#Minha Loja" },
    { name: "Meus Produtos", link: "#" },
    { name: "Configurações", link: "#" },
  ];

  return (
    <>
      {/* Sidebar for Desktop */}
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-gray-700 size-[50px]">
      </button>
      <aside
        className={`md:flex flex-col bg-gray-900 text-white h-screen space-y-4 fixed transition-transform duration-200 ${isOpen ? "translate-x-0 p-4" : "-translate-x-full"} z-50`}
      >
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800"
          >
            <span>{isOpen && item.name}</span>
          </a>
        ))}
      </aside>
    </>
  );
};

export default Sidebar;