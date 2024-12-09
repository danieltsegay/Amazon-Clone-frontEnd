import React, {useState, useContext} from 'react'
import styles from './Auth.module.css'
import { initializeApp } from 'firebase/app'
import {Link, useNavigate} from 'react-router-dom'
import amazon_letter_logo from '../../assets/images/logo/amazon_letter_logo.png'
import {auth} from '../../Utility/firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {DataContext} from '../../components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type';
import { ClipLoader } from 'react-spinners'

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  
  const [loading, setLoading] = useState({signIn: false, signUp: false});
  const [{user}, dispatch]=useContext(DataContext);
  const navigate = useNavigate();
  console.log(user);
  const authHandler = (e) =>{
    e.preventDefault()
    console.log(e.target.name);
    if(e.target.name === "signin"){
      // firebase auth
      setLoading({...loading, signIn: true})

      signInWithEmailAndPassword(auth, email, password)
      .then((userInfo)=>{
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading, signIn: false})
        navigate("/");
      })
      .catch((err)=> {
        setError(err.message)
      })
    }else{
      setLoading({...loading, signUp: true})
      createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo)=>{
        
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading, signUp: false})
        navigate("/");
      }).catch((err)=>{setError(err.message)})
      setLoading({...loading, signUp: false})
    }
  }



  return (
    <section className={styles.login}>
      {/* Logo */}
      <Link to={'/'}>
      <img src={amazon_letter_logo} alt="" />
      </Link>
      {/* Form */}
      <div className={styles.login__container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id='email' />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id='password' />
          </div>
          <button 
          type='submit' 
          onClick={authHandler} 
          name='signin' 
          className={styles.login__signInButton}>
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              " Sign In"
            )}
            </button>
        </form>
        {/* Agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* Create Account button */}
        <button 
        type='submit' 
        onClick={authHandler} 
        name='signup' 
        className={styles.login__registerButton}>
          {loading.signUp ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "Create your Amazon Account"
            )}
          </button>
        {
          error && <small style={{paddingTop: '5px', color: 'red'}}>{error}</small>
        }
      </div>
    </section>
  )
}

export default Auth