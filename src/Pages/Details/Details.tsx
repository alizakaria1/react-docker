import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./Details.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import { Product } from "../../Models/index";
import axios from "axios";
import { ClipLoader } from "react-spinners";

export default function Details() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState<Product>();

  const getProduct = async (): Promise<Product> => {
    try {
      const productUrl = `${process.env.REACT_APP_API_URL}Products/Product?id=${id}`;

      const response = await axios<Product>({
        method: "GET",
        url: productUrl,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return {} as Product;
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProduct();
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, []);

  if (!product) {
    return (
      <ClipLoader
        color="#58a832"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <main>
      <div className={styles.card}>
        <div className={styles.card__title}>
          <div className={styles.icon} onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </div>
          <h3>New products</h3>
        </div>
        <div className={styles.card__body}>
          <div className={styles.half}>
            <div className={styles.featured_text}>
              <h1>{product.name}</h1>
              <p className={styles.price}>${product.price}</p>
            </div>
            <div className={styles.image}>
              <img src={product.uploadedFiles?.[0]?.url || ""} alt="" />
            </div>
          </div>
          <div className={styles.half}>
            <div className={styles.description}>
              <p>{product.description}</p>
            </div>
            <div className={styles.reviews}>
              <Rating initialValue={product.rating} size={20} readonly={true} />
              <span>({product.ratingCount} reviews)</span>
            </div>
          </div>
        </div>
        <div className={styles.card__footer}></div>
      </div>
    </main>
  );
}
