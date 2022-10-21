import { useRef, useState } from 'react';
import styles from './Auth.module.css';

const Auth = ()=>{
    const [isLogin, setIsLogin] = useState(true);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [emailTag, setEmailTag] = useState('');
    const [passwordTag, setPasswordTag] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [isLoading, setLoading] = useState(false);

    const validate = ()=>{
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        var ans = true;

        if(!email){
            setEmailTag('Please provide an email');
            ans = false;
        }else{
            setEmailTag('');
        }
        if(!password){
            setPasswordTag('Please provide a password');
            ans = false;
        }else if(password.length<6){
            setPasswordTag('Password is too short');
            ans = false;
        }
        else{
            setPasswordTag('');
        }
        return ans;
    }

    const submitHandler = async ()=>{
        if(validate()){
            try {
                setLoading(true);
                setErrorMessage('');
                setSuccessMessage('');    
                const type = isLogin?'login':'signup';
                const response = await fetch(`https://ytejas-assignment-api.herokuapp.com/${type}`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email:emailRef.current.value,
                        password:passwordRef.current.value
                    })
                });
                if(!response.ok) throw new Error();
                const responseObject = await response.json();
                localStorage.setItem("token", responseObject.token);
                setErrorMessage('');
                setSuccessMessage("Authenticated Successfully");
                window.location.reload();
            } catch (error) {
                setLoading(false);
                console.log(error.message);
                setErrorMessage('Something went wrong.');
                setSuccessMessage('');
            }
        }
    }

    return(
        <div className={styles.auth}>
            <input
                ref={emailRef}
                placeholder='email'></input>
            <label className='error'>{emailTag}</label>
            <input
                type={"password"}
                ref={passwordRef}
                placeholder='password'></input>
            <label className='error'>{passwordTag}</label>
            <button 
                onClick={submitHandler}
                disabled={isLoading}>
                {isLogin?'LOGIN':'SIGNUP'}
                </button>
            <span 
                onClick={()=>setIsLogin(state=>!state)}>
                {isLogin?"Don't have an account? Signup":"Already have an account? Login"}
                </span>
            <label className='error'>{errorMessage}</label>
            <label>{successMessage}</label>
        </div>
    );
}

export default Auth;