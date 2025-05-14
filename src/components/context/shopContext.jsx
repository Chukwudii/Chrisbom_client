import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
    const [allproducts, setAllProducts] = useState([]);
    const [cartitems, setcartitems] = useState({});
    const [orderitems, setOrderitems] = useState({});
    const [wish, setWish] = useState("");
    const refreshCartData = () => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:4000/getcart', {
                headers: {
                    'auth-token': token
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const cartData = {};
                        data.cart.forEach(item => {
                            cartData[item.id] = {
                                amount: item.amount,
                                unit: item.unit,
                                orderId: item.orderId
                            };
                        });
                        setcartitems(cartData);
                    }
                })
                .catch(err => console.error("Error refreshing cart:", err));
        } else {
            setcartitems({});
        }
    };

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAllProducts(data))
            .catch((err) => console.error("Failed to fetch products", err));

        refreshCartData();
        getorder();
    }, []);

    const addToCart = (itemId, amount, unit) => {
        setcartitems((prevCart) => ({
            ...prevCart,
            [itemId]: {
                ...prevCart[itemId],
                amount: parseFloat(amount),
                unit: unit,
            },
        }));

        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId, amount: parseFloat(amount, 10), unit })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    refreshCartData(); // Auto-refresh cart
                })
                .catch((err) => console.error("Add to cart failed", err));
            useEffect(() => {
                refreshCartData();
            }, []);
        }
    };

    const removeFromCart = (itemId) => {
        setcartitems((prev) => {
            const updated = { ...prev };
            delete updated[itemId];
            return updated;
        });

        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId })
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        console.error("Error:", data.error);
                    } else {
                        console.log("Item removed:", data);
                        refreshCartData(); // Auto-refresh cart
                    }
                })
                .catch((err) => console.error("Remove from cart error", err));
            useEffect(() => {
                refreshCartData();
            }, []);
        }
    };

    const updateCartItem = (itemId, newAmount) => {
        setcartitems((prev) => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                amount: parseFloat(newAmount),
            },
        }));

        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:4000/update', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId, amount: parseFloat(newAmount, 10) })
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        console.error("Error:", data.error);
                    } else {
                        console.log("Cart updated:", data);
                    }
                })
                .catch((err) => console.error("Update cart error:", err));
            useEffect(() => {
                refreshCartData();
            }, []);
        }
    };

    const clearCart = async () => {
        const token = localStorage.getItem('auth-token');
        if (token) {

            try {
                const response = await fetch('http://localhost:4000/clearcart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': token,
                        'Content-Type': 'application/json',
                    },
                });
                return await response.json();
                refreshCartData();
            } catch (err) {
                console.error("Add to cart failed", err);
                throw err;
            }
            useEffect(() => {
                refreshCartData();
            }, []);
        }
    }

    const addToOrder = async (itemId, amount, unit, orderId) => {
        const token = localStorage.getItem('auth-token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:4000/addtoorder', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, itemId, amount: parseFloat(amount, 10), unit })
            });

            return await response.json();
        } catch (err) {
            console.error("Add to cart failed", err);
            throw err;
        }
    };


    const getorder = () => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:4000/getOrder', {
                method: 'GET',
                headers: {
                    'auth-token': token
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const orderData = {};
                        Object.entries(data.order).forEach(([orderId, item]) => {
                            orderData[orderId] = {
                                orderIds: item.orderIds,
                                amount: item.amount,
                                unit: item.unit,
                                itemId: item.itemId,
                                status:item.status
                            };
                        });
                        setOrderitems(orderData); // Not { order }
                        console.log(orderData);
                    }
                })

                .catch(err => console.error("Error refreshing cart:", err));
        } else {
            setOrderitems({});
        }
    };

    const addtowishlist = async (product_id) => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            alert("Please log in to add items to your wishlist.");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/addtowishilist', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product_id })
            });

            const data = await response.json();
            if (response.ok && data.success) {
                setWish(data.message);
            }
            else{
                setWish(data.message);
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    const totalItems = Object.values(cartitems).filter(
        (item) => item?.amount > 0
    ).length;

    const contextValue = {
        allproducts,
        cartitems,
        addToCart,
        removeFromCart,
        updateCartItem,
        totalItems,
        refreshCartData,
        addToOrder,
        clearCart,
        orderitems,
        getorder,
        addtowishlist,
        wish
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
