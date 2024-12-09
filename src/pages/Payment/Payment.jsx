import React, { useContext, useState } from 'react';
import styles from './payment.module.css';
import LayOut from '../../components/Layout/LayOut';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../../Api/axios';
import {db} from '../../Utility/firebase';
import { Type } from '../../Utility/action.type';




function Payment() {
  const [{user, basket}, dispatch] =useContext(DataContext);
  const totalItem = basket?.reduce((amount, item)=>{
    return item.amount + amount
},0);
const total = basket.reduce((amount, item)=>{
  return item.price * item.amount + amount
},0)
const [cardError, setCardError] = useState(null);
const [processing, setProcessing] = useState(false);
const navigate = useNavigate();
const stripe = useStripe();
const elements = useElements();

const handleChange = (e) => {
  // console.log(e?.error?.message);
  e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
};
// payment handling function
const handlePayment = async(e) => {
  e.preventDefault()

  try {
    setProcessing(true);
    // 1. backend || functions --> contact to the client secret
    const response = await axiosInstance({
      method: "POST",
      url: `payment/create?total=${total * 100}`,
      responseType: "json"
    });
    // console.log("Backend Response:", response);
    console.log(response.data);
    const clientSecret = response?.data?.clientSecret;
    console.log("Client Secret:", clientSecret);
    if (!clientSecret) {
      console.error("Client secret not received from the backend.");
      setProcessing(false);
      return;
    }
    // 2. client side (react side confirmation)
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        // get card data from CardElement which is used by users
        card: elements.getElement(CardElement),
      },
    });
    console.log(paymentIntent);
    // 3. after the confirmation --> order > firestore database save (make sure firstore db is enabeled in firebase project), clear basket
    await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        
           // empty the basket
      dispatch({ type: Type.EMPTY_BASKET });
      console.log("Basket should now be empty");

      setProcessing(false);
      navigate("/orders");
    } catch (error) {
      // console.log(error);
      setProcessing(false);
      
    }
  };
  return (
    <LayOut>
      {/* header */}
      <div className={styles.payment__header}>Checkout({totalItem}) items</div>
      {/* payment method */}
      <section className={styles.payment}>
        {/* address */}
        <div className={styles.flex}>
        <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={styles.flex}>
        <h3>Review items and delivery</h3>
        <div>
            {basket?.map((item, i) => (
              <ProductCard product={item} flex={true} key={i} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={styles.flex}>
        <h3>Payment methods</h3>
        <div className={styles.payment__card__container}>
          <div className={styles.payment__details}>
          <form onSubmit={handlePayment}>
            {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
              {/* CardElement: --> A flexible single-line input that collects all necessary card details. */}
            <CardElement onChange={handleChange}/>
            {/* price */}
            <div className={styles.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
            </form>
          </div>
        </div>
        </div>
      </section>
    </LayOut>
    
  )
}

export default Payment