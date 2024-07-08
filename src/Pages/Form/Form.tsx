import React, {
  CSSProperties,
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "../../components/index";
import styles from "./Form.module.css";
import { Product, UploadedFiles } from "../../Models/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function Form() {
  const [productName, setProductName] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text] = useState<string>("Product added successfully");

  const navigation = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log(files[0]);
      setSelectedFile(files[0]);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(+event.target.value);
  };

  const handleRatingCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRatingCount(+event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const productUrl = `${process.env.REACT_APP_API_URL}Products/Product`;
    console.log(productUrl);
    const product = new Product();
    product.name = productName;
    product.price = price;
    product.rating = rating;
    product.ratingCount = ratingCount;
    product.description = description;

    try {
      const response = await axios<Product>({
        method: "POST",
        url: productUrl,
        data: product,
      });

      if (response.status === 200 && selectedFile) {
        const addedProduct = response.data;

        const fileUrl = `${process.env.REACT_APP_API_URL}files/uploadfile?productId=${addedProduct.id}`;

        const data = new FormData();

        data.append("file", selectedFile);

        const fileResponse = await axios<UploadedFiles>({
          method: "POST",
          url: fileUrl,
          data: data,
        });

        if (fileResponse.status === 200) {
          setIsLoading(false);
          navigation("/", { state: { text } });
        } else {
          alert(JSON.stringify(fileResponse.data));
        }
      } else if (response.status === 200) {
        navigation("/", { state: { text } });
      }
    } catch (err: any) {
      console.error(err);
      alert("an error occured please try again ");
    } finally {
      setIsLoading(false);
      //navigation("/");
    }
  };

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
  };

  useEffect(() => {
    return () => {};
  }, []);

  if (isLoading) {
    return (
      <ClipLoader
        color="#58a832"
        size={150}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div className={styles.inputContainer}>
      <div className="labelsContainer">
        <label htmlFor="">Product Name</label>
        <Input
          type="text"
          placeholder="Enter Product Name"
          value={productName}
          onChange={handleNameChange}
        />
      </div>
      <div className="labelsContainer">
        <label htmlFor="">Rating</label>
        <Input
          type="number"
          placeholder="Enter rating"
          value={rating}
          onChange={handleRatingChange}
          min={0}
          max={5}
        />
      </div>
      <div>
        <label htmlFor="">Rating Count</label>
        <Input
          type="number"
          placeholder="Enter Rating Count"
          value={ratingCount}
          onChange={handleRatingCountChange}
          min={0}
        />
      </div>
      <div>
        <label htmlFor="">Price</label>
        <Input
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={handlePriceChange}
          min={0}
        />
      </div>
      <div>
        <label htmlFor="">Description</label>
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="">Upload an image</label>
        <input
          type="file"
          ref={fileInputRef}
          src=""
          alt=""
          onChange={handleFileChange}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
