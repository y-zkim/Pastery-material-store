import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   window
  //     .fetch("/create.php", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //     })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setClientSecret(data.clientSecret);
  //     });
  // }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#00000",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#00000",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
    // let bool = event.empty || event.error != undefined;
    // props.editCardError(bool);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="py-2 px-6 border-2 rounded-lg border-primary"
    >
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      {/* <button
        className="btn rounded-xl py-1 px-3 mt-2 flex items-center bg-third font-bold text-white border focus:outline-none hover:text-third hover:bg-white hover:border-third w-full flex justify-center"
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Valider la carte"
          )}
        </span>
      </button> */}
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {" "}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>
    </form>
  );
}
