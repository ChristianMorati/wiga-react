import useCompanyStore from "../../../store/CompanyReducer";
import ProductForm from "../product/CreateProductForm";
import { FaPlus, FaBullhorn, FaTrash, FaEdit } from "react-icons/fa";

function MainActions() {
  const actions = [
    { label: "Criar Produto", icon: <FaPlus className="text-gray-500" />, bg: "bg-green-500" },
    { label: "Remover Produto", icon: <FaTrash className="text-gray-500" />, bg: "bg-red-500" },
    { label: "Promover Promoções", icon: <FaBullhorn className="text-gray-500" />, bg: "bg-blue-500" },
    { label: "Alterar Informações", icon: <FaEdit className="text-gray-500" />, bg: "bg-yellow-500" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-center mb-4">Principais Ações</h1>
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-2 md:gap-4">
        {actions.map((action, index) => (
          <div
            key={index}
            className={`text-red-300 w-full md:w-48 md:h-48 flex flex-col justify-center items-center text-white text-center shadow-md p-4 transition-transform cursor-pointer
            border-1 border-gray-200
            hover:shadow-lg
              `}
          >
            <div className="text-4xl mb-3">{action.icon}</div>
            <h1 className="text-lg font-semibold text-gray-600">{action.label}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MyProducts() {
  const { stores } = useCompanyStore();

  const handleProductSubmit = (product: any) => {
    console.log("Produto Adicionado:", product);
    alert(`Produto "${product.name}" adicionado com sucesso!`);
  };

  return (
    <div className="">
      <MainActions />
      {/* <h1 className="text-2xl font-bold">Meus produtos</h1>
        <ProductForm onSubmit={handleProductSubmit} />
        {stores.map((store: typeof stores[0]) => (
          <div key={store.id} className="bg-white p-4 rounded-md shadow-md">
            <h1 className="text-lg font-bold">{store.name}</h1>
            <div className="flex justify-between items-center mt-4">
              <h1 className="text-sm">Produtos</h1>
              <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                Adicionar
              </button>
            </div>
            <div className="mt-4">
              {store.products.map((product: any) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center border-b border-gray-200 py-2"
                >
                  <h1>{product.name}</h1>
                  <h1>R$ {product.price}</h1>
                </div>
              ))}
            </div>
          </div>
        ))} */}
    </div>
  );
}