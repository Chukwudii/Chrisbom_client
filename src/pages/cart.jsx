import React, { useContext, useState } from "react";
import { ShopContext } from "../components/context/shopContext";
import "../styles/cart.css";

export default function Cart() {
  const { cartitems, removeFromCart, updateCartItem, totalItems, allproducts, addToOrder, clearCart, addtowishlist } = useContext(ShopContext);
  const products = allproducts;

  const [showModal, setShowModal] = useState(false);

  const subtotal = products.reduce((total, product) => {
    const cartItem = cartitems[product.id];
    if (cartItem?.amount > 0) {
      const price = cartItem.unit === "yard" ? product.price_yard : product.price_sqm;
      return total + cartItem.amount * price;
    }
    return total;
  }, 0);

  const proceedToWhatsApp = () => {
    const phoneNumber = "2349047210644"; // Replace with your number

    let message = "Hello, I would like to order:\n\n";

    products.forEach((product) => {
      const cartItem = cartitems[product.id];
      if (cartItem?.amount > 0) {
        const pricePerUnit = cartItem.unit === "yard" ? product.price_yard : product.price_sqm;
        const totalItemPrice = pricePerUnit * cartItem.amount;
        message += `- ${product.name}\n Order-Id:${cartItem.orderId}\n Qty: ${cartItem.amount} ${cartItem.unit}(s)\n  Price: ₦${totalItemPrice.toLocaleString()}\n\n`;
      }
    });

    message += `Subtotal: ₦${subtotal.toLocaleString()}\n`;
    message += "Please let me know the next steps. Thank you! 🙏";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setShowModal(false);
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  const add_to_order = async () => {
    const orderPromises = [];
    for (const [productId, item] of Object.entries(cartitems)) {
      await addToOrder(productId, item.amount, item.unit, item.orderId);
    }
    await Promise.all(orderPromises); // wait for all addToOrder calls
  };

  const remove_to_order = async () => {
    await clearCart();
    window.location.reload();
  };


  const handleClick = async () => {
    await add_to_order();
    await proceedToWhatsApp();
    await remove_to_order();
  };

  return (
    <div className="mb-8 px-3 md:px-6 lg:px-8">

      <div className="w-full">
        <h1 className="text-center font-semibold montserrat text-xl mb-4">Your Cart</h1>

        {/* Cart Header */}
        <div className="inter hidden md:grid grid-cols-4 gap-12 font-medium border py-2 bg-slate-200">
          <p className="pl-5">Item Details</p>
          <p className="pl-5">Quantity</p>
          <p className="pl-5">Item Price</p>
          <p className="pl-10">Action</p>
        </div>

        {/* Cart Items */}
        <div className="shadow-lg">
          {products.map((product) => {
            const cartItem = cartitems[product.id];
            if (!cartItem || cartItem.amount <= 0) return null;

            const pricePerUnit = cartItem.unit === "yard" ? product.price_yard : product.price_sqm;
            const totalItemPrice = pricePerUnit * cartItem.amount;

            return (
              <div
                key={product.id}
                className="md:grid grid-cols-4 gap-12 items-center shadow-lg mb-3 py-6 border-b-2 border-t-2"
              >
                {/* Item Details */}
                <div className="flex sm:flex-row md:block items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="pl-5 h-24 w-24 object-cover rounded"
                  />
                  <p className="pl-5 mt-2 text-gray-800 text-md md:text-lg inter font-semibold">{product.name}</p>
                </div>

                {/* Quantity Controls */}
                <div className="hidden md:flex md:pl-3 items-center">
                  <button
                    onClick={() => updateCartItem(product.id, parseFloat(cartItem.amount) - 1)}
                    className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <p className="mx-2">{cartItem.amount.toLocaleString()}</p>
                  <button
                    onClick={() => updateCartItem(product.id, parseFloat(cartItem.amount) + 1)}
                    className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <span className="hidden md:block md:pl-5">
                  <p className="font-semibold text-lg text-gray-900 inter">
                    &#8358;{totalItemPrice.toLocaleString()}
                  </p>
                  <p className="text-xs mt-1 inter text-gray-500">
                    &#8358;{pricePerUnit.toLocaleString()} X {cartItem.amount} {cartItem.unit}(s)
                  </p>
                </span>

                {/* Actions */}
                <div className="hidden md:block md:pl-5 font-medium inter">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-500 hover:text-red-800 mr-4"
                  >
                    Remove Item
                  </button>
                  <button
                    onClick={() => {
                      addtowishlist(product.id);
                    }}
                    className="text-pink-500 hover:text-pink-800"
                  >
                    Save for Later
                  </button>
                </div>

                {/* Mobile View */}
                <div className="my-3 flex justify-around md:hidden">
                  <div className="flex items-center">
                    <p className="mr-2">Qty:</p>
                    <button
                      onClick={() => updateCartItem(product.id, parseFloat(cartItem.amount) - 1)}
                      className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <p className="mx-2">{cartItem.amount.toLocaleString()}</p>
                    <button
                      onClick={() => updateCartItem(product.id, parseFloat(cartItem.amount) + 1)}
                      className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <span>
                    <p className="font-semibold text-gray-900 inter">
                      &#8358;{totalItemPrice.toLocaleString()}
                    </p>
                    <p className="text-xs mt-1 inter text-gray-500">
                      &#8358;{pricePerUnit.toLocaleString()} X {cartItem.amount} {cartItem.unit}(s)
                    </p>
                  </span>
                </div>

                <div className="md:pl-5 px-4 flex md:hidden space-x-2">
                  <button
                    onClick={() => {
                      addtowishlist(product.id);
                    }}
                    className="w-full flex justify-center items-center px-4 mr-2 py-2 border border-pink-500 text-pink-500 hover:bg-pink-100 rounded"
                  >
                    <span className="mr-2 text-lg">❤️</span>
                    Save for later
                  </button>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="w-full flex justify-center items-center px-4 ml-2 py-2 border border-gray-300 text-gray-500 hover:bg-gray-100 rounded"
                  >
                    <span className="mr-2 text-lg">❌</span>
                    Remove Item
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Cart */}
        {totalItems === 0 && (
          <div className="text-center inter py-6">
            <p>No items added to the cart.</p>
          </div>
        )}
      </div>

      {/* Subtotal Section */}
      {totalItems > 0 && (
        <>
          <span className="inter font-medium text-md md:text-lg py-2 px-4 mt-12 bg-gray-100 flex justify-between">
            <h2>Subtotal ({totalItems} Items):</h2>
            <h2>&#8358;{subtotal.toLocaleString()}</h2>
          </span>
          <div className="mb-4">
            <button
              onClick={handleCheckout}
              className="w-full inter bg-green-500 my-6 text-white py-2 rounded hover:bg-green-600"
            >
              Continue to Checkout
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full transform transition-all duration-300 scale-100 opacity-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Redirect to WhatsApp</h2>
            <p className="text-gray-600 mb-6 text-center">
              You will be redirected to WhatsApp to complete your order. Do you want to continue?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleClick}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded"
              >
                Yes, Continue
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
