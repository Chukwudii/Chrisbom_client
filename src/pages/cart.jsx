import React, { useContext } from "react";
import { ShopContext } from "../components/context/shopContext";
import "../styles/cart.css";

export default function Cart() {
  const { leathers, fabrics, cartitems, removeFromCart, updateAmount } =
    useContext(ShopContext);
  const products = fabrics.concat(leathers);

  const totalItems = Object.values(cartitems).filter(
    (item) => item?.amount > 0
  ).length;

  const subtotal = products.reduce(
    (total, e) =>
      total +
      (cartitems[e.id]?.amount || 0) * parseFloat(e.price || 0), // Handle missing values
    0
  );

  return (
    <div className="px-2 md:px-6 lg:px-8 pt-24">
      {/* Cart Items Section */}
      <div className="w-full">
        <h1 className="text-center font-semibold montserrat text-xl mb-4">Shopping Cart</h1>

        <div className="inter hidden md:grid grid-cols-4 gap-12 font-medium border py-2 bg-slate-200">
          <p className="pl-5">Item Details</p>
          <p className="pl-5">Quantity</p>
          <p className="pl-5">Item Price</p>
          <p className="pl-10">Action</p>
        </div>

        <div className="shadow-lg">
          {products.map((e) => {
            const cartItem = cartitems[e.id];
            
            if (cartItem?.amount > 0) {
              return (

                <div
                  key={e.id}
                  className="md:grid grid-cols-4 gap-12 items-center shadow-lg mb-3 py-6 border-b-2 border-t-2"
                >
                  <div className=" flex sm:flex-row md:block items-center">
                    <img
                      src={e.imageSrc}
                      alt={e.imageAlt}
                      className="pl-5 h-24 w-24 object-cover rounded"
                    />
                    <p className="pl-5 text-gray-800 text-md md:text-lg inter font-semibold">{e.name}</p>
                  </div>

                  <div className="hidden md:flex md:pl-3 items-center">
                    <button
                      onClick={() => updateAmount(e.id, cartItem.amount)}
                      className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <p className="mx-2">{cartItem.amount.toLocaleString()}</p>
                    <button
                      onClick={() => updateAmount(e.id, cartItem.amount)}
                      className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>


                  <span className="hidden md:block md:pl-5">
                    <p className="font-semibold text-lg text-gray-900 inter">
                      &#8358;
                      {(
                        parseInt(cartItem.unit === "yard" ? e.price : e.price1) *
                        cartItem.amount
                      ).toLocaleString()}
                    </p>
                    <p className="text-xs mt-1 inter text-gray-500">
                      &#8358;
                      {(cartItem.unit === "yard" ? e.price : e.price1).toLocaleString()} X {cartItem.amount}{cartItem.unit}s
                    </p>
                  </span>

                  <div className="hidden md:block md:pl-5 font-medium inter">
                    <button
                      onClick={() => removeFromCart(e.id)}
                      className="text-red-500 hover:text-red-800"
                    >
                      Remove Item
                    </button>
                    <button
                      onClick={() => removeFromCart(e.id)}
                      className="text-red-500 hover:text-red-800"
                    >
                      Save for Later
                    </button>
                  </div>

                  {/* for smaller screens */}
                  <div className="my-3 flex justify-around md:hidden">
                    <div className="flex md:pl-3 items-center">
                      <div className="pl-5 md:hidden">
                        <p>Quantity:</p>
                      </div>
                      <button
                        onClick={() => updateCartItem(e.id, cartItem.amount - 1)}
                        className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <p className="mx-2">{cartItem.amount.toLocaleString()}</p>
                      <button
                        onClick={() => updateCartItem(e.id, cartItem.amount + 1)}
                        className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>


                    <span className="md:pl-5">
                      <p className="font-semibold  text-gray-900 inter">
                        &#8358;
                        {(
                          parseInt(cartItem.unit === "yard" ? e.price : e.price1) *
                          cartItem.amount
                        ).toLocaleString()}
                      </p>
                      <p className="text-xs mt-1 inter  text-gray-500">
                        &#8358;
                        {(cartItem.unit === "yard" ? e.price : e.price1).toLocaleString()} X {cartItem.amount}{cartItem.unit}s
                      </p>
                    </span>
                  </div>
                  <div className="md:pl-5 px-4 flex md:hidden space-x-2">
                    {/* Save for Later Button */}
                    <button
                      onClick={() => console.log("Save for later clicked")}
                      className="w-full flex justify-center items-center px-4 mr-2 py-2 border border-pink-500 text-pink-500 hover:bg-pink-100 rounded"
                    >
                      <span className="mr-2 text-lg">❤️</span>
                      Save for later
                    </button>

                    {/* Remove Item Button */}
                    <button
                      onClick={() => removeFromCart(e.id)}
                      className="w-full flex justify-center items-center px-4 ml-2 py-2 border border-gray-300 text-gray-500 hover:bg-gray-100 rounded"
                    >
                      <span className="mr-2 text-lg">❌</span>
                      Remove Item
                    </button>
                  </div>

                </div>

              );
            }
            return null;
          })} </div>

        {totalItems === 0 && (
          <div className="text-center inter py-6">
            <p>No items added to the cart.</p>
          </div>
        )}
      </div>

      {totalItems > 0 && (
        <>
          <span className="inter font-medium text-md md:text-lg py-2 px-4 mt-12  bg-gray-100 flex justify-between">
            <h2>Subtotal ( {totalItems} Items ):</h2>
            <h2 className="">&#8358;{subtotal.toLocaleString()}</h2>
          </span>
          <div className="mb-4">
            <button className="w-full inter bg-green-500 my-6 text-white py-2  rounded hover:bg-green-600">
              Continue to Checkout
            </button>
          </div>
        </>
      )}

    </div>
  );
}
