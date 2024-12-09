import React, { useContext } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom';
import LowerHeader from './LowerHeader';
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../../Utility/firebase'


function Header() {
    const [{user, basket}, dispatch] = useContext(DataContext)
    const totalItem = basket?.reduce((amount, item)=>{
        return item.amount + amount
    },0)
    
  return (
        <section className={styles.header__outerContainer}>
        <header>
        <section className={styles.header__container}>
            {/* Logo */}
            <div className={styles.logo__container}>
            <Link to="/">
                <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt="amazon logo" />{" "}
                {/* Amazon logo with a to homepage */}
            </Link>

            {/* Delivery location */}
            <div className={styles.delivery}>
                <span>
                <SlLocationPin size={19} /> {/* Location pin icon */}
                </span>
                <div>
                <p>Deliver to</p>
                <span>Ethiopia</span> {/* Static delivery location */}
                </div>
            </div>
            </div>

            {/* Search Bar */}
            <div className={styles.header__search}>
            {/* Category Dropdown */}

            {/* Search Input */}
            
            <select name='' id=''>
                <option value="">All</option>
                <input type="text" placeholder='search product'/>
            </select>
                <input
                type="text"
                placeholder="Search Amazon"
                value='' // Current search term
              
                />
                {/* Search Suggestions */}
            
            {/* Search Icon */}
            <BsSearch
                className={styles.header__search_icon}
                size={40}
                
            />
            </div>

            {/* Right-side as (Account, Orders, Cart) */}
            <div className={styles.order__container}>
            {/* Language Selector */}
            <Link to="" className={styles.language}>
                <img
                src="https://freesvg.org/img/Bandera-USA.png"
                alt="USA Flag"
                />
                <select>
                <option>EN</option> {/* Static language option */}
                </select>
            </Link>

             {/* Sign In / Sign Out */}
                <Link to={!user && "/auth"}>
             <div>
                {
                    user ? (
                        <>
                        <p>Hello {user?.email?.split("@")[0]}</p>
                        <span onClick={()=>auth.signOut()}>Sign Out</span>
                        </>
                    ):(
                        <>
                        <p>Hello, Sign In</p>
                        <span>Account & Lists</span>
                        </>
                        
                    )
                }
            </div>
            <div> 
            </div>
            </Link>
            {/* Orders */}
            <Link to="/orders">
                <p>returns</p>
                <span>& Orders</span> {/* a to user's orders */}
            </Link>

            {/* Cart */}
            <Link to="/cart" className={styles.cart}>
                <BiCart size={35} /> {/* Cart icon */}
                <span>{totalItem}</span> 
            </Link>
            </div>
        </section>
        </header>
        <LowerHeader/>
    </section>
  )
}

export default Header