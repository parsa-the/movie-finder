import { useState } from "react";

const SearchComp = ({ searchTerm, setSearchTerm, onSubmit }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    if (onSubmit) onSubmit(inputValue);
  };

  return (
    <form className="flex items-center search" onSubmit={handleSubmit}>
      <div>
        <img
          src="./search-icon.svg"
          alt="Search"
          className="w-8 h-8 inline"
        />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="font-md-serif"
      />
      <button
        type="submit"
        className="text-gray-50 bg bg-dark-50 p-5 rounded-xl shadow-inner shadow-light-100/30 w-30 h-15"
      >
        search
      </button>
    </form>
  );
};

export default SearchComp;