import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { CartState } from "../context/Context";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { cart },
    pDispatch,
  } = CartState();

  const [showSearch, setShowSearch] = useState(true);

  const logout = () => {
    localStorage.removeItem("Raman-Current-LoggedIn-Email");
    localStorage.removeItem("Raman-Current-LoggedIn-Name");
    navigate("/login-signup");
  };

  useEffect(() => {
    if (location.pathname !== "/") setShowSearch(false);
  }, []);

  return (
    <>
      <div className="navbar flex j-between a-center">
        <div className="lft">
          <h1
            className="a"
            onClick={() => {
              navigate("/");
              setShowSearch(true);
            }}
          >
            shopping cart
          </h1>
        </div>
        {showSearch ? (
          <div className="mid">
            <input
              typeof="text"
              placeholder="search product"
              onChange={(e) =>
                pDispatch({
                  type: "SEARCH_QUERY",
                  payload: e.target.value,
                })
              }
            />
          </div>
        ) : null}

        <div className="right flex j-between a-center">
          <div
            className="in-right"
            onClick={() => {
              setShowSearch(false);
              navigate("/cart");
            }}
          >
            <FaShoppingCart fontSize="25px" />
            {cart.length ? <p className="cartNumber">{cart.length}</p> : null}
          </div>
          <div className=" in-right profile">
            {localStorage
              .getItem("Raman-Current-LoggedIn-Name")
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </div>
          <div className=" in-right" onClick={() => logout()}>
            <AiOutlineLogout fontSize="25px" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
