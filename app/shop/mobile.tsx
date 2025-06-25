'use client'

import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "../_components/card"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../_components/drawer"
import { Button } from "../_components/button"
import React from 'react';
import { useState } from 'react';

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

interface MobileProps {
    items : StripePriceWithProduct[];
}

const Mobile: React.FC<MobileProps> = ({items}) => {
    const [selectedItem, setSelectedItem] = useState<StripePriceWithProduct | null>(null);
    return (
        <div className="grid grid-cols-1 gap-6 bg-black px-11 pt-16 pb-10" style={{
            backgroundImage: "url('/elipses.png')", 
          }}>
            <Drawer>
                {items.map((item, index) => (
                    <DrawerTrigger asChild key={index}>
                    <Card key={index} className="bg-white border hover:scale-110 hover:border-yellow-400 hover:border-4" onClick={() => setSelectedItem(item)}>
                        <CardHeader className="p-0">
                        <center>
                            <Image
                                src={item.product.images[0]}
                                alt={item.product.description ?? "none"}
                                width={250}
                                height={250}
                                className="object-cover w-fit h-64 mt-4 rounded-t-lg"
                            />
                        </center>
                        </CardHeader>
                        <CardContent>
                        <CardDescription className="text-base mt-2">{item.product.name}</CardDescription>
                        </CardContent>
                        <CardFooter className="text-lg font-semibold text-gray-800">
                        ${((item.unit_amount ?? 0)/100).toFixed(2)}
                        </CardFooter>
                    </Card>
                    </DrawerTrigger>
                ))}
                <DrawerContent className='bg-white'>
                    <DrawerHeader>
                        <DrawerTitle>{selectedItem ? selectedItem.product.name : "item"}</DrawerTitle>
                        <DrawerDescription>{selectedItem ? selectedItem.product.description : "item"}</DrawerDescription>
                    </DrawerHeader>
                    <Image
                            src={selectedItem ? selectedItem.product.images[0] : ""}
                            alt={selectedItem ? (selectedItem.product.description ?? "hi") : ""}
                            width={250}
                            height={250}
                            className="object-contain w-full h-[60vh] mt-4 rounded-t-lg"
                            unoptimized
                        />
                    <DrawerFooter>
                        <DrawerDescription className="text-lg text-black">{selectedItem ? "$" + ((selectedItem.unit_amount ?? 0)/100).toFixed(2) : ""}</DrawerDescription>
                        <DrawerClose asChild>
                            <Button>Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default Mobile;