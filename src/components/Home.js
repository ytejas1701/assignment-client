import { useEffect, useState } from 'react';
import AddBook from './AddBook';
import BookTile from './BookTile';
import styles from './Home.module.css';

const Home = ()=>{
    const token = localStorage.getItem("token");
    const [books, setBooks] = useState([]);

    useEffect(() => {
      const getBooks = async ()=>{
        try {
            const response = await fetch(`http://ytejas-assignment-api.herokuapp.com/book`,{
                method:"GET",
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });

            if(!response.ok) throw new Error();
            
            const responseObject = await response.json();
            setBooks(responseObject);
            console.log(responseObject);
        } catch (error) {
            setBooks([]);
            console.log(error.message);
        }
      }
      getBooks();
    }, [token])
    

    return(
        <div className={styles.home}>
            <AddBook/>
            <div className={styles.books}>
                {books.map(book=><BookTile key={book._id} book={book}/>)}
            </div>
        </div>
    );
}

export default Home;