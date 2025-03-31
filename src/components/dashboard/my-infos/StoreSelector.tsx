import { useState } from "react";

const stores = [
	"Loja A",
	"Loja B",
	"Loja C",
	"Loja D",
];

export default function StoreSelector() {
	const [selectedStore, setSelectedStore] = useState(stores[0]);

	return (
		<>
			<label htmlFor="store-select" className="block text-sm font-medium text-gray-700">Selecione a Loja:</label>
			<select
				id="store-select"
				value={selectedStore}
				onChange={(e) => setSelectedStore(e.target.value)}
				className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
			>
				{stores.map((store) => (
					<option key={store} value={store}>{store}</option>
				))}
			</select>
		</>
	);
}
