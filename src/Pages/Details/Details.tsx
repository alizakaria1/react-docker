import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./Details.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function Details() {
  const navigate = useNavigate();
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
              <h1>Nurton</h1>
              <p className={styles.sub}>Office Chair</p>
              <p className={styles.price}>$210.00</p>
            </div>
            <div className={styles.image}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/613A7vcgJ4L._SL1500_.jpg"
                alt=""
              />
            </div>
          </div>
          <div className={styles.half}>
            <div className={styles.description}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                voluptatem nam pariatur voluptate perferendis, asperiores
                aspernatur! Porro similique consequatur, nobis soluta minima,
                quasi laboriosam hic cupiditate perferendis esse numquam magni.
              </p>
            </div>
            <div className={styles.reviews}>
              <Rating initialValue={3} size={20} readonly={true} />
              <span>(70 reviews)</span>
            </div>
          </div>
        </div>
        <div className={styles.card__footer}></div>
      </div>
    </main>
  );
}
