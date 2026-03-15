import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";
import ProductDetailPage from "./pages/ProductDetailPage"; // This is your Edit Form
import ProductViewPage from "./pages/ProductViewPage";     // This is the new View Detail page

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateProductPage />} />
      
      {/* 1. Clicking a card now takes you here to VIEW the product */}
      <Route path="/products/:id" element={<ProductViewPage />} /> 

      {/* 2. This is the new path for actually EDITING the product */}
      <Route path="/edit/:id" element={<ProductDetailPage />} />
    </Routes>
  );
};

export default App;