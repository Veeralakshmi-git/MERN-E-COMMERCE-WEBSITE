import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { publicRequest } from "../../../requestMethods"
import { useParams } from 'react-router-dom';
import styled from "styled-components"
import CheckoutForm from '../../components/checkoutform/CheckoutForm';
const stripePromise = loadStripe("pk_test_51MbJk9SIL62C3zVYXUthTgFnKRBs3UCBbU9wSKbRHWLZkXrY6dKWaWx98zxkl0GA1SGDJkFEiCVh8n1afhclOpge00Cwnd4mCb");


const Container = styled.div`
    
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100vh;
    width: 100vw;
`


const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");
    const {id} = useParams()
    console.log(id)
        // Create PaymentIntent as soon as the page loads
      /*   fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []); */
    

       useEffect(()=>{
        const makeRequest = async () => {
            try{
                const res = await publicRequest.post(`/orders/create-payment-intent/${id}`)
               // console.log("this res"+res)
                setClientSecret(res.data.clientSecret)
            }catch(Err){
                console.log(Err)
            }
        }
        makeRequest()
      },[]) 

      const appearance = {
        theme: 'stripe',
      };

      const options = {
        clientSecret,
        appearance,
      };
  return (
    <Container >
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Container>
  )
}

export default Pay;
