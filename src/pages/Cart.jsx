import React, { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";
import Ratings from "../components/Ratings";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [windowDimension, setWindowDimension] = useState(getWindowDimension());
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [cost, setCost] = useState();

  function getWindowDimension() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  useEffect(() => {
    setCost(
      cart.reduce((accum, item) => accum + Number(item.price) * item.qty, 0)
    );
  }, [cart.length]);

  useEffect(() => {
    const handleResize = () => setWindowDimension(getWindowDimension());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [JSON.stringify(windowDimension)]);

  return (
    <div className="flex cart">
      <div className="cards">
        {cart.map((prod) => {
          return (
            <div className="card ">
              <img
                src={`http://loremflickr${prod.image.substring(15)}`}
                alt={prod.name}
              />
              <div className="text">
                <p>{prod.name}</p>
                <p> &#8377; {prod.price.split(".")[0]}</p>
                {windowDimension.width >= 578 ? (
                  <p className="c-rate">
                    <Ratings rating={prod.rating} />
                  </p>
                ) : null}

                <select
                  style={{
                    width: "5rem",
                    padding: "0.12rem 0.42rem",
                    height: "2rem",
                  }}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_QTY",
                      payload: {
                        id: prod.id,
                        qty: e.target.value,
                      },
                    })
                  }
                >
                  {[...Array(prod.inStock).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
              <AiFillDelete
                className="c-del"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: prod,
                  })
                }
              />
            </div>
          );
        })}
      </div>
      <div className="filter ">
        <h2> subtotal ({cart.length}) items</h2>
        <h3> Total : &#8377; {cost}</h3>
        <button
          className="btn"
          disabled={cart.length === 0}
          onClick={() => navigate("/checkout")}
        >
          proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
