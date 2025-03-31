import { useState } from "react";
import StoreSelector from "./StoreSelector";

type AddressInfo = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado?: string;
    regiao?: string;
    ibge?: string;
    gia?: string;
    ddd?: string;
    siafi?: string;
};

export default function CepInfosAuto() {
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState<AddressInfo | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchAddress = async (cep: string) => {
        setLoading(true);
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data: AddressInfo & { erro?: boolean } = await response.json();
            if (!data.erro) {
                setAddress(data);
            } else {
                setAddress(null);
                alert("CEP não encontrado");
            }
        } catch (error) {
            console.error("Erro ao buscar CEP", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCep = e.target.value.replace(/\D/g, "");
        setCep(newCep);
        if (newCep.length === 8) {
            fetchAddress(newCep);
        } else {
            setAddress(null);
        }
    };

    return (
        <div className="flex flex-col justify-start items-center gap-2 p-2">
            <div className="p-2 border border-slate-100 rounded-md shadow-md w-80">
                <StoreSelector />
            </div>
            <div className="p-2 border border-slate-100 rounded-md shadow-md w-80">
                <label className="block text-sm font-medium">Digite o CEP:</label>
                <input
                    type="text"
                    value={cep}
                    onChange={handleCepChange}
                    placeholder="Ex: 01001000"
                    className="border p-2 w-full rounded mt-2"
                    maxLength={8}
                />
                {loading && <p className="text-sm text-gray-500 mt-2">Carregando...</p>}
                {address && (
                    <div className="mt-4 border-t pt-2 text-sm">
                        <p><strong>Logradouro:</strong> {address.logradouro}</p>
                        <p><strong>Bairro:</strong> {address.bairro}</p>
                        <p><strong>Cidade:</strong> {address.localidade} - {address.uf}</p>
                    </div>
                )}
            </div>
        </div>
    );
}