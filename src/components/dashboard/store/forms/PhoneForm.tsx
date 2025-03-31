import { useState } from "react";

type PhoneFormProps = {
	phoneNumber: string
}

const PhoneForm = ({
	phoneNumber,
	callbackSuccess,
	callbackError,
}: PhoneFormProps) => {
	const [phone, setPhone] = useState(phoneNumber ?? "");

	return (
		<div className="">
			<h2 className="text-lg font-semibold mb-2">Editar Telefone</h2>
			<input
				type="tel"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				className="border p-2 w-full rounded"
				placeholder="Digite o novo telefone"
			/>
			<div className="flex gap-2 mt-2">
				<button
					onClick={() => callbackSuccess()}
					className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
				>
					Salvar
				</button>
				<button
					onClick={() => callbackError(false)}
					className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
				>
					Cancelar
				</button>
			</div>
		</div>
	);
};

export default PhoneForm;
