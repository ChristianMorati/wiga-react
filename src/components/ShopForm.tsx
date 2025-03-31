import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import useCompanyStore from "../store/CompanyReducer";

type ShopFormData = {
  shopName: string;
};

function ShopForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ShopFormData>({ mode: "onChange" });
  const navigate = useNavigate();
  const { id, name } = useCompanyStore();

  const onSubmit: SubmitHandler<ShopFormData> = async (data) => {
    console.log("Form Submitted", data);
    navigate(`/${id}/my-shop`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shadow-xl m-2 p-4 rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">Vamos criar uma Loja</h1>
      <div className="flex flex-col gap-4">
        <label htmlFor="shopName" className="text-left text-sm font-medium">
          Nome visível para outros seus clientes
        </label>
        <input
          id="shopName"
          type="text"
          placeholder="Sua Loja"
          value={name}
          {...register("shopName", { required: "Shop name is required" })}
          className="w-full p-4 rounded-md border border-gray-700 focus:ring focus:ring-blue-500"
        />
        {errors.shopName && <p className="text-red-500 text-xs">{errors.shopName.message}</p>}
      </div>
      <button
        type="submit"
        className="mt-4 w-full p-3 bg-blue-600 rounded-md hover:bg-blue-500 transition text-white font-bold"
      >
        Criar
      </button>
    </form>
  );
}

export default ShopForm;