import { useLocation } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Product } from "./Models/index";
import { Card } from "./components/index";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const location = useLocation();
  const text = location.state?.text;

  const getProducts = async (): Promise<Product[]> => {
    try {
      const productsUrl = `${process.env.REACT_APP_API_URL}Products/Products`;

      const response = await axios<Product[]>({
        method: "GET",
        url: productsUrl,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();

    if (text) {
      toast.success(text);
    }
  }, [text]);

  if (!products) {
    return (
      <div>
        No products are available right now , would you like to add some ?
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="cardContainer">
        {products?.map((product) => (
          <Card
            key={product.id}
            imgUrl={product.uploadedFiles?.[0]?.url || ""}
            productName={product.name}
            rating={product.rating}
            ratingCount={product.ratingCount}
          />
        ))}
      </div>
    </>
  );
}

export default App;
