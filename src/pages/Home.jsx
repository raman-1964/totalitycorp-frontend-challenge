import React from "react";
import { CartState } from "../context/Context";
import Card from "../components/Card";
import Filter from "../components/Filter";

const Home = () => {
  const {
    state: { products },
    pState: { sort, byFastDelivery, byRating, bySearch },
  } = CartState();
  // console.log(products);
  const filterProducts = () => {
    let pSorted = products;
    if (sort) {
      pSorted = pSorted.sort((a, b) =>
        sort === "hightolow" ? b.price - a.price : a.price - b.price
      );
    }
    if (byFastDelivery) {
      pSorted = pSorted.filter((item) => item.fastDelivery);
    }
    if (byRating) {
      pSorted = pSorted.filter((item) => item.rating >= byRating);
    }
    if (bySearch) {
      pSorted = pSorted.filter((item) =>
        item.name.toLowerCase().includes(bySearch)
      );
    }
    return pSorted;
  };

  return (
    <>
      <div className="slfHome">
        <Filter />
        <div className="slfCardCont">
          {/* <div className="slfCardCont2"> */}
          {filterProducts().map((prod) => {
            return <Card prod={prod} key={prod.id} />;
          })}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
