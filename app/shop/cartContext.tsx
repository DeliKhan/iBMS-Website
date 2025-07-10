'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface StripePriceWithProduct {
  id: string;
  object: 'price';
  active: boolean;
  billing_scheme: 'per_unit' | 'tiered';
  created: number;
  currency: string;
  custom_unit_amount: null | unknown; // Adjust if you plan to support this
  livemode: boolean;
  lookup_key: string | null;
  metadata: Record<string, string>;
  nickname: string | null;
  product: {
    id: string;
    object: 'product';
    active: boolean;
    attributes: string[];
    created: number;
    default_price: string;
    description: string | null;
    images: string[];
    livemode: boolean;
    marketing_features: unknown[]; // Adjust if needed
    metadata: Record<string, string>;
    name: string;
    package_dimensions: null | {
      height: number;
      length: number;
      weight: number;
      width: number;
    }; // only if you use this
    shippable: boolean | null;
    statement_descriptor: string | null;
    tax_code: string | null;
    type: 'good' | 'service';
    unit_label: string | null;
    updated: number;
    url: string | null;
  };
  recurring: null | {
    aggregate_usage: string | null;
    interval: string;
    interval_count: number;
    usage_type: string;
    trial_period_days: number | null;
  };
  tax_behavior: 'exclusive' | 'inclusive' | 'unspecified';
  tiers_mode: null | 'graduated' | 'volume';
  transform_quantity: null | {
    divide_by: number;
    round: 'up' | 'down';
  };
  type: 'one_time' | 'recurring';
  unit_amount: number | null;
  unit_amount_decimal: string | null;
}

interface QuantityList {
  [priceId: string]: number;
}

interface CartContextType {
  cart: QuantityList;
  productList: StripePriceWithProduct[];
  addItem: (priceId: string, quantity?: number) => void;
  removeItem: (priceId: string) => void;
  clearCart: () => void;
}

const cartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [cart,setCart] = useState<QuantityList>({});
    const [productList, setProductList] = useState<StripePriceWithProduct[]>([]);
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
    useEffect(() => {
        console.log("useEffect triggered");
        // Fetch the JSON file from the public folder
        fetch('/api/products')
        .then((response) => response.json())
        .then((data) => {setProductList(data.data); console.log('Fetched inventory:', data.data);})
        .catch((error) => console.error('Error fetching JSON:', error));
    }, []);
    return (
        <cartContext.Provider value= {{cart, productList, addItem, removeItem, clearCart}}>
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