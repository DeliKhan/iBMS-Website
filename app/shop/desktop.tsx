'use client'
import React from 'react';
import { useState } from 'react'
import Image from 'next/image'
import { Plus, Minus } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "../_components/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../_components/dialog"
import { Lens } from "../_components/lens"
import { useCart } from './cartContext';

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

interface DesktopProp {
    items: StripePriceWithProduct[];
}

interface QuantityList {
    [priceId : string] : number;
}

const Desktop: React.FC<DesktopProp> = ({items}) => {
    const [selectedItem, setSelectedItem] = useState<StripePriceWithProduct | null>(null);
    const [hovering, setHovering] = useState(false);
    const {cart, addItem, removeItem} = useCart();
    console.log("Items:", items);
    return (
        <div className="grid grid-cols-1 gap-4 bg-black px-5 pt-8 pb-10 md:grid-cols-2 lg:grid-cols-4" style={{
            backgroundImage: "url('/elipses.png')", 
          }}>
            <Dialog>
                {items.map((item, index) => (
                    <DialogTrigger asChild key={index}>
                    <Card key={index} className="border bg-white cursor-pointer hover:scale-110 hover:border-yellow-400 hover:border-4" onClick={() => setSelectedItem(item)}>
                        <CardHeader className="p-0">
                        <center>
                        <Image
                            src={item.product.images[0]}
                            alt={item.product.description ?? "none"}
                            width={250}
                            height={250}
                            className="object-contain w-fit h-48 mt-4 rounded-t-lg lg:w-full"
                        />
                        </center>
                        </CardHeader>
                        <CardContent>
                        <CardDescription className="text-base mt-2">{item.product.name}</CardDescription>
                        </CardContent>
                        <CardFooter className={`  text-lg font-semibold text-gray-800`}>
                        ${((item.unit_amount ?? 0)/100).toFixed(2)}
                        </CardFooter>
                    </Card>
                    </DialogTrigger>
                ))}
                <DialogContent className="h-screen bg-white">
                    <DialogHeader>
                        <DialogTitle>{selectedItem ? selectedItem.product.name : "item"}</DialogTitle>
                        <DialogDescription>{selectedItem ? selectedItem.product.description : "item"}</DialogDescription>
                    </DialogHeader>
                    <Lens hovering={hovering} setHovering={setHovering}>
                    <Image
                            src={selectedItem ? selectedItem.product.images[0] : ""}
                            alt={selectedItem ? (selectedItem.product.description ?? "hi") : ""}
                            width={250}
                            height={250}
                            className="object-cover w-full h-fit mt-4 rounded-t-lg"
                            unoptimized
                        />
                    </Lens>
                    <DialogFooter className="flex justify-start">
                        <DialogDescription className="text-lg text-black">{selectedItem ? "$" + ((selectedItem.unit_amount ?? 0)/100).toFixed(2) : ""}</DialogDescription>
                    </DialogFooter>
                    <CardDescription className='text-base'>Quantity</CardDescription>
                    <div className='flex flex-row'>
                        <button className='bg-slate-100 rounded-l-lg' disabled={(selectedItem?.id && cart[selectedItem.id] == 0) ? true : false} onClick={() => selectedItem && removeItem(selectedItem.id)}><Minus/></button>
                        <div className='px-2 border-solid border-2 border-slate-100'>{selectedItem?.id ? cart[selectedItem.id] ?? 0 : 0}</div>
                        <button className='bg-slate-100 rounded-r-lg' onClick={() => selectedItem && addItem(selectedItem.id)}><Plus/></button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Desktop;