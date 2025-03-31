import useCompanyStore from "../../../store/CompanyReducer";
import { FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';
import StorePhotoFileInput from "./StorePhotoFileInput";
import SectionTitle from "../../SectionTitle";
import { useEffect, useState } from "react";
import ConditionalViewWrapper from "../../ui/ShowOrHide";
import PhoneForm from "./forms/PhoneForm";
import AddressForm from "./forms/AutoFillAddress";
import { Link } from "react-router-dom";

export default function MyStore() {
  const { name } = useCompanyStore();

  const [isEditing, setIsEditing] = useState<boolean>(true);
  const phone = "(27) 3371-0000";
  const cep = "29902380";

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-2 pb-4 flex flex-col gap-2">
      <div className="flex justify-between">
         {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 px-4 py-2 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800"
        >
          ↑ Topo
        </button>
      )}
        <SectionTitle title={name} />
        <button
          className="
          text-sm
          font-semibold
          bg-blue-500 text-white px-4 py-2 rounded-md
          "
          onClick={() => setIsEditing(!isEditing)}>{`${isEditing ? "Sair da Edição" : "Editar Informações"}`}
        </button>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="
				w-full max-w-[250px] lg:w-[30%] max-h-[250px]
        border border-gray-200 overflow-hidden relative
        ">
          <img
            className="w-full h-full object-contain"
            src="https://i.pinimg.com/564x/d6/56/8a/d6568a4b717bd46afccb585c8b869afb.jpg"
            alt={`imagem-loja-${name}`}
          />

          <ConditionalViewWrapper isVisible={isEditing} >
            <div className="
              absolute
              top-1
              right-1
              text-sm
              font-semibold
              text-white rounded-md
              ">
              <StorePhotoFileInput />
            </div>
            <Link to={"/"}>
            <button className="
              absolute
              bottom-1
              right-1
              text-sm
              font-semibold
              bg-blue-500 text-white px-4 py-2
              ">
              Ver Produtos
            </button>
            </Link>
          </ConditionalViewWrapper>
        </div>
        <div className="flex flex-col gap-2 md:p-4">
          <SectionTitle title={name} />
          <div className="flex  flex-row gap-2 justify-start items-start">
            <FaMapMarkerAlt className="text-red-600 text-xl" />
            <span>Endereço: Av. Comendador Rafael, 1324 - Centro, Linhares - ES, 29900-052</span>
          </div>

          <ConditionalViewWrapper isVisible={isEditing}>
            <AddressForm cep={cep} />
          </ConditionalViewWrapper>

          <div className="flex  flex-row gap-2 justify-start items-start">
            <FaClock className="text-sky-600 text-xl" />
            <span>Horário de funcionamento: Aberto ⋅ Fecha às 18:00</span>
          </div>
          <hr />
          <SectionTitle title="Entrar em contato" />
          <div className="flex  flex-row gap-2 justify-start items-start">
            <FaWhatsapp className="text-green-700 text-xl" />
            <span>Telefone: {phone}</span>
          </div>
          <ConditionalViewWrapper isVisible={isEditing}>
            <PhoneForm phoneNumber={phone} />
          </ConditionalViewWrapper>
          <hr />
        </div>
      </div>
      <hr />
      <div className="p-2">
        <SectionTitle title="Quem somos?" />
        <p className="text-justify">
          A Americanas é uma empresa brasileira do segmento de varejo fundada em 1929 na cidade de Niterói, no estado do Rio de Janeiro, pelo austríaco Max Landesmann e pelos norte-americanos John Lee, Glen Matson, James Marshall e Batson Borger. Atualmente, a empresa é controlada pelo Grupo B2W, que também é dono das marcas Submarino, Shoptime e Sou Barato.
        </p>
        <hr />
        <SectionTitle title="Que produtos ofereço?" />
        <h1 className="">
          Visite minha área de produtos e confira o que temos para você!
        </h1>
        <div className="flex flex-row items-center justify-center p-2">
          <button className="
            text-lg
            font-semibold
            bg-blue-500 text-white p-2 rounded-md">
            Ver minha página de produtos
          </button>
          <hr />
        </div>
      </div>
    </div>
  );
}