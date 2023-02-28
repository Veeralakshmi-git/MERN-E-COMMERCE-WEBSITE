import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";


const Form = styled.form`
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
`
const Button = styled.button`
      background: #5469d4;
      font-family: Arial, sans-serif;
      color: #ffffff;
      border-radius: 4px;
      border: 0;
      padding: 12px 16px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      display: block;
      transition: all 0.2s ease;
      box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
      width: 100%;

      &:hover{
        filter: contrast(115%);
      }

      &:disabled{
        opacity: 0.5;
        cursor: default;
      }
  `
const Spinner = styled.div`
    border-radius: 50%;

    &.before{
      border-radius: 50%;
    }

    &.after{
      border-radius: 50%;
    }

    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);

    &:before,&:after{
      position: absolute;
      content: '';
    }

    &:before{
      width: 10.4px;
      height: 20.4px;
      background: #5469d4;
      border-radius: 20.4px 0 0 20.4px;
      top: -0.2px;
      left: -0.2px;
      -webkit-transform-origin: 10.4px 10.2px;
      transform-origin: 10.4px 10.2px;
      -webkit-animation: loading 2s infinite ease 1.5s;
      animation: loading 2s infinite ease 1.5s;
    }

    &:after{
      width: 10.4px;
      height: 10.2px;
      background: #5469d4;
      border-radius: 0 10.2px 10.2px 0;
      top: -0.1px;
      left: 10.2px;
      -webkit-transform-origin: 0px 10.2px;
      transform-origin: 0px 10.2px;
      -webkit-animation: loading 2s infinite ease;
      animation: loading 2s infinite ease;

    }
`
    const Paymentelement = styled.div`
        margin-bottom: 24px;
    `

    const PaymentMessage = styled.div`
        color: rgb(105, 115, 134);
        font-size: 16px;
        line-height: 20px;
        padding-top: 12px;
        text-align: center;
    `

const CheckoutForm = () => {
const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:5173/success",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <Form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Paymentelement>
          <PaymentElement  options={paymentElementOptions} />
      </Paymentelement>
      <Button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <Spinner id="spinner"></Spinner> : "Pay now"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <PaymentMessage>{message}</PaymentMessage>}
    </Form>
  )
}

export default CheckoutForm
