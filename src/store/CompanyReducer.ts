import { create } from "zustand";

interface Store {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  createdAt: string;
  stores: any[];
  setCompany: (company: Partial<Store>) => void;
  resetCompany: () => void;
}

const useCompanyStore = create<Store>((set) => ({
  id: "51342586-4EAB-4DD3-B9B0-B02F6CC15FF0",
  name: "Americanas",
  cnpj: "00.623.904/0001-73",
  email: "Americanas@gmail.com",
  createdAt: "2025-03-22 23:03:24.943",
  stores: [
    {
      id: "758712A9-0A3F-42F6-B0FE-D33909A588DE",
      name: "Americanas",
    },
  ],

  // Atualiza os dados da empresa
  setCompany: (company) => set((state) => ({ ...state, ...company })),

  // Reseta o estado para o inicial
  resetCompany: () =>
    set({
      id: "",
      name: "",
      cnpj: "",
      email: "",
      createdAt: "",
      stores: [],
    }),
}));

export default useCompanyStore;
