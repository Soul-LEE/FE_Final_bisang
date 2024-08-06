/* eslint-disable react/prop-types */
import { allProducts } from "@/data/products";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
const dataContext = React.createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {

  const storedLogined = JSON.parse(localStorage.getItem('logined') || 'false');
  const storedCartId = localStorage.getItem('cartId');

  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [logined, setLogined ] = useState(storedLogined);
  const [cartId, setCartId] = useState(storedCartId);


  // useEffect(() => {
  //   const subtotal = cartProducts.reduce((accumulator, product) => {
  //     return accumulator + product.quantity * product.price;
  //   }, 0);
  //   setTotalPrice(subtotal);
  // }, [cartProducts]);

  const addProductToCart = (id) => {
    if (!cartProducts.filter((elm) => elm.id == id)[0]) {
      const item = {
        ...allProducts.filter((elm) => elm.id == id)[0],
        quantity: 1,
      };
      setCartProducts((pre) => [...pre, item]);

      document
        .getElementById("cartDrawerOverlay")
        .classList.add("page-overlay_visible");
      document.getElementById("cartDrawer").classList.add("aside_visible");
    }
  };
  const isAddedToCartProducts = (id) => {
    if (cartProducts.filter((elm) => elm.id == id)[0]) {
      return true;
    }
    return false;
  };

  const toggleWishlist = (id) => {
    if (wishList.includes(id)) {
      setWishList((pre) => [...pre.filter((elm) => elm != id)]);
    } else {
      setWishList((pre) => [...pre, id]);
    }
  };
  const isAddedtoWishlist = (id) => {
    if (wishList.includes(id)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList"));
    if (items?.length) {
      setCartProducts(items);
    }
  
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    localStorage.setItem("logined", JSON.stringify(logined));
  }, [logined]);
  
  useEffect(() => {
    localStorage.setItem("cartId", cartId);
  }, [cartId]);
  

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    setTotalPrice,
    addProductToCart,
    isAddedToCartProducts,
    toggleWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    logined,
    setLogined,
    cartId,
    setCartId
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
