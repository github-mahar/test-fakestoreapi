import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function ProductCards() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);
  function handleAddToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      if (!cart[existingProductIndex].quantity) {
        cart[existingProductIndex].quantity = 1;
      }
      cart[existingProductIndex].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`"${product.title}" Added to cart`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce
    });
  }

  return (
    <div className="card w-full min-h-screen gap-6 flex flex-wrap p-10 justify-center items-center">
      {products.map((product) => (
        <div
          className="product w-60 p-2 bg-buttonbg rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0 max-h-[512px]"
          key={product.id}
        >
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="aspect-square w-full">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="p-2">
              <h2 className="font-bold text-lg mb-2 line-clamp-2 text-text">
                {product.title}
              </h2>
            </div>
          </Link>
          <div className="p-2">
            <span className="text-xl font-semibold text-accent">${product.price}</span>

            <div className="flex items-center gap-2">
              <span className="text-sm line-through opacity-75 text-text">
                {(product.price * 1.1).toFixed(2)}
              </span>
              <span className="font-bold text-sm px-3 py-1 bg-yellow-300 rounded-full text-gray-600">
                Save 10%
              </span>
            </div>

            <p className="text-sm text-text line-clamp-3 mt-2 mb-2">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <button className="px-3 py-1 rounded-lg bg-primary text-buttontext font-semibold cursor-pointer">
              Buy Now
            </button>
            <button
              className="px-3 py-1 rounded-lg bg-secondary cursor-pointer"
              onClick={() => handleAddToCart(product)}
            >
              <i className="fa-solid fa-cart-shopping w-6"></i>
            </button>
            <button className="px-3 py-1 rounded-lg bg-secondary cursor-pointer">
              <i className="fa-solid fa-heart w-6 "></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
