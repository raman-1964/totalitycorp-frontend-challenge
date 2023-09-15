import React from "react";
import { CartState } from "../context/Context";
import Ratings from "./Ratings";

const Card = ({ prod }) => {
  // console.log(prod.image);

  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="slfCard">
      <img
        className="slfImage"
        src={`http://loremflickr${prod.image.substring(15)}`}
        alt={prod.name}
      />
      <div className="text">
        <p className="text-elipsis prodName bg">{prod.name}</p>
        <div className="priceCont flex j-between a-center bg">
          <p> &#8377; {prod.price.split(".")[0]}</p>
          <p>
            <Ratings rating={prod.rating} />
          </p>
        </div>

        <p className={`${prod.fastDelivery && "fst"}`}>
          {prod.fastDelivery
            ? "Fast Delivery"
            : `${prod.inStock} days delivery`}
        </p>
      </div>
      {cart.some((p) => p.id === prod.id) ? (
        <button
          className="btn dng slfButton"
          onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: prod })}
        >
          remove from cart
        </button>
      ) : (
        <button
          className="btn slfButton"
          onClick={() => dispatch({ type: "ADD_TO_CART", payload: prod })}
        >
          {prod.inStock ? "add to cart" : "out of stock"}{" "}
        </button>
      )}
    </div>
  );
};

export default Card;
