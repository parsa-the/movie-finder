import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#05000a]/95 to-[#0a0814]/95">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;
