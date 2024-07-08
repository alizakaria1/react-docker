import styles from "./Card.module.css";
import pineapple from "../../pineapple.jpg";
import { Rating } from "react-simple-star-rating";

interface CardProps {
  imgUrl: string;
  productName: string;
  rating: number;
  ratingCount: number;
}

export default function Card({
  imgUrl,
  productName,
  rating,
  ratingCount,
}: CardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={imgUrl} alt="" className={styles.img} />
      </div>
      <div className={styles.footer}>
        <h2 className={styles.productName}>{productName}</h2>
        <Rating initialValue={rating} size={20} readonly={true} />
        <span className={styles.ratingCount}>({ratingCount})</span>
        <button className={styles.btn}>Details</button>
      </div>
    </div>
  );
}
