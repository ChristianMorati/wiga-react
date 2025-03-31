import { useState } from "react";
import SectionTitle from "../../../SectionTitle";

type Address = {
	cep: string;
	street: string;
	neighborhood: string;
	city: string;
	state: string;
	number: string;
};

type AddressFormProps = {
	cep: string
}

export default function AddressForm({
	cep
}: AddressFormProps) {
	const [address, setAddress] = useState<Address>({
		cep: cep,
		street: "",
		neighborhood: "",
		city: "",
		state: "",
		number: "",
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const fetchAddress = async () => {
		if (address.cep.length !== 8) {
			setError("Digite um CEP válido (8 dígitos).");
			return;
		}

		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch(`https://viacep.com.br/ws/${address.cep}/json/`);
			const data = await response.json();

			if (data.erro) {
				setError("CEP não encontrado.");
				setLoading(false);
				return;
			}

			setAddress((prev) => ({
				...prev,
				street: data.logradouro,
				neighborhood: data.bairro,
				city: data.localidade,
				state: data.uf,
				number: data.number
			}));

			setSuccess(true);
		} catch {
			setError("Erro ao buscar o CEP. Verifique sua conexão.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md">
			<SectionTitle title="Editar Endereço" />
			<div className="flex gap-2">
				<input
					type="text"
					value={address.cep}
					onChange={(e) => {
						const cep = e.target.value.replace(/\D/g, "").slice(0, 8);
						setAddress((prev) => ({ ...prev, cep }));
					}}
					placeholder="Digite o CEP"
					className="w-full p-2 border rounded"
				/>
				<button
					onClick={fetchAddress}
					disabled={loading || address.cep.length !== 8}
					className="bg-blue-500 text-white px-4 rounded disabled:bg-gray-300"
				>
					{loading ? "⏳" : "Buscar"}
				</button>
			</div>

			{error && (
				<p className="text-red-500 text-sm mt-2">
					{error}{" "}
					<button onClick={fetchAddress} className="text-blue-600 underline">
						Tentar novamente
					</button>
				</p>
			)}

			{success && (
				<div className="mt-4 space-y-2">
					<input type="text" id="street" value={address.street} disabled className="w-full p-2 border rounded bg-gray-100" />
					<input type="text" id="neighborhood" value={address.neighborhood} disabled className="w-full p-2 border rounded bg-gray-100" />
					<div className="flex gap-2">
						<input type="text" id="city" value={address.city} disabled className="w-2/3 p-2 border rounded bg-gray-100" />
						<input type="text" id="state" value={address.state} disabled className="w-1/3 p-2 border rounded bg-gray-100" />
						<input type="text" id="number" placeholder="N°" value={address.number} className="w-1/3 p-2 border rounded bg-gray-100"
							onChange={(e) => {
								const number = e.target.value;
								setAddress((prev) => ({ ...prev, number }));
							}} />
					</div>
				</div>
			)}
			{address.number && (
				<button className="w-full font-semibold bg-green-500 text-white p-2 rounded mt-2">Confirmar</button>
			)}
		</div>
	);
}
