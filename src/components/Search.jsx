import { useState } from "react";

const SearchComp = ({ searchTerm, setSearchTerm, onSubmit }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    if (onSubmit) onSubmit(inputValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center mb-45 justify-between gap-3 border-violet-700/50  p-3 rounded-2xl shadow-md backdrop-blur-md border  w-full max-w-2xl mx-auto mt-6"
    >
      <img
        src="./search-icon.svg"
        alt="Search"
        className="w-6 h-6 opacity-80"
      />

      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-transparent outline-none text-gray-200 placeholder-gray-400 w-full px-4 py-2 text-lg font-medium"
      />

      <button
        type="submit"
        className="text-white font-semibold bg-violet-600/50 hover:bg-indigo-700 px-5 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Search
      </button>
    </form>
  );
};

export default SearchComp;
