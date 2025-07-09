'use client'

import React, { createContext, useContext, useState } from 'react';

interface QuantityList {
  [priceId: string]: number;
}

interface CartContextType {
  cart: QuantityList;
  addItem: (priceId: string, quantity?: number) => void;
  removeItem: (priceId: string) => void;
  clearCart: () => void;
}

const cartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [cart,setCart] = useState<QuantityList>({});
    const addItem = (priceId : string, quantity : number = 1) => {
        setCart( prev => ({
            ...prev, [priceId] : (prev[priceId] || 0) + quantity,
        }))
    };
    const removeItem = (priceId : string) => {
        setCart( prev => {
            const current = prev[priceId];
            if (current === undefined){
                return prev;
            }
            if (current <= 1){
                const {[priceId] : _, ...rest} = prev;
                return rest;
            }
            return {
                ...prev,
                [priceId] : current - 1,
            };
        });
    }
    const clearCart = () => {
        setCart({});
    };
    return (
        <cartContext.Provider value= {{cart, addItem, removeItem, clearCart}}>
            {children}
        </cartContext.Provider>
    )    
}

// Custom hook
export const useCart = (): CartContextType => {
  const context = useContext(cartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};