'use client'

import useMediaQuery from "../../hooks/useMediaQuery"
import { useEffect, useState } from 'react'
import Mobile from "./mobile"
import Desktop from "./desktop"

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

export default function Interactivity(){
    const isMobile = useMediaQuery("(max-width: 640px)");
    /*
    const [inventory, setInventory] = useState<MerchItem[]>([]);

    useEffect(() => {
        // Fetch the JSON file from the public folder
        fetch('/data/merch/merch.json')
        .then((response) => response.json())
        .then((data: MerchItem[]) => setInventory(data))
        .catch((error) => console.error('Error fetching JSON:', error));
    }, []);
    */
   const [inventory, setInventory] = useState<StripePriceWithProduct[]>([]);

    useEffect(() => {
        console.log("useEffect triggered");
        // Fetch the JSON file from the public folder
        fetch('/api/products')
        .then((response) => response.json())
        .then((data) => {setInventory(data.data); console.log('Fetched inventory:', data.data);})
        .catch((error) => console.error('Error fetching JSON:', error));
    }, []);

    return (
        <>
        {isMobile ?
            ( 
                <Mobile items={inventory} />
            )
            :
            (
                <Desktop items={inventory} />
            )
        }
        </>
    )
}