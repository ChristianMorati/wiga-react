import { Dispatch, JSX, SetStateAction } from "react";
import { FiHome, FiUser } from "react-icons/fi";
import { SectionKeys } from "../../pages/Dashbord";

type SideBarProps = {
  activeSection: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setActiveSection: Dispatch<SetStateAction<SectionKeys>>
};

type ButtonType = {
  key: SectionKeys;
  icon: JSX.Element;
  title: string;
};

type NavListItemProps = {
  itemKey: SectionKeys;
  icon: JSX.Element;
  title: string;
};

export default function SideBar({
  activeSection,
  setActiveSection }: SideBarProps) {
  const buttons: ButtonType[] = [
    { key: "home", icon: <FiHome />, title: "Minha Loja" },
    { key: "myProducts", icon: <FiUser />, title: "Meus produtos" },
    { key: "howUsersSeem", icon: <FiUser />, title: "Como eles te veem" },
  ];

  const NavListItem: React.FC<NavListItemProps> = ({ itemKey, icon, title }) => (
    <button
      key={itemKey}
      onClick={() => setActiveSection(itemKey)}
      className={`text-sm flex items-center justify-start w-full text-regular gap-2 p-2 ${activeSection === itemKey ? "bg-blue-500 text-white font-semibold" : "hover:bg-slate-400"} hover:text-white font-semibold`}
    >
      {icon} {title}
    </button>
  );

  return (
    <>
      {buttons.map(({ key, icon, title }) => (
        <NavListItem
          key={key}
          itemKey={key}
          icon={icon}
          title={title}
        />
      ))}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className=" bg-slate-900 text-white p-2 rounded-full"
      >
        <MdOutlineMenu className="text-2xl" />
      </button> */}
    </>
  );
}