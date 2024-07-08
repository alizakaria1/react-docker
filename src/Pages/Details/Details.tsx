import styles from "./Details.module.css";
export default function Details() {
  return (
    <main>
      <div className={styles.card}>
        <div className={styles.card__title}>
          <div className={styles.icon}>
            <a href="#">
              <i className="fa fa-arrow-left"></i>
            </a>
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
            <span className={styles.stock}>
              <i className="fa fa-pen"></i> In stock
            </span>
            <div className={styles.reviews}>
              <ul className={styles.stars}>
                <li>
                  <i className="fa fa-star"></i>
                </li>
                <li>
                  <i className="fa fa-star"></i>
                </li>
                <li>
                  <i className="fa fa-star"></i>
                </li>
                <li>
                  <i className="fa fa-star"></i>
                </li>
                <li>
                  <i className="fa fa-star-o"></i>
                </li>
              </ul>
              <span>(64 reviews)</span>
            </div>
          </div>
        </div>
        <div className={styles.card__footer}>
          <div className={styles.recommend}>
            <p>Recommended by</p>
            <h3>Andrew Palmer</h3>
          </div>
          <div className={styles.action}>
            <button type="button">Add to cart</button>
          </div>
        </div>
      </div>
    </main>
  );
}
