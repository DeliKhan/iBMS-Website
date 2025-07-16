'use client'

import { useCart } from "../shop/cartContext";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "../_components/button";

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

export default function CartItems() {
    const {cart,productList,addItem,removeItem, deleteItem} = useCart();
    const combinedCartWithNulls = Object.entries(cart).map(([priceId,quantity]) => {
      const product = productList.find((p) => p.id == priceId);
      if (!product) {
        return null;
      }
      return {
        priceId,
        quantity,
        name : product.product.name,
        description : product.product.description,
        image : product.product.images[0],
        price : product.unit_amount
      };
    });
    function isNotNull<T>(value: T | null): value is T {
      return value !== null;
    }
    const combinedCart = combinedCartWithNulls.filter(isNotNull);

    const subtotal = combinedCart.reduce((total, item) => {
      const itemTotal = (item.price ?? 0) * item.quantity;
      return total + itemTotal;
    }, 0); // price is in cents

    return (
      <div className="flex flex-row gap-x-4">
        <div className="flex flex-col grow gap-y-4">
            {combinedCart.length == 0 ? 
              (
              <center>
                <h1 className="text-5xl text-white">Nothing in cart</h1>
              </center>
              )
            :
            (
            combinedCart.map(item => (
              <div key={item.priceId} className="rounded-lg bg-white flex flex-row justify-between">
                <div className="flex flex-row gap-x-12">
                  <Image
                    src={item.image ?? "./placeholder.jpg"}
                    alt={item.description ?? 'No description'}
                    width={300}
                    height={300}
                    className="object-contain w-44 h-fit mt-4 rounded-lg"
                  />
                  <div className="flex flex-col justify-center justify-around">
                    <div>
                      <h1 className="font-bold text-xl">{item.name}</h1>
                      <p>{item.description}</p>
                    </div>
                    <div className="flex flex-row gap-y-8">
                      <Button variant="outline" size="icon" onClick={() => deleteItem(item.priceId)}>
                        <Trash2/>
                      </Button>
                      <div className="flex flex-row">
                        <button className='bg-slate-100 rounded-l-lg' disabled={(item?.priceId && cart[item.priceId] == 0) ? true : false} onClick={() => item && removeItem(item.priceId)}><Minus/></button>
                        <div className='px-2 border-solid border-2 border-slate-100'>{item?.priceId ? cart[item.priceId] ?? 0 : 0}</div>
                        <button className='bg-slate-100 rounded-r-lg' onClick={() => item && addItem(item.priceId)}><Plus/></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center pr-12">
                  <h1 className="text-2xl">${((item.price ?? 0)/100).toFixed(2)}</h1>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex flex-col bg-white rounded-lg justify-center content-center gap-y-6 p-6">
          <div className="flex flex-row">
            <h1 className="font-bold text-4xl pr-2">Subtotal: </h1>
            <h1 className="font-semibold text-4xl">${(subtotal / 100).toFixed(2)}</h1>
          </div>
          <form action="/api/checkout_sessions" method="POST">
            <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
            <Button className="grow w-full" type="submit" role="link"  variant="destructive">Proceed to checkout</Button>
          </form>
        </div>
      </div>
    )
}
