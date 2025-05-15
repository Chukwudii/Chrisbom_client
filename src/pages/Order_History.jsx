import React, { useState, useContext, useEffect, useRef } from 'react';
import { ShopContext } from "../components/context/shopContext";

const Order_History = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { orderitems, getorder, allproducts } = useContext(ShopContext);
     const baseURL = import.meta.env.VITE_API_URL;
    const closeButtonRef = useRef(null);

    useEffect(() => {
        getorder(); // fetch order data on component mount
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedOrder(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (selectedOrder) {
            closeButtonRef.current?.focus();
        }
    }, [selectedOrder]);

    const getProductDetails = (itemId) => {
        return allproducts.find(product => product.id === itemId);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Order History</h1>

            <div className="space-y-4">
                {Object.entries(orderitems).map(([orderId, order]) => {
                    const product = getProductDetails(order.itemId);
                    const total = order.unit === "yard"
                        ? order.amount * (product?.price_yard || 0)
                        : order.amount * (product?.price_sqm || 0);
                    const orderss = order.orderIds;
                    const datePart = orderss.split('-')[1];
                    const formattedDate = `${datePart.slice(0, 4)}-${datePart.slice(4, 6)}-${datePart.slice(6)}`;
                    return (
                        <div
                            key={orderId}
                            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
                        >
                            <div>
                                <p className="font-medium text-gray-700">Order ID: {order.orderIds}</p>
                                <p className="text-sm text-gray-500">Date: {formattedDate}</p>
                                <p className="text-sm text-gray-500">Product: {product?.name || "Unknown Product"}</p>
                                <p className="text-sm text-gray-500">Quantity: {order.amount} {order.unit}</p>
                                <p className="text-sm text-gray-500">Total: &#8358;{total.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                                    {order.status}
                                </span>
                                <button
                                    className="block mt-2 text-blue-600 hover:underline text-sm"
                                    onClick={() => setSelectedOrder({ id: orderId, ...order, product })}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {selectedOrder && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full m-4 max-w-lg relative transition-all duration-300">
                        <button
                            ref={closeButtonRef}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                            onClick={() => setSelectedOrder(null)}
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-center border-b pb-2">Order Details</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                            {/* Product Image */}
                            <div className="flex justify-center items-center">
                                <img
                                    src={selectedOrder.product?.image || ""}
                                    alt={selectedOrder.product?.name || "Product image"}
                                    className="h-32 w-32 object-cover rounded-lg border"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="space-y-2 text-sm text-gray-700">
                                <p><span className="font-medium">Order ID:</span> {selectedOrder.id}</p>
                                <p><span className="font-medium">Product:</span> {selectedOrder.product?.name || "Unknown Product"}</p>
                                <p><span className="font-medium">Amount:</span> {selectedOrder.amount} {selectedOrder.unit}</p>
                                <p><span className="font-medium">Price per {selectedOrder.unit}:</span> $
                                    {selectedOrder.unit === "yard"
                                        ? selectedOrder.product?.price_yard
                                        : selectedOrder.product?.price_sqm}
                                </p>
                            </div>
                        </div>

                        <hr className="my-5" />

                        <p className="text-lg font-semibold text-gray-800 text-center">
                            Total: $
                            {(selectedOrder.unit === "yard"
                                ? selectedOrder.amount * selectedOrder.product?.price_yard
                                : selectedOrder.amount * selectedOrder.product?.price_sqm
                            ).toFixed(2)}
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Order_History;
