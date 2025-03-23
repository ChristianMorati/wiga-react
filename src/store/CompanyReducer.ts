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
  id: "",
  name: "",
  cnpj: "",
  email: "",
  createdAt: "",
  stores: [],

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
