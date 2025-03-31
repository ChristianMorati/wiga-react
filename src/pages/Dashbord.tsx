import { JSX, useState, useEffect } from "react";
import MyStore from "../components/dashboard/store/MyStore";
import MyProducts from "../components/dashboard/store/MyProducts";
import EcommerceDisplay from "../components/dashboard/how-they-see-you/EcommerceDisplay";
import SearchBar from "../components/dashboard/how-they-see-you/SearchBar";
import SideBar from "../components/dashboard/SideBar";

export type SectionKeys = "home" | "myProducts" | "howUsersSeem";

function Dashboard() {
  const [activeSection, setActiveSection] = useState<SectionKeys>("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024); // lg = 1024px

  // Verifica tamanho da tela e mantém o menu aberto quando grande
  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth >= 1024;
      setIsLargeScreen(isLarge);
      if (isLarge) {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sections: Record<SectionKeys, JSX.Element> = {
    home: <MyStore />,
    myProducts: <MyProducts />,
    howUsersSeem: <EcommerceDisplay />,
  };

  return (
    <div className="flex w-full h-screen relative">
      {/* NAV */}
      <div
        className={`border-slate-400 border-r transition-all duration-300 transform origin-left gap-1 flex flex-col
          z-50 bg-white h-screen
          absolute md:fixed md:h-screen md:w-2/10 md:bg-white md:shadow-lg
          ${isOpen ? "w-2/3 opacity-100 scale-x-100 md:w-3/10 lg:w-2/10" : "w-0 opacity-0 scale-x-0"}
        `}
      >
        <SideBar
          activeSection={activeSection}
          isOpen={isOpen}
          setActiveSection={setActiveSection}
          setIsOpen={setIsOpen}
        />
        {!isLargeScreen && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gray-800 text-white px-2 py-2"
          >
            {isOpen ? "<" : "<"}
          </button>
        )}
      </div>

      {/* Conteúdo principal */}
      <div
        className={`h-screen flex flex-col gap-2 overflow-y-auto transition-all duration-300
          p-2
          ${isOpen ? "md:ml-[30%] md:w-7/10 lg:ml-[20%] lg:w-8/10" : "ml-0 w-full"}
        `}
      >
        <div className="flex flex-col m-2 mb-0 gap-2">
          <div className="flex">
            {!isLargeScreen && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-600 text-white px-4 p-1 rounded size-10"
              >
                {isOpen ? "<" : "<"}
              </button>
            )}
          </div>
          {activeSection === "howUsersSeem" && (
            <div className="flex justify-center">
              <SearchBar onSearch={() => { }} />
            </div>
          )}
        </div>

        <div>{sections[activeSection]}</div>
      </div>
    </div>
  );
}

export default Dashboard;
