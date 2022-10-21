import {useRef, useState} from 'react';

const AddBook = ()=>{
    const token = localStorage.getItem('token');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const nameRef = useRef(null);
    const authorRef = useRef(null);
    const priceRef = useRef(null);
    const pagesRef = useRef(null);
    const imageURLRef = useRef(null);

    const [isLoading, setLoading] = useState(false);

    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');
            const response = await fetch(`https://ytejas-assignment-api.herokuapp.com/book`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify({
                    name:nameRef.current.value,
                    author:authorRef.current.value,
                    price:priceRef.current.value,
                    pages:pagesRef.current.value,
                    imageURL:imageURLRef.current.value,
                })
            });
            if(!response.ok) throw new Error();
            setSuccessMessage('Books Added!');
            setErrorMessage('');
            window.location.reload();
    } catch (error) {
        setLoading(false);
        setErrorMessage('Something went wrong.');
        setSuccessMessage('');
}
    }

    return(
        <form>
            <input
                ref={nameRef}
                placeholder="Name"/>
            <input
                ref={authorRef}
                placeholder="Author"/>
            <input
                ref={priceRef}
                type="Number"
                placeholder="Price"/>
            <input
                ref={pagesRef}
                type="Number"
                placeholder="Pages"/>
            <input
                ref={imageURLRef}
                placeholder="Image URL"/>
            <button disabled={isLoading} onClick={submitHandler}>ADD BOOK</button>
            <label className='error'>{errorMessage}</label>
            <label>{successMessage}</label>
        </form>
    );
}

export default AddBook;