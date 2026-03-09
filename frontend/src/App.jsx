import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateProductPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
    </Routes>
  );
};

export default App;