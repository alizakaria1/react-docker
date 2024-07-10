import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import { Rating } from "react-simple-star-rating";

interface CardProps {
  imgUrl: string;
  productName: string;
  rating: number;
  ratingCount: number;
  onClick?: () => Promise<void>;
  navigation: string;
}

export default function Card({
  imgUrl,
  productName,
  rating,
  ratingCount,
  onClick,
  navigation,
}: CardProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (onClick) {
      await onClick();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img
          src={imgUrl}
          alt=""
          className={styles.img}
          onClick={() => navigate(navigation)}
        />
      </div>
      <div className={styles.footer}>
        <h2 className={styles.productName}>{productName}</h2>
        <Rating initialValue={rating} size={20} readonly={true} />
        <span className={styles.ratingCount}>({ratingCount})</span>
        <button onClick={handleClick}>Delete</button>
      </div>
    </div>
  );
}
