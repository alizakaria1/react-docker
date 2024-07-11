import { useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "./Models/index";
import { Button, Card } from "./components/index";
import NoImage from "./no-image.png";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  const getProducts = async (): Promise<Product[]> => {
    try {
      const productsUrl = `${process.env.REACT_APP_API_URL}Products/Products`;

      console.log(productsUrl);

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

  const handleDelete = async (id: number): Promise<void> => {
    try {
      const productUrl = `${process.env.REACT_APP_API_URL}Products/Product?id=${id}`;
      const response = await axios({
        method: "DELETE",
        url: productUrl,
      });

      if (response.status === 200) {
        const res = await getProducts();
        setProducts(res);
      }
    } catch (error) {
      console.error(error);
      alert("an error have occured");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  if (products.length < 1) {
    return (
      <div>
        No products are available right now , would you like to add some ?
        <button onClick={() => navigate("form")}>Add Product</button>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="button">
          <Button text={"Add Product"} color={"#719feb"} navigateTo={"/form"} />
        </div>
        <div className="cardContainer">
          {products?.map((product) => (
            <div key={product.id} className="card">
              <Card
                imgUrl={product.uploadedFiles?.[0]?.url || NoImage}
                productName={product.name}
                rating={product.rating}
                ratingCount={product.ratingCount}
                onClick={() => handleDelete(product.id)}
                navigation={`/details/${product.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
