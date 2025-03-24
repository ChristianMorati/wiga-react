import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import CreateCompany from "./pages/CreateCompany";
import Dashboard from "./pages/Dashbord";
import ShopForm from "./components/ShopForm";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
      <Routes>
        <Route path="/" element={
          <div className="mx-auto sm:w-full md:w-4/5 lg:w-2/3 xl:w-1/2">
            <CreateCompany />
          </div>
        } />
        <Route path="/create-shop" element={<ShopForm />} />
        <Route path="/:companyId/my-shop/" element={<Dashboard />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};
export default App;
