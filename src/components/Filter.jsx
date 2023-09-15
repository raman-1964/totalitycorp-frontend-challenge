import React from "react";
import { CartState } from "../context/Context";
import Ratings from "./Ratings";

const Filter = () => {
  const { pState, pDispatch } = CartState();

  return (
    <>
      <div className="filter flex column">
        <h2>Filter Products</h2>
        <span>
          <input
            type="radio"
            label="Ascending"
            name="group1"
            onChange={() =>
              pDispatch({
                type: "SORT_BY_PRICE",
                payload: "lowtohigh",
              })
            }
            checked={pState.sort === "lowtohigh" ? true : false}
          />
          Ascending
        </span>
        <span>
          <input
            type="radio"
            label="Ascending"
            name="group1"
            onChange={() =>
              pDispatch({
                type: "SORT_BY_PRICE",
                payload: "hightolow",
              })
            }
            checked={pState.sort === "hightolow" ? true : false}
          />
          Descending
        </span>

        <span>
          <input
            type="checkbox"
            name="group1"
            onChange={() => {
              pDispatch({ type: "FILTER_BY_DELIVERY" });
            }}
            checked={pState.byFastDelivery}
          />
          fast delivery only
        </span>
        <span className="rating">
          Rating :
          <Ratings
            rating={pState.byRating}
            onClick={(i) =>
              pDispatch({
                type: "FILTER_BY_RATING",
                payload: i + 1,
              })
            }
          />
        </span>
        <button
          className="btn"
          onClick={() => pDispatch({ type: "CLEAR_FILTER" })}
        >
          clear filters
        </button>
      </div>
    </>
  );
};

export default Filter;
