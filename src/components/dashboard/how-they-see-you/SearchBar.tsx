import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (query: string, type: "product" | "store") => void }) {
  const [searchType, setSearchType] = useState<"product" | "store">("product");
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value, searchType);
  };

  return (
    <div className="relative w-full max-w-md">
  {/* Ícone de busca */}
  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width="20"
      height="20"
      className="transition-colors duration-200 group-focus-within:text-blue-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.35 4.35a7.5 7.5 0 0012.3 12.3z"
      />
    </svg>
  </div>

  {/* Campo de busca */}
  <input
    type="text"
    value={query}
    placeholder={`Buscar ${searchType === "product" ? "produto" : "loja"}...`}
    className="w-full p-3 pl-10 border border-gray-400 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
    onChange={handleSearch}
  />

  {/* Seletor de tipo de busca */}
  <select
    value={searchType}
    onChange={(e) => setSearchType(e.target.value as "product" | "store")}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-200 border border-gray-400 p-2 text-sm text-gray-700 shadow-md rounded-md cursor-pointer hover:bg-gray-200 transition-all"
  >
    <option value="product">Produto</option>
    <option value="store">Loja</option>
  </select>
</div>

  );
}
