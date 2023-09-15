import React, { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import { useNavigate } from "react-router-dom";
import {
  addressAllValidation,
  paymentAllValidation,
} from "../utils/validation";

const Checkout = () => {
  const navigate = useNavigate();

  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [show, setShow] = useState(true);
  const [received, setReceived] = useState(false);
  const [addressCont, setAddressCont] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [addressError, setAddressError] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [paymentCont, setPaymentCont] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvv: "",
  });
  const [paymentError, setPaymentError] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvv: "",
  });

  const onChange = (str, e) => {
    if (str === "address")
      setAddressCont((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    else
      setPaymentCont((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
  };

  const nextFn = (e) => {
    e.preventDefault();
    const { isValid, errors } = addressAllValidation(addressCont);
    if (isValid) setShow(false);
    else setAddressError(errors);
  };
  const paymentFn = (e) => {
    e.preventDefault();
    const { isValid, errors } = paymentAllValidation(paymentCont);
    if (isValid) {
      dispatch({
        type: "REMOVE_FROM_CART_ALL",
      });
      setReceived(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else setPaymentError(errors);
  };

  useEffect(() => {
    if (!cart.length) navigate("/");
  }, []);

  return (
    <div className="checkoutCont">
      {received ? (
        <div>
          <h1>Yay, your order recieved</h1>
          <h1>Please Visit our page again</h1>
        </div>
      ) : show ? (
        <div className="adressCont">
          <h1>Address</h1>
          <div className="inputCont">
            <h1>Name</h1>
            <input
              type="text"
              name="name"
              value={addressCont.name}
              placeholder="Raman Kumar"
              onChange={(e) => onChange("address", e)}
            />
            <p className="error">
              {addressError && addressError["name"]
                ? addressError["name"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>Email</h1>
            <input
              type="text"
              name="email"
              value={addressCont.email}
              placeholder="raman@example.com"
              onChange={(e) => onChange("address", e)}
            />
            <p className="error">
              {addressError && addressError["email"]
                ? addressError["email"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>Address</h1>
            <input
              type="text"
              name="address"
              value={addressCont.address}
              placeholder="abc street, pqr colony"
              onChange={(e) => onChange("address", e)}
            />
            <p className="error">
              {addressError && addressError["address"]
                ? addressError["address"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>city</h1>
            <input
              type="text"
              name="city"
              value={addressCont.city}
              placeholder="Begusarai"
              onChange={(e) => onChange("address", e)}
            />
            <p className="error">
              {addressError && addressError["city"]
                ? addressError["city"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>State</h1>
            <input
              type="text"
              name="state"
              value={addressCont.state}
              placeholder="Bihar"
              onChange={(e) => onChange("address", e)}
            />
            <p className="error">
              {addressError && addressError["state"]
                ? addressError["state"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>Zip</h1>
            <input
              type="text"
              name="zip"
              value={addressCont.zip}
              placeholder="110000"
              onChange={(e) => onChange("address", e)}
            />
            <p className="error">
              {addressError && addressError["zip"]
                ? addressError["zip"][0]
                : null}
            </p>
          </div>
          <button className="btn" onClick={(e) => nextFn(e)}>
            Next
          </button>
        </div>
      ) : (
        <div className="paymentCont">
          <h1>Payments</h1>
          <div className="inputCont">
            <h1>Name on card</h1>
            <input
              type="text"
              name="name"
              placeholder="Raman Kumar"
              value={paymentCont.name}
              onChange={(e) => onChange("payment", e)}
            />
            <p className="error">
              {paymentError && paymentError["name"]
                ? paymentError["name"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>Credit card number</h1>
            <input
              type="text"
              name="number"
              placeholder="123-456-789"
              value={paymentCont.number}
              onChange={(e) => onChange("payment", e)}
            />
            <p className="error">
              {paymentError && paymentError["number"]
                ? paymentError["number"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>Exp Month</h1>
            <input
              type="text"
              name="month"
              placeholder="December"
              value={paymentCont.month}
              onChange={(e) => onChange("payment", e)}
            />
            <p className="error">
              {paymentError && paymentError["month"]
                ? paymentError["month"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>Exp year</h1>
            <input
              type="text"
              name="year"
              placeholder="2028"
              value={paymentCont.year}
              onChange={(e) => onChange("payment", e)}
            />
            <p className="error">
              {paymentError && paymentError["year"]
                ? paymentError["year"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>cvv</h1>
            <input
              type="text"
              name="cvv"
              placeholder="123"
              value={paymentCont.cvv}
              onChange={(e) => onChange("payment", e)}
            />
            <p className="error">
              {paymentError && paymentError["cvv"]
                ? paymentError["cvv"][0]
                : null}
            </p>
          </div>
          <div>
            <button
              className="btn"
              onClick={() => {
                setShow(true);
              }}
            >
              Prev
            </button>
            <button className="btn" onClick={(e) => paymentFn(e)}>
              Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
