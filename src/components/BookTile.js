import styles from "./BookTile.module.css";

const BookTile = ({book})=>{
    return(
        <div className={styles.bookTile}>
            <img src={book.imageURL}></img>
            <div className={styles.bookInfo}>
                <span className={styles.title}>{book.name}</span>
                <span className={styles.author}>{book.author.toUpperCase()}</span>
                <span className={styles.pages}>{book.pages} Pages</span>
                <span className={styles.price}>₹{book.price}</span>
            </div>
        </div>
    );
}

export default BookTile;