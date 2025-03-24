import useCompanyStore from "../../../store/CompanyReducer";
import { FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';
import StorePhotoFileInput from "./StorePhotoFileInput";

export default function MyStore() {
  const { name } = useCompanyStore();
  return (
    <div className="p-2 pb-4">
      <div className="flex flex-col md:flex-row">
        <div className="
				w-full md:w-[40%] lg:[30%] border-r border-gray-200 overflow-hidden shadow-lg relative">
          <StorePhotoFileInput />
          <img
            className="w-full h-full object-cover"
            src="https://i.pinimg.com/564x/d6/56/8a/d6568a4b717bd46afccb585c8b869afb.jpg"
            alt={`imagem-loja-${name}`}
          />
          <button className="
            absolute
            bottom-2
            right-2
            text-lg
            font-semibold
            bg-blue-500 text-white px-4 py-2 rounded-md
            ">
            ver produtos
          </button>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="flex gap-2 flex flex-row justify-start items-start">
            <FaMapMarkerAlt className="text-red-600 text-xl" />
            <span>Endereço: Av. Comendador Rafael, 1324 - Centro, Linhares - ES, 29900-052</span>
          </div>
          <div className="flex gap-2 flex flex-row justify-start items-start">
            <FaClock className="text-sky-600 text-xl" />
            <span>Horário de funcionamento: Aberto ⋅ Fecha às 18:00</span>
          </div>
          <hr />
          <h1 className="text-xl font-bold">Entrar em contato</h1>
          <div className="flex gap-2 flex flex-row justify-start items-start">
            <FaWhatsapp className="text-green-700 text-xl" />
            <span>Telefone: (27) 3371-0000</span>
          </div>
          <hr />
        </div>
      </div>
      <hr />
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-2">Quem somos?</h1>
        <p className="text-justify">
          A Americanas é uma empresa brasileira do segmento de varejo fundada em 1929 na cidade de Niterói, no estado do Rio de Janeiro, pelo austríaco Max Landesmann e pelos norte-americanos John Lee, Glen Matson, James Marshall e Batson Borger. Atualmente, a empresa é controlada pelo Grupo B2W, que também é dono das marcas Submarino, Shoptime e Sou Barato.
        </p>
        <hr />
        <h1 className="text-2xl font-bold mb-2">Que produtos ofereço?</h1>
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