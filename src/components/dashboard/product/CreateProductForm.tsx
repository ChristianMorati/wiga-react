import { useForm } from "react-hook-form";

export default function ProductForm({ onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onFormSubmit = (data) => {
        onSubmit(data);
        reset(); // Limpar o formulário após envio
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Adicionar Produto</h2>

            {/* Nome do Produto */}
            <div className="mb-4">
                <label className="block font-medium">Nome:</label>
                <input
                    type="text"
                    {...register("name", { required: "O nome é obrigatório" })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Ex: Notebook"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Preço do Produto */}
            <div className="mb-4">
                <label className="block font-medium">Preço:</label>
                <input
                    type="number"
                    {...register("price", {
                        required: "O preço é obrigatório",
                        min: { value: 1, message: "O preço deve ser maior que zero" },
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Ex: 3000"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            {/* Botão de Envio */}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
                Adicionar Produto
            </button>
        </form>
    );
}