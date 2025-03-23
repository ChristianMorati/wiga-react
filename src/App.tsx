import { useForm, SubmitHandler } from "react-hook-form";
import { Route, Routes, useNavigate } from "react-router-dom";
import useCompanyStore from "./store/CompanyReducer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import CreateCompany from "./pages/CreateCompany";

type ShopFormData = {
  shopName: string;
};

function ShopForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ShopFormData>({ mode: "onChange" });
  const navigate = useNavigate();
  const { name } = useCompanyStore();

  const onSubmit: SubmitHandler<ShopFormData> = async (data) => {
    console.log("Form Submitted", data);
    navigate("/my-shop");
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

function App() {
  return (
    <>
      <div className="mx-auto sm:w-full md:w-4/5 lg:w-2/3 xl:w-1/2">
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
        <Routes>
          <Route path="/" element={<CreateCompany />} />

          <Route path="/create-shop" element={<ShopForm />} />
          <Route path="/{companyId}/shop/{shopId}" element={<h1>Not Found</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
};
export default App;
