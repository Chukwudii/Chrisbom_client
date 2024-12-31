import React, { createContext, useState } from 'react';
import leathers from '../../database/leathers';
import fabrics from '../../database/fabrics';

// Create the context
export const ShopContext = createContext();

// Initialize default cart
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < fabrics.length; index++) {
        const fabricId = fabrics[index].id;
        cart[fabricId] = 0;
    }
    for (let index = 0; index < leathers.length; index++) {
        const leatherId = leathers[index].id; // Get the id of the fabric
        cart[leatherId] = 0;
    }
    return cart;
};

export const ShopContextProvider = (props) => {
    const [cartitems, setcartitems] = useState(getDefaultCart());

    const addToCart = (itemId, amount, unit) => {
        setcartitems((prevCart) => ({
            ...prevCart,
            [itemId]: {
                ...prevCart[itemId],
                amount: parseFloat(amount), // Store the entered amount, default to 1 if empty
                unit: unit, // Store the selected unit (e.g., sqm or yard)
            },
        }));
    };
    const updateAmount = (itemId, amount) => {
        var newquantity = parseFloat(amount) - 1;
         console.log(newquantity);
        return newquantity;
       
    }
    const removeFromCart = (itemId) => {
        setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        console.log('Added item:', itemId);
    };

    const contextValue = {
        leathers,
        fabrics,
        cartitems,
        addToCart,
        removeFromCart,
        updateAmount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
